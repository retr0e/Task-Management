import React, { useState , useEffect } from "react";
import { Form, useParams, Link } from "react-router-dom";
import Modal from "../components/modal";


export default function Profile({privilege}) {
  const [ profile_info, setProfileInfo] = useState([]);
  
  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const response = await fetch("/api/v1/profile/profile_info");
        const data = await response.json();
        setProfileInfo(data.info);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="hero">
        <div className="modal-box bg-slate-200/75">
          <div className="grid grid-cols-2 gap-x-0 gap-y-2 text-slate-100 ">
            {Object.entries(profile_info).map(([key, value]) => (
              <>
                {key === 'Uprawnienia' ?(
                  <>
                    <p key={'Key: '+key} className="font-bold text-black">{key}</p>
                    <p className="flex"><Stars count={5-value}/></p>
                  </>
                ):(
                  <>
                    <p key={'Key: '+key} className="font-bold text-black">{key}</p>
                    <p key={'Value: '+key} className="text-black">{value}</p>
                  </>
                )}
              </>
            ))}
            <Modal
              btn_Name={"Edit Profile"}
              btn_Style={"btn btn-warning col-span-2"}
              element={<EditProfile />}
              modal_ID={'Edit_Profile'}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const Stars = ({ count }) => {
  const jsxArray = Array.from({ length: count }, (_, index) => (
    <div key={index} className='mask mask-star bg-black w-6 h-6 text-black'></div>
  ));
  return <>{jsxArray}</>;
};

const EditProfile = () => {
  return(
    <div className="grid gap-y-5 p-5">
      <div className="card-bordered border-gray-300/25 p-2">
        <p className="text-center text-slate-100 strokeme2">Change Name</p>
        <ChangeName/>
      </div>
      <div className="card-bordered border-gray-300/25 p-2">
        <p className="text-center text-slate-100 strokeme2">Change Password</p>
        <ChangePassword/>
      </div>
    </div>
  )
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
    <form onSubmit={handleSubmit} className='grid grid-cols-4 join'>
      <input
        type='text'
        placeholder='New Account Name'
        className='input input-bordered col-span-3 join-item'
        id='name'
        onChange={handleChange}
      />
      <button
        disabled={loading}
        className='btn btn-accent join-item'
      >
        {loading ? "Loading..." : "Confirm"}
      </button>
    </form>
  );
}

export function ChangeEmail(){
  return(
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 join'>
      <input
        type='text'
        placeholder='New Email'
        className='border p-3 rounded-lg join-item'
        id='email'
        onChange={handleChange}
      />
      <input
        type='text'
        placeholder='Confirm New Email'
        className='border p-3 rounded-lg join-item'
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
  const handleSubmit = (e) => {};
  const handleChange = (e) => {};
  const loading = false;
  return(
    <form onSubmit={handleSubmit} className='grid grid-cols-4 grid-rows-2 gap-y-2  join'>
    <input
      type='text'
      placeholder='New Password'
      className='input input-bordered col-span-3 join-item'
      id='password'
      onChange={handleChange}
    />
    <div className="row-span-2">
      <button
        disabled={loading}
        className='btn btn-accent w-full h-full join-item'
      >
        {loading ? "Loading..." : "Confirm"}
      </button>
    </div>
    <input
      type='text'
      placeholder='Confirm New Password'
      className='input input-bordered col-span-3 join-item'
      id='password'
      onChange={handleChange}
    />


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
