declare global {
  interface Window {
    cv: any;
  }
}

export async function loadOpenCV(): Promise<any> {
  if (window.cv) return window.cv;

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    // Use the stable, full version of OpenCV
    script.src = 'https://docs.opencv.org/4.7.0/opencv.js';
    script.async = false; // Make it load synchronously for reliability
    script.crossOrigin = "anonymous";
    
    script.onload = () => {
      const waitForCV = setInterval(() => {
        if (window.cv && window.cv.Mat) {
          clearInterval(waitForCV);
          resolve(window.cv);
        }
      }, 10);
    };
    
    script.onerror = (error) => {
      reject(new Error('OpenCV failed to load. Please refresh the page.'));
    };

    // Add to head instead of body for faster loading
    document.head.appendChild(script);
  });
} 