import ngrok from 'ngrok';
import dotenv from 'dotenv';

dotenv.config();

async function startNgrok() {
  try {
    const url = await ngrok.connect({
      addr: process.env.PORT || 3000,
      authtoken: process.env.NGROK_AUTHTOKEN,
    });
    console.log('Ngrok tunnel created:', url);
  } catch (error) {
    console.error('Error creating ngrok tunnel:', error);
    process.exit(1);
  }
}

startNgrok(); 