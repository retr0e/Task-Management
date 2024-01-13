import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePriv } from "../ProtectedRoutes";
import Component from "../TESTERS/placeHolder";


const DataBar = () => {
  return (
    <div className="main">
      <div className='toolbox'>
        <div className='toolbox-Name'>ToolboxName</div>
        <div className='toolbox-Badge bg-[red]'>ToolboxBadge1</div>
        <div className='toolbox-Badge bg-[pink]'>ToolboxBadge2</div>
      </div>
      <div className='toolbox-List text-slate-100'>
        
        <ul>
          {Array.from({ length: 20 }).map((_, index) => (
            <li key={index}>Jan Paweł II</li>
          ))}
      </ul>
      </div>
    </div>
  );
};

const Project = ({ isAuthenticated }) => {
  const params = useParams();

  const [projects, setProject] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/v1/projects/get_project/${params["project_id"]}`
      );
      const projectData = await response.json();
      setProject(projectData);
    };
    fetchData();
  }, []);

  console.log(usePriv['privilage'])

  return (
    <div className=''>
      <DataBar />
      <Component/>
    </div>
  );
};
export default Project;
