import React, { useEffect, useState } from "react";
import { Navigate, redirect } from "react-router-dom";
import { Link } from "react-router-dom";

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
  console.log(project);
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

  return (
    <Link to={`/project/${ID}`}>
      <div className='p-1'>
        <div className='card w-96 bg-color2 shadow-xl '>
          <div className='card-body'>
            <h2 className='card-title'>{Nazwa_Projektu}</h2>
            <p className=''>{`Przypisany zespół: ${Nr_zespolu}`}</p>
            <p className=''>{`Start: ${Data_start}`}</p>
            <p className=''>{`Przewidywany koniec: ${Data_koniec}`}</p>
            <div className='card-actions '>
              <span
                className={`badge badge-lg ${priority_Color} text-gray-700`}
              >
                {Status}
              </span>
              <span
                className={`badge badge-lg ${priority_Color} text-gray-700`}
              >
                {Priorytet}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
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
    </div>
  );
}

export default Home;
