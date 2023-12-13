import React from "react";

export default function Profile() {
  return (
    <div>Profile</div>
  );
}

export function ChangeName(){

  return(
  <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
    <input
      type='text'
      placeholder='New Account Name'
      className='border p-3 rounded-lg'
      id='email'
      onChange={handleChange}
    />
    <button
      disabled={loading}
      className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
    >
      {loading ? "Loading..." : "Change Account Name"}
    </button>
  </form>
  )
}

export function ChangeEmail(){
  return(
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
      <input
        type='text'
        placeholder='New Email'
        className='border p-3 rounded-lg'
        id='email'
        onChange={handleChange}
      />
      <input
        type='text'
        placeholder='Confirm New Email'
        className='border p-3 rounded-lg'
        id='email'
        onChange={handleChange}
      />
      <button
        disabled={loading}
        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
      >
        {loading ? "Loading..." : "Change Email"}
      </button>
    </form>
  )

}

export function DeleteAccount(){
  return(
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
      <h1>Do you wanna confirm deleting your account?</h1>
      <button
        disabled={loading}
        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
      >
        {loading ? "Loading..." : "Confirm"}
      </button>
    </form>
  )
}
