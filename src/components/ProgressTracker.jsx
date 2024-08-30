
import React, { useState, useEffect } from 'react';
import Footer from './Footer';

const ProgressTracker = () => {
  const [activityType, setActivityType] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const storedActivities = JSON.parse(localStorage.getItem('activities'));
    if (storedActivities) {
      setActivities(storedActivities);
    }
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newActivity = {
      activityType,
      description,
      images,
      timestamp: new Date().toLocaleString(),
    };

    const updatedActivities = [...activities, newActivity];
    setActivities(updatedActivities);
    localStorage.setItem('activities', JSON.stringify(updatedActivities));

    setActivityType('');
    setDescription('');
    setImages([]);
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
          <h1 className="text-3xl font-bold mb-6 text-center text-teal-600">Construction Site Monitoring</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="activityType" className="block text-sm font-medium text-gray-700">Select Activity Type:</label>
              <select
                id="activityType"
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
                required
                className="mt-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
              >
                <option value="">Select</option>
                <option value="foundation">Foundation</option>
                <option value="superstructure">Superstructure</option>
                <option value="facade">Facade</option>
                <option value="interiors">Interiors</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="mt-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 px-3 py-2"
                rows="5"
              ></textarea>
            </div>

            <div className="mb-6">
              <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">Upload Images:</label>
              <input
                type="file"
                id="imageUpload"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                required
                className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="w-full max-w-5xl mx-auto mt-8">
          <h2 className="text-xl font-semibold mb-4 text-orange-500">Activities</h2>
          <div className="space-y-6">
            {activities.map((activity, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <p className="text-gray-800"><strong>Activity Type:</strong> {activity.activityType}</p>
                <p className="text-gray-800"><strong>Description:</strong> {activity.description}</p>
                <p className="text-gray-800"><strong>Timestamp:</strong> {activity.timestamp}</p>
                {activity.images && activity.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {activity.images.map((img, imgIndex) => (
                      <div key={imgIndex} className="relative">
                        <img
                          src={img}
                          alt="Activity"
                          className="w-full h-48 object-contain rounded-md"
                        />
                        <div className="mt-2 text-center">
                          <button
                            onClick={() => openImageModal(img)}
                            className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600"
                          >
                            View Full Image
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
              alt="Full Activity"
              className="max-w-[60vw] max-h-[60vh] object-contain rounded-md mx-auto mt-4"
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProgressTracker;

