import React from "react";
import { Link } from "react-router-dom";


export default function About() {
  return (
    <div className="hero min-h-screen bg-meme">
      <div className="hero-content text-center strokeme2 bg-gray-800 card bg-opacity-50">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
          We're thrilled to have you here at Task Manager, your go-to destination 
          for efficient task management and productivity! 
          </p>
          <Link to='/sign-in'>
              
                <span className='btn btn-primary'>Sign In</span>
              
            </Link>
        </div>
      </div>
    </div>
  );
}
