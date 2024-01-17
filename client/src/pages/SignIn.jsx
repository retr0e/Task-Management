import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn({ onLogin }) {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/v1/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      onLogin();
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  
  return (
    <div className='p-3 max-w-xs mx-auto'>
        <div className='grid grid-cols-1 max-w-xs'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
          <input
            type='text'
            placeholder='email'
            className='input input-bordered w-full max-w-xs'
            id='email'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='password'
            className='input input-bordered w-full max-w-xs'
            id='password'
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className='btn-orange  w-full max-w-xs text-slate-100'
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
          {/* <div className='flex gap-2 mt-5'>
          <p>Dont have an account?</p>
          <Link to={"/sign-up"}>
            <span className=''>Ask administrator for account</span>
          </Link>
        </div>   */}
        {error && <p className='text-red-500 mt-5 '>{error}</p>}
        </div>
    </div>
  );
}
