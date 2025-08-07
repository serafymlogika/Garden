let cart = [];
let total = -20;

function addToCart(button) {
    const itemBlock = button.closest(".item");

    const itemName = itemBlock.querySelector("img").alt;
    const count = parseInt(itemBlock.querySelector(".count").textContent);
    let price = itemBlock.querySelector('.priceNUM').innerHTML;
    if (count > 0) {
        cart.push({ item: itemName, price });
        total += price;
        updateCartDisplay();

        // Зменшуємо кількість в наявності на 1
        itemBlock.querySelector(".count").textContent = count - 1;
    } else {
        alert("❌ Недостатньо товару в наявності!");
    }
}

function updateCartDisplay() {
    const cartList = document.getElementById("cart-list");
    const totalEl = document.querySelector("#total");
    cartList.innerHTML = "";
    let total = 0;

    for (let item of cart) {
        console.log("Item:", item); // додайте для перевірки
        total += item.price * item.quantity;

        const li = document.createElement("li");
        li.textContent = `${item.item} - ${item.price} грн`;
        cartList.appendChild(li);
    }

    totalEl.innerHTML = total;
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

    const bonus = 20;
    const finalTotal = Math.max(total - bonus, 0); // Щоб не було від'ємної суми

    alert(
        `✅ Замовлення оформлено!\n` +
        `Нік: ${nick}\n` +
        `Сума: ${total}₴\n` +
        `Бонус: -${bonus}₴\n` +
        `До сплати: ${finalTotal}₴\n` +
        `Оплата: ${payment}`
    );

    // Тут можна зберегти замовлення на сервер або локально

    location.reload(); // Оновлюємо сторінку
    window.location.replace("./catalog.html"); // Повернення до каталогу
}
