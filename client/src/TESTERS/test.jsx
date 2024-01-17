import React, { useState } from 'react';
import { Value } from 'sass';
import { ChangeName } from '../pages/Profile';



export default function Test({name , mode}) {
  return <ChangeName/>;
  
}

const Stars = ({ count }) => {
  const jsxArray = Array.from({ length: count }, (_, index) => (
    <div key={index} className='mask mask-star bg-white w-7 h-7 text-white'>x</div>
  ));
  return <>{jsxArray}</>;
};








