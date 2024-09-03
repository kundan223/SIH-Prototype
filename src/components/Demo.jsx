import React, { useState } from 'react';
import Footer from './Footer';

const Demo = () => {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result); // Store image as a Base64 string
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImages).then((loadedImages) => {
      setImages(loadedImages);
    });
  };

  const openImageModal = (image) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
  };

  return (
    <>
      <div className="bg-white p-6 min-h-screen flex flex-col items-center">
        <div className="w-full max-w-2xl mx-auto bg-gray-200 shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-teal-600">Demo Version</h1>
          <form>
            <div className="mb-6">
              <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">Upload Images:</label>
              <input
                type="file"
                id="imageUpload"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </form>
        </div>

        <div className="w-full max-w-5xl mx-auto mt-8">
          <h2 className="text-xl font-semibold mb-4 text-orange-500">Uploaded Images</h2>
          <div className="space-y-6">
            {images.map((img, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <img
                  src={img}
                  alt="Uploaded"
                  className="w-full h-48 object-contain rounded-md"
                />
                <div className="mt-2 text-center">
                  <button
                    onClick={() => openImageModal(img)}
                    className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600"
                  >
                    Analyze
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg p-6">
            <button
              onClick={closeImageModal}
              className="absolute top-2 right-2 bg-gray-200 rounded-full p-1 focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-6 w-6 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={currentImage}
              alt="Full View"
              className="max-w-[60vw] max-h-[60vh] object-contain rounded-md mx-auto mt-4"
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Demo;
