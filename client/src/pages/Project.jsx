import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";




const DataBar = ({projectData}) => {
  const {peopleWorking,projectTasks
  } = projectData;
  console.log('clean task',peopleWorking);
  //console.log(projectData["projectTasks"][0]);
  //console.log('task',projectTasks);
  return (
    <div className="main">
      <div className='toolbox'>
        <div className='toolbox-Name'>ToolboxName</div>
        <div className='toolbox-Badge bg-[red]'>ToolboxBadge1</div>
        <div className='toolbox-Badge bg-[pink]'>ToolboxBadge2</div>
      </div>
      <div className='toolbox-List text-slate-100'>
        <div className='toolbox-List-Title'>Team</div>
        <ul>
          
      </ul>
      </div>
    </div>
  );
};

const Project = ({ isAuthenticated }) => {
  const [projects, setProject] = useState([]);
  const [whatPrivilege, setPrivilege] = useState();

  const params = useParams();

  useEffect(() => {
    const checkPrivilege = async () => {
      const response = await fetch("/api/v1/users/privilege", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.success) {
        setPrivilege(data["userPrivilege"]["privilege"]);
      } else {
        setPrivilege(4);
      }
    };

    checkPrivilege();

    const fetchData = async () => {
      const response = await fetch(
        `/api/v1/projects/get_project/${params["project_id"]}`
      );
      const projectData = await response.json();
      setProject(projectData);
    };
    fetchData();
  }, []);

  return (
    <div className=''>
      <DataBar projectData = {projects}/>
      
    </div>
  );
};

export default Project;
