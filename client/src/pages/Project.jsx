import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Add_Task_Form } from "./Forms";
import Modal from "../components/modal";

const Contents = ({ projectData, privilege }) => {
  const { peopleWorking, projectTasks } = projectData;

  return (
    <div>Hello i'm content</div>
  );
};

const DataBar = ({ projectData, privilege, params }) => {
  const { peopleWorking, projectTasks } = projectData;

  // console.log(projectData);
  return (
    <div className='navbar bg-slate-800'>
      <div className='navbar-start'>
        <div className='font-bold text-xl'> {"Project Name"} </div>
        <div className='px-2'>
          <div className='badge badge-lg bg-red-400 text-black'>Status</div>
        </div>
        <div>
          <div className='badge badge-lg bg-red-400 text-black'>priorytet</div>
        </div>
      </div>
      <div className='navbar-center'>
        <Modal
          element={<Add_Task_Form projectId={params["project_id"]} />}
          btn_Name={"Dodaj Zadanie"}
          btn_Style={"btn-orange text-black"}
        />
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
          <DataBar
            projectData={projects}
            privilege={whatPrivilege}
            params={params}
          />
          <Contents projectData={projects} privilege={whatPrivilege} />
        </>
      ) : (
        <div className='loading-message'>There is no data for the project</div>
      )}
    </div>
  );
};

export default Project;
