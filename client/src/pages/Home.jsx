import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Navigate, redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Modal from "../components/modal";
import Add_Project_Form from "./Forms";

function Badge(priorytet) {
  /* For automatic color and text */
  let status_Color;
  let status_Name = "Halted";

  switch (priorytet) {
    case 1:
      status_Color = "bg-red-400";
      //status_Name = "Critical";
      break;
    case 2:
      status_Color = "bg-green-400";
      //status_Name = "Normal";
      break;
    case 3:
      status_Color = "bg-yellow-400";
      //status_Name = "On Hold";
      break;
    default:
      status_Color = "bg-gray-400";
      break;
  }

  return [status_Color];
}

// Użycie funkcji w komponencie Card
function Card({ project }) {
  //console.log(project);
  const {
    ID,
    Nazwa_Projektu,
    Nr_zespolu,
    Id_priorytetu,
    Priorytet,
    Id_statusu,
    Status,
    Data_start,
    Data_koniec,
  } = project;

  const [status_Color] = Badge(Id_statusu);
  const [priority_Color] = Badge(Id_priorytetu);

  return(
  <Link to={`/project/${ID}`}>
    <div className="p-1">
      <div className="card w-96 shadow-xl bg-base-300">
      <div className="card-body">
        <h2 className="card-title">{Nazwa_Projektu}</h2>
        <p className=''>{`Nr_zespolu: ${Nr_zespolu}`}</p>
        <p className=''>{`Data_start: ${Data_start}`}</p>
        <p className=''>{`Data_start: ${Data_koniec}`}</p>
        <div className="card-actions ">
          <span className={`badge badge-lg ${priority_Color} text-gray-700`}>
            {Status}
          </span>
          <span className={`badge badge-lg ${priority_Color} text-gray-700`}>
            {Priorytet}
          </span>
        </div>
      </div>
      </div>
    </div>
  </Link>
  );
}

export const AddProject = () => {
  return(
    
    <div className="p-1">
      <div className="card w-96 skeleton shadow-xl ">
      <div className="card-body">
        <h2 className="card-title   badge badge-lg w-72 h-6"></h2>
        <p className=' badge badge-lg w-24 h-6'></p>
        <p className='badge badge-lg w-48 h-6'></p>
        <p className='badge badge-lg w-48 h-6'></p>
        <span className='absolute font-bold text-4xl text-slate-400 m-auto  top-20 left-0 right-0'>NEW</span>
        <div className="card-actions ">
          <span className={`badge badge-lg  text-gray-700 w-24`}></span>
          <span className={`badge badge-lg  text-gray-700 w-24`}> </span>
        </div>
      </div>
      </div>
    </div>
  
  );
}

function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const response = await fetch("/api/v1/projects/get_projects");
        const data = await response.json();
        setProjects(data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-wrap '>
      {projects.map((project) => (
        <Card key={project.ID} project={project} />
      ))}
      <Modal element={<Add_Project_Form/>} btn_Name={<AddProject/>} />

    </div>
  );
}

export default Home;
