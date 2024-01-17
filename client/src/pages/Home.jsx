import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Navigate, redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Modal, { AccessBlock } from "../components/modal";
import Add_Project_Form from "./Forms";

// Użycie funkcji w komponencie Card
const Card = ({ project, privilege }) => {
  const {
    ID,
    Id_zespolu,
    Opis,
    PriorytetColor,
    PriorytetyName,
    ProjectName,
    StatusColor,
    StatusName,
    Data_koniec,
    Data_start,
  } = project;

  return (
    <div className=''>
      <Link to={`/projects/${ID}`}>
        <div className='p-1'>
          <div className='card w-96 bg-gray-500/70 shadow-xl '>
            <div className='card-body'>
              <h2 className='card-title'>{ProjectName}</h2>
              <p className=''>{`Przypisany zespół: ${Id_zespolu}`}</p>
              <p className=''>{`Start: ${Data_start}`}</p>
              <p className=''>{`Przewidywany koniec: ${Data_koniec}`}</p>
              <div className='card-actions '>
                <span
                  className={`badge badge-lg bg-${StatusColor} text-white strokeme2 `}
                >
                  {StatusName}
                </span>
                <span
                  className={`badge badge-lg bg-${PriorytetColor} strokeme2`}
                >
                  {PriorytetyName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const ListElement = ({ project }) => {
  const { ID, Id_zespolu, ProjectName, StatusName } = project;
  return (
    <Link to={`/projects/${ID}`}>
      <li>
        <div className='bg-zinc-500/75 hover:bg-zinc-600/75  py-2 px-3  shadow-sm rounded my-2 '>
          <div className=''>
            <table>
              <tr className='flex flex-wrap gap-2'>
                <td className='font-semibold'>{ProjectName}</td>
                <td className=''>{Id_zespolu}</td>
                <td className=''>{StatusName}</td>
              </tr>
            </table>
          </div>
        </div>
      </li>
    </Link>
  );
};

export const AddProject = () => {
  return (
    <div className='p-1'>
      <div className='card w-96 skeleton shadow-xl '>
        <div className='card-body'>
          <h2 className='card-title   badge badge-lg w-72 h-6'></h2>
          <p className=' badge badge-lg w-24 h-6'></p>
          <p className='badge badge-lg w-48 h-6'></p>
          <p className='badge badge-lg w-48 h-6'></p>
          <span className='absolute font-bold text-4xl text-base-400 m-auto  top-20 left-0 right-0'>
            NEW
          </span>
          <div className='card-actions '>
            <span className={`badge badge-lg  text-gray-700 w-24`}></span>
            <span className={`badge badge-lg  text-gray-700 w-24`}> </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  // console.log(projects);
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
    <div className='centerMe hero '>
      <div className='modal-box bg-zinc-700/75 '>
        <h1 className='text-center text-bold text-2xl'>All Projects List</h1>
        <hr className='border-t-1 py-2 ' />

        <ul className='grid grid-cols-1 gap-1'>
          {projects.map((project) => (
            <ListElement key={project.ID} project={project} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const Home = ({ acLvl }) => {
  console.log(acLvl);
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);

  // console.log(projects);
  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const projectResponse = await fetch("/api/v1/projects/get_projects");
        const userTeamsResponse = await fetch("/api/v1/users/team");

        const userData = await userTeamsResponse.json();
        const projectData = await projectResponse.json();
        console.log(projectData);
        setProjects(projectData.result);
        setTeams(userData["teams"]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-wrap '>
      {/* Displays modal only when access level is 2 or lower */}
      {acLvl <= 2 ? (
        <>
          <Modal
            element={<Add_Project_Form />}
            btn_Name={<AddProject />}
            modal_ID={"add project"}
          />

          {projects.map((project) => (
            <Card key={project.ID} project={project} />
          ))}
        </>
      ) : acLvl === 4 ? (
        projects.map((project) => <Card key={project.ID} project={project} />)
      ) : (
        <>
          {projects
            .filter(
              (project) =>
                !(project.StatusName === "Zakończony" && acLvl > 2) &&
                teams.includes(project.Id_zespolu)
            )
            .map((project) => (
              <Card key={project.ID} project={project} />
            ))}
        </>
      )}
    </div>
  );
};

export default Home;
