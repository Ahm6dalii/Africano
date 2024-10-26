import React, { useState, useCallback, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import img1 from '../../assets/menu/1.jpg'
import img2 from '../../assets/menu/2.jpg'
import img3 from '../../assets/menu/3.jpg'
import img4 from '../../assets/menu/4.jpg'
import img5 from '../../assets/menu/5.jpg'
import img6 from '../../assets/menu/6.jpg'
import img7 from '../../assets/menu/7.jpg'
import img8 from '../../assets/menu/8.jpg'
import { useSelector } from 'react-redux';

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sliderIndex, setSliderIndex] = useState(0);
  const { translation } = useSelector(state => state.lang)

  // Using placeholder images since we can't import external images
   
  const galleryImages = [
    { img: img1, alt: 'Gallery Image 1' },
    { img: img2, alt: 'Gallery Image 2' },
    { img: img3, alt: 'Gallery Image 3' },
    { img: img4, alt: 'Gallery Image 4' },
    { img: img5, alt: 'Gallery Image 5' },
    { img: img6, alt: 'Gallery Image 6' },
    { img: img7, alt: 'Gallery Image 7' },
    { img: img8, alt: 'Gallery Image 8' },
    // Add more images as needed
];

  // Responsive slides configuration
  const getSlidesToShow = () => {
    if (typeof window === 'undefined') return 2; // Default for SSR
    const width = window.innerWidth;
    if (width < 640) return 2;      // sm
    if (width < 768) return 3;      // md
    if (width < 1024) return 4;     // lg
    return 5;                       // xl and above
  };

  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());
  const totalSlides = Math.ceil(galleryImages.length - slidesToShow + 1);

  // Update slides to show on window resize
  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
      // Reset slider index if it would cause empty space
      setSliderIndex(prev => Math.min(prev, Math.ceil(galleryImages.length - getSlidesToShow())));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openModal = useCallback((index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  const goToNextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  }, [galleryImages.length]);

  const goToPreviousImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  }, [galleryImages.length]);

  const nextSlide = () => {
    setSliderIndex((prev) => Math.min(prev + 1, totalSlides - 1));
  };

  const prevSlide = () => {
    setSliderIndex((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          goToPreviousImage();
          break;
        case 'ArrowRight':
          goToNextImage();
          break;
        default:
          break;
      }
    };

    const handleClickOutside = (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isModalOpen, closeModal, goToNextImage, goToPreviousImage]);

  return (
    <div className=" mx-auto px-4 py-8">
      <h3 className=" flex items-center gap-2 justify-center text-2xl sm:text-3xl md:text-5xl font-extrabold  text-orange-500 dark:text-orange-200  mb-8 text-center">
      <i className="fa-brands fa-readme"></i>
      {translation.ourMenu}
            </h3>
      {/* Slider Container */}
      <div dir='ltr'  className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 ${
            sliderIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={sliderIndex === 0}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 ${
            sliderIndex === totalSlides - 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={sliderIndex === totalSlides - 1}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slider Track */}
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${(sliderIndex * (100 / slidesToShow))}%)`
            }}
          >
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`flex-shrink-0 px-2
                  w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5`}
              >
                <div
                  className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                  onClick={() => openModal(index)}
                >
                  <img
                    src={image.img}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999]">
          <div className="modal-overlay absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300" />
          
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="relative w-full max-w-7xl mx-auto">
              <div className="flex items-center justify-center">
                <img
                  src={galleryImages[currentImageIndex].img}
                  alt={galleryImages[currentImageIndex].alt}
                  className="max-h-[90vh] w-auto object-contain transition-opacity duration-300"
                />
              </div>

              <button
                onClick={goToPreviousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={goToNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;