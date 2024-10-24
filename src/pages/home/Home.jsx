import { useSelector } from "react-redux";
import "../../Styles/HomeStyle.css";
import React, { useRef, useState } from "react";
import About from "./../about/About";
import Contact from "./../cotact/Contact";
import { Helmet } from "react-helmet-async";
import MainSlider from "../../components/main-slider/MainSlider";
import Gallery from "../../components/gallery-menu/GalleryMenu";

export default function Home() {
  const { translation } = useSelector((state) => state.lang);

  return (
    <>
      <Helmet>
        <title>Africano</title>
        <meta name="description" content="About Page" />
      </Helmet>
      <div className="">
        {/* Main Content */}
        <main className=" text-center">
        <MainSlider/>
        <Gallery/>

          {/* about */}
          <About />

          {/* contact */}

          <Contact />
        </main>
      </div>
    </>
  );
}
