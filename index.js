// ===============================
// ISAAC'S KITCHEN ORDER SYSTEM
// ===============================
let cart = [];

let quantities = {
    Burger: 0,
    Pizza: 0,
    Chicken: 0,
    Rice: 0,
    Fries: 0,
    Hotdog: 0,
    Cake: 0,
    IceCream: 0,
    Juice: 0,
    Milkshake: 0,
    Popcorn: 0
};

// ===============================
// Increase Quantity
// ===============================

function increaseQuantity(item){

    quantities[item]++;

    document.getElementById(item + "Qty").innerText = quantities[item];

}

// ===============================
// Decrease Quantity
// ===============================

function decreaseQuantity(item){

    if(quantities[item] > 0){

        quantities[item]--;

    }

    document.getElementById(item + "Qty").innerText = quantities[item];

}

// ===============================
// Add To Cart
// ===============================

function addToCart(item, price){

    let qty = quantities[item];

    if(qty === 0){

        alert("Please increase the quantity first.");

        return;

    }

    let found = cart.find(food => food.item === item);

    if(found){

        found.quantity += qty;

    }else{

        cart.push({

            item:item,

            price:price,

            quantity:qty

        });

    }

    quantities[item]=0;

    document.getElementById(item + "Qty").innerText = 0;

    alert(item + " added to cart!");

}

// ===============================
// Generate Invoice
// ===============================

function generateInvoice(){

    let customer = document.getElementById("customer").value.trim();

    let phone = document.getElementById("phone").value.trim();

    if(customer==""){

        alert("Please enter your name.");

        return;

    }

    if(cart.length==0){

        alert("Your cart is empty.");

        return;

    }

    let invoice="";

    let total=0;

    invoice += "========================================\n";
    invoice += "        ISAAC'S KITCHEN\n";
    invoice += " 38, Ibukun-Olu Street,Akoka,Lagos\n"             
    invoice += "==========================================\n";

    invoice += "Customer : " + customer + "\n";

    invoice += "Phone    : " + phone + "\n";

    invoice += "Date     : " + new Date().toLocaleString() + "\n\n";

    invoice += "Items Ordered\n";

    invoice += "------------------------------\n";

    cart.forEach(food=>{

        let amount = food.price * food.quantity;

        total += amount;

        invoice += food.item + " x " + food.quantity;

        invoice += " = ₦" + amount.toLocaleString();

        invoice += "\n";

    });

    invoice += "---------------------------------\n";

    invoice += "TOTAL = ₦" + total.toLocaleString();

    invoice += "\n\n";

    invoice += "Thank you for dining with us.";

    invoice += "\n";

    invoice += "We appreciate your patronage.";

    

    document.getElementById("invoice").innerHTML = invoice;

}

// ===============================
// Copy Invoice
// ===============================

function copyInvoice(){

    let invoice = document.getElementById("invoice");

    if(invoice.value==""){

        alert("Generate an invoice first.");

        return;

    }

    invoice.select();

    invoice.setSelectionRange(0,99999);

    navigator.clipboard.writeText(invoice.value);

    alert("Invoice copied successfully!");

}

// ===============================
// Print Invoice
// ===============================

function printInvoice(){

    let invoice = document.getElementById("invoice").value;

    if(invoice==""){

        alert("Generate an invoice first.");

        return;

    }

    let printWindow = window.open("","","width=800,height=700");

    printWindow.document.write("<pre>");

    printWindow.document.write(invoice);

    printWindow.document.write("</pre>");

    printWindow.document.close();

    printWindow.print();

}

// ===============================
// Clear Cart
// ===============================

function clearCart(){

    cart=[];

    for(let item in quantities){

        quantities[item]=0;

        let qty=document.getElementById(item+"Qty");

        if(qty){

            qty.innerText=0;

        }

    }

    document.getElementById("invoice").value="";

    alert("Cart cleared successfully.");

}

// ===============================
// Order Summary
// ===============================

function viewCart(){

    if(cart.length==0){

        alert("Your cart is empty.");

        return;

    }

    let message="Items in Cart\n\n";

    cart.forEach(food=>{

        message += food.item;

        message += " x ";

        message += food.quantity;

        message += "\n";

    });

    alert(message);

}
