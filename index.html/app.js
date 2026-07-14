// مصفوفه نخزن فيها البيانات
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//  مصفوفه نخزن فيها البيانات
const buttons = document.querySelectorAll(".shop-btn");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const clearCartBtn = document.getElementById("clear-cart");
const cartIcon = document.getElementById("cart-icon");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCartBtn = document.getElementById("close-cart");
const toast = document.getElementById ("toast");


function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(function(product, index) {
         total += Number(product.price) * product.quantity;

    cartItems.innerHTML += `
    <li class="cart-item">

        <img src="${product.image}" class="cart-img">

        <div class="cart-info">
            <h4>${product.name}</h4>
            <p>${product.price} SAR</p>

            <div class="quantity-box">
                <button class="minus-btn" data-index="${index}">-</button>
                <span>${product.quantity}</span>
                <button class="plus-btn" data-index="${index}">+</button>
            </div>
        </div>
          <button class="remove-btn" data-index="${index}">&times;</button>

    </li>
    `;
});
   
    


    
    cartCount.textContent = cart.reduce(function(total, product){
    return total + product.quantity;
}, 0);
    totalPrice.textContent = total;

    // حذف
    const removeButtons = document.querySelectorAll(".remove-btn");

    removeButtons.forEach(function(button){

        button.addEventListener("click", function(){
           
             const index = button.dataset.index;

            cart.splice(index,1);

            displayCart();

        });

    });

    // زيادة
    const plusButtons = document.querySelectorAll(".plus-btn");

    plusButtons.forEach(function(button){

        button.addEventListener("click", function(){

            const index = button.dataset.index;

            cart[index].quantity++;

            displayCart();

        });

    });

    const minusButtons = document.querySelectorAll(".minus-btn");

    minusButtons.forEach(function(button){

        button.addEventListener("click", function(){

            const index = button.dataset.index;

            if(cart[index].quantity > 1){

                cart[index].quantity--;

            }else{

                cart.splice(index,1);

            }

            displayCart();

        });

    });
    localStorage.setItem("cart", JSON.stringify(cart));
    }

// إضافة منتج
buttons.forEach(function(button){

    button.addEventListener("click", function( event){
event.preventDefault ();
        const productName = button.dataset.name;
        const productPrice = button.dataset.price;
         const productImage = button.dataset.image;
        const existingProduct = cart.find(function(product){

            return product.name === productName;

        });

        if(existingProduct){

            existingProduct.quantity++;

        }else{
            cart.push({

                name: productName,
                price: productPrice,
                image :productImage,
                quantity: 1
              
            });

        }

        displayCart();
toast.classList.add("show");

setTimeout(function(){

    toast.classList.remove("show");

},1500);
    });

});

// تفريغ السلة
clearCartBtn.addEventListener("click", function(){

    cart = [];

    displayCart();

});
cartIcon.addEventListener("click", function(event){

    event.preventDefault();

    cartSidebar.style.right = "0";

});

// إغلاق السلة
 closeCartBtn.addEventListener("click", function(){

    cartSidebar.style.right = "-350px";

});

displayCart();