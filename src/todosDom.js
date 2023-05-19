
import { myProjectManager } from "./projectManager"
import { filterProjects } from "./projects"
import { createTodo } from "./todos"
import { mainPage } from "./dom"
import {removeAllChildNodes} from "./dom"   
import {createProjectDomButton} from "./dom"
import {displayAllProjects} from "./dom"
import { deleteTodo } from "./todos"
import { renameTodo } from "./todos"
import { changePriority } from "./todos"
import { changeDate } from "./todos"
import { format } from "date-fns/esm"
import {parseISO} from "date-fns"
import { doneTodo } from "./todos"
import { setProjects, } from "./localStorage"


function selectTodo()
{      
 const project = document.querySelectorAll(".project") 
 for(let i = 0;i<project.length;i++)
 {
        
 project[i].addEventListener("click",function filterAll(e){
        
        const ul1 = document.querySelector("#ul1")
        const projectIndex = e.target.dataset.id;
        const project = filterProjects(myProjectManager.projectArray[projectIndex])
        const projects = document.querySelector("#projects")
        projects.remove()
        const container = document.querySelector("#container")
        const todos = document.createElement("div")
        todos.setAttribute("id","todos")
        container.appendChild(todos)
        const todoHeader = document.createElement("div")
        todoHeader.setAttribute("id","todoHeader")
        todoHeader.textContent = project[0].title;
        todos.appendChild(todoHeader)
        const returnButton = document.createElement("button")
        returnButton.setAttribute("id","returnButton")
        returnButton.addEventListener("click",function returnToMainPage(){
                todos.remove()
                const projects = document.createElement("div")
                projects.setAttribute("id","projects")
                container.appendChild(projects)
                const projectsHeader = document.createElement("div")
                projectsHeader.setAttribute("id","projectsHeader")
                projectsHeader.textContent = "Projects: "
                projects.appendChild(projectsHeader)
                displayAllProjects()
                selectTodo()
                const ul = document.querySelector("#ul1");
                removeAllChildNodes(ul)
                const sidebar = document.querySelector("#sidebar")
                sidebar.appendChild(ul)

                //newProject BUTTON DIV 
                const newProject = document.createElement("li");
                newProject.textContent = "New Project"
                newProject.setAttribute("id","newProject")
                newProject.classList.add("button")
                ul.appendChild(newProject)
                createProjectDomButton()
        })
        returnButton.textContent = "Return";
        todos.appendChild(returnButton)
        const todoPlace = myProjectManager.projectArray[projectIndex].todos
        for(let i = 0;i<todoPlace.length;i++)
        {
            const todo = todoPlace[i]
            const todoDiv = createTodoDiv(todo,i,projectIndex)
            todos.appendChild(todoDiv)
        }
        removeAllChildNodes(ul1)
        //create todo button
        function createTodoDiv(todo,index,projectIndex){
                //todoDIv
                const todoDiv = document.createElement("div");
                todoDiv.classList.add("todo")
                //todo Title
                const todoTitle = document.createElement("div")
                todoTitle.textContent = todo.title
                todoTitle.classList.add("todoTitle")
                const endGroup = document.createElement("div")
                //endgroup
                endGroup.classList.add("endGroup")
                todoDiv.appendChild(todoTitle)
                todoDiv.appendChild(endGroup)
                //due date
                const todoDueDate = document.createElement("div")
                const date = format(new Date(todo.dueDate),'MM/dd/yyyy')
                
                endGroup.textContent = date
                todoDiv.appendChild(todoDueDate)
                //priority
                const todoPriority = document.createElement("div");
                todoPriority.textContent = todo.priority
                endGroup.appendChild(todoPriority)
                //todo div index
                todoDiv.dataset.id = index
                //holding both edit and remove
                
                //remove
                const removeTodoButton = document.createElement("button")
                removeTodoButton.setAttribute("id","removeTodo")
                endGroup.appendChild(removeTodoButton)
                //change color with priority
               
                if(todo.priority === "HIGH")
                {
                        todoDiv.classList.add("high")

                }
                else if(todo.priority === "MEDIUM")
                {
                        todoDiv.classList.add("medium")
                }
                else if(todo.priority === "LOW")
                {
                        todoDiv.classList.add("low")
                }
                removeTodoButton.addEventListener("click",function removeTodoButton()
                {
                    deleteTodo(projectIndex,todo)
                    todoDiv.remove()
                    setProjects(myProjectManager.projectArray[projectIndex],projectIndex)
                })
                const done = document.createElement("button")
                done.setAttribute("id","doneButton")
                done.textContent = myProjectManager.projectArray[projectIndex].todos[index].status
                
                todoDiv.appendChild(done)
                done.addEventListener("click",function isItDone()
                {
                        if(myProjectManager.projectArray[projectIndex].todos[index].status === "not done")
                        {
                                doneTodo(myProjectManager.projectArray[projectIndex].todos[index],"done")
                        }
                        else if(myProjectManager.projectArray[projectIndex].todos[index].status === "done")
                        {
                                doneTodo(myProjectManager.projectArray[projectIndex].todos[index],"not done")
                        }
                        while(todos.childNodes.length>2)
                                    {
                                            todos.removeChild(todos.lastChild)
                                    }
                                for(let i = 0;i<todoPlace.length;i++)
                                    {
                                        const todo = todoPlace[i]
                                        const todoDiv = createTodoDiv(todo,i,projectIndex)
                                        todos.appendChild(todoDiv)
                                    }
                                }    

                )
                removeTodoButton.textContent = "remove Todo"
                const editButton = document.createElement("button")
                editButton.textContent = "edit todo"
                editButton.setAttribute("id","editTodo")
                endGroup.appendChild(editButton)
                editButton.addEventListener("click",function editTodoListener(){
                        
                  
                            if(createTodoButton.classList.contains("clicked") === false){
                            const todoInArray = myProjectManager.projectArray[projectIndex].todos[index]
                            //rename
                            createTodoButton.classList.add("clicked")
                            const ulToDo = document.querySelector("#ul1")
                            const textTitle = document.createElement("li")
                            const textTitleInput = document.createElement("input")
                            textTitleInput.value = todoInArray.title
                            textTitleInput.setAttribute("id","textTitleInput")
                            textTitle.appendChild(textTitleInput)
                            ulToDo.appendChild(textTitle)
                            //date
                            const dueDate = document.createElement("li")
                            const dueDateInput = document.createElement("input")
                             
                            dueDateInput.setAttribute("type","date")
                            dueDateInput.setAttribute("id","dueDateInput")
                            dueDateInput.value = todo.dueDate
                            dueDate.appendChild(dueDateInput)
                            ulToDo.appendChild(dueDate)
                            //priority
                            const  priority = document.createElement("li")
                                ulToDo.appendChild(priority)
                                const   priorityInput1 = document.createElement("input")
                                priorityInput1.classList.add("priorityInput")
                                priorityInput1.setAttribute("type","radio");
                                priorityInput1.setAttribute("name","priority");
                                priorityInput1.setAttribute("value","HIGH");
                                priorityInput1.setAttribute("id","priorityInput1")
                                const priorityInput1Label = document.createElement("label")
                                priorityInput1Label.textContent = "High"
                                priorityInput1Label.setAttribute("for","priorityInput1")
                                priority.appendChild(priorityInput1)
                                priority.appendChild(priorityInput1Label)
                                
                                const   priorityInput2 = document.createElement("input")
                                priorityInput2.setAttribute("id","priorityInput")
                                priorityInput2.setAttribute("type","radio");
                                priorityInput2.setAttribute("name","priority");
                                priorityInput2.setAttribute("value","MEDIUM");
                                priorityInput2.setAttribute("id","priorityInput2")
                                priorityInput2.textContent = priorityInput2.value
                                priorityInput2.classList.add("priorityInput")
                                const priorityInput2Label = document.createElement("label")
                                priorityInput2Label.setAttribute("for","priorityInput2")
                                priorityInput2Label.textContent = "Medium"
                                priority.appendChild(priorityInput2)
                                priority.appendChild(priorityInput2Label)
                                const   priorityInput3 = document.createElement("input")
                                priorityInput3.setAttribute("id","priorityInput")
                                priorityInput3.setAttribute("type","radio");
                                priorityInput3.setAttribute("name","priority");
                                priorityInput3.setAttribute("value","LOW");
                                priorityInput3.checked =true
                                priorityInput3.textContent = priorityInput3.value
                                priorityInput3.setAttribute("id","priorityInput3")
                                priorityInput3.classList.add("priorityInput")
                                const priorityInput3Label = document.createElement("label")
                                priorityInput3Label.setAttribute("for","priorityInput3")
                                priorityInput3Label.textContent = "Low"
                                priority.appendChild(priorityInput3)
                                priority.appendChild(priorityInput3Label)
                            const submitButton = document.createElement("button")
                            submitButton.textContent = "edit todo"
                            ulToDo.appendChild(submitButton)
                            submitButton.addEventListener("click",function changeTodos()
                            {
                                const isObjectEmpty = (objectName) => {
                                        return Object.keys(objectName).length === 0
                                      }
                                      if(textTitleInput.value !== "" && (dueDateInput.value !== "" || isObjectEmpty(dueDateInput.value) === false)){  
                                const priorityValue=document.querySelector('input[name="priority"]:checked').value;
                                    //removealltodos
                                    renameTodo(todoInArray,textTitleInput.value)
                                    changeDate(todoInArray,dueDateInput.value)
                                changePriority(todoInArray,priorityValue)
                                createTodoButton.classList.remove("clicked")
                                    while(todos.childNodes.length>2)
                                    {
                                            todos.removeChild(todos.lastChild)
                                    }
                                    const todoPlace = myProjectManager.projectArray[projectIndex].todos
                                    for(let i = 0;i<todoPlace.length;i++)
                                    {
                                        const todo = todoPlace[i]
                                        const todoDiv = createTodoDiv(todo,i,projectIndex)
                                        todos.appendChild(todoDiv)
                                    }
                                    while(ul1.childNodes.length>1)
                                    {
                                            ul1.removeChild(ul1.lastChild)
                                    }
                                    setProjects(myProjectManager.projectArray[projectIndex],projectIndex)
                            }})
                        }
                })
                setProjects(myProjectManager.projectArray[e.target.dataset.id],e.target.dataset.id)
                return todoDiv
            }
        
        //createTodoButton
        const createTodoButton = document.createElement("div")
        createTodoButton.textContent = "Create todo"
        ul1.appendChild(createTodoButton)
        createTodoButton.classList.add("button")
        createTodoButton.addEventListener("click", function createTodoDom(){
                if(createTodoButton.classList.contains("clicked") === false){
                createTodoButton.classList.add("clicked")
                const ulToDo = document.querySelector("#ul1")
                const textTitle = document.createElement("li")
                const textTitleInput = document.createElement("input")
                textTitleInput.setAttribute("id","textTitleInput")
                textTitle.appendChild(textTitleInput)
                ulToDo.appendChild(textTitle)
                const dueDate = document.createElement("li")
                const dueDateInput = document.createElement("input")
                dueDateInput.setAttribute("type","date")
                dueDateInput.setAttribute("id","dueDateInput")
                dueDate.appendChild(dueDateInput)
                ulToDo.appendChild(dueDate)
                const  priority = document.createElement("li")
                ulToDo.appendChild(priority)
                const   priorityInput1 = document.createElement("input")
                priorityInput1.classList.add("priorityInput")
                priorityInput1.setAttribute("type","radio");
                priorityInput1.setAttribute("name","priority");
                priorityInput1.setAttribute("value","HIGH");
                priorityInput1.setAttribute("id","priorityInput1")
                const priorityInput1Label = document.createElement("label")
                priorityInput1Label.textContent = "High"
                priorityInput1Label.setAttribute("for","priorityInput1")
                priority.appendChild(priorityInput1)
                priority.appendChild(priorityInput1Label)
                
                const   priorityInput2 = document.createElement("input")
                priorityInput2.setAttribute("id","priorityInput")
                priorityInput2.setAttribute("type","radio");
                priorityInput2.setAttribute("name","priority");
                priorityInput2.setAttribute("value","MEDIUM");
                priorityInput2.setAttribute("id","priorityInput2")
                priorityInput2.textContent = priorityInput2.value
                priorityInput2.classList.add("priorityInput")
                const priorityInput2Label = document.createElement("label")
                priorityInput2Label.setAttribute("for","priorityInput2")
                priorityInput2Label.textContent = "Medium"
                priority.appendChild(priorityInput2)
                priority.appendChild(priorityInput2Label)
                const   priorityInput3 = document.createElement("input")
                priorityInput3.setAttribute("id","priorityInput")
                priorityInput3.setAttribute("type","radio");
                priorityInput3.setAttribute("name","priority");
                priorityInput3.setAttribute("value","LOW");
                priorityInput3.checked =true
                priorityInput3.textContent = priorityInput3.value
                priorityInput3.setAttribute("id","priorityInput3")
                priorityInput3.classList.add("priorityInput")
                const priorityInput3Label = document.createElement("label")
                priorityInput3Label.setAttribute("for","priorityInput3")
                priorityInput3Label.textContent = "Low"
                priority.appendChild(priorityInput3)
                priority.appendChild(priorityInput3Label)
                const submitButton = document.createElement("button")
                submitButton.textContent = "Create todo"
                ulToDo.appendChild(submitButton)
                //check if dueDateInput is half filled
                const isObjectEmpty = (objectName) => {
                        return Object.keys(objectName).length === 0
                      }
                      
                
                submitButton.addEventListener("click",function addTodoToTheProjects() {
                if(textTitleInput.value !== "" && (dueDateInput.value !== "" || isObjectEmpty(dueDateInput.value) === false))
                {
                        const date = format(new Date(dueDateInput.value),'MM/dd/yyyy' )
                        const todayTest = new Date()

                        if(todayTest > parseISO(dueDateInput.value) === true)
                        {
                                alert("insert a valid date")
                                return 0
                        }
                const priorityValue=document.querySelector('input[name="priority"]:checked').value;
                createTodoButton.classList.remove("clicked")
                createTodo(textTitleInput.value,date,priorityValue,projectIndex)
                while(todos.childNodes.length>2)
                {
                        todos.removeChild(todos.lastChild)
                }
                for(let i = 0;i<todoPlace.length;i++)
                        {
                        const todo2 = todoPlace[i]
                        const todoDiv2 = createTodoDiv(todo2,i,projectIndex)
                        todos.appendChild(todoDiv2)
                        }
                
                while (ul1.childNodes.length > 1) {
                        ul1.removeChild(ul1.lastChild);
                    }
                }})}
                
                
        })
        //return button
}
 )}}
 selectTodo()
 export {selectTodo}