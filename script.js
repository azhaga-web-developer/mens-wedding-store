/* =========================
   GET CART FROM STORAGE
========================= */
function getCart(){
return JSON.parse(localStorage.getItem("cart")) || [];
}

/* =========================
   UPDATE CART ICON COUNT
========================= */
function updateCartCount(){

let cart = getCart();

let count = 0;

cart.forEach(item=>{
count += Number(item.qty) || 1;
});

let cartCount = document.getElementById("cartCount");

if(cartCount){
cartCount.innerText = count;
}

}

/* =========================
   ADD TO CART
========================= */
function addToCart(name, price, image){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let existing = cart.find(item => item.name === name);

if(existing){

existing.qty = Number(existing.qty) + 1;

}else{

cart.push({
name:name,
price:price,
image:image,
qty:1
});

}

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();

}

/* =========================
   PLACE ORDER
========================= */
function placeOrder(e){

e.preventDefault();

localStorage.removeItem("cart");

window.location = "confirmation.html";

}

/* =========================
   SIGNUP
========================= */
function signup(e){

e.preventDefault();

let name = document.getElementById("name").value.trim();
let email = document.getElementById("email").value.trim();
let password = document.getElementById("password").value.trim();

let users = JSON.parse(localStorage.getItem("users")) || [];

users.push({
name:name,
email:email,
password:password
});

localStorage.setItem("users",JSON.stringify(users));

alert("Account Created!");

window.location = "login.html";

}

/* =========================
   LOGIN
========================= */
function login(e){

e.preventDefault();

let email = document.getElementById("loginEmail").value.trim();
let password = document.getElementById("loginPassword").value.trim();

let users = JSON.parse(localStorage.getItem("users")) || [];

let user = users.find(u => u.email === email && u.password === password);

if(user){

localStorage.setItem("loggedUser",JSON.stringify(user));

alert("Login Successful");

window.location = "index.html";

}else{

alert("Invalid Email or Password");

}

}

/* =========================
   SHOW USERNAME
========================= */
function checkLogin(){

let userSection = document.getElementById("userSection");

if(!userSection) return;

let user = JSON.parse(localStorage.getItem("loggedUser"));

if(user){

userSection.innerHTML =
`
<span>👤 ${user.name}</span>
<a href="#" onclick="logout()">Logout</a>
`;

}else{

userSection.innerHTML = `<a href="login.html">Login</a>`;

}

}

/* =========================
   LOGOUT
========================= */
function logout(){

localStorage.removeItem("loggedUser");

window.location = "index.html";

}

/* =========================
   RUN AFTER PAGE LOAD
========================= */
document.addEventListener("DOMContentLoaded",function(){

updateCartCount();
loadCart();
checkLogin();

});

function viewProduct(name, price, image){

let product = {
name:name,
price:price,
image:image
};

localStorage.setItem("selectedProduct", JSON.stringify(product));

window.location = "product.html";

}

//Load Cart Function

function loadCart(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartBox = document.getElementById("cartItems");
let totalBox = document.getElementById("total");

if(!cartBox) return;

cartBox.innerHTML = "";

let total = 0;

cart.forEach((item,index)=>{

total += item.price * item.qty;

cartBox.innerHTML += `
<div class="cart-item">

<img src="${item.image}" class="cart-img">

<div class="cart-info">
<h3>${item.name}</h3>
<p>₹${item.price}</p>
<p>Qty: ${item.qty}</p>
<button onclick="removeItem(${index})">Remove</button>
</div>

</div>
`;

});

if(totalBox){
totalBox.innerText = "Total: ₹" + total;
}

}

//Remove Item Logic
function removeItem(index){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.splice(index,1);

localStorage.setItem("cart", JSON.stringify(cart));

loadCart();
updateCartCount();

}