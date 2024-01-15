import React, { useState } from 'react';
import { Value } from 'sass';



export default function Test({name , mode}) {
  return (
    <>
    <div className='card bg-slate-600/70'>
      <form className='p-3 max-w-lg mx-auto' action="">
        <p className='text-3xl text-center font-semibold my-7'>Form Name</p>
      <table className='table'>
        {/*tytuły kolumn*/}
        <tr>
          <th>
            <input type="checkbox" className="toggle" />
          </th>
          <th>Pracownik</th>
          <th>Stanowisko</th>
        </tr>
        {/*Pierwszy rząd*/}
        <tr>
          <td>
            <input type="checkbox" className="toggle" />
          </td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
      </table>
      <button className='btn btn-primary'>Name apply</button>
      </form>
    </div>
      
    </>
  )
}








