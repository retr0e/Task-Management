import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
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
      const res = await fetch("/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.massage);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Create User Account</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <div className="flex flex-row gap-4">
        <input
          type='text'
          placeholder='Name'
          className='border p-3 rounded-lg w-1/2 order-1'
          id='Name'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Surname'
          className='border p-3 rounded-lg w-1/2 order-2'
          id='surname'
          onChange={handleChange}
        />
      </div>
        <input
          type='text'
          placeholder='Position'
          className='border p-3 rounded-lg order-3'
          id='position'
          onChange={handleChange}
        />

        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg order-4'
          id='username'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='email'
          className='border p-3 rounded-lg order-5'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg order-6'
          id='password'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase order-7 hover:opacity-95 disabled:opacity-80'
        >
          {loading ? "Loading..." : "Create User Account"}
        </button>
      </form>
      {/* <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Create User Account</span>
        </Link>
      </div> */}
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
