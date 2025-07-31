let cart = [];
let total = 0;

function addToCart(item, price) {
    const existingItem = cart.find(entry => entry.item === item);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ item, price, quantity: 1 });
    }
    updateTotal();
    updateCartDisplay();
}

function updateTotal() {
    total = cart.reduce((sum, entry) => sum + entry.price * entry.quantity, 0);
}

function updateCartDisplay() {
    const cartList = document.getElementById("cart-list");
    const totalEl = document.getElementById("total");
    cartList.innerHTML = "";

    cart.forEach(entry => {
        const li = document.createElement("li");

        const quantitySpan = document.createElement("span");
        quantitySpan.textContent = ` × ${entry.quantity}`;
        quantitySpan.style.fontWeight = "bold";
        quantitySpan.style.marginLeft = "5px";

        li.textContent = `${entry.item} — ${entry.price}₴`;
        li.appendChild(quantitySpan);

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
    location.reload();
}
