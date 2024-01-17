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
    <div className='main'>
      <h2 className='text-center font-bold text-lg'>Add New Project</h2>
      <hr className='py-2 border-none' />

      {/* Form-Main */}
      <form onSubmit={handleSubmit} className='grid grid-cols-6 gap-2'>
        {/* Project-Name */}
        <input
          type='text'
          id='projectName'
          placeholder='ProjectName'
          className='input input-bordered col-span-6'
          required
          onChange={handleChange}
        />

        {/* Project-Team-Select */}
        <select
          id='team'
          className='select select-bordered col-span-3'
          value={selectedTeam}
          onChange={handleChange}
          required
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

        {/* Project-Priority-Select */}
        <select
          id='priority'
          className='select select-bordered col-span-3'
          value={selectedPriority}
          onChange={handleChange}
          required
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

        {/* Project-Text-Area */}
        <textarea
          id='description'
          className='textarea textarea-bordered col-span-6'
          placeholder='Decriprion'
          onChange={handleChange}
        />

        {/* Project-Date-Start */}
        <p className='text-right py-3'>Start Date</p>
        <input
          id='startDate'
          type='date'
          className='input input-bordered col-span-2'
          max={maxDate}
          value={minDate}
          placeholder='Start Date'
          required
          onChange={handleMinDateChange}
        />

        {/* Project-Date-End */}
        <p className='text-right py-3'>End date</p>
        <input
          id='endDate'
          className='input input-bordered col-span-2'
          type='date'
          placeholder='End Date'
          min={minDate}
          value={maxDate}
          required
          onChange={handleMaxDateChange}
        />

        {/* Project-Submit */}
        <button type='submit' className='btn btn-accent  col-span-6'>
          {loading ? "Loading..." : "Dodaj Projekt"}
        </button>
      </form>
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
    <div className=''>
      <div>
        <h2 className='text-center font-bold text-lg'>Add New Task</h2>
        <hr className='py-2 border-none' />
        {/*<======================Form-Main=====================>*/}
        <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-2'>
          {/*<======================Task-Name=====================>*/}
          <input
            id='taskName'
            type='text'
            placeholder='Project Task'
            className='input input-bordered col-span-2'
            required
            onChange={handleChange}
          />

          {/*<==================Task-Person-Select================>*/}
          <select
            id='person'
            className='select select-bordered col-span-2'
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

          {/*<===================Task-Description=================>*/}

          <textarea
            id='description'
            className='textarea textarea-bordered col-span-2'
            placeholder='Decriprion'
            onChange={handleChange}
          />

          {/*<===================Task-Start-Date==================>*/}
          <p className='py-2'>Start Date</p>
          <input
            type='date'
            id='startDate'
            className='input input-bordered'
            placeholder='Start Date'
            required
            onChange={handleChange}
          />

          {/*<===================Project-Submit===================>*/}
          <button
            type='submit'
            className='btn btn-accent col-span-2 text-slate-100'
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

        if (data["teams"].length == 0) {
          data["teams"].push(1);
        } else {
          data["teams"].push(data["teams"][data["teams"].length - 1] + 1);
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
      <div className=''>
        <form className='' action='' onSubmit={handleSubmit}>
          <p className='text-3xl text-center font-semibold my-7'>
            Manage Teams
          </p>
          <div className='grid grid-cols-2'>
            <select
              id='person'
              className='select select-bordered col-span-2'
              onChange={handleSelect}
              required
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
          </div>
          <hr className='py-2 border-none' />

          <table className='table '>
            {/*Kolumny tytulowe*/}
            <thead>
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
            </thead>
            <tbody className='overflow-y-scroll'>
              {/*Rzedy*/}
              {Object.values(personData).map((person) => (
                <tr key={person.Id} className='odd:bg-gray-500/20'>
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
            </tbody>
          </table>
          <button className='btn btn-accent w-full'>Confirn Changes</button>
        </form>
      </div>
    </>
  );
};

export const EditUsers = () => {
  const [personData, setPersonData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInitialData = async () => {
    try {
      const data = await fetchDataFromApis(0);
      const employees = data["employess"].map((person) => ({
        ...person,
        isActive: isActive,
      }));
      setPersonData(employees);

      const objSend = {
        persons: employees,
        action: "All Accounts", // You might need to adjust this value
      };
      const res = await fetch("/api/v1/profile/delete_account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objSend),
      });

      const responseData = await res.json();
      setPersonData(responseData["people"]);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const objSend = {
      persons: personData,
      action: e.target.value,
    };

    const res = await fetch("/api/v1/profile/delete_account", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objSend),
    });

    const data = await res.json();
    setPersonData(data["people"]);

    console.log(personData);
    try {
      setLoading(true);
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
          ? { ...person, isActive: !person.isActive }
          : person
      )
    );
  };

  const handleSelect = async (e) => {
    const objSend = {
      persons: personData,
      action: e.target.value,
    };
    const res = await fetch("/api/v1/profile/delete_account", {
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
      <div className=''>
        <form className='' action='' onSubmit={handleSubmit}>
          <p className='text-3xl text-center font-semibold my-7'>
            Manage Accounts
          </p>

          <table className='table '>
            {/*Kolumny tytulowe*/}
            <thead>
              <tr>
                <th>Pracownik</th>
                <th>Stanowisko</th>
                <th>
                  <p>Account Off/On</p>
                </th>
              </tr>
            </thead>
            <tbody className='overflow-y-scroll'>
              {/* Rzedy */}
              {Object.values(personData).map((person) => {
                // Check the selected option

                return (
                  <tr key={person.Id} className='odd:bg-gray-500/20'>
                    <td>
                      {person["Imie"]} {person["Nazwisko"]}
                    </td>
                    <td>{person["Stanowisko"]}</td>
                    <td>
                      <input
                        id={person["Id"]}
                        type='checkbox'
                        className='toggle'
                        onChange={handleChange}
                        checked={person.isActive || false}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className='btn btn-accent w-full'>Confirm changes</button>
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
    <div className=''>
      <div className=''>
        {forWhat === "project" ? (
          <div className=''>
            <h2 className='text-center font-bold text-lg'>Edit description</h2>
            <hr className='py-2 border-none' />
            <form
              action='teams'
              onSubmit={handleTeamSubmit}
              className='grid grid-cols-4 join'
            >
              <select
                id='team'
                onChange={handleTeamChange}
                className='select select-bordered join-item col-span-3'
              >
                <option value='' disabled>
                  Choose team
                </option>
                {teamsData.map((team) => (
                  <option key={team} value={team}>
                    {`Team ${team}`}
                  </option>
                ))}
              </select>
              <button className='btn btn-accent join-item'>apply</button>
            </form>
          </div>
        ) : (
          <>
            <h2 className='text-center font-bold text-lg'>Edit description</h2>
            <hr className='py-2 border-none' />
            <form
              action='slave'
              onSubmit={handlePersonSubmit}
              className='grid grid-cols-4 join'
            >
              <select
                name=''
                id='person'
                onChange={handlePersonChange}
                className='select select-bordered join-item col-span-3'
              >
                <option value='choose' disabled>
                  choose Person
                </option>
                {personData.map((person) => (
                  <option key={person} value={person}>
                    {person}
                  </option>
                ))}
              </select>
              <button className='btn btn-accent join-item'>apply</button>
            </form>
          </>
        )}

        <hr className='p-3 border-none' />
      </div>

      <form className='' onSubmit={handleSubmit}>
        <label className='form-control'>
          <h2 className='text-center font-bold text-lg'>Edit description</h2>
          <hr className='py-2 border-none' />
          <textarea
            className='textarea textarea-bordered h-24'
            placeholder='New Description'
            value={text}
            onChange={handleTextAreaChange}
          ></textarea>
          <div className='label'>
            <span className='label-text-alt'></span>
            <span className='label-text-alt '>{countCharacters()}/400</span>
          </div>
        </label>
        <button className='btn btn-accent w-full'>Apply</button>
      </form>
    </div>
  );
};

export default Add_Project_Form;
