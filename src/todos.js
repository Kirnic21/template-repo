import { setProjects } from "./localStorage"
import { Todo } from "./model"
import { myProjectManager } from "./projectManager"
export{deleteTodo}
export{renameTodo}

export{createTodo}
export{changeDate}
export{changePriority}
export{doneTodo}
function createTodo(title, dueDate, priority,index){
    const newTodo = new Todo(title,dueDate,priority)
    let array = myProjectManager.projectArray[index].todos
    array.push(newTodo)
    return newTodo
}
function doneTodo(todo,status){
    todo.status = status
    return todo.status

}
function deleteTodo(index,todo)
{
    {   
        for( let i = 0; i < myProjectManager.projectArray[index].todos.length; i++){ 
        
            if ( myProjectManager.projectArray[index].todos[i] === todo) { 
        
                myProjectManager.projectArray[index].todos.splice(i, 1);
 
            }
        
        }
        
     }
}
function renameTodo(todo,newTitle)
{
    todo.title = newTitle
    return todo.title
}
function changeDate(todo,newDate)
{
    todo.dueDate = newDate
    return todo.dueDate
}
function changePriority(todo,newPriority)
{
    todo.priority = newPriority
    return todo.priority
}