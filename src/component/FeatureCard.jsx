// FeatureCard.jsx

import React from 'react';

const FeatureCard = ({ imageSrc, title, description, linkHref }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden">
      
      {/* Card Image */}
      <a href={linkHref}>
        <img className="w-full h-48 object-cover" src={imageSrc} alt={title} />
      </a>
      
      <div className="p-6">
        {/* Card Title */}
        <a href={linkHref}>
          <h5 className="mb-3 text-xl font-bold tracking-tight text-indigo-700 hover:text-indigo-800 transition duration-150">
            {title}
          </h5>
        </a>
        
        {/* Card Description */}
        <p className="mb-4 font-normal text-gray-600">
          {description}
        </p>
        
        {/* Read More Button (Themed Red) */}
        <a 
          href={linkHref} 
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 transition duration-200"
        >
          Explore Feature
          {/* SVG Icon (Arrow) */}
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default FeatureCard;