import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DataBar = ({ projectData, privilege }) => {
  console.log(projectData);
  // console.log(projectData["projectTasks"]);

const DataBar = ({projectData}) => {
  const {peopleWorking,projectTasks
  } = projectData;
  console.log('clean task',peopleWorking);
  //console.log(projectData["projectTasks"][0]);
  //console.log('task',projectTasks);
  return (
    <div className='main'>
      <div className='toolbox'>
        <div className='toolbox-Name'>ToolboxName</div>
        <div className='toolbox-Badge bg-[red]'>ToolboxBadge1</div>
        <div className='toolbox-Badge bg-[pink]'>ToolboxBadge2</div>
      </div>
      <div className='toolbox-List text-slate-100'>
        <div className='toolbox-List-Title'>Team</div>
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
  const [projects, setProject] = useState(null);
  const [whatPrivilege, setPrivilege] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

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
      setDataLoaded(true);
    };

    loadData();
  }, [params]);

  return (
    <div className=''>
      {dataLoaded && (
        <DataBar projectData={projects} privilege={whatPrivilege} />
      )}
    </div>
  );
};

export default Project;
