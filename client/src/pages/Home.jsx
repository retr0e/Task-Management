import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function Badge(priorytet) {
  /* For automatic color and text */
  let status_Color;
  let status_Name = "Halted";

  switch (priorytet) {
    case "Pilny":
      status_Color = "bg-red-400";
      status_Name = "Critical";
      break;
    case "Normalny":
      status_Color = "bg-green-400";
      status_Name = "Normal";
      break;
    case "Wstrzymany":
      status_Color = "bg-yellow-400";
      status_Name = "On Hold";
      break;
    default:
      status_Color = "bg-gray-400";
      break;
  }

  return [status_Color, status_Name];
}

// Użycie funkcji w komponencie Card
function Card({ project }) {
  const {
    ID,
    Nazwa_Projektu,
    Nr_zespolu,
    Priorytet,
    Status,
    Data_start,
    Data_koniec,
  } = project;

  const [status_Color, status_Name] = Badge(Priorytet);

  return (
    <div
      className='max-w-sm rounded overflow-hidden shadow-lg border-2'
      key={ID}
      onClick={<Navigate to='/project/${key}'/>}
    >
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{Nazwa_Projektu}</div>
        <p className='text-gray-700 text-base'>{`Nr_zespolu: ${Nr_zespolu}`}</p>
        <p className='text-gray-700 text-base'>{`Status: ${Status}`}</p>
        <p className='text-gray-700 text-base'>{`Data_start: ${Data_start}`}</p>
        <p className='text-gray-700 text-base'>
          {`Data_koniec: ${Data_koniec}`}
        </p>
      </div>
      <div className='px-6 pt-4 pb-2'>
        <span
          className={`inline-block ${status_Color} rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}
        >
          {status_Name}
        </span>
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
    <div className='flex flex-wrap'>
      {projects.map((project) => (
        <Card key={project.ID} project={project} />
      ))}
    </div>
  );
}

export default Home;
