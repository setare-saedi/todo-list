// localStorage Data
let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
    todo: [],
    completed: []
  };
  
// selector
const newTask=document.querySelector(".todo-input");
const list=document.querySelector(".todo-list");
const filterOptions=document.querySelector('.filter-todos');

let removeIcon='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(44, 48, 98, 1);transform: ;msFilter:;"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>';
let checkIcon='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(44, 48, 98, 1);transform: ;msFilter:;"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>';
// event
document.addEventListener('DOMContentLoaded',showLocalStorage);
filterOptions.addEventListener("click",filterTodos);

// showLocalStorage();
document.querySelector(".add-btn").addEventListener("click",addTodoList);

// function
function showLocalStorage(){
   
    for (let i = 0; i < data.completed.length ; i++) {
        let value = data.completed[i];
        addToDom(value,true);    
    }
    for (let i = 0; i < data.todo.length ; i++) {
        let value = data.todo[i];
        addToDom(value);    
    }
}

function addTodoList(task){
task.preventDefault();
if (newTask.value){
    data.todo.push(newTask.value);
    updateTodoList();
    addToDom(newTask.value);
    newTask.value="";
}
}

function updateTodoList(){
    localStorage.setItem("todoList",JSON.stringify(data));
}

function addToDom(item,completed){

    let li=document.createElement("li");
    li.innerText=item;
    if(completed){
        li.classList.add('completed');
    }
    list.appendChild(li);

    let removeBtn=document.createElement('button');
    removeBtn.innerHTML=removeIcon;
    removeBtn.classList.add('remove');
    removeBtn.addEventListener('click',removeItem);

    let checkBtn=document.createElement('button');
    checkBtn.innerHTML=checkIcon;
    checkBtn.classList.add('complete');
    checkBtn.addEventListener('click',checkItem);

    li.appendChild(removeBtn);
    li.appendChild(checkBtn);

}

function removeItem(){
    let parent=this.parentNode.parentNode;
    let item=this.parentNode;

    let cL=item.classList;
    if (cL.contains("completed")){
        data.completed.splice(data.completed.indexOf(item.innerText),1);
        updateTodoList();
        parent.removeChild(item);
    }else{
        data.todo.splice(data.todo.indexOf(item.innerText),1);
        updateTodoList();
        parent.removeChild(item);
    }
   
}

function checkItem(){
    let item=this.parentNode;
    let cL=item.classList;
    if (cL.contains("completed")){
        data.completed.splice(data.completed.indexOf(item.innerText),1);
        data.todo.push(item.innerText);
        updateTodoList();
        item.classList.remove('completed');

    }else{
        data.todo.splice(data.todo.indexOf(item.innerText),1);
        data.completed.push(item.innerText);
        updateTodoList();
        item.classList.add('completed');
    }

}
function filterTodos(e){
    const todos=[...list.childNodes];
    console.log(todos);
    todos.forEach((todo)=>{
        switch (e.target.value){
            case "all":
                todo.style.display="block";
            break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display="block"; 
                }else {todo.style.display="none";
            }
            break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display="block"; 
                }else {todo.style.display="none";
            }
            break;
        }

    });
}