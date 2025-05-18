const dark = document.getElementById("dark");
const light = document.getElementById("light");

dark.addEventListener("click",function(){
    const body = document.querySelector("body")
    const testomnial = document.getElementById("testomonial")
    body.classList.add("darkMode")
    body.classList.remove("text-dark")
    body.classList.add("text-primary")
    body.classList.remove("bg-white")
    testomonial.classList.add("darkMode")
    testomonial.classList.remove("bg-white")
})

light.addEventListener("click",function(){
    const body = document.querySelector("body")
    const testomonial = document.getElementById("testomonial")
    body.classList.add("bg-white")
    body.classList.add("text-dark")
    body.classList.remove("darkMode")
    testomonial.classList.add("bg-white")
    testomonial.classList.remove("darkMode")
})

