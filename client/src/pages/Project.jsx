import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Contents = ({ projectData, privilege }) => {
  const { peopleWorking, projectTasks } = projectData;

  return (
    <div className='bg-red-400 '>
      <div className='bg-slate-200 w-auto h-40'>Documentation is empty</div>
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

const DataBar = ({ projectData, privilege }) => {
  const { peopleWorking, projectTasks } = projectData;

  // console.log(projectData);
  return (
    <div className='main card'>
        
          <div className='odd:bg-slate-400 even:bg-slate-300 '>{'Nazwa_Projektu'}</div>
          
            <div className='toolbox-Badge odd:bg-slate-400 even:bg-slate-300 '>{'Priorytet'}</div>
            <div className='toolbox-Badge odd:bg-slate-400 even:bg-slate-300 '>{'Status'}</div>
          
      
      
        <div className='odd:bg-slate-400 even:bg-slate-300  '>

          <details className="dropdown">
            <summary className="m-1 btn">Team {peopleWorking[0]['Nr_zespolu']}</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              {peopleWorking.map((person, index) => (
                <li key={index}>
                  <a>{person['Imie']} {person['Nazwisko']}</a>
                </li>
              ))} 
            </ul>
          </details>
          
          </div>
    </div>
  );
};

const Project = ({ isAuthenticated }) => {
  const [projects, setProject] = useState(null);
  const [whatPrivilege, setPrivilege] = useState(null);
  const [dataLoaded, setDataLoaded] = useState();

  const params = useParams();

  useEffect(() => {
    const checkPrivilege = async () => {
      try {
        const response = await fetch("/api/v1/users/privilege");
        const data = await response.json();

        if (data.success) {
          setPrivilege(data["userPrivilege"]["privilege"]);
        } else {
          setPrivilege(4);
        }
      } catch (error) {
        console.log(error);
      }
    };

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
      await Promise.all([checkPrivilege(), fetchData()]);
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
          <DataBar projectData={projects} privilege={whatPrivilege} />
          <Contents projectData={projects} privilege={whatPrivilege} />
        </>
      ) : (
        <div className='loading-message'>There is no data for the project</div>
      )}
    </div>
  );
};

export default Project;
