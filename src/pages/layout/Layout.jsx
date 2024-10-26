import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Footer from '../../components/footer/Footer'
import { Navbaar } from './../../components/navbar/Navbar';
import style from './layout.module.css'
import { Toaster } from 'react-hot-toast';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import Chat from '../../components/Chat/Chat';
import MainSlider from '../../components/main-slider/MainSlider';
import Gallery from '../../components/gallery-menu/GalleryMenu';

export default function LayOut() {
  const { language } = useSelector(state => state.lang)
  const { mode } = useSelector(state => state.mode)
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className={` font-['Open_Sans'] ${mode == 'light' ? '' : 'dark'}`}>
        <div dir={language == 'ar' ? 'rtl' : 'ltr'} className={`   dark:bg-slate-900 dark:text-white`} >
          <Navbaar></Navbaar>
          
          <div className={`  ${mode == 'light' ? style.bgImgWhite : style.bgImgDark}`}>
            <div className={` order`}>
              <Outlet></Outlet>
            </div>
          </div>
          {/* {user && <Chat />} */}
          {/* <div className={`  ${mode == 'light' ? style.bgImgWhite : style.bgImgDark}`}> */}
          <Footer></Footer>
        {/* </div> */}
        </div>
      </div>

    </>
  )
}
