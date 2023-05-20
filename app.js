const themeButton = document.querySelector(".themeSwitcher")
const themeIcon = document.querySelector(".themeIcon")
let root = document.documentElement
let theme = "dark"
let body = document.body


themeButton.addEventListener("click", () =>{
    if(theme === "dark"){
        switchToLight()
        return
    } else if (theme === "light"){
        switchToDark()
        return
    }
})

function switchToLight(){
    root.style.setProperty('--neutral-100', 'hsl(236, 33%, 92%)')
    root.style.setProperty('--neutral-200', 'hsl(0, 0%, 98%)')
    root.style.setProperty('--neutral-300', 'hsl(233, 11%, 84%)')
    root.style.setProperty('--neutral-400', 'hsl(236, 9%, 61%)')
    root.style.setProperty('--neutral-500', 'hsl(236, 9%, 61%)')
    root.style.setProperty('--neutral-600', 'hsl(235, 19%, 35%)')
    theme = "light"
    themeIcon.src="assets/images/icon-moon.svg"
    body.style.backgroundImage = "url(../assets/images/bg-desktop-light.jpg)"
    localStorage.setItem("theme", theme)
}

function switchToDark(){
    root.style.setProperty('--neutral-100', 'hsl(235, 21%, 11%)')
    root.style.setProperty('--neutral-200', 'hsl(235, 24%, 19%)')
    root.style.setProperty('--neutral-300', 'hsl(237, 14%, 26%)')
    root.style.setProperty('--neutral-400', 'hsl(233, 14%, 35%)')
    root.style.setProperty('--neutral-500', 'hsl(234, 11%, 52%)')
    root.style.setProperty('--neutral-600', 'hsl(234, 39%, 85%)')
    root.style.setProperty('--neutral-700', 'hsl(236, 33%, 92%)')
    theme = "dark"
    themeIcon.src="assets/images/icon-sun.svg"
    body.style.backgroundImage = "url(../assets/images/bg-desktop-dark.jpg)"
    localStorage.setItem("theme", theme)
}


body.addEventListener("load", updateTheme())


function updateTheme(){
    let currentTheme = localStorage.getItem("theme")
    if(currentTheme === "dark"){
        switchToDark()
        return
    } else if (currentTheme === "light"){
        switchToLight()
        return
    }
}

/////////////////////////////////////////////////////////////////////////////////



const newTodoInput = document.querySelector("#newTodoInput")
const todoList = document.querySelector(".todoList")
const todoInputWrapper = document.querySelector(".newTodoWrapper")

let itemsLeftMobile = document.querySelector("#itemsLeftMobile")
let itemsLeftDesktop = document.querySelector("#itemsLeftDesktop")



var todos = []



todoInputWrapper.addEventListener("submit", (e)=>{
    if(newTodoInput.value == '') return
    let todo = {
        id:Date.now(),
        text:newTodoInput.value,
        completed: false,
    }
    let part = document.createElement("div")
    part.setAttribute("class", "todo")
    part.setAttribute("id", todo.id)
    part.innerHTML=`
        <div class="container">
          <div class="round">
            <input type="checkbox"  class="checkbox"  id="checkbox${todo.id}" />
            <label for="checkbox${todo.id}"></label>
          </div>
        </div>
        <p>${todo.text}</p>
        <button class="deleteButton">
            <img src="assets/images/icon-cross.svg" alt="">
        </button>
    `
    todoList.append(part)
    todos.push(todo)
    newTodoInput.value=""

    e.preventDefault()
    updateNumberOfTodos()
    localStorage.setItem("todos", JSON.stringify(todos))
    deleteTodos()
    markingTodos()
})

function loadTodos(){
    todoList.innerHTML=""
    let localTodosJSON = localStorage.getItem("todos")
    let localTodos = JSON.parse(localTodosJSON)
    localTodos.forEach(element => {
        let part = document.createElement("div")
        part.setAttribute("class", "todo")
        part.setAttribute("id", element.id)
        if(element.completed == true){
            part.innerHTML=`
            <div class="container">
              <div class="round">
                <input checked type="checkbox" class="checkbox"   id="checkbox${element.id}" />
                <label class="checkboxLabel" for="checkbox${element.id}"></label>
              </div>
            </div>
            <p>${element.text}</p>
            <button class="deleteButton">
                <img src="assets/images/icon-cross.svg" alt="">
            </button>
        `
        } else if (element.completed == false)
        part.innerHTML=`
            <div class="container">
              <div class="round">
                <input  type="checkbox"  class="checkbox"   id="checkbox${element.id}" />
                <label class="checkboxLabel" for="checkbox${element.id}"></label>
              </div>
            </div>
            <p>${element.text}</p>
            <button class="deleteButton">
                <img src="assets/images/icon-cross.svg" alt="">
            </button>
        `
    
    todoList.append(part)
    updateNumberOfTodos()
    todos = localTodos
    deleteTodos()
    
    })
    markingTodos()
}



body.addEventListener("load", loadTodos())
body.addEventListener("load", deleteTodos())
body.addEventListener("load", markingTodos())


