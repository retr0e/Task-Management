import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddingProjects(){
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

    const handleSubmit = async (e) =>{}

    return(
        <>  
            <div className="p-5 grid place-items-center w-full bg-color1">
                <form onSubmit={handleSubmit} className="bg-color2 w-6/12">
                    <input
                        type="text"
                        placeholder="Project Name"
                        className="border p-3 rounded-lg w-full"
                        id = "Project_Name"
                        onChange={handleChange}
                    />
                    <div className="p-3 rounded-lg bg-orange">Dropdown</div>
            

                </form>
            </div>
        </>
    );
}