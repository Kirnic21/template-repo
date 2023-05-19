import {Project} from "/src/model.js"
import { myProjectManager } from "./projectManager"
import { repopulateTheArray, setProjects } from "./localStorage"

function createProject(name)
{
    let newProject = new Project(name)
    myProjectManager.projectArray.push(newProject)
    newProject.index = myProjectManager.projectArray.indexOf(newProject)
    setProjects(newProject,newProject.index)
    return newProject
    
}

function removeProject(project,arr)
{   
    for( let i = 0; i < arr.length; i++){ 
    
        if ( arr[i] === project) { 
    
            arr.splice(i, 1);
        }
    }
    repopulateTheArray(arr)
    return arr

 }
function renameProject(project,newTitle){
    project.title = newTitle
    
    return project.title
}
function filterProjects(project)
{
    const filteredProject =   myProjectManager.projectArray.filter(projects => projects === project)
    return filteredProject
}
export {createProject}
export{removeProject}
export{renameProject}
export {filterProjects}
