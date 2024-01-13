import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdowns from "../components/Dropdowns";
import TextArea from "../components/FormComponents";


class AddingTask extends React.Component{
    handleTextAreaChange = (text) => {
        console.log('Text received from TextArea:', text);
        // Do whatever you want with the text in the parent component
      };

    hhandleTeamChange = (selectedOption) => {
        console.log('Selected Team:', selectedOption);
        // Do whatever you want with the selected priority in the parent component
      };
    render(){
    return(
        <div className='main flex justify-center py-6'>
            <div className='card p-6'>
            <p className='text-xl font-bold text-center'>Dodawanie Zadania</p>
            <hr className="py-2"/>
            <form  name="" action="">
                <input type='text' placeholder='TaskName' className='rounded border p-3' required/><br/>
                
                <Dropdowns options={['Priority1', 'Priority2', 'Priority3']} onOptionChange={this.handleTeamChange}/>
                
                <TextArea onTextChange={this.handleTextAreaChange} />
    
                <p>Start Date</p>
                <input type="date" placeholder='Start Date' required/><br/>
                <div className="">
                    <button type='submit' className="toolbox-Badge text-slate-100 bg-orange hover:bg-opacity-50 hover:text-slate-500" >Dodaj Zadanie</button>
                </div>
            </form>
            </div>
        </div>
      )
    }
}
export default AddingTask;