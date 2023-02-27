//selectors

const todoInput=document.querySelector('.todo-input');
const todoAdd=document.querySelector('.btn-form');
const todoList=document.querySelector('.todo-list');
const filterOptions=document.querySelector('.filter-todos');

//events

todoAdd.addEventListener("click",addTodo);
todoList.addEventListener("click",checkRemove);
filterOptions.addEventListener("click",filterTodos);
document.addEventListener("DOMContentLoaded",getLocalTodos);

//functions
function addTodo(e){
e.preventDefault();
const todoDiv=document.createElement("div");
todoDiv.classList.add("todo");
const newTodo=`<li>${todoInput.value}</li>
 <span><svg class="trash" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg></span>
 <span><svg class="check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg></span>`;
todoDiv.innerHTML=newTodo;
todoList.appendChild(todoDiv);
saveLocatalTodos(todoInput.value);
todoInput.value="";
}

function checkRemove(e){
    const classList=[...e.target.classList];
    const item=e.target;
    const todo=item.parentElement.parentElement;
    if(classList[0]==="check"){
    todo.classList.toggle('completed');
    }else if(classList[0]==="trash"){
        removeLocalTodos(todo);
        todo.remove();
    }

}

function saveLocatalTodos(todo){
    let savedTodos=localStorage.getItem("todos")?
    JSON.parse(localStorage.getItem("todos")):[];
    savedTodos.push(todo);
    localStorage.setItem("todos",JSON.stringify(savedTodos));
}

function getLocalTodos(){
    let savedTodos=localStorage.getItem("todos")?
    JSON.parse(localStorage.getItem("todos")):[];
savedTodos.forEach(todo=>{
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo=`<li>${todo}</li>
    <span><svg class="trash" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg></span>
    <span><svg class="check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg></span>`;   
    todoDiv.innerHTML=newTodo;
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    let savedTodos=localStorage.getItem("todos")?
    JSON.parse(localStorage.getItem("todos")):[];
    const filterTodos=savedTodos.filter(e=> e!== todo.children[0].innerText);
    localStorage.setItem("todos",JSON.stringify(filterTodos));
}


function filterTodos(e){
    const todos=[...todoList.childNodes];
    console.log(todos);
    todos.forEach((todo)=>{
        switch (e.target.value){
            case "all":
                todo.style.display="flex";
            break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display="flex"; 
                }else {todo.style.display="none";
            }
            break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display="flex"; 
                }else {todo.style.display="none";
            }
            break;
        }

    });
}