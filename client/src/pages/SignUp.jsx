import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.id.includes("privilegeLevel")) {
      setFormData({
        ...formData,
        privilegeLevel: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
  const handleStar = (e) => {
    console.log(e.target.value);
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
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      // navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  // console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Create User Account
      </h1>
      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 gap-4 grid-rows-8'
      >
        <div className='flex gap-4'>
          <input
            type='text'
            placeholder='Name'
            className='input input-bordered w-full max-w-xs'
            id='name'
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='Surname'
            className='input input-bordered w-full max-w-xs'
            id='surname'
            onChange={handleChange}
          />
        </div>
        <input
          type='text'
          placeholder='PESEL'
          className='input input-bordered w-full max-w-base'
          id='pesel'
          onChange={handleChange}
        />

        <div className='flex gap-4'>
          <input
            type='text'
            placeholder='Position'
            className='input input-bordered w-1/2 max-w-base'
            id='position'
            onChange={handleChange}
          />
          <div className='input input-bordered w-1/2 max-w-base '>
            <span className='text-center px-2'>Access Level</span>
            <div className='rating py-3'>
              <input
                id='privilegeLevel4'
                type='radio'
                name='rating-1'
                className='mask mask-star'
                value={4}
                onChange={handleChange}
              />
              <input
                id='privilegeLevel3'
                type='radio'
                name='rating-1'
                className='mask mask-star'
                value={3}
                onChange={handleChange}
              />
              <input
                id='privilegeLevel2'
                type='radio'
                name='rating-1'
                className='mask mask-star'
                value={2}
                onChange={handleChange}
              />
              <input
                id='privilegeLevel1'
                type='radio'
                name='rating-1'
                className='mask mask-star'
                value={1}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <input
          type='text'
          placeholder='username'
          className='input input-bordered w-full max-w-base'
          id='username'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='email'
          className='input input-bordered w-full max-w-base'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='input input-bordered w-full max-w-base'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='btn btn-accent'
        >
          {loading ? "Loading..." : "Create User Account"}
        </button>
      </form>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
