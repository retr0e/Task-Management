import { useParams } from "react-router-dom";

export default function Project(){
    const params = useParams();

    return(
        <>
            <div>
                <h1>Profile name</h1>
                project_id {project_id}
            </div>
        </>
    );
}