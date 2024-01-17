import { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { Add_Task_Form, DesChangeForm } from "./Forms";
import Modal from "../components/modal";

const Contents = ({ projectData, privilege, states }) => {
  const { peopleWorking, projectTasks } = projectData;

  console.log(projectTasks);
  return (
    <div className='bg-base-400 p-3'>
      <div className='flex gap-2 '>
        <div className='card card-body bg-zinc-500/75  w-3/4  h-60'>
          <span className='text-xl font-bold '>Documentation</span>
          <hr className='border-t-1 py-2 ' />
          <div className='overflow-auto'>{projectData["info"]["Opis"]}</div>
        </div>
        <div className='card p-7 bg-zinc-600/75  h-60 '>
          <p className='text-center  font-bold text-xl h-10'>
            Team {peopleWorking[0]["Nr_zespolu"]}
          </p>
          <hr className='border-t-1 py-2 ' />
          <ul className='overflow-hidden hover:overflow-auto snap-y '>
            {peopleWorking.map((padawan) => (
              <li className='snap-start'>
                <p className='text-right'>
                  {padawan["Imie"]} {padawan["Nazwisko"]}{" "}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-2 gap-y-0'>
        {projectTasks.map((task, index) => (
          <li
            key={index}
            className='even:bg-zinc-500/75 odd:bg-zinc-600/75 py-2 px-3 w-1/3 shadow-sm card my-2 h-auto min-w-fit'
          >
            <p className='font-bold text-xl'>{task["Nazwa_zadania"]}</p>

            <span className='text-left '>
              {task["Imie"]} {task["Nazwisko"]}
            </span>
            <hr className='border-t-1 py-2 ' />
            <div className='px-2 py-2 h-48 overflow-hidden hover:overflow-y-scroll '>
              <span className=''>{task["Opis"]}</span>
            </div>

            <div>
              <hr className='border-t-1 py-2 ' />
              <div className='grid grid-cols-4 '>
                <div className='col-span-3 h-3 '>
                  <ChangeStat
                    currentValue={task}
                    states={states}
                    privilege={privilege}
                  />
                </div>
                <div className=''>
                  {privilege <= 2 ? (
                    <Modal
                      modal_ID={task["Nazwa_zadania"]}
                      btn_Name={"Edit Description"}
                      btn_Style={" btn btn-secondary"}
                      element={
                        <DesChangeForm
                          forWhat={"zadanie"}
                          elementId={task["ID"]}
                        />
                      }
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </li>
        ))}
      </div>
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
        <div className='px-2'></div>
      </div>
      {privilege <= 3 ? (
        <>
          <div key='changeStatProject'>
            <ChangeStatProject
              currentValue={projectData["info"]}
              states={states}
              priorities={priorities}
              privilege={privilege}
            />
          </div>
          {privilege <= 2 ? (
            <div className='navbar-end w-1/4 flex gap-2' key='navbarEnd'>
              <Modal
                element={<Add_Task_Form projectId={params["project_id"]} />}
                btn_Name={"Dodaj Zadanie"}
                btn_Style={"btn btn-secondary "}
                modal_ID={"taskform"}
              />
              <Modal
                element={
                  <DesChangeForm
                    forWhat={"project"}
                    elementId={params["project_id"]}
                  />
                }
                btn_Name={"Edit Description"}
                btn_Style={"btn btn-secondary "}
                modal_ID={"decriptionform"}
              />
            </div>
          ) : null}
        </>
      ) : null}
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

const ChangeStat = ({ currentValue, states, privilege }) => {
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
              disabled={privilege > 2 ? true : false}
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
          <button
            className={
              privilege > 2
                ? `join-item btn btn-secondary hidden`
                : `join-item btn btn-secondary`
            }
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

const ChangeStatProject = ({ currentValue, states, priorities, privilege }) => {
  const [formData, setFormData] = useState({});
  const [usedState, setUsedState] = useState(currentValue["Status"]);
  const [usedPriority, setUsedPriority] = useState(currentValue["Priorytet"]);

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
      setFormData({
        ...formData,
        projectId: currentValue["Id"],
        status: e.target.value,
      });
      return;
    } else if (e.target.id === "priorytet") {
      setUsedPriority(e.target.value);
      setFormData({
        ...formData,
        projectId: currentValue["Id"],
        priorytet: e.target.value,
      });
      return;
    }

    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
      projectId: currentValue["Id"],
      status: usedState,
      priorytet: usedPriority,
    });
  };

  useEffect(() => {
    setUsedState(currentValue["Status"]);
    setUsedPriority(currentValue["Priorytet"]);
    setFormData({
      ...formData,
      projectId: currentValue["Id"],
      status: currentValue["Status"],
      priorytet: currentValue["Priorytet"],
    });
  }, []);

  return (
    <div className=''>
      <form onSubmit={handleSubmit} className='gap-3'>
        <div className='join join-horizontal px-1'>
          {states["states"].map((state) => (
            <input
              disabled={privilege > 2 ? true : false}
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
              disabled={privilege > 2 ? true : false}
              id='priorytet'
              key={priorit}
              type='radio'
              name='priorytet'
              className='btn theme-controller join-item '
              aria-label={priorit}
              value={priorit}
              checked={priorit === usedPriority}
              onChange={handleChange}
            />
          ))}
          <button
            className={
              privilege > 2
                ? `join-item btn btn-secondary hidden`
                : `join-item btn btn-secondary`
            }
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default Project;
