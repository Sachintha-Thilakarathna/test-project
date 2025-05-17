const dark = document.getElementById("dark");
const light = document.getElementById("light");

dark.addEventListener("click",function(){
    const body = document.querySelector("body")
    body.classList.add("darkMode")
    body.classList.add("text-white")
    body.classList.remove("bg-white")
})

light.addEventListener("click",function(){
    const body = document.querySelector("body")
    body.classList.remove("text-white")
    body.classList.add("text-black")
    body.classList.remove("darkMode")
})

