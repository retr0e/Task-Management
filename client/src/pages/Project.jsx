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

const DataBar = ({ projectData, privilege, params }) => {
  const { peopleWorking, projectTasks } = projectData;

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

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/v1/projects/get_project/${params["project_id"]}`
        );
        const statesAndPriorities = await fetch("/api/v1/overall/get_states");

        const projectData = await response.json();
        const stateResponse = await statesAndPriorities.json();

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
  // const [selectedPriority, setSelectedPriority] = useState("");

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

  // console.log(states["states"]);
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

        {/* <div class='join join-horizontal px-2'>
          <input
            type='radio'
            name='priority'
            class='btn theme-controller join-item'
            aria-label='Pilny'
            value='Pilny'
          />
          <input
            type='radio'
            name='priority'
            class='btn theme-controller join-item'
            aria-label='Normalny'
            value='Normalny'
          />
          <input
            type='radio'
            name='priority'
            class='btn theme-controller join-item'
            aria-label='Wstrzymany'
            value='Wstrzymany'
          />
        </div> */}
        <button className='btn btn-warning'>Apply</button>
      </form>
    </div>
  );
};

export default Project;
