import { useParams } from "react-router-dom";

const Project = () =>{
    const params = useParams();
    window.alert(params.id)
}
export default Project;