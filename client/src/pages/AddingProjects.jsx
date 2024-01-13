import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdowns from "../components/Dropdowns";
import TextArea from "../components/FormComponents";

class AddingProjects extends React.Component {
    handleTextAreaChange = (text) => {
      console.log('Text received from TextArea:', text);
      // Do whatever you want with the text in the parent component
    };
  
    handlePriorityChange = (selectedOption) => {
      console.log('Selected priority:', selectedOption);
      // Do whatever you want with the selected priority in the parent component
    };
  
    handleStatusChange = (selectedOption) => {
      console.log('Selected status:', selectedOption);
      // Do whatever you want with the selected status in the parent component
    };
  
    handleTeamChange = (selectedOption) => {
      console.log('Selected team:', selectedOption);
      // Do whatever you want with the selected team in the parent component
    };
  
    render() {
      return (
        <div className="main flex justify-center py-6">
          <div className='card p-6'>
            <span>Dodawanie Projektu</span>
            <form name="" action="">
              <input type='text' placeholder='ProjectName' required/><br/>
  
              <Dropdowns options={['Priority1', 'Priority2', 'Priority3']} onOptionChange={this.handlePriorityChange} />
              <Dropdowns options={['Status1', 'Status2', 'Status3']} onOptionChange={this.handleStatusChange} />
              <Dropdowns options={['Team1', 'Team2', 'Team3']} onOptionChange={this.handleTeamChange} />
  
              <TextArea onTextChange={this.handleTextAreaChange} />
  
              <p>Start Date</p>
              <input type="date" placeholder='Start Date' required/><br/>
              <p>End date</p>
              <input type="date" placeholder='End Date' required/><br/>
              <button type='submit'>Dodaj Projekt</button>
            </form>
          </div>
        </div>
      );
    }
  }
  
  export default AddingProjects;