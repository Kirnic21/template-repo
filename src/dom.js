export {mainPage}
import { myProjectManager } from "./projectManager"
import { createProject, renameProject } from "./projects"
import { removeProjectStorage, repopulateTheArray, setProjects } from "./localStorage"
export{removeAllChildNodes}
export{createProjectDomButton}
export {displayAllProjects}
import { removeProject } from "./projects"
import { selectTodo } from "./todosDom"
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function mainPage(){
//content
const content = document.querySelector("#content")
//header
const header =  document.createElement("div")
header.setAttribute("id","header");
header.textContent = "To Do List"
content.appendChild(header)
//container
const container = document.createElement("div");
container.setAttribute("id","container");
content.appendChild(container);

//sidebar
const sidebar = document.createElement("div");
sidebar.setAttribute("id","sidebar");
container.appendChild(sidebar);
//ul and li
const ul = document.createElement("ul");
ul.setAttribute("id","ul1")
sidebar.appendChild(ul)
//newProject BUTTON DIV 
const newProject = document.createElement("li");
newProject.textContent = "New Project"
newProject.setAttribute("id","newProject")
newProject.classList.add("button")
ul.appendChild(newProject)
//projects div
const projects = document.createElement("div")
projects.setAttribute("id","projects")
container.appendChild(projects)

const projectsHeader = document.createElement("div")
projectsHeader.setAttribute("id","projectsHeader")
projectsHeader.textContent = "Projects: "
projects.appendChild(projectsHeader)
}

//Create a Project
function createProjectDomButton(){
//find create button page
const createProjectButton = document.querySelector("#newProject")
const ul1 = document.querySelector("#ul1")

createProjectButton.addEventListener("click",function createProjectButton(e)
{       
        if(e.target.classList.contains("clicked") === false)
        {
        //create input
        e.target.classList.add("clicked")
        const inputTitle = document.createElement("input")
        inputTitle.setAttribute("id","titleInput")
        inputTitle.setAttribute("placeholder","title")
        ul1.appendChild(inputTitle)
        //button to create project
        const submitButton = document.createElement("button")
        submitButton.setAttribute("id","createButton")
        submitButton.textContent = "Create project";
        ul1.appendChild(submitButton)
        submitButton.addEventListener("click", createProjectDiv)

        }
})
}



function displayAllProjects()
{
        const projects = document.querySelector("#projects")
        for(let i = 0;i< myProjectManager.projectArray.length;i++)
        {
                const projectDiv = document.createElement("div");
                projectDiv.classList.add("project")
                projectDiv.textContent = myProjectManager.projectArray[i].title
                projectDiv.dataset.id = i
                projects.appendChild(projectDiv)
                const both = document.createElement("div")
                both.classList.add("both")
                projects.appendChild(both)
                const removeButton = document.createElement("button")
                removeButton.classList.add("removeButton")
                removeButton.dataset.id = i 
                both.appendChild(removeButton)
                removeButton.textContent = "remove"
                const editButton = document.createElement("button")
                editButton.classList.add("editButton")
                editButton.textContent = "edit"
                editButton.dataset.id = i 
                both.appendChild(editButton)
                
        }
        const removeButton = document.querySelectorAll(".removeButton")
        for(let i = 0;i<removeButton.length;i++)
        {
                removeButton[i].addEventListener("click",function removeTheDom(e){
                        let index = e.target.dataset.id;
                        removeProjectDom(index)
                        selectTodo()
                        removeProjectStorage()
                        repopulateTheArray(myProjectManager.projectArray)
                })    
        }
        const editButton = document.querySelectorAll(".editButton")
       
        for(let i = 0;i<editButton.length;i++)
        {
                const ul1 = document.querySelector("#ul1")
                editButton[i].addEventListener("click",function renameTheDom(e){
                        if(ul1.childNodes.length<2)
                        {
                        let index = e.target.dataset.id;
                        editProjectDom(index)
                        selectTodo()
                        }
                }
                )    
        }
}
function removeProjectDom(projectIndex)
{
        removeProject(myProjectManager.projectArray[projectIndex],myProjectManager.projectArray)
        const projects = document.querySelector("#projects")
        while(projects.childNodes.length>1)
        {
                projects.removeChild(projects.lastChild)
        }
        displayAllProjects()
        
}
function editProjectDom(projectIndex)
{
        const thisProject = myProjectManager.projectArray[projectIndex]
        const ul1 = document.querySelector("#ul1")
        const inputTitle = document.createElement("input")
        inputTitle.setAttribute("id","titleInput")
        inputTitle.setAttribute("placeholder","title")
        inputTitle.value = thisProject.title
        ul1.appendChild(inputTitle)
        const submitButton = document.createElement("button")
        submitButton.setAttribute("id","createButton")
        submitButton.textContent = "rename Project";
        ul1.appendChild(submitButton)
        submitButton.addEventListener("click",function editProjectDomListener(){
                renameProject(myProjectManager.projectArray[projectIndex],inputTitle.value)
                while(ul1.childNodes.length>1)
                {
                        ul1.removeChild(ul1.lastChild)
                }
                const projects = document.querySelector("#projects")
                while(projects.childNodes.length>1)
                {
                        projects.removeChild(projects.lastChild)
                }
                removeProjectStorage()
                repopulateTheArray(myProjectManager.projectArray)
                displayAllProjects()
        })
}
function createProjectDiv()
{
const inputTitle = document.querySelector("#titleInput")
const inputTitleValue = document.querySelector("#titleInput").value
//create project cancel
if(inputTitle.value !== "")
{
const createProjectButton = document.querySelector("#newProject")
createProjectButton.classList.remove("clicked")
const submitButton = document.querySelector("#createButton")
const projects = document.querySelector("#projects")
const project =  createProject(inputTitleValue);
const projectDiv = document.createElement("div");
projectDiv.textContent = project.title;
projectDiv.dataset.id = project.index;
projectDiv.classList.add("project");
projects.appendChild(projectDiv);
removeProjectDom()
inputTitle.remove();
submitButton.remove();
selectTodo()
}
}
//createTodoDiv