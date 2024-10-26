import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import { useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import FoodCardCarouselC from '../FoodCardCarouselC/FoodCardCarouselC';

const FoodCarousel = () => {
  const { translation } = useSelector(state => state.lang)
  const { language } = useSelector(state => state.lang);

  const { link } = useSelector(state => state.apiLink);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getAllFood() {
    setIsLoading(true);
    try {
      const { data: response } = await axios.get(`${link}/api/foods?limit=29`);
      setData(response?.data);
    } catch (err) {
      console.error('Error fetching food data:', err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllFood();
  }, [language]);

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (<>
      <h3 className=" flex items-center gap-2 justify-center text-2xl sm:text-3xl md:text-5xl font-extrabold  text-orange-500 dark:text-orange-200 mt-8 text-center">
      <i className="fa-brands fa-readme"></i>
      {translation.bestDishes}
            </h3>
    <div className="relative w-full max-w-6xl mx-auto px-4" dir='ltr'>
      {/* Custom Navigation Buttons */}
      <button className="swiper-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center hover:bg-orange-500 transition-colors group focus:outline-none">
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      
      <button className="swiper-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center hover:bg-orange-500 transition-colors group focus:outline-none">
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        coverflowEffect={{
          rotate: 5,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          prevEl: '.swiper-prev',
          nextEl: '.swiper-next',
        }}
        modules={[EffectCoverflow, Navigation, Autoplay]}
        className="w-full py-12"
      >
        {data?.map((food, index) => (
          <SwiperSlide 
            key={index} 
            className="w-auto flex items-center justify-center"
            style={{ width: 'auto' }}
          >
            <FoodCardCarouselC food={food} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </>
  );
};

export default FoodCarousel;