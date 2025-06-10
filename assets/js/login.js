const dark = document.getElementById("dark");
const light = document.getElementById("light");
const nav = document.getElementById("nav")
const navbtn = document.getElementById("navbtn")

dark.addEventListener("click",function(){
    const body = document.querySelector("body")
    const testomnial = document.getElementById("testomonial")
    body.classList.add("bg-dark")
    body.classList.remove("text-dark")
    body.classList.add("text-light")
    body.classList.remove("bg-white")
    testomonial.classList.add("bg-dark")
    testomonial.classList.remove("bg-white")
})

light.addEventListener("click",function(){
    const body = document.querySelector("body")
    const testomonial = document.getElementById("testomonial")
    body.classList.add("bg-white")
    body.classList.add("text-dark")
    body.classList.add("text-light")
    body.classList.remove("bg-dark")
    testomonial.classList.add("bg-white")
    testomonial.classList.remove("bg-dark")
})

navbtn.addEventListener("click",function(){
    nav.classList.remove("sm:hidden")
})
