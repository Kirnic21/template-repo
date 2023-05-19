export {Todo,Project}
class Todo {
  constructor(title, dueDate, priority) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = "not done"
  }
}

class Project {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }
  get index() {
    return this._index;
  }
  set index(index) {
    this._index = index;
  }
  addTodo(todo) {
    this.todos.push(todo);

  }
  
}
