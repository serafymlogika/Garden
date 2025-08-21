let cart = [];
let total = 0; // start from 0

// ===== Cookie helpers =====
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    let cname = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(cname) == 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

// ===== Cart logic =====
function addToCart(button) {
    const itemBlock = button.closest(".item");

    const itemName = itemBlock.querySelector("img").alt;
    const count = parseInt(itemBlock.querySelector(".count").textContent);
    let price = parseFloat(itemBlock.querySelector('.priceNUM').innerHTML);

    if (count > 0) {
        // check if item already exists in cart
        let existing = cart.find(i => i.item === itemName);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ item: itemName, price: price, quantity: 1 });
        }

        total += price;
        updateCartDisplay();

        // decrease stock
        itemBlock.querySelector(".count").textContent = count - 1;
    } else {
        alert("❌ Недостатньо товару в наявності!");
    }
}

function updateCartDisplay() {
    const cartList = document.getElementById("cart-list");
    const totalEl = document.querySelector("#total");

    cartList.innerHTML = "";

    for (let item of cart) {
        const li = document.createElement("li");
        li.textContent = `${item.item} - ${item.price}₴ × ${item.quantity} = ${item.price * item.quantity}₴`;
        cartList.appendChild(li);
    }

    totalEl.innerHTML = total; // update global total
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

    // перевіряємо, чи була вже покупка
    let hasBought = getCookie("hasBought") === "true";

    let bonus = 0;
    if (!hasBought) {
        bonus = 20; // тільки для першої покупки
        // видаляємо h3 бонусу після використання
        const bonusText = document.getElementById("bonus-text");
        if (bonusText) bonusText.remove();
    }

    const finalTotal = Math.max(total - bonus, 0);

    alert(
        `✅ Замовлення оформлено!\n` +
        `Нік: ${nick}\n` +
        `Сума: ${total}₴\n` +
        `Бонус: -${bonus}₴\n` +
        `До сплати: ${finalTotal}₴\n` +
        `Оплата: ${payment}`
    );

    // після першої покупки зберігаємо cookie
    if (!hasBought) {
        setCookie("hasBought", "true", 365); // на рік
    }

    location.reload();
    window.location.replace("./catalog.html");
}

