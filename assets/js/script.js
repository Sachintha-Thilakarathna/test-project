const dark = document.getElementById("dark");
const light = document.getElementById("light");

dark.addEventListener("click",function(){
    const body = document.querySelector("body")
    body.classList.add("darkMode")
})

light.addEventListener("click",function(){
    const body = document.querySelector("body")
    body.classList.remove("darkMode")
})

