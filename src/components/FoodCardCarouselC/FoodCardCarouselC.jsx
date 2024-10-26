/* eslint-disable react/prop-types */
import { ArrowUpRight } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const sizeInArabic = {
    'S': 'صغير',
    'M': 'وسط',
    'L': 'كبير',
    'R': "السعر"
  };
export default function FoodCardCarouselC({food}) {
    const { language } = useSelector(state => state.lang);
    // const amountArray = Object.entries(food.amount);
    const getLocalizedSize = (size) => {
        if (language === 'ar' && sizeInArabic[size]) {
          return sizeInArabic[size];
        }
        return size;
      };
    
      const isRTL = language === 'ar';
  return (
    <div className="relative group w-80 h-[400px] block rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={food?.image}
          alt={food?.name[language]}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        {/* Top Content */}
        <div className="flex justify-between items-start">
          <span className="px-3 py-1 bg-orange-600/20 backdrop-blur-sm rounded-full text-sm text-white font-medium">
            {food?.category?.name[language]}
          </span>
          <Link 
            to={`/food/${food._id}`}
            className="p-2 rounded-full bg-orange-600 backdrop-blur-sm hover:bg-orange-500 transition-colors group/link"
          >
            <ArrowUpRight className="w-5 h-5 text-white group-hover/link:scale-110 transition-transform" />
          </Link>
        </div>

        {/* Bottom Content */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white  transition-colors">
            {food?.name[language]}
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(food?.amount).map(([size, price]) => (
              <span
                key={size}
                className="px-3 py-1 bg-orange-600/20 backdrop-blur-sm rounded-full text-sm font-medium text-white"
              >
                {getLocalizedSize(size)}: {price} {isRTL?"جنيه":"LE"}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}