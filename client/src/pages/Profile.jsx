import React, { useState , useEffect } from "react";
import { Form, useParams, Link } from "react-router-dom";


export default function Profile({ handleLogout }) {
  const [ profile_info, setProfileInfo] = useState([]);

  
  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const response = await fetch("/api/v1/profile/profile_info");
        const data = await response.json();
        setProfileInfo(data.info);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  
  const params = useParams();
  return (
    <>
      <div className='max-w-xs mx-auto'>
        <div className='card card-body bg-slate-300/70'>
          <p className='text-3xl font-semibold text-center text-black'>Profile data</p>
          <hr className="border-t-1 py-2 border-slate-600/75"/>
          <div className='grid grid-cols-2 grid-rows-7 gap-2'>
            <div className='col-span-2 flex gap-2'>

            </div>
            <div className='col-span-2 flex gap-2'>

            </div>

            <button></button>

          </div>
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
    <form onSubmit={handleSubmit} NameName='flex flex-col gap-4 '>
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


export function ChangePassword(){
  return(
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
    <input
      type='text'
      placeholder='New Password'
      className='border p-3 rounded-lg'
      id='password'
      onChange={handleChange}
    />
    <input
      type='text'
      placeholder='Confirm New Email'
      className='border p-3 rounded-lg'
      id='password'
      onChange={handleChange}
    />
    <button
      disabled={loading}
      className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
    >
      {loading ? "Loading..." : "Change Password"}
    </button>
  </form>
  )
}

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
