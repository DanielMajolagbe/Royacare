import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { Readable } from 'stream';

const SCOPES = [
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata.readonly'
];

const auth = new JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

// Add this function to test folder access
async function verifyFolderAccess(folderId: string) {
  try {
    const response = await drive.files.get({
      fileId: folderId,
      fields: 'id, name'
    });
    console.log('Folder exists:', response.data);
    return true;
  } catch (error) {
    console.error('Folder access error:', error);
    return false;
  }
}

export async function uploadToDrive(file: Buffer, fileName: string, mimeType: string) {
  try {
    console.log('Starting Google Drive upload...', { fileName, mimeType });
    
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (!folderId) {
      throw new Error('Google Drive folder ID not configured');
    }

    // Verify folder access first
    const hasAccess = await verifyFolderAccess(folderId);
    if (!hasAccess) {
      throw new Error('Cannot access the specified Google Drive folder. Please check folder ID and permissions.');
    }

    // Convert Buffer to Readable Stream
    const stream = new Readable();
    stream.push(file);
    stream.push(null);

    // Create file directly in the folder
    const response = await drive.files.create({
      requestBody: {
        name: `${Date.now()}-${fileName}`,
        parents: [folderId],
        mimeType: mimeType,
      },
      media: {
        mimeType: mimeType,
        body: stream,
      },
      fields: 'id, webViewLink',
    }, {
      // Override timeout
      timeout: 60000,
      retry: true,
    });

    if (!response.data.id) {
      throw new Error('Failed to get file ID from Google Drive');
    }

    // Make the file viewable with link
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    const webViewLink = response.data.webViewLink || 
      `https://drive.google.com/file/d/${response.data.id}/view`;

    console.log('Upload successful:', { fileId: response.data.id, webViewLink });

    return {
      fileId: response.data.id,
      webViewLink,
    };
  } catch (error) {
    console.error('Google Drive upload error:', error);
    // More specific error message
    if (error instanceof Error) {
      if (error.message.includes('The user does not have sufficient permissions')) {
        throw new Error('Service account does not have permission to access the folder');
      }
      if (error.message.includes('File not found')) {
        throw new Error('Invalid folder ID. Please check your GOOGLE_DRIVE_FOLDER_ID');
      }
    }
    throw error;
  }
} 