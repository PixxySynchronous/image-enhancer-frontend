import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
const baseURL = 'https://techhk.aoscdn.com';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* ---------- ENHANCE IMAGE ---------- */
export const enhancedImageAPI = async (file) => {
  return genericImageAPI(file, 'scale');
};

/* ---------- REMOVE BACKGROUND ---------- */
export const removeBackgroundAPI = async (file, { bg = 'white' } = {}) => {
  return genericImageAPI(file, 'segmentation', { bg });
};

/* ---------- COMPRESS IMAGE ---------- */
export const compressImageAPI = async (file, { compression = 10 } = {}) => {
  return genericImageAPI(file, 'imgcompress', { compression });
};

/* ---------- COLORIZE IMAGE ---------- */
export const colorizeImageAPI = async (file) => {
  return genericImageAPI(file, 'colorization');
};

/* ---------- REMOVE WATERMARK ---------- */
export const removeWatermarkAPI = async (file, { auto = true } = {}) => {
  return genericImageAPI(file, 'external/watermark-remove', { auto });
};

/* ---------- GENERIC TEMPLATE FUNCTION ---------- */
const genericImageAPI = async (file, endpoint, extraParams = {}) => {
  try {
    const taskId = await uploadImage(file, endpoint, extraParams);
    const imageUrl = await fetchImage(endpoint, taskId);
    return imageUrl;
  } catch (error) {
    console.error(`Error in ${endpoint} API:`, error.message);
    return null;
  }
};

const uploadImage = async (file, endpoint, extraParams = {}) => {
  const maxRetries = 5;
  const delay = 2000;

  const formData = new FormData();
  formData.append('image_file', file);
  formData.append('sync', '0');

  // Add extra parameters if present
  for (const [key, value] of Object.entries(extraParams)) {
    formData.append(key, value);
  }

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios.post(
        `${baseURL}/api/tasks/visual/${endpoint}`,
        formData,
        {
          headers: {
            'X-API-KEY': apiKey,
          },
        }
      );

      const taskId = response.data?.data?.task_id || response.data?.task_id;
      if (taskId) return taskId;

      await sleep(delay);
    } catch (error) {
      if (attempt === maxRetries) throw error;
      await sleep(delay);
    }
  }

  throw new Error(`Failed to get task_id for ${endpoint}`);
};

const fetchImage = async (endpoint, taskId) => {
  const maxRetries = 10;
  const delay = 3000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios.get(
        `${baseURL}/api/tasks/visual/${endpoint}/${taskId}`,
        {
          headers: {
            'X-API-KEY': apiKey,
          },
        }
      );

      const taskData = response.data.data;

      if (taskData.state_detail === 'Complete' && taskData.image) {
        return taskData.image;
      }

      await sleep(delay);
    } catch (error) {
      if (attempt === maxRetries) throw error;
      await sleep(delay);
    }
  }

  throw new Error(`Image processing timed out for ${endpoint}`);
};
