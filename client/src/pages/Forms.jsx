import React from "react";
import { useEffect, useState } from "react";

//Function for fetching Teams Data
async function fetchDataFromApis(project) {
  try {
    const prioritiesResponse = await fetch("/api/v1/overall/get_priorities");
    const teamsResponse = await fetch("/api/v1/overall/get_teams");
    const employessResponse = await fetch("/api/v1/overall/get_all_employees");
    const personsResponse = await fetch("/api/v1/overall/get_employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectId: project }),
    });

    if (!prioritiesResponse.ok || !teamsResponse.ok || !personsResponse.ok) {
      throw new Error("Failed to fetch data from one or more APIs");
    }

    const prioritiesData = await prioritiesResponse.json();
    const teamsData = await teamsResponse.json();
    const personData = await personsResponse.json();
    const employessData = await employessResponse.json();

    return {
      priorities: prioritiesData["priority"],
      teams: teamsData["teams"],
      persons: personData["persons"],
      employess: employessData["employees"],
    };
  } catch (error) {
    console.error("Error fetching data from APIs:", error);
    throw error;
  }
}

const Add_Project_Form = () => {
  const [formData, setFormData] = useState({});
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const handleMinDateChange = (e) => {
    setMinDate(e.target.value);
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleMaxDateChange = (e) => {
    setMaxDate(e.target.value);
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
      team: e.target.id == "team" ? e.target.value : selectedTeam,
      priority: e.target.id == "priority" ? e.target.value : selectedPriority,
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
        const data = await fetchDataFromApis(0);
        data.teams.unshift(0);
        setTeamsData(data.teams);
        data.priorities.pop();
        setPriData(data.priorities);

        setSelectedTeam(data.teams[0]);
        setSelectedPriority(data.priorities[0]);
      } catch (error) {
        console.error("Error fetching teams data:", error);
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
                {team == 0 ? "Nieprzypisany" : `Team ${team}`}
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
              max={maxDate}
              value={minDate}
              placeholder='Start Date'
              required
              onChange={handleMinDateChange}
            />

            {/* Project-Date-End */}
            <p>End date</p>
            <input
              id='endDate'
              type='date'
              placeholder='End Date'
              min={minDate}
              value={maxDate}
              required
              onChange={handleMaxDateChange}
            />
            <br />
          </div>

          {/* Project-Submit */}
          <button
            type='submit'
            className='btn btn-secondary  w-full max-w-xs text-slate-100'
          >
            {loading ? "Loading..." : "Dodaj Projekt"}
          </button>
        </form>
      </div>
    </div>
  );
};

export const Add_Task_Form = ({ projectId }) => {
  const [formData, setFormData] = useState({});
  const [selectedPerson, setSelectedPerson] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.id === "person") {
      setSelectedPerson(e.target.value);
    }

    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
      person: selectedPerson,
      projectId: projectId,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/v1/task/${projectId}`, {
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

  const [personData, setPersonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataFromApis(projectId);
        setPersonData(data.persons);
      } catch (error) {
        console.error("Error fetching teams data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='main card card-bordered  max-w-xs mx-auto'>
      <div className='card-body'>
        <p className='card-title'>Dodawanie Zadania</p>

        <hr className='py-2' />
        {/*<======================Form-Main=====================>*/}
        <form onSubmit={handleSubmit}>
          {/*<======================Task-Name=====================>*/}
          <input
            id='taskName'
            type='text'
            placeholder='Project Task'
            className='input input-bordered w-full max-w-xs'
            required
            onChange={handleChange}
          />
          <hr className='py-2 border-none' />

          {/*<==================Task-Person-Select================>*/}
          <select
            id='person'
            className='select select-bordered w-full max-w-xs'
            onChange={handleChange}
          >
            <option disabled selected>
              Select Person
            </option>
            {personData.map((person) => (
              <option key={person} value={person}>
                {person}
              </option>
            ))}
          </select>
          <hr className='py-2 border-none' />

          {/*<===================Task-Description=================>*/}
          <div>
            <textarea
              id='description'
              className='textarea textarea-bordered w-full max-w-xs'
              placeholder='Decriprion'
              onChange={handleChange}
            />
          </div>
          <div className='grid grid-cols-2 gap-1 '>
            {/*<===================Task-Start-Date==================>*/}
            <p cla>Start Date</p>
            <input
              type='date'
              id='startDate'
              placeholder='Start Date'
              required
              onChange={handleChange}
            />
          </div>
          <hr className='py-2 border-none' />

          {/*<===================Project-Submit===================>*/}
          <button
            type='submit'
            className='btn btn-secondary  w-full max-w-xs text-slate-100'
          >
            Dodaj Zadanie
          </button>
        </form>
      </div>
    </div>
  );
};

export const Team_Form_X = () => {
  const [personData, setPersonData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState();
  const [allChecked, setAllChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataFromApis(0);
        setPersonData(data["employess"]);
        data["teams"].push(data["teams"][data["teams"].length - 1] + 1);
        if (data["teams"].includes(0)) {
          data["teams"].shift();
        }
        setTeamData(data["teams"]);
      } catch (error) {
        console.error("Error fetching teams data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setPersonData((prevData) =>
      prevData.map((person) => ({ ...person, isChecked: allChecked }))
    );
  }, [allChecked]);

  // useEffect(() => {}, [selectedTeam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // const selected = personData.filter((person) => person.isChecked);

      const peopleForSave = {
        people: personData,
        teamId: selectedTeam,
      };

      const res = await fetch("/api/v1/team/add_to_team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(peopleForSave),
      });

      const data = await res.json();
      setPersonData(data["people"]);

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

  const handleChange = (e) => {
    const updatedId = e.target.id;
    setPersonData((prevData) =>
      prevData.map((person) =>
        person.Id == updatedId
          ? { ...person, isChecked: !person.isChecked }
          : person
      )
    );
  };

  const handleChangeAll = (e) => {
    setAllChecked(!allChecked);
  };

  const handleSelect = async (e) => {
    setSelectedTeam(e.target.value);

    const objSend = {
      persons: personData,
      teamId: e.target.value,
    };
    const res = await fetch("/api/v1/team/check_presence", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objSend),
    });

    const data = await res.json();

    setPersonData(data["people"]);
  };

  return (
    <>
      <div className='card'>
        <form
          className='p-3 max-w-lg mx-auto'
          action=''
          onSubmit={handleSubmit}
        >
          <p className='text-3xl text-center font-semibold my-7'>Form Name</p>

          <select
            id='person'
            className='select select-bordered w-full max-w-xs'
            onChange={handleSelect}
          >
            <option disabled selected>
              Select Team
            </option>
            {teamData.map((team, index) => (
              <option key={team} value={team}>
                {index === teamData.length - 1
                  ? `New Team ${team}`
                  : `Team ${team}`}
              </option>
            ))}
          </select>
          <hr className='py-2 border-none' />

          <table className='table '>
            {/*Kolumny tytulowe*/}
            <tr>
              <th>
                <input
                  type='checkbox'
                  className='toggle'
                  onChange={handleChangeAll}
                  checked={allChecked}
                />
              </th>
              <th>Pracownik</th>
              <th>Stanowisko</th>
            </tr>
            {/*Rzedy*/}
            {Object.values(personData).map((person) => (
              <tr key={person.Id} className='even:bg-gray-500/20'>
                <td>
                  <input
                    id={person["Id"]}
                    type='checkbox'
                    className='toggle'
                    onChange={handleChange}
                    checked={person.isChecked || false}
                  />
                </td>
                <td>
                  {person["Imie"]} {person["Nazwisko"]}
                </td>
                <td>{person["Stanowisko"]}</td>
              </tr>
            ))}
          </table>
          <button className='btn btn-primary w-full'>Name apply</button>
        </form>
      </div>
    </>
  );
};

export const DesChangeForm = ({ forWhat, elementId }) => {
  const [text, setText] = useState("");
  const [personData, setPersonData] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState();
  const [selectedTeam, setSelectedTeam] = useState();
  const [teamsData, setTeamsData] = useState([]);
  const [rawPersons, setRawPersons] = useState();

  const countCharacters = () => {
    return text.length;
  };

  const handleTextAreaChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (forWhat === "project") {
      await fetch(`/api/v1/projects/${elementId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, elementId }),
      });
    } else {
      await fetch(`/api/v1/task/${elementId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, elementId }),
      });
    }
  };

  const handlePersonSubmit = async (e) => {
    e.preventDefault();

    let data;

    for (let i = 0; i < rawPersons.length; i++) {
      if (rawPersons[i].includes(selectedPerson)) {
        data = rawPersons[i];
      }
    }

    await fetch(`/api/v1/task/executor/${elementId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, elementId }),
    });
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();

    await fetch(`/api/v1/projects/get_project/${elementId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedTeam, elementId }),
    });
  };

  const handlePersonChange = async (e) => {
    setSelectedPerson(e.target.value);
  };

  const handleTeamChange = async (e) => {
    setSelectedTeam(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesData = await fetchDataFromApis(elementId);
        const correctedPersons = employeesData["persons"].map((person) => {
          const arrName = person.split(" ");
          arrName.pop();
          arrName.pop();
          return arrName.join(" ");
        });

        setSelectedTeam(employeesData["teams"][0]);
        setTeamsData(employeesData.teams);
        setRawPersons(employeesData["persons"]);
        setSelectedPerson(employeesData["persons"][0]);
        setPersonData(correctedPersons);
      } catch (error) {
        console.error("Error fetching teams data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='strokeme2'>
      <div className=''>
        <form action='teams' onSubmit={handleTeamSubmit}>
          <select id='team' onChange={handleTeamChange}>
            <option value='tak' disabled>
              Choose team
            </option>
            {teamsData.map((team) => (
              <option key={team} value={team}>
                {`Team ${team}`}
              </option>
            ))}
          </select>
          <button className='btn btn-accent'>apply</button>
        </form>
        <hr className='p-3 border-none' />

        <form action='slave' onSubmit={handlePersonSubmit}>
          <select name='' id='person' onChange={handlePersonChange}>
            <option value='choose' disabled>
              choose Person
            </option>
            {personData.map((person) => (
              <option key={person} value={person}>
                {person}
              </option>
            ))}
          </select>
          <button className='btn btn-accent'>apply</button>
        </form>
      </div>

      <form className='hidden' onSubmit={handleSubmit}>
        <label className='form-control'>
          <h2 className='text-center font-bold text-lg'>Edit description</h2>
          <hr className='py-2 border-none' />
          <textarea
            className='textarea textarea-bordered h-24'
            placeholder='Bio'
            value={text}
            onChange={handleTextAreaChange}
          ></textarea>
          <div className='label'>
            <span className='label-text-alt'></span>
            <span className='label-text-alt strokeme2'>
              {countCharacters()}/400
            </span>
          </div>
        </label>
        <button className='btn btn-secondary w-full'>jh</button>
      </form>
    </div>
  );
};

export default Add_Project_Form;
