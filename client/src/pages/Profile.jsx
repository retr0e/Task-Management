import React, { useState } from "react";

export default function Profile() {
  return (
    <>
      <div>Profile</div>
      <div>
        Profile options
        <ChangeName />
        {/* <ChangeEmail />
        <ChangePassword />
        <DeleteAccount /> */}
      </div>
    </>
  );
}

export function ChangeName() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/v1/profile/change_name", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newName: name }),
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
      <input
        type='text'
        placeholder='New Account Name'
        className='border p-3 rounded-lg'
        id='name'
        onChange={handleChange}
      />
      <button
        disabled={loading}
        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
      >
        {loading ? "Loading..." : "Change Account Name"}
      </button>
    </form>
  );
}

// export function ChangeEmail(){
//   return(
//     <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
//       <input
//         type='text'
//         placeholder='New Email'
//         className='border p-3 rounded-lg'
//         id='email'
//         onChange={handleChange}
//       />
//       <input
//         type='text'
//         placeholder='Confirm New Email'
//         className='border p-3 rounded-lg'
//         id='email'
//         onChange={handleChange}
//       />
//       <button
//         disabled={loading}
//         className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
//       >
//         {loading ? "Loading..." : "Change Email"}
//       </button>
//     </form>
//   )

// }
// export function ChangePassword(){
//   return(
//     <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
//     <input
//       type='text'
//       placeholder='New Password'
//       className='border p-3 rounded-lg'
//       id='password'
//       onChange={handleChange}
//     />
//     <input
//       type='text'
//       placeholder='Confirm New Email'
//       className='border p-3 rounded-lg'
//       id='password'
//       onChange={handleChange}
//     />
//     <button
//       disabled={loading}
//       className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
//     >
//       {loading ? "Loading..." : "Change Password"}
//     </button>
//   </form>
//   )
// }

// export function DeleteAccount(){
//   return(
//     <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
//       <h1>Do you wanna confirm deleting your account?</h1>
//       <button
//         disabled={loading}
//         className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
//       >
//         {loading ? "Loading..." : "Confirm"}
//       </button>
//     </form>
//   )
// }
