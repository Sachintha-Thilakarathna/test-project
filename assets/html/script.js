const dark = document.getElementById("dark");
const light = document.getElementById("light");
const nav = document.getElementById("nav")
const navbtn = document.getElementById("navbtn")

let cart = [];

const addButtons = document.querySelectorAll(".add-to-cart");
const cartCount = document.getElementById("cart-count");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

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
    body.classList.remove("text-light")
    body.classList.remove("bg-dark")
    testomonial.classList.add("bg-white")
    testomonial.classList.remove("bg-dark")
})

navbtn.addEventListener("click",function(){
    nav.classList.remove("sm:hidden")
})

// Shopping Cart Functionality
addButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const item = {
      id: btn.dataset.id,
      name: btn.dataset.name,
      price: Number(btn.dataset.price)
    };

    cart.push(item);
    updateCart();
  });
});

function updateCart() {
  cartCount.textContent = cart.length;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price} 
      <button onclick="removeItem(${index})">X</button>
    `;
    cartItems.appendChild(li);
  });

  totalPrice.textContent = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

cartBtn.addEventListener("click", () => {
  cartModal.style.display = "block";
});

closeCart.addEventListener("click", () => {
  cartModal.style.display = "none";
});

window.onclick = (e) => {
  if (e.target == cartModal) cartModal.style.display = "none";
};