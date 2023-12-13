import React, { useState, useEffect } from 'react';

export default function ProjectsComponent() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/v1/projects');
        const data = await response.json();
        setProjects(data);
        console.log(data);
      } catch (error) {
        console.error('Unable to fetch data from server:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
          // Replace 'id' and 'name' with your actual project properties
        ))}
      </ul>
    </div>
  );
}



export  function About() {
  return <div>About</div>;
}

