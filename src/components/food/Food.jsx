import React, { useState } from 'react';
import { useSelector } from "react-redux";
import Card from "../../components/card/Card";
import Card2 from '../card/Card2';

export default function Food({data}) {
    const {language } = useSelector(state => state.lang)


  return (
    <>
    <div className="grid grid-cols-1 pb-6  sm:grid-cols-2  md:grid-cols-3  xl:grid-cols-4 gap-4">
      {data?.map((item,index)=> 
      <Card2 key={index} id={item._id} lang={language} desc={item?.description } name={item?.name} amount={item?.amount} imaUrl={item?.image}></Card2>)}      
    </div>
    </>
  )
}
