import React, { useState } from 'react';

export default function Dropdowns({ options, onOptionChange }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onOptionChange(value); // Pass the selected option to the parent
  };

  return (
    <>
      {/* Component: Plain base basic select */}
      <div className="relative my-6 md:w-60">
        <select
          id="id-01"
          name="id-01"
          required
          value={selectedOption}
          onChange={handleOptionChange}
          className="peer relative h-10 w-full appearance-none border-b border-slate-200 bg-white px-4 text-sm text-slate-500 outline-none transition-all autofill:bg-white focus:border-emerald-500 focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        >
          <option value="" disabled selected></option>
          <option value={'tester'}>tester</option>
          <option value={'tester'}>tester</option>
          {/* {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))} */}
        </select>

        <label
          htmlFor="id-01"
          className="pointer-events-none absolute top-2.5 left-2 z-[1] px-2 text-sm text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
        >
          Select an option
        </label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute top-2.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-labelledby="title-01 description-01"
          role="graphics-symbol"
        >
          {/* ... (same as your existing SVG) */}
        </svg>
      </div>
      {/* End Plain base basic select */}
    </>
  );
}
