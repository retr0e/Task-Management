import { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { Add_Task_Form } from "./Forms";
import Modal from "../components/modal";

const Contents = ({ projectData, privilege, states }) => {
  const { peopleWorking, projectTasks } = projectData;

  return (
    <div className='bg-red-400 '>
      <div className='bg-slate-200 w-auto h-40'>
        {projectData["info"]["Opis"]}
      </div>
      <ul className='list-inside'>
        {projectTasks.map((task, index) => (
          <li
            key={index}
            className='even:bg-slate-500 odd:bg-slate-400 text-black py-2 px-3 grid grid-cols-6 gap-2 shadow-sm rounded '
          >
            <span className='font-bold'>{task["Opis_Zadania"]}</span>
            <span className='col-span-1 '>{task["Imie"]}</span>
            <span className='col-span-1'>{task["Nazwisko"]}</span>
            <span className='toolbox-Badge bg-green-400 float-left'>
              {task["Status"]}
            </span>
            <div>
              <ChangeStat currentValue={task} states={states} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const DataBar = ({ projectData, privilege, params, states, priorities }) => {
  const { peopleWorking, projectTasks } = projectData;
  // console.log(projectData);

  return (
    <div className='navbar bg-slate-800'>
      <div className='navbar-start'>
        <div className='font-bold text-xl'>
          {" "}
          {projectData["info"]["Projekt"]}{" "}
        </div>
        <div className='px-2'>
          <div className='badge badge-lg bg-red-400 text-black'>
            {projectData["info"]["Status"]}
          </div>
        </div>
        <div>
          <div className='badge badge-lg bg-red-400 text-black'>
            {projectData["info"]["Priorytet"]}
          </div>
        </div>
      </div>
      <div>
        <ChangeStatProject
          currentValue={projectData["info"]}
          states={states}
          priorities={priorities}
        />
      </div>
      <div className='navbar-end'>
        <Modal
          element={<Add_Task_Form projectId={params["project_id"]} />}
          btn_Name={"Dodaj Zadanie"}
          btn_Style={"btn-orange text-black"}
        />
      </div>
    </div>
  );
};

const Project = ({ isAuthenticated, privilege }) => {
  const [projects, setProject] = useState(null);
  const [dataLoaded, setDataLoaded] = useState();
  const [selectedStatus, setSelectedStatus] = useState({});
  const [selectedPriority, setSelectedPriority] = useState({});

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/v1/projects/get_project/${params["project_id"]}`
        );
        const states = await fetch("/api/v1/overall/get_states");
        const priorities = await fetch("/api/v1/overall/get_priorities");

        const projectData = await response.json();
        const stateResponse = await states.json();
        const prioritiesResponse = await priorities.json();

        setSelectedPriority(prioritiesResponse);
        setSelectedStatus(stateResponse);
        setProject(projectData);
      } catch (error) {
        console.log(error);
      }
    };

    const loadData = async () => {
      await Promise.all([privilege, fetchData()]);
      if (
        projects != null &&
        ((projects["projectTasks"] && projects["projectTasks"].length > 0) ||
          (projects["peopleWorking"] && projects["peopleWorking"].length > 0) ||
          projects["info"])
      ) {
        setDataLoaded(true);
      } else {
        setDataLoaded(false);
      }
    };

    loadData();
  }, [dataLoaded, params]);

  return (
    <div className=''>
      {dataLoaded ? (
        <>
          <DataBar
            projectData={projects}
            privilege={privilege}
            params={params}
            states={selectedStatus}
            priorities={selectedPriority}
          />
          <Contents
            projectData={projects}
            privilege={privilege}
            states={selectedStatus}
          />
        </>
      ) : (
        <div className='loading-message skeleton'>
          There is no data for the project
        </div>
      )}
    </div>
  );
};

const ChangeStat = ({ currentValue, states }) => {
  const [formData, setFormData] = useState({});
  const [usedState, setUsedState] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/v1/task/${currentValue["ID"]}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "status") {
      setUsedState(e.target.value);
    }

    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
      taskId: currentValue["ID"],
    });
  };

  useEffect(() => {
    setUsedState(currentValue["Status"]);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} className='gap-3'>
        <div className='join join-horizontal'>
          {states["states"].map((state) => (
            <input
              id='status'
              key={state}
              type='radio'
              name='status'
              className='btn theme-controller join-item'
              aria-label={state}
              value={state}
              checked={state === usedState}
              onChange={handleChange}
            />
          ))}
        </div>

        <button className='btn btn-warning'>Apply</button>
      </form>
    </div>
  );
};

const ChangeStatProject = ({ currentValue, states, priorities }) => {
  const [formData, setFormData] = useState({});
  const [usedState, setUsedState] = useState({});
  const [usedPriority, setUsedPriority] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/v1/projects/get_project/${currentValue["Id"]}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "status") {
      setUsedState(e.target.value);
    } else if (e.target.id === "priorytet") {
      setUsedPriority(e.target.value);
    }

    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
      projectId: currentValue["Id"],
    });
  };

  useEffect(() => {
    setUsedState(currentValue["Status"]);
    setUsedPriority(currentValue["Priorytet"]);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} className='gap-3'>
        <div className='join join-horizontal'>
          {states["states"].map((state) => (
            <input
              id='status'
              key={state}
              type='radio'
              name='status'
              className='btn theme-controller join-item'
              aria-label={state}
              value={state}
              checked={state === usedState}
              onChange={handleChange}
            />
          ))}
        </div>

        <div className='join join-horizontal'>
          {priorities["priority"].map((priorit) => (
            <input
              id='priorytet'
              key={priorit}
              type='radio'
              name='priority'
              className='btn theme-controller join-item'
              aria-label={priorit}
              value={priorit}
              checked={priorit === usedPriority}
              onChange={handleChange}
            />
          ))}
        </div>

        <button className='btn btn-warning'>Apply</button>
      </form>
    </div>
  );
};

export default Project;