function deleteTodos(){
    let delBtuttons = document.querySelectorAll(".deleteButton")
    delBtuttons.forEach(element => {
        element.addEventListener("click", (e)=>{
            let todoToDelete = e.target.closest(".todo")
            todos.forEach(element => {
                if(element.id == todoToDelete.id){
                    let toRemove = todos.indexOf(element)
                    todos.splice(toRemove, 1)
                    localStorage.setItem("todos", JSON.stringify(todos))
                    todoList.innerHTML=""
                    loadTodos()
                    deleteTodos()             
                    markingTodos()
                    updateNumberOfTodos()
                }
            });
        })
    });
}   


function markingTodos(){
    let labels = document.querySelectorAll(".round")
    labels.forEach(element =>{
        element.addEventListener("click", (e)=>{
            let markedTodo = e.target.closest(".todo")
            todos.forEach(element =>{
                if(element.id == markedTodo.id){
                    let foundTodo = todos[todos.indexOf(element)]
                    if(foundTodo["completed"] == true){
                        foundTodo["completed"] = false
                    } else if(foundTodo["completed"] == false){
                        foundTodo["completed"] = true
                    }
                    localStorage.setItem("todos", JSON.stringify(todos))
                    todoList.innerHTML=""
                    loadTodos()
                    deleteTodos()
                    updateNumberOfTodos()
                }
            })
        })
    })
}


const filterAllDesktop = document.querySelector("#filterAllDesktop")
const filterActiveDesktop = document.querySelector("#filterActiveDesktop")
const filterCompletedDesktop = document.querySelector("#filterCompletedDesktop")

const filterAllMobile = document.querySelector("#filterAllMobile")
const filterActiveMobile = document.querySelector("#filterActiveMobile")
const filterCompletedMobile = document.querySelector("#filterCompletedMobile")



filterAllDesktop.addEventListener("click", loadTodos)
filterActiveDesktop.addEventListener("click", activeFiltering)
filterCompletedDesktop.addEventListener("click", completedFiltering)

filterAllMobile.addEventListener("click", loadTodos)
filterActiveMobile.addEventListener("click", activeFiltering )
filterCompletedMobile.addEventListener("click", completedFiltering)




function activeFiltering(){
    todos.forEach(element=>{
        if(element["completed"] == false){
            todoList.innerHTML =""
            let localTodosJSON = localStorage.getItem("todos")
            let localTodos = JSON.parse(localTodosJSON)
            localTodos.forEach(element => {
                let part = document.createElement("div")
                part.setAttribute("class", "todo")
                part.setAttribute("id", element.id)
                if(element.completed == false){
                    part.innerHTML=`
                    <div class="container">
                      <div class="round">
                        <input type="checkbox" class="checkbox"   id="checkbox${element.id}" />
                        <label class="checkboxLabel" for="checkbox${element.id}"></label>
                      </div>
                    </div>
                    <p>${element.text}</p>
                    <button class="deleteButton">
                        <img src="assets/images/icon-cross.svg" alt="">
                    </button>
                `
                } else if (element.completed == true){
                    part.style.display = "none"
                }
            todoList.append(part)
            updateNumberOfTodos()
            deleteTodos()
    
    })
    markingTodos()
        } 
    })
}



function completedFiltering(){
    todos.forEach(element=>{
        if(element["completed"] == true){
            todoList.innerHTML =""
            let localTodosJSON = localStorage.getItem("todos")
            let localTodos = JSON.parse(localTodosJSON)
            localTodos.forEach(element => {
                let part = document.createElement("div")
                part.setAttribute("class", "todo")
                part.setAttribute("id", element.id)
                if(element.completed == true){
                    part.innerHTML=`
                    <div class="container">
                      <div class="round">
                        <input checked type="checkbox" class="checkbox"   id="checkbox${element.id}" />
                        <label class="checkboxLabel" for="checkbox${element.id}"></label>
                      </div>
                    </div>
                    <p>${element.text}</p>
                    <button class="deleteButton">
                        <img src="assets/images/icon-cross.svg" alt="">
                    </button>
                `
                } else if (element.completed == false){
                    part.style.display = "none"
                }
            todoList.append(part)
            updateNumberOfTodos()
            deleteTodos()
    
    })
    markingTodos()
        } 
    })
}

const clearCompletedMobile = document.querySelector(".clearCompletedMobile")
const clearCompletedDesktop = document.querySelector(".clearCompletedDesktop")

clearCompletedDesktop.addEventListener("click", clearingCompleted)
clearCompletedMobile.addEventListener("click", clearingCompleted)

var todosToRemove = []

function clearingCompleted(){
    todos.forEach(element =>{
        
        if(element["completed"] == true){
            todos.splice(todos.indexOf(element), 1)
            console.log(todos.indexOf(element))
            clearingCompleted()
        } else if(element["completed"] == false){

        }
    })
    localStorage.setItem("todos", JSON.stringify(todos))
    todoList.innerHTML=""
    loadTodos()
    deleteTodos()             
    markingTodos()
    updateNumberOfTodos()
}


function updateNumberOfTodos(){
    let counter = 0
    todos.forEach(element =>{
        if(element.completed == true){
            counter = counter + 1
            itemsLeftDesktop.innerText = `${counter} items left`
            itemsLeftMobile.innerText = `${counter} items left`
        } else if (element.completed == false){
        }
    })
    
}


