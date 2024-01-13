import React  from "react";
import { useState } from "react";

//Function for fetching Teams Data

const Add_Project_Form = () =>{

    fetchTeamsData = async () => {
        try {
          const response = await fetch("/api/v1/overall/get_teams");
          const data = await response.json();
          return data.teams; // Corrected variable name
        } catch (error) {
          console.error("Error fetching priority data:", error);
          return [];
        }
      };

    const [formData, setFormData] = useState({});
    const [selectedValue, setSelectedValue] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    };
    
    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
      };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const res = await fetch("/api/v1/projects/add_project", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
          setError(data.massage);
          setLoading(false);
          return;
        }
        setLoading(false);
        setError(null);
        
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    return(
        <div className='main card card-bordered  max-w-xs mx-auto'>
            <div className='card-body'>
                <p className='card-title'>Dodawanie Projektu</p>
                
                <hr className="py-2"/>
                {/*<======================Form-Main=====================>*/}
                <form onSubmit={handleSubmit}>
                
                {/*<====================Project-Name====================>*/}
                    <input
                        type='text'
                        placeholder='ProjectName'
                        className='input input-bordered w-full max-w-xs'
                        required
                        onChange={handleChange}
                    />
                    <hr className='py-2 border-none'/>

                {/*<================Project-Team-Select=================>*/}
                    <select 
                        id="TeamSelect" 
                        className="select select-bordered w-full max-w-xs"
                        value={selectedValue}
                        onChange={handleSelectChange}
                        >
                        <option disabled selected>Select Team</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                    </select>
                    <hr className='py-2 border-none'/>

                {/*<==============Project-Priority-Select===============>*/}
                    <select 
                        id="PrioritySelect"
                        className="select select-bordered w-full max-w-xs"
                        value={selectedValue}
                        onChange={handleSelectChange}
                        >
                        <option disabled selected>Select Priority</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                    </select>
                    <hr className='py-2 border-none'/>

                {/*<=================Project-Text-Area==================>*/}
                    <textarea 
                        className="textarea textarea-bordered w-full max-w-xs" 
                        placeholder="Decriprion"
                    />

                <div className='grid grid-cols-2 gap-1'>

                {/*<=================Project-Date-Start=================>*/}
                    <p>Start Date</p>
                    <input
                        type='date'
                        placeholder='Start Date'
                        required
                        onChange={handleChange}
                    />

                {/*<==================Project-Date-End==================>*/}
                    <p>End date</p>
                    <input
                        type='date'
                        placeholder='End Date'
                        
                        required
                        onChange={handleChange}
                    />
                    <br />
                </div>

                {/*<===================Project-Submit===================>*/}
                    <button 
                        type='submit' 
                        className="btn-orange  w-full max-w-xs text-slate-100"
                    >
                        {loading ? "Loading..." : "Dodaj Projekt"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export const Add_Task_Form = () =>{
    return(
        <div className='main card card-bordered  max-w-xs mx-auto'>
            <div className='card-body'>
                <p className='card-title'>Dodawanie Zadania</p>
                
                <hr className="py-2"/>
                {/*<======================Form-Main=====================>*/}
                <form onSubmit={console.log('XD')}>
                
                {/*<======================Task-Name=====================>*/}
                    <input
                        type='text'
                        placeholder='Project Task'
                        className='input input-bordered w-full max-w-xs'
                        required
                        onChange={console.log('XD')}
                    />
                    <hr className='py-2 border-none'/>

                {/*<==================Task-Person-Select================>*/}
                    <select className="select select-bordered w-full max-w-xs">
                        <option disabled selected>Select Person</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                    </select>
                    <hr className='py-2 border-none'/>



                {/*<===================Task-Description=================>*/}
                    <textarea 
                        className="textarea textarea-bordered w-full max-w-xs" 
                        placeholder="Decriprion"
                    />

                <div className='grid grid-cols-2 gap-1'>              
                {/*<===================Task-Start-Date==================>*/}
                    <p>Start Date</p>
                    <input
                        type='date'
                        placeholder='Start Date'
                        required
                        onChange={console.log('XD')}
                    />
                </div>
                <hr className='py-2 border-none'/>

                {/*<===================Project-Submit===================>*/}
                    <button 
                        type='submit' 
                        className="btn-orange  w-full max-w-xs text-slate-100"
                    >
                        Dodaj Zadanie
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Add_Project_Form;
