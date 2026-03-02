let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.name === name);

    if(existing){
        existing.qty += 1;
    }else{
        cart.push({
            name:name,
            price:price,
            qty:1   // ⭐ VERY IMPORTANT
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

/* DISPLAY CART */
function loadCart(){

    const cartBox=document.getElementById("cartItems");
    const totalBox=document.getElementById("total");

    if(!cartBox) return;

    cartBox.innerHTML="";
    let total=0;

    cart.forEach((item,index)=>{

        total+=item.price*item.qty;

        cartBox.innerHTML+=`
        <div class="cart-item">
            <div>
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
                <p>Qty: ${item.qty}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        </div>`;
    });

    totalBox.innerText="Total: ₹"+total;
}

function removeItem(i){
    cart.splice(i,1);
    localStorage.setItem("cart",JSON.stringify(cart));
    loadCart();
}

/* CHECKOUT */
function placeOrder(e){
    e.preventDefault();

    alert("✅ Order Placed Successfully!\nPayment Mode: Cash On Delivery");

    localStorage.removeItem("cart");
    window.location="index.html";
}

loadCart();