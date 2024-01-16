import { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { Add_Task_Form, DesChangeForm } from "./Forms";
import Modal from "../components/modal";

const Contents = ({ projectData, privilege, states }) => {
  const { peopleWorking, projectTasks } = projectData;
  //console.log(peopleWorking)
  return (
    <div className='bg-base-400 p-3   gap-2'>
      <div className="flex gap-2">
      <div className='card card-body bg-slate-200/80 text-slate-600 w-3/4  h-auto'>
        <span className="text-xl font-bold text-slate-900/70">Documentation</span>
        <hr className="border-t-1 py-2 border-slate-600/75"/>
        {projectData["info"]["Opis"]}
      </div>
      <div className="card card-body bg-slate-200/80 text-slate-600  h-auto">
        <p className="text-center text-slate-900 font-bold text-xl">Team {peopleWorking[0]['Nr_zespolu']}</p>
        <hr className="border-t-1 py-2 border-slate-600/75"/>
        <ul >
          {peopleWorking.map((padawan) =>(
            <li><p className="text-right">{padawan['Imie']} {padawan['Nazwisko']} </p></li>
          ))}
        </ul>
      </div>
      </div>
      <ul className='flex  gap-2  '>
        {projectTasks.map((task, index) => (
          <li
            key={index}
            className='even:bg-slate-200/75 odd:bg-slate-300/75 text-black py-2 px-3 w-1/3 shadow-sm rounded my-2 '
          >
            <p className='font-bold text-xl'>{task["Nazwa_zadania"]}</p>
            
              <span className='text-right '>{task["Imie"]} {task["Nazwisko"]}</span>
              <hr className="border-t-1 py-2 border-slate-600/75"/>
              <div className="px-2 py-2 h-48">
                <span className="">{task["Opis"]}</span>
              </div>
              

            <div>
            <hr className="border-t-1 py-2 border-slate-600/75"/>
            <div className="grid grid-cols-3">  
            <div className="colspan-2">
              <ChangeStat currentValue={task} states={states} />
              </div>   
            <div className=""></div>      
                
                <Modal 
                  modal_ID={task["Nazwa_zadania"]} 
                  btn_Name={'Edit Description'} 
                  btn_Style={'item-join btn btn-secondary'}
                  element={<DesChangeForm/>}/>
              
                </div>
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
      <div className='navbar-end w-1/4 join'>
        <Modal
          element={<Add_Task_Form projectId={params["project_id"]} />}
          btn_Name={"Dodaj Zadanie"}
          btn_Style={"btn btn-secondary join-item"}
          modal_ID={'taskform'}
        />
        <Modal
          element={<DesChangeForm/>}
          btn_Name={"Edit Description"}
          btn_Style={"btn btn-secondary join-item"}
          modal_ID={'decriptionform'}
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
