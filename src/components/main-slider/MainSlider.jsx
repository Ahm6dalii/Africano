import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import img1 from '../../assets/resturant/1.jpg'
import img2 from '../../assets/resturant/2.jpg'
import img3 from '../../assets/resturant/3.jpg'
import img4 from '../../assets/resturant/4.jpg'
import img5 from '../../assets/resturant/5.jpg'
// Assuming you have a menu PDF in your assets
import menuPDF from '../../assets/resturant/menu.pdf'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const customStyles = `
  .swiper-pagination {
    position: absolute;
    bottom: 20px !important;
    z-index: 200;
  }

  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 1;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0 6px;
  }

  .swiper-pagination-bullet:hover {
    background: rgba(255, 255, 255, 0.8);
    transform: scale(1.1);
  }

  .swiper-pagination-bullet-active {
    background: #f97316 !important;
    transform: scale(1.2);
  }

  .swiper-pagination-bullet-active:hover {
    transform: scale(1.3);
  }

  .custom-button {
    position: relative;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    border-radius: 9999px;
    transition: all 0.3s ease;
    overflow: hidden;
    z-index: 1;
  }

  .custom-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    transition: all 0.5s ease;
    z-index: -1;
    opacity: 0;
  }

  .custom-button:hover::before {
    width: 100%;
    opacity: 1;
  }

  .download-button {
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
    border: 2px solid rgba(255, 255, 255, 0.8);
    color: white;
  }

  .download-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .download-button::before {
    background: rgba(255, 255, 255, 0.2);
  }

  .menu-button {
    background-color: #f97316;
    color: white;
    border: 2px solid #f97316;
  }

  .menu-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
  }

  .menu-button::before {
    background: #fb923c;
  }

  .button-icon {
    display: inline-block;
    margin-right: 8px;
    transition: transform 0.3s ease;
  }

  .custom-button:hover .button-icon {
    transform: translateY(-2px);
  }
`;

export default function MainSlider() {
    const { translation } = useSelector((state) => state.lang);

    const sliderImgs = [
        { img: img1 },
        { img: img2 },
        { img: img3 },
        { img: img4 },
        { img: img5 },
    ];

    const handleDownload = () => {
        // Create a link element
        const link = document.createElement('a');
        link.href = menuPDF; // Use the imported PDF file
        link.download = 'restaurant-menu.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const paragraphVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 5, ease: "easeOut" },
        },
    };

    const paragraphVariantsx = {
        hidden: { opacity: 0, x: -150 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1.9, ease: "easeOut" },
        },
    };

    const paragraphVariantsy = {
        hidden: { opacity: 0, x: 150 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1.9, ease: "easeOut" },
        },
    };

    return (
        <div className="slider-container relative  " >
            <style>{customStyles}</style>
            <Swiper
            dir='ltr' 
                centeredSlides={true}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    renderBullet: function (index, className) {
                        return `<span class="${className}"></span>`;
                    },
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-screen"
            >
                <div className='text-center rounded-2xl absolute top-[50%] start-[50%] -translate-x-[50%] -translate-y-[50%] z-[150]'>
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={paragraphVariants}
                        className="text-3xl md:text-5xl font-bold mb-2 text-orange-400 uppercase text-nowrap"
                    >
                        {translation.heroAfricano}
                    </motion.h1>

                    <motion.h2
                        id="motion"
                        style={{ fontFamily: "Oswald" }}
                        className="text-xl md:text-xl font-bold mb-2 text-white"
                        initial="hidden"
                        animate="visible"
                        variants={paragraphVariantsx}
                    >
                        {translation.heroDesc}
                    </motion.h2>

                    <motion.p
                        style={{ fontFamily: "Oswald" }}
                        className="text-md mb-8 text-white"
                        initial="hidden"
                        animate="visible"
                        variants={paragraphVariantsy}
                    >
                        {translation.heroCaption}
                    </motion.p>

                    <div className='flex flex-wrap gap-4 justify-center'>
                        <button 
                            onClick={handleDownload}
                            className=" flex items-center gap-2 custom-button download-button"
                        >
                          <i className="fa-solid fa-download "></i>
                            {translation.downloadMenu}
                        </button>
                        <Link to="/menu" 
                            className="flex items-center gap-2 custom-button menu-button"
                        >
                        <i className="fa-solid fa-pizza-slice"></i>
                            {translation.downloadMenu}
                        </Link>
                    </div>
                </div>

                <div  className='absolute start-0 end-0 top-0 bottom-0 z-[100] bg-black bg-opacity-60 h-screen'></div>

                {sliderImgs.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img 
                            className='w-full h-screen object-cover' 
                            src={item.img} 
                            alt={`Slide ${index + 1}`} 
                            loading="lazy"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}