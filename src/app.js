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
    console.log("lightDziala")
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
    console.log("darkDziala")
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

let itemsLeft = document.querySelector("#itemsLeft")
function updateNumberOfTodos(){
    itemsLeft.innerText = `${todos.length} items left`
}



var todos = []




todoInputWrapper.addEventListener("submit", (e)=>{
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
            <input type="checkbox"  id="checkbox${todo.id}" />
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
})

function loadTodos(){
    console.log(localStorage.getItem("todos"))
    let localTodosJSON = localStorage.getItem("todos")
    let localTodos = JSON.parse(localTodosJSON)
    localTodos.forEach(element => {
        let part = document.createElement("div")
        part.setAttribute("class", "todo")
        part.setAttribute("id", element.id)
        part.innerHTML=`
            <div class="container">
              <div class="round">
                <input type="checkbox"  id="checkbox${element.id}" />
                <label for="checkbox${element.id}"></label>
              </div>
            </div>
            <p>${element.text}</p>
            <button class="deleteButton">
                <img src="assets/images/icon-cross.svg" alt="">
            </button>
        `
    todoList.append(part)
    updateNumberOfTodos
    todos = localTodos
    });
}


// function deleteTodo(){
//     let deleteButtons = document.querySelectorAll(".deleteButton")
//     deleteButtons.forEach(element => {
//         element.addEventListener("click", (e) =>{
//             console.log("removed")
//            let target = e.target.closest(".todo")
//            if(target){
//             target.remove()
//            }
//         })
//     });


// }


body.addEventListener("load", loadTodos())