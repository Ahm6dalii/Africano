import React from 'react'
import img1 from "../../assets/media/download1.png"
import img2 from "../../assets/media/download2.png"
import img3 from "../../assets/media/download3.png"
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux';

import cheif from "../../assets/affricanoImg/chief.png"
import { Helmet } from 'react-helmet-async'

///     A luxury restaurant with A rare taste you can’t find anywhere in the red sea.


export default function About() {
  const { translation } = useSelector(state => state.lang)
  const pVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  }

  return (
    <>
      <Helmet>
        <title>About</title>
        <meta name="description" content="About Page" />
      </Helmet>
      <div className="pt-28 container mx-auto px-4 py-2 rounded-3xl max-w-7xl ">
        <h3 className="flex items-center gap-2 justify-center text-2xl sm:text-3xl  md:text-5xl font-extrabold  text-orange-500 dark:text-orange-200 mb-8 text-center">
          <i className="fa-brands fa-font-awesome"></i>
          {translation.aboutUs}
        </h3>
        <motion.div className="grid  grid-cols-1 md:grid-cols-2 gap-8"
          variants={pVariants} initial="hidden" animate="visible"
          transition={{ delay: .7, duration: 1, ease: "easeOut" }}>
          <div>
            <motion.div variants={pVariants} initial="hidden" animate="visible"
              transition={{ delay: 1.3, duration: 1, ease: "easeOut" }}>
              <p style={{ "fontFamily": " Caveat" }} className=" mt-3 text-red-500 text-3xl ">
                {translation.ourFuture}
              </p>
              <p style={{ "fontFamily": " Oswald" }} className="text-3xl">
                {translation.ourFutureAd}
              </p>
            </motion.div>
         </div>

        </motion.div>
    
        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4 place-content-stretch'
        >
          <div className='pb-2'>
            <img src={img1} alt="Restaurant view" className="pb-6 block mx-auto" />
            <p className='text-2xl pb-3 text-center' style={{ "fontFamily": " Oswald" }}>
              {translation.premiumServices}
            </p>
            <p>
              {translation.premiumServicesAd}
            </p>

          </div>
          <div className='pb-2'>
            <img src={img2} alt="Restaurant view" className="pb-6 block mx-auto" />
            <p className='text-2xl pb-3 text-center' style={{ "fontFamily": " Oswald" }}>
              {translation.freeDelivery}
            </p>
            <p>
              {translation.freeDeliveryAd}
            </p>

          </div>
          <div className='pb-2'>
            <img src={img3} alt="Restaurant view" className="pb-6 block mx-auto " />
            <p className='text-2xl pb-3 text-center' style={{ "fontFamily": " Oswald" }}>
              {translation.PrimeLocation}
            </p>
            <p>
              {translation.PrimeLocationAd}
            </p>

          </div>
        </div>
        <div>






        </div>



      </div>





    </>
  )
}
