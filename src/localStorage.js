
import { displayAllProjects } from "./dom";
import { myProjectManager } from "./projectManager"
import { selectTodo } from "./todosDom";
function setProjects(project,index)
{
   const stringified = JSON.stringify(project)
   localStorage.setItem("project"+index,stringified)
   
}

function getProjects()
{
   for (let i = 0 ; i<localStorage.length;i++)
   {
   const projectGet = localStorage.getItem("project"+i)
   const parsedObject = JSON.parse(projectGet)
   myProjectManager.projectArray.push(parsedObject)
   }
   displayAllProjects()
   selectTodo()
   }
function removeProjectStorage()
{
   localStorage.clear()
   
}
function repopulateTheArray(array)
{
   for(let i = 0;i<array.length;i++)
   {
   const stringified = JSON.stringify(array[i])
   localStorage.setItem("project"+i,stringified)
   }
}
function updateThing(array)
{
   removeProjectStorage(array)
   repopulateTheArray()
}
export {setProjects}
export{getProjects}
export {removeProjectStorage}
export{repopulateTheArray}
export {updateThing}