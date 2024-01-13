import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdowns from "../components/Dropdowns";
import TextArea from "../components/FormComponents";

class AddingProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      priority: "",
      priorityOptions: [], // Corrected variable name
      statusOptions: [],
      status: "",
      team: "",
      description: "",
      startDate: "",
      endDate: "",
    };
  }

  async componentDidMount() {
    // Fetch status options and update the state
    const statusOptions = await this.fetchStatusData();
    this.setState({ statusOptions });

    // Fetch priority options and update the state with the correct variable name
    const priorityOptions = await this.fetchPriorityData();
    this.setState({ priorityOptions });

    const teamOptions = await this.fetchTeamsData();
    this.setState({ teamOptions });
  }

  fetchStatusData = async () => {
    try {
      const response = await fetch("/api/v1/overall/get_states");
      const data = await response.json();
      return data.states;
    } catch (error) {
      console.error("Error fetching status data:", error);
      return [];
    }
  };

  fetchPriorityData = async () => {
    try {
      const response = await fetch("/api/v1/overall/get_priorities");
      const data = await response.json();
      return data.priority; // Corrected variable name
    } catch (error) {
      console.error("Error fetching priority data:", error);
      return [];
    }
  };

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

  handleTextAreaChange = (text) => {
    this.setState({ description: text });
  };

  handlePriorityChange = (selectedOption) => {
    this.setState({ priority: selectedOption });
  };

  handleStatusChange = (selectedOption) => {
    this.setState({ status: selectedOption });
  };

  handleTeamChange = (selectedOption) => {
    this.setState({ team: selectedOption });
  };

  handleInputChange = (e) => {
    this.setState({ projectName: e.target.value });
  };

  handleStartDateChange = (e) => {
    this.setState({ startDate: e.target.value });
  };

  handleEndDateChange = (e) => {
    this.setState({ endDate: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      projectName: this.state.projectName,
      priority: this.state.priority,
      status: this.state.status,
      team: this.state.team,
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    };

    try {
      const response = await fetch("/api/v1/projects/add_project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Project added successfully");
        // You can redirect to another page or update the UI as needed
      } else {
        console.error("Failed to add project");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  render() {
    return (
      <div className='main flex justify-center py-6'>
        <div className='card p-6'>
          <span>Dodawanie Projektu</span>
          <form onSubmit={this.handleSubmit}>
            <input
              type='text'
              placeholder='ProjectName'
              required
              onChange={this.handleInputChange}
            />
            <br />

            <Dropdowns
              options={this.state.priorityOptions}
              onOptionChange={this.handlePriorityChange}
            />
            <Dropdowns
              options={this.state.statusOptions}
              onOptionChange={this.handleStatusChange}
            />
            <Dropdowns
              options={this.state.teamOptions}
              onOptionChange={this.handleTeamChange}
            />

            <TextArea onTextChange={this.handleTextAreaChange} />

            <p>Start Date</p>
            <input
              type='date'
              placeholder='Start Date'
              required
              onChange={this.handleStartDateChange}
            />
            <br />
            <p>End date</p>
            <input
              type='date'
              placeholder='End Date'
              required
              onChange={this.handleEndDateChange}
            />
            <br />
            <button type='submit'>Dodaj Projekt</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddingProjects;
