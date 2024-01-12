import { useParams } from "react-router-dom";

const Project = ({ isAuthenticated }) => {
  console.log(isAuthenticated);
  const params = useParams();
  window.alert(params.project_id);

  return <div></div>;
};
export default Project;
