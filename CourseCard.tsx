// src/components/CourseCard.tsx
import React from 'react';

interface CourseCardProps {
  name: string;
  address: string;
  imageUrl: string;
  description?: string;
  onBookNow: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ name, address, imageUrl, description, onBookNow }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
        <p className="text-gray-600 dark:text-gray-300">{address}</p>
        {description && <p className="mt-2 text-gray-700 dark:text-gray-200">{description}</p>}
        <button
          onClick={onBookNow}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
