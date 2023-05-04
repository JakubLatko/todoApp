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
    console.log(currentTheme)
    if(currentTheme === "dark"){
        switchToDark()
        return
    } else if (currentTheme === "light"){
        switchToLight()
        //localStorage.setItem("theme", light )
        return
    }
}