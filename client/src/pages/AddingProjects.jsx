import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function AddingProjects(){
    return(
        <div className='main'>
            <span>Dodawanie Projektu</span>
            <form  name="" action="">
                <input type='text' placeholder='ProjectName' required/><br/>
    
                {/*<=======================================================>*/}
                {/* Below are temporal imputs will be replaced by dropdowns */}
                {/*<=======================================================>*/}
    
                <input type='number' placeholder='Priorytet' required/><br/>
                <input type='number' placeholder='Status'    required/><br/>
                <input type='number' placeholder='Zespol'    required/><br/>
                {/*<=======================================================>*/}
    
                <textarea placeholder='Description'></textarea><br/>
    
                <p>Start Date</p>
                <input type="date" placeholder='Start Date' required/><br/>
                <p>End date</p>
                <input type="date" placeholder='End Date' required/><br/>
                <button type='submit'>Dodaj Projekt</button>
    
            </form>
        </div>
      )
    
}