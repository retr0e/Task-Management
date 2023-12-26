import { IoIosAddCircle } from "react-icons/io";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

 function button_Project(){
    return (
        <div className={"inline-block absolute bottom-0 right-0 rounded-full text-7xl font-semibold text-gray-700 mr-2 mb-2`"}>
            <IoIosAddCircle className='text-orange'/>
        </div>
    );
}


export default function project_Form(){
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

      };

      const handleSubmit = async (e) => {
    
        
      };

    return(
        <>  
            <div className="bg-black bg-opacity-25 absolute top-0 bottom-0 left-0 right-0">
                <div className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "}>
                    <div className={"max-w-sm rounded overflow-hidden bg-color2 shadow-lg border-2"}>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
                            <input
                                type='text'
                                placeholder='Project Name'
                                className='border p-3 rounded-lg'
                                id='project_Name'
                                onChange={handleChange}
                            />
                            <input
                                type='password'
                                placeholder='password'
                                className='border p-3 rounded-lg'
                                id='password'
                                onChange={handleChange}
                            />
                            <button
                                disabled={loading}
                                className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                            >
                                {loading ? "Loading..." : "Sign In"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}