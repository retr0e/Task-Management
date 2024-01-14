import React from "react";
import { useEffect, useState } from "react";

//Function for fetching Teams Data
async function fetchDataFromApis() {
  try {
    const prioritiesResponse = await fetch("/api/v1/overall/get_priorities");
    const teamsResponse = await fetch("/api/v1/overall/get_teams");

    if (!prioritiesResponse.ok || !teamsResponse.ok) {
      throw new Error("Failed to fetch data from one or more APIs");
    }

    const prioritiesData = await prioritiesResponse.json();
    const teamsData = await teamsResponse.json();

    return {
      priorities: prioritiesData["priority"],
      teams: teamsData["teams"],
    };
  } catch (error) {
    console.error("Error fetching data from APIs:", error);
    throw error; // You may want to handle the error in the calling code
  }
}

const Add_Project_Form = () => {
  const [formData, setFormData] = useState({});
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.id === "team") {
      setSelectedTeam(e.target.value);
    } else if (e.target.id === "priority") {
      setSelectedPriority(e.target.value);
    }

    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/v1/projects/add_project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
      } else {
        setError(null);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const [teamsData, setTeamsData] = useState([]);
  const [priData, setPriData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataFromApis();
        setTeamsData(data.teams);
        setPriData(data.priorities);
      } catch (error) {
        console.error("Error fetching teams data:", error);
        // Handle the error, show a message, etc.
      }
    };

    fetchData();
  }, []);

  return (
    <div className='main card card-bordered  max-w-xs mx-auto'>
      <div className='card-body'>
        <p className='card-title'>Dodawanie Projektu</p>

        <hr className='py-2' />
        {/* Form-Main */}
        <form onSubmit={handleSubmit}>
          {/* Project-Name */}
          <input
            type='text'
            id='projectName'
            placeholder='ProjectName'
            className='input input-bordered w-full max-w-xs'
            required
            onChange={handleChange}
          />
          <hr className='py-2 border-none' />

          {/* Project-Team-Select */}
          <select
            id='team'
            className='select select-bordered w-full max-w-xs'
            value={selectedTeam}
            onChange={handleChange}
          >
            <option disabled selected>
              Select Team
            </option>
            {teamsData.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
          <hr className='py-2 border-none' />

          {/* Project-Priority-Select */}
          <select
            id='priority'
            className='select select-bordered w-full max-w-xs'
            value={selectedPriority}
            onChange={handleChange}
          >
            <option disabled selected>
              Select Priority
            </option>
            {priData.map((pri) => (
              <option key={pri} value={pri}>
                {pri}
              </option>
            ))}
          </select>
          <hr className='py-2 border-none' />

          {/* Project-Text-Area */}
          <textarea
            id='description'
            className='textarea textarea-bordered w-full max-w-xs'
            placeholder='Decriprion'
            onChange={handleChange}
          />

          <div className='grid grid-cols-2 gap-1'>
            {/* Project-Date-Start */}
            <p>Start Date</p>
            <input
              id='startDate'
              type='date'
              placeholder='Start Date'
              required
              onChange={handleChange}
            />

            {/* Project-Date-End */}
            <p>End date</p>
            <input
              id='endDate'
              type='date'
              placeholder='End Date'
              required
              onChange={handleChange}
            />
            <br />
          </div>

          {/* Project-Submit */}
          <button
            type='submit'
            className='btn-orange  w-full max-w-xs text-slate-100'
          >
            {loading ? "Loading..." : "Dodaj Projekt"}
          </button>
        </form>
      </div>
    </div>
  );
};

export const Add_Task_Form = () => {
  return (
    <div className='main card card-bordered  max-w-xs mx-auto'>
      <div className='card-body'>
        <p className='card-title'>Dodawanie Zadania</p>

        <hr className='py-2' />
        {/*<======================Form-Main=====================>*/}
        <form onSubmit={console.log("XD")}>
          {/*<======================Task-Name=====================>*/}
          <input
            type='text'
            placeholder='Project Task'
            className='input input-bordered w-full max-w-xs'
            required
            onChange={console.log("XD")}
          />
          <hr className='py-2 border-none' />

          {/*<==================Task-Person-Select================>*/}
          <select className='select select-bordered w-full max-w-xs'>
            <option disabled selected>
              Select Person
            </option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
          <hr className='py-2 border-none' />

          {/*<===================Task-Description=================>*/}
          <textarea
            className='textarea textarea-bordered w-full max-w-xs'
            placeholder='Decriprion'
          />

          <div className='grid grid-cols-2 gap-1'>
            {/*<===================Task-Start-Date==================>*/}
            <p>Start Date</p>
            <input
              type='date'
              placeholder='Start Date'
              required
              onChange={console.log("XD")}
            />
          </div>
          <hr className='py-2 border-none' />

          {/*<===================Project-Submit===================>*/}
          <button
            type='submit'
            className='btn-orange  w-full max-w-xs text-slate-100'
          >
            Dodaj Zadanie
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add_Project_Form;
