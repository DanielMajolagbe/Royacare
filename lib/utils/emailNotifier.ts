import nodemailer from 'nodemailer';
import { DocumentType } from '@/lib/types/document.types';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'danieloluwaseun819@gmail.com',
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const sendDocumentUploadNotification = async (
  documentType: DocumentType,
  staffId: string
) => {
  const documentTypeDisplay = documentType.split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  const mailOptions = {
    from: 'Royacare Email Notifier',
    to: 'recruitment@royacare.co.uk',
    subject: `Ongoing Applicant: ${documentTypeDisplay}`,
    text: `A new document has been uploaded to the RoyaCare Agency Portal. Kindly Action.

Document Type: ${documentTypeDisplay}
Submitted By: ${staffId}
Date & Time: ${new Date().toLocaleString()}

This is an automated notification.`,
    html: `
      <h2>New Document Upload Notification - Ongoing Application</h2>
      <p>A ${documentTypeDisplay} has just been submitted by ${staffId}.</p>
      <ul>
        <li><strong>Document Type:</strong> ${documentTypeDisplay}</li>
        <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
      </ul>
      <a style="text-decoration: none; color: #007bff; font-weight: bold;" href="https://royacare-agency.onrender.com/admin/login">View Submissions</a>
      <p><em>This is an automated notification. </em></p>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return true;
  } catch (error) {
    console.error('Failed to send email notification:', error);
    return false;
  }
}; 