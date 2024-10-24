import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const sizeInArabic = {
  'S': 'صغير',
  'M': 'وسط',
  'L': 'كبير',
  'R': "السعر"
};

const Card2 = ({ imaUrl, desc, amount, name, lang, id }) => {
  const { language } = useSelector(state => state.lang);
  const amountArray = Object.entries(amount);

  const getLocalizedSize = (size) => {
    if (lang === 'ar' && sizeInArabic[size]) {
      return sizeInArabic[size];
    }
    return size;
  };

  const isRTL = language === 'ar';

  return (
    <div className="group  relative bg-white/20 dark:bg-[#22222] dark:bg-opacity-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <Link to={`/food/${id}`} className="flex sm:flex-col">
      <div className="relative w-[40%] sm:w-full aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-300 z-10" />
        <img 
          loading="lazy" 
          className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110" 
          src={imaUrl} 
          alt={name[lang]} 
        />
      </div>

      {/* Content Container */}
      <div className={`flex-1 p-6 flex flex-col gap-1 sm:gap-4 ${isRTL ? "rtl" : "ltr"}`}>
        {/* Title */}
        <h2 className="text-xl  sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
          {name[language]}
        </h2>

        {/* Prices Grid */}
        <div className="grid gap-1 sm:gap-2">
          {amountArray?.map(([size, price], index) => (
            <div 
              key={index}
              className="flex justify-between items-center py-1 px-2 rounded-lg bg-gray-50 dark:bg-[#222222]/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-200 dark:bg-[#222222] text-gray-800 dark:text-gray-200">
                {getLocalizedSize(size)}
              </span>
              <span className="text-sm sm:text-lg font-semibold text-yellow-600 dark:text-yellow-500">
                {price} {isRTL ? "جنيه" : "EG"}
              </span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-auto">
          {desc[language]}
        </p>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 border-2 border-transparent opacity-0 group-hover:opacity-100 group-hover:border-yellow-500/20 rounded-2xl transition-all duration-300" />
      </div>
    </Link>
    </div>
  );
};

export default Card2;