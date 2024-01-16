import React, { useState } from 'react';
import { Value } from 'sass';



export default function Test({name , mode}) {
  const [text, setText] = useState('');

  const countCharacters = () => {

    return text.length ;
  };

  const handleTextAreaChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className='strokeme2'>
      <form className='' onSubmit={handleSubmit}>
        <label className="form-control">
          <h2 className='text-center font-bold text-lg'>Edit description</h2>
          <hr className='py-2 border-none'/>
          <textarea 
            className="textarea textarea-bordered h-24" 
            placeholder="Bio"
            value={text}
            onChange={handleTextAreaChange}
          ></textarea>
          <div className="label">
            <span className="label-text-alt"></span>
            <span className="label-text-alt strokeme2">
              {countCharacters()}/400
            </span>
          </div>
        </label>
        <button className='btn btn-secondary w-full'>jh</button>
      </form>
    </div>
  );
}








