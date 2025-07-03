import React from 'react';
import { saveImageToCloud } from '../utils/imageSaver';
import { useNavigate } from 'react-router-dom';

/**
 * Button to save the given image URL to the user's image collection
 * after uploading it to Cloudinary via backend.
 *
 * @param {string} imageUrl - Temporary TechHK image URL
 */
const SaveButton = ({ imageUrl }) => {
  const navigate = useNavigate();

  const handleSave = async () => {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    // If user is not logged in, show alert and prevent action
    if (!token) {
      window.alert('Please log in to save images.');
      return;
    }

    try {
      // Send image URL to backend for Cloudinary upload and MongoDB save
      await saveImageToCloud(imageUrl, token);

      // Show success alert and navigate to My Images
      window.alert('Image saved successfully!');
      navigate('/myimages');
    } catch (err) {
      console.error(err);
      window.alert('Failed to save image. Please try again.');
    }
  };

  return (
    <button
      onClick={handleSave}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
    >
      Save to My Images
    </button>
  );
};

export default SaveButton;
