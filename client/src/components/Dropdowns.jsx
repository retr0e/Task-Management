

// Funcjia przujmuje 2 argumenty 
// - nazwa dropdowna
// - lista elementow
function Dropdowns1(dropdown_Name,list){
    return(
    <div className="relative border-solid rounded-xl border-2 border-sky-500 w-56">
    <details className="dropdown p-1">
        <summary className="m-1 btn">dropdown_Name</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
    </details>
    </div>

    )
}

export default function Dropdowns(){
    return(
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <Dropdowns1 />
        </div>
    )
}