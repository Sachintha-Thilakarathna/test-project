const dark = document.getElementById("dark");
const light = document.getElementById("light");

dark.addEventListener("click",function(){
    const body = document.querySelector("body")
    body.classList.add("darkMode")
    body.classList.add("text-primary")
    body.classList.remove("bg-white")
})

light.addEventListener("click",function(){
    const body = document.querySelector("body")
    body.classList.add("bg-white")
    body.classList.add("text-primary")
    body.classList.remove("darkMode")
})

