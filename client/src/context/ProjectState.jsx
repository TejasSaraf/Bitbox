import PropTypes from 'prop-types';
import projectContext from "./projectContext.jsx";
import { useState } from 'react';

const ProjectStates = (props) => {
  const host = 'http://localhost:5000'
  const projectsInitial = []

  const [projects, setprojects] = useState(projectsInitial)

  // Get All Globally Project
  const getGlobalProjects = async () => {
    // API CALL - Fetch All Global Projects
    const response = await fetch(`${host}/api/projects/fetchallglobalprojects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = await response.json();
    setprojects(json)
  }

  // Get All Your Project
  const getUserProjects = async () => {
    // API CALL - Fetch All User Projects
    const response = await fetch(`${host}/api/projects/fetchalluserprojects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjZjdiMjMwNWVhYjA0MmZmNjVkMGIwIn0sImlhdCI6MTcwODA5NjI5MX0.siMXPD_n3l4aVuHWujzFktS348nPReU-XS4ILWnVngo"
      }
    });
    const json = await response.json();
    setprojects(json)
  }

  // Add a Project
  const addProject = async (title, description, link) => {
    // API CALL  - Add Projects
    const response = await fetch(`${host}/api/projects/addproject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjZjdiMjMwNWVhYjA0MmZmNjVkMGIwIn0sImlhdCI6MTcwODA5NjI5MX0.siMXPD_n3l4aVuHWujzFktS348nPReU-XS4ILWnVngo"
      },
      body: JSON.stringify({ title, description, link }),
    });
    const json = await response.json();
    console.log(json);

    console.log("Adding a new project")
    const project = {
      "_id": "65cf7b6d05eab042ff65d0b4",
      "user": "65cf7b2305eab042ff65d0b0",
      "title": title,
      "description": description,
      "link": link,
      "__v": 0,
      "date": "2024-02-16T17:02:49.635Z"
    };
    setprojects(projects.concat(project))
  }

  // Delete a Project
  const deleteProject = async (id) => {
    // API CALL - Delete Project
    const response = await fetch(`${host}/api/projects/deleteproject/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjZjdiMjMwNWVhYjA0MmZmNjVkMGIwIn0sImlhdCI6MTcwODA5NjI5MX0.siMXPD_n3l4aVuHWujzFktS348nPReU-XS4ILWnVngo"
      },
      body: JSON.stringify(),
    });
    const json = await response.json();
    console.log(json);

    console.log("Deleting the project with " + id);
    // If id equals to not equal to id store the value to newProjects
    const newProjects = projects.filter((project) => { return project._id !== id });
    setprojects(newProjects);
  }

  // Edit a Project
  const editProject = async (id, title, description, link) => {
    // API CALL - Update Project
    const response = await fetch(`${host}/api/projects/updateproject/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjZjdiMjMwNWVhYjA0MmZmNjVkMGIwIn0sImlhdCI6MTcwODA5NjI5MX0.siMXPD_n3l4aVuHWujzFktS348nPReU-XS4ILWnVngo"
      },
      body: JSON.stringify({ title, description, link }),
    });
    const json = await response.json();
    console.log(json);

    // important * -->We want to have a copy of projects to newProjects for that we can just write let newProjects=projects, but what happens is we want page to render after updating the values, so that we can see the change in UI . But if we just use newProjects = projects react cant identify that there is some change happening so it will not render the page so, if we write JSON.parse(JSON.stringify(projects)) react can observe the change
    let newProjects = JSON.parse(JSON.stringify(projects));
    // Logic to edit in the client
    for (let index = 0; index < newProjects.length; index++) {
      const element = newProjects[index];
      if (element._id === id) {
        newProjects[index].title = title;
        newProjects[index].description = description;
        newProjects[index].link = link;
        break;
      }
    }
    setprojects(newProjects)
  }

  return (
    <projectContext.Provider value={{ projects, getUserProjects, getGlobalProjects, addProject, deleteProject, editProject }}>
      {props.children}
    </projectContext.Provider>
  )
}

ProjectStates.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProjectStates;
