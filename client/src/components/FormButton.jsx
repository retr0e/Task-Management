import { IoIosAddCircle } from "react-icons/io";

 function button_Project(){
    return (
        <div className={"inline-block absolute bottom-0 right-0 rounded-full text-7xl font-semibold text-gray-700 mr-2 mb-2`"}>
            <IoIosAddCircle className='text-orange'/>
        </div>
    );
}

export default function project_Form(){
    return(
        <>  <div className="bg-black bg-opacity-25 absolute top-0 bottom-0 left-0 right-0">
            <div className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "}>
                <div className={"max-w-sm rounded overflow-hidden bg-color2 shadow-lg border-2"}>
                    Formularz
                </div>
            </div>
            </div>
        </>
    );
}