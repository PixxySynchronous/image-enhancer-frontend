import React from 'react';
import Loading from './Loading';
import SaveButton from './SaveButton'; // make sure this path is correct

const Imagepreview = (props) => {
  return (
    <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl'>

      {/* Uploaded Image */}
      <div className='bg-white shadow-lg rounded-xl overflow-hidden'>
        <h2 className='text-xl font-semibold text-center bg-gray-800 text-white py-2'>Uploaded Image</h2>
        {props.uploaded ? (
          <img src={props.uploaded} alt="Uploaded" className='w-full h-full object-cover' />
        ) : (
          <div className='flex items-center justify-center h-80 bg-gray-200'>No image uploaded</div>
        )}
      </div>

      {/* Enhanced Image */}
      <div className='bg-white shadow-lg rounded-xl overflow-hidden relative'>
        <h2 className='text-xl font-semibold text-center bg-blue-800 text-white py-2'>Enhanced Image</h2>

        {(props.enhance && !props.loading) ? (
          <>
            <img src={props.enhance} alt="Enhanced" className='w-full h-full object-cover' />
            
            {/* Download Button */}
            <div className='absolute bottom-4 right-4'>
              <a
                href={props.enhance}
                download="enhanced-image.jpg"
                className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300'
              >
                Download
              </a>
            </div>

            {/* Save Button */}
            <div className='absolute bottom-4 left-4'>
              <SaveButton imageUrl={props.enhance}  />
            </div>
          </>
        ) : (
          props.loading ? (
            <div className="flex items-center justify-center h-80">
              <Loading />
            </div>
          ) : (
            <div className='flex items-center justify-center h-80 bg-gray-200'>Your enhanced image will appear here</div>
          )
        )}
      </div>
    </div>
  );
};

export default Imagepreview;
