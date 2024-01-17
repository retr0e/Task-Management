import React, { useState } from 'react';
import { Value } from 'sass';



export default function Test({name , mode}) {
  return <Stars count={6} />;
  
}

const Stars = ({ count }) => {
  const jsxArray = Array.from({ length: count }, (_, index) => (
    <div key={index} className='mask mask-star bg-white w-7 h-7 text-white'>x</div>
  ));

  return <>{jsxArray}</>;
};








