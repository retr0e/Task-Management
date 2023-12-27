import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function AddingTask(){
    return(
        <div className='main'>
            <span>Dodawanie Zadania</span>
            <form  name="" action="">
                <input type='text' placeholder='TaskName' required/><br/>
    
                {/*<========================================================>*/}
                {/* Below are temporal imputs will be replaced by dropdowns  */}
                {/*<========================================================>*/}
                <input type='number' placeholder='Id_pracownika' required/><br/>
                {/*<========================================================>*/}
    
                <p>Start Date</p>
                <input type="date" placeholder='Start Date' required/><br/>
                <button type='submit'>Dodaj Zadanie</button>
    
            </form>
        </div>
      )
    
}