let cart = [];
<<<<<<< HEAD
let total = -20;
=======
let total = 0;
>>>>>>> ff985730e57e873cfcb1c78825db699e73acfa74

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartList = document.getElementById("cart-list");
    const totalEl = document.getElementById("total");
    cartList.innerHTML = "";
    cart.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.item} — ${entry.price}₴`;
        cartList.appendChild(li);
    });
    totalEl.textContent = total;
}

function checkout() {
    const nick = document.getElementById("roblox-nick").value;
    const payment = document.getElementById("payment-method").value;

    if (!nick) {
        alert("Введіть свій нік у Roblox!");
        return;
    }

    if (cart.length === 0) {
        alert("Кошик порожній.");
        return;
    }

    alert(`✅ Замовлення оформлено!\nНік: ${nick}\nСума: ${total}₴\nОплата: ${payment}`);
<<<<<<< HEAD
    location.reload();
    // Тут можна додати збереження або відправку на сервер
}
=======
    // Тут можна додати збереження або відправку на сервер
}

>>>>>>> ff985730e57e873cfcb1c78825db699e73acfa74
