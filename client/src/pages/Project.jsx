import { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { Add_Task_Form } from "./Forms";
import Modal from "../components/modal";

const Contents = ({ projectData, privilege, states }) => {
  const { peopleWorking, projectTasks } = projectData;

  console.log(projectData);

  return (
    <div className='bg-base-400 p-3 '>
      <div className='card card-body bg-slate-200 text-slate-600 w-full h-40'>
        <span>Documentation</span>
        <hr className=""/>
        {projectData["info"]["Opis"]}
      </div>
      <ul className='flex gap-1 '>
        {projectTasks.map((task, index) => (
          <li
            key={index}
            className='even:bg-slate-200/75 odd:bg-slate-300/75 text-black py-2 px-3  shadow-sm rounded my-2 '
          >
            <span className='font-bold w-'>{task["Opis_Zadania"]}</span>
            <div className=" ">
              <span className='text-left '>{task["Imie"]}</span>
              <span className='text-left'>{task["Nazwisko"]}</span>
            </div>

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
    <div className='navbar bg-slate-500/70'>
      <div className='navbar-start w-1/4'>
        <div className='font-bold text-xl px-4'>
          
          {projectData["info"]["Projekt"]}
        </div>
        <div className='px-2'>
          
        </div>
      </div>
      <div>
        <ChangeStatProject
          currentValue={projectData["info"]}
          states={states}
          priorities={priorities}
        />
      </div>
      <div className='navbar-end w-1/4'>
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
          <button className='btn btn-secondary join-item'>Apply</button>
        </div>

        
      </form>
    </div>
  );
};

const ChangeStatProject = ({ currentValue, states, priorities }) => {
  const [formData, setFormData] = useState({});
  const [usedState, setUsedState] = useState({});
  const [usedPriority, setUsedPriority] = useState({});

  console.log(states);

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
  console.log(states);
  return (
    <div className="">
      <form onSubmit={handleSubmit} className='gap-3'>
        <div className='join join-horizontal px-1'>
          {states["states"].map((state) => (
            <input
              id='status'
              key={state}
              type='radio'
              name='status'
              className='btn  group-last:border-r-slate-300 theme-controller join-item'
              aria-label={state}
              value={state}
              checked={state === usedState}
              onChange={handleChange}
            />
          ))}
        </div>
        <div className='join join-horizontal px-1'>
          {priorities["priority"].map((priorit) => (
            <input
              id='priorytet'
              key={priorit}
              type='radio'
              name='priority'
              className='btn theme-controller join-item '
              aria-label={priorit}
              value={priorit}
              checked={priorit === usedPriority}
              onChange={handleChange}
            />
          ))}
          <button className='join-item btn btn-secondary'>Apply</button>
        </div>

        
      </form>
    </div>
  );
};

export default Project;
