import { Link } from "react-router-dom";
import AddingProjects from "./AddingProjects";


function ProjectBar(){
    return(
        <>  
            <div className="bg-color2">
                <div className="font-bold text-sm sm:text-xl flex flex-wrap text-slate-100">Project name</div>
            </div>
        </>
    )
}

export default function Projects(){
    return(<AddingProjects/>)
}