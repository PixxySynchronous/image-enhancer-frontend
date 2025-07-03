import React, { useState, useEffect } from 'react';
import Imageupload from './Imageupload';     // Import your components properly
import Imagepreview from './Imagepreview';
import {
  enhancedImageAPI,
  removeBackgroundAPI,
  compressImageAPI,
  colorizeImageAPI,
  removeWatermarkAPI,
} from './API/EnhancedimageAPI';
import axios from 'axios'; // Added to make backend API call

const Home = ({ tool, onEnhancedImageChange }) => {
  const [uploadImage, setUploadImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Save image to backend
  const saveImageToDB = async (imageUrl) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/images/addimage`,
        { imageUrl },
        {
          headers: {
            'auth-token': token,
          },
        }
      );

      console.log("Image saved to DB:", response.data);
    } catch (error) {
      console.error("Failed to save image to DB:", error);
    }
  };

  // Inform parent about enhanced image changes
  useEffect(() => {
    if (onEnhancedImageChange) {
      onEnhancedImageChange(enhancedImage);
    }
  }, [enhancedImage, onEnhancedImageChange]);

  // Clear images when tool changes
  useEffect(() => {
    setUploadImage(null);
    setEnhancedImage(null);
    setLoading(false);
  }, [tool]);

  const UploadImageHandler = async (file) => {
    setUploadImage(URL.createObjectURL(file));
    setLoading(true);

    try {
      let result;

      switch (tool.name) {
        case "enhance":
          result = await enhancedImageAPI(file);
          break;
        case "remove_bg":
          result = await removeBackgroundAPI(file, tool.params);
          break;
        case "compress":
          result = await compressImageAPI(file, tool.params);
          break;
        case "colorize":
          result = await colorizeImageAPI(file);
          break;
        case "remove_watermark":
          result = await removeWatermarkAPI(file, tool.params);
          break;
        default:
          throw new Error("Unknown tool selected");
      }

      setEnhancedImage(result);
      await saveImageToDB(result); // Save image after enhancement
    } catch (error) {
      console.error(error);
      alert("Error while processing the image. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Imageupload UploadImageHandler={UploadImageHandler} />
      <Imagepreview
        loading={loading}
        uploaded={uploadImage}
        enhance={enhancedImage}
      />
    </>
  );
};

export default Home;
