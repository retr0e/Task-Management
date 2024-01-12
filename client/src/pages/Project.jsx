import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DataBar = () => {
  return (
    <div className='toolbox'>
      <div className='toolbox-Name'>ToolboxName</div>
      <div className='toolbox-Badge'>ToolboxBadge1</div>
      <div className='toolbox-Badge'>ToolboxBadge2</div>
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
  let project = 2;

  return (
    <div className=''>
      <DataBar />
    </div>
  );
};
export default Project;
