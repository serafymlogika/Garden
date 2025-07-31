let cart = [];
let total = 0;

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
    // Тут можна додати збереження або відправку на сервер
}

