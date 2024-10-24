import React, { useState, useEffect } from 'react';
import { Navbar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { changeMode } from "../../redux/reducers/modeSlice";
import { logOutUser } from "../../redux/reducers/userAuthSlice";
import useCart from "../../hooks/useCart";
import socket from "../../socket.io/socket";
import {Phone, Facebook, Instagram } from 'lucide-react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import logoLight from "../../assets/logo/logo.li.png";
import logoDark from "../../assets/logo/logo-dr.png";
import LanuageButton from './../LanguageButton/LanguageButton';

// Shared hook for scroll behavior
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [prevOffset, setPrevOffset] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const threshold = 50;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      setScrollDirection(scrollY > lastScrollY ? "down" : "up");
      setVisible(scrollY < threshold || scrollY < prevOffset);
      setPrevOffset(scrollY > 0 ? scrollY : 0);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [prevOffset]);

  return visible;
};

// Top Navigation Component
const TopNav = () => {
  const isVisible = useScrollDirection();
  const { translation } = useSelector(state => state.lang)

  return (
    <div dir='ltr'
      className={`w-full bg-orange-600 dark:bg-orange-900 text-white fixed top-0 left-0 right-0 z-[1001] transition-transform duration-300 ${
        isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-wrap items-center justify-between">
          {/* Contact Information */}
          <div className="flex items-center space-x-4 text-sm">
            <a href="tel:+201020142743" className="flex items-center hover:text-orange-200">
              <h4 className='me-2'>{translation.orderNow}</h4>
              <Phone className="w-4 h-4 me-2" />
              <span className="hidden sm:inline">+201020142743</span>
            </a>
          
          </div>
          
          {/* Social Links */}
          <div className="flex items-center space-x-2">
          <h4 className='me-1'>{translation.followUs}
            <i className='fa-solid fa-angle-double-right ms-2'></i>
          </h4>

            <a href="https://www.facebook.com/profile.php?id=100090617247433" className="hover:text-orange-200 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
           
            <a  href="https://www.instagram.com/africanopizzapasta?igsh=MTB5MnFwcXJ1Z2Y0eA==" className="hover:text-orange-200 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Navigation Component
export function Navbaar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const isTopNavVisible = useScrollDirection();
  const { mode } = useSelector((state) => state.mode);
  const { translation } = useSelector((state) => state.lang);
  const { user, userInfo } = useSelector((state) => state.auth);
  const { cart } = useCart();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit('register', userInfo?.userId);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      socket.off('register');
      window.removeEventListener('resize', handleResize);
    }
  }, [userInfo]);

  const navLink = [
    { name: translation.home, href: "/" },
    { name: translation.menu, href: "menu" },
    { name: translation.contact, href: "contact" },
    { name: translation.about, href: "about" },
    { name: translation.categories, href: 'categories' },
  ];

  const dropDownLink = [
    { name: translation.setting, href: "setting" },
  ];

  const logout = () => {
    dispatch(logOutUser());
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <TopNav />
      <Navbar 
        dir='ltr' 
        rounded 
        className={`fixed start-0 end-0 z-[1000] bg-opacity-80 py-2 px-4 bg-[#F5F5F7] dark:bg-black shadow-md transition-all duration-300 ${
          isTopNavVisible ? 'top-8' : 'top-0'
        }`}
      >
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <Navbar.Brand as={Link} to="/" className="flex items-center">
            <img src={mode === "dark" ? logoDark : logoLight} className="h-10 mr-3" alt="Logo" />
          </Navbar.Brand>

          <div className="flex items-center gap-1 md:order-2 sm:p-1 sm:mx-1">
          <LanuageButton />
            <button
              onClick={() => dispatch(changeMode(mode === "light" ? "dark" : "light"))}
              className="text-gray-500 ms-3 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm inline-flex items-center mr-2"
            >
              {mode === "dark" ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              )}
            </button>
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-1 ml-2 sm:p-2 xs:ml-4 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <HiX className="w-5 h-5" /> : <HiMenuAlt3 className="w-5 h-5" />}
            </button>
          
          </div>

          <AnimatePresence>
            {((isMobile && isOpen) || !isMobile) && (
              <motion.div
                initial={isMobile ? { opacity: 0, height: 0 } : false}
                animate={isMobile ? { opacity: 1, height: "auto" } : false}
                exit={isMobile ? { opacity: 0, height: 0 } : false}
                transition={{ duration: 0.3 }}
                className="items-center justify-between w-full md:flex md:w-auto md:order-1"
                id="mobile-menu"
              >
                <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
                  {navLink.map((item, index) => (
                    <li className='w-full text-center' key={index}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `block py-2 pl-3 pr-4 flex-1 ${isActive
                            ? "text-white dark:text-orange-100 md:dark:text-orange-500 border-b-2 font-bold border-b-orange-200 bg-orange-700 md:bg-transparent md:text-orange-700"
                            : "text-gray-900 hover:bg-orange-100 md:hover:bg-transparent md:hover:text-orange-700 dark:text-white dark:hover:bg-orange-700 dark:hover:bg-opacity-30 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                          } md:p-0 transition-colors duration-200`
                        }
                        onClick={() => isMobile && setIsOpen(false)}
                      >
                        <span className='text-nowrap'>
                          {item.name}
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Navbar>
    </>
  );
}

export default Navbaar;