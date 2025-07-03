import React from 'react';

const Imageupload = (props) => {
  const ShowImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      props.UploadImageHandler(file);
    }
  };

  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <label
          htmlFor="fileInput"
          className="block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:text-blue-500 transition-all"
        >
          <input type="file" id="fileInput" className="hidden" onChange={ShowImageHandler} />
          <span className="text-lg font-medium text-gray-600">
            Click or drag to upload your image
          </span>
        </label>
      </div>
    </div>
  );
};

export default Imageupload;