export default function Taskbar(){
    return(
        <footer className=" bg-color5 shadow-md h-12 self-end">
            <div className="text-color1">
                <ul>
                    <li className="toolbox-Element">Add Project</li>
                    <li className="toolbox-Element">Show Teams</li>
                    <li className="hidden sm:inline text-slate-700 hover:underline">Add Task</li>
                </ul>
            </div>

        </footer>
    );
}