import { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { Add_Task_Form } from "./Forms";
import Modal from "../components/modal";

const Contents = ({ projectData, privilege }) => {
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
            {/* <p>{task["ID"]}</p> */}
            <span className='col-span-1 '>{task["Imie"]}</span>
            <span className='col-span-1'>{task["Nazwisko"]}</span>
            <span className='toolbox-Badge bg-green-400 float-left'>
              {task["Status"]}
            </span>
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
      <div>
        <ChangeStat/>
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

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/v1/projects/get_project/${params["project_id"]}`
        );
        const projectData = await response.json();
        setProject(projectData);
      } catch (error) {
        console.log(error);
      }
    };

    const loadData = async () => {
      await Promise.all([privilege, fetchData()]);
      if (
        projects != null &&
        projects["projectTasks"].length > 0 &&
        projects["peopleWorking"].length > 0
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
          <Contents projectData={projects} privilege={privilege} />
        </>
      ) : (
        <div className='loading-message skeleton'>There is no data for the project</div>
      )}
    </div>
  );
};

const ChangeStat = ({currentValue}) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

  const handleChange = (e) => {
    if (e.target.id === "status") {
      setSelectedStatus(e.target.value);
    } else if (e.target.id === "priority") {
      setSelectedPriority(e.target.value);
    }

    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return(
    <div>
      <form className='gap-3'>
          <div class="join join-horizontal">
            <input type="radio" name="status" class="btn theme-controller join-item" aria-label="Nowy" value="Nowy" />
            <input type="radio" name="status" class="btn theme-controller join-item" aria-label="W trakcie" value="W trakcie"/>
            <input type="radio" name="status" class="btn theme-controller join-item" aria-label="Zakończony" value="Zakończony"/>
          </div>
        
         
          <div class="join join-horizontal px-2">
            <input type="radio" name="priority" class="btn theme-controller join-item" aria-label="Pilny" value="Pilny" />
            <input type="radio" name="priority" class="btn theme-controller join-item" aria-label="Normalny" value="Normalny"/>
            <input type="radio" name="priority" class="btn theme-controller join-item" aria-label="Wstrzymany" value="Wstrzymany"/>
          </div>
         <button className='btn btn-warning'>Apply</button>
      </form>
    </div>
  );
};

export default Project;
