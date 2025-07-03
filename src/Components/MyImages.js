import React, { useEffect, useState } from 'react';

const MyImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

 const fetchMyImages = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Using token:', token);

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/images/fetchallimages`, {
      method: 'GET',
      headers: {
        'auth-token': token
      }
    });

    const text = await res.text(); // read raw response
    console.log('Raw response:', text);

    const data = JSON.parse(text);
    console.log('Parsed response:', data);

    setImages(data);
    setLoading(false);
  } catch (err) {
    console.error('❌ Failed to fetch images:', err);
    alert('Failed to fetch images');
    setLoading(false);
  }
};


  const deleteImage = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this image?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/images/deleteimage/${id}`, {
        method: 'DELETE',
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });

      const result = await res.json();

      if (res.ok) {
        setImages(images.filter(img => img._id !== id));
        alert('Image deleted successfully'); // Using default browser alert
      } else {
        alert(result.error || 'Could not delete image'); // Using default browser alert
      }
    } catch (err) {
      console.error('Error deleting image', err);
      alert('Server error while deleting image'); // Using default browser alert
    }
  };

  useEffect(() => {
    fetchMyImages();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Saved Images</h2>

      {loading ? (
        <p className="text-gray-500">Loading images...</p>
      ) : images.length === 0 ? (
        <p className="text-gray-500">You have no saved images yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <div
              key={img._id}
              className="bg-white rounded-lg shadow p-2 flex flex-col items-center"
            >
              <img
                src={img.url}
                alt="Saved"
                className="w-full h-48 object-cover rounded"
              />

              {/* Only Download and Delete buttons */}
              <div className="mt-2 flex gap-2">
                <a
                  href={img.url}
                  download
                  className="text-green-600 text-sm hover:underline"
                >
                  Download
                </a>

                <button
                  onClick={() => deleteImage(img._id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-1">
                {new Date(img.uploadedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyImages;
