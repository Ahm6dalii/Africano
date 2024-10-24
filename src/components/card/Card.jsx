import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';
import { useSelector } from 'react-redux';

const sizeInArabic = {
  'S': 'صغير',
  'M': 'وسط',
  'L': 'كبير',
  'R':"السعر"
};


const Card = ({ imaUrl, desc, amount, name, lang, id }) => {
  const [showDesc, setShowDesc] = useState(false);
  const amountArray = Object.entries(amount);
  const { language } = useSelector(state => state.lang)

  const handleInfoClick = (e) => {
    e.preventDefault();
    setShowDesc(!showDesc);
  };

  const getLocalizedSize = (size) => {
    if (lang === 'ar' && sizeInArabic[size]) {
      return sizeInArabic[size];
    }
    return size;
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-xl bg-[#F5F5F7] bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-50 shadow-lg transform transition-all duration-500 ease-in-out hover:shadow-xl hover:-translate-y-1"
    >
      <Link to={`/food/${id}`} className="block">
        {/* Header with slide-down animation on hover */}
        <div className="p-4 border-b dark:border-gray-700">
          <h3 className="text-xl line-clamp-1 font-bold text-gray-800 dark:text-white text-center transform transition-transform duration-300 group-hover:-translate-y-0.5">
            {name[lang]}
          </h3>
        </div>

        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img 
            loading="lazy" 
            className="w-full h-56 object-cover transform transition-all duration-700 ease-in-out group-hover:scale-110" 
            src={imaUrl} 
            alt={name[lang]} 
          />
          
          {/* Animated Info Icon */}
          {desc[lang] && (
            <button
              onClick={handleInfoClick}
              className={`absolute top-2 right-2 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md 
                transition-all duration-300 ease-in-out transform
                hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110
                ${showDesc ? 'rotate-180 bg-gray-100 dark:bg-gray-700' : ''}`}
            >
              <Info 
                size={20} 
                className={`text-gray-600 dark:text-gray-300 transition-colors duration-300
                  ${showDesc ? 'text-gray-800 dark:text-white' : ''}`}
              />
            </button>
          )}

          {/* Animated Description Overlay */}
          <div 
            className={`absolute inset-0 bg-black flex items-center justify-center
              transition-all duration-500 ease-in-out
              ${showDesc ? 'opacity-90 visible' : 'opacity-0 invisible'}`}
            onClick={handleInfoClick}
          >
            <div 
              className={`p-6 max-w-[90%] transform transition-all duration-500 ease-in-out
                ${showDesc ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
            >
              <p className="text-white text-center font-medium">
                {desc[lang]}
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Section with staggered hover animations */}
        <div className="p-4">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {amountArray?.map(([size, price], index) => (
              <div 
                key={size}
                className="px-2 py-2 text-[14px]  bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm
                  transform transition-all duration-300 ease-in-out
                  hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-600
                  group-hover:translate-y-0"
                style={{
                  transitionDelay: `${index * 50}ms`,
                  transform: 'translateY(0px)'
                }}
              >
                <span className="text-gray-700 dark:text-gray-200  font-medium transition-colors duration-300">
                  {getLocalizedSize(size)}:
                </span>
                <span className="ml-2 text-orange-500 font-bold transition-all duration-300 group-hover:text-orange-400">
                  {price} {language=='en'?'EG':"جنيه"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;