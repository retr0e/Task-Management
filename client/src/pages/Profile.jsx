import React, { useState, useEffect } from "react";
import { Form, useParams, Link } from "react-router-dom";
import Modal from "../components/modal";

export default function Profile({ privilege }) {
  const [profile_info, setProfileInfo] = useState([]);

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
      <div className='hero'>
        <div className='modal-box bg-zinc-500/75'>
          <div className='grid grid-cols-2 gap-x-0 gap-y-2 '>
            {Object.entries(profile_info).map(([key, value]) => (
              <>
                {key === "Uprawnienia" ? (
                  <>
                    <p key={"Key: " + key} className='font-bold '>
                      {key}
                    </p>
                    <p className='flex'>
                      <Stars count={5 - value} />
                    </p>
                  </>
                ) : (
                  <>
                    <p key={"Key: " + key} className='font-bold '>
                      {key}
                    </p>
                    <p key={"Value: " + key} className=''>
                      {value}
                    </p>
                  </>
                )}
              </>
            ))}
            <Modal
              btn_Name={"Edit Profile"}
              btn_Style={"btn btn-secondary col-span-2"}
              element={<EditProfileSelf />}
              modal_ID={"Edit_Profile"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const Stars = ({ count }) => {
  const jsxArray = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className='mask mask-star bg-black w-6 h-6 text-black'
    ></div>
  ));
  return <>{jsxArray}</>;
};

const EditProfileSelf = () => {
  return (
    <div className='grid gap-y-5 p-5'>
      <div className='card-bordered  p-2'>
        <h2 className='text-center font-bold text-lg'>Change Name</h2>
        <hr className='py-2 border-none' />
        <ChangeName />
      </div>
      <div className='card-bordered  p-2'>
        <h2 className='text-center font-bold text-lg'>Change Password</h2>
        <hr className='py-2 border-none' />
        <ChangePassword />
      </div>
    </div>
  );
};

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
      <button disabled={loading} className='btn btn-accent join-item'>
        {loading ? "Loading..." : "Confirm"}
      </button>
    </form>
  );
}

export function ChangePassword() {
  const [formData, setFormData] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/v1/profile/change_password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const loading = false;
  return (
    <form
      onSubmit={handleSubmit}
      className='grid grid-cols-4 grid-rows-2 gap-y-2  join'
    >
      <input
        type='text'
        placeholder='New Password'
        className='input input-bordered col-span-3 join-item'
        id='password'
        onChange={handleChange}
      />
      <div className='row-span-2'>
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
        id='passwordConfirmation'
        onChange={handleChange}
      />
    </form>
  );
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
