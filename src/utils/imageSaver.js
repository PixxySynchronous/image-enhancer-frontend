// src/utils/imageSaver.js

/**
 * Saves a temporary TechHK image URL to Cloudinary and stores it in MongoDB
 * by calling the backend route: POST /api/images/addimage
 * 
 * @param {string} tempURL - Temporary URL of image from TechHK
 * @param {string} token - JWT token of the authenticated user
 * @returns {Object} - Saved image data from backend (includes Cloudinary URL)
 * @throws {Error} - If the request fails or backend returns an error
 */
export const saveImageToCloud = async (tempURL, token) => {
  // Send POST request to backend with image URL and auth token
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/images/addimage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token, // Auth header to identify logged-in user
    },
    body: JSON.stringify({ imageUrl: tempURL }), // Request payload
  });

  // Parse JSON response from backend
  const data = await response.json();

  // If the response failed (e.g., 400 or 500), throw error
  if (!response.ok) {
    throw new Error(data.error || 'Failed to save image');
  }

  // Return image data (Cloudinary URL + MongoDB record)
  return data;
};
