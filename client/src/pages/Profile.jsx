import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Profile({ handleLogout }) {
  return (
    <>
      <div className="text-white p-3  h-75 w-full flex justify-center items-center">
        <div className="border-2 rounded-lg p-10">
          Profile options
            <ChangeName />
          {/* <ChangeEmail />
            <ChangePassword /> */}
          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
          <DeleteAccount handleLogout={handleLogout} />
        </div>
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
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
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

export function DeleteAccount({ handleLogout }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/v1/profile/delete_account", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
      <button
        disabled={loading}
        className='bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        onClick={handleLogout}
      >
        {loading ? "Loading..." : "Delete Account"}
      </button>
    </form>
  );
}
