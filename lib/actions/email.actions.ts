export async function sendUploadLink(email: string, subject: string, body: string) {
  try {
    const response = await fetch('/api/send-upload-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, subject, body }),
    });

    if (!response.ok) {
      throw new Error('Failed to send upload link');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending upload link:', error);
    throw error;
  }
} 