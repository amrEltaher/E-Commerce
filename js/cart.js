let user = JSON.parse(localStorage.getItem('currentUser'));

if (!user) {
    location.href = "/login.html";
}

let cart = JSON.parse(localStorage.getItem('cart'))[user.id] || {};
let products = JSON.parse(localStorage.getItem('products'));
let product = {};
let id = 0;
let category = '';
let cartTable = document.getElementById('Cart');

const updateCartInLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify({ [user.id]: cart }));
};

const updateTotal = () => {
    let actualTotal = 0;

    for (let item in cart) {
        actualTotal += cart[item].quantity * product.price;
    }

    document.getElementById('total').textContent = actualTotal.toFixed(2);
};

for (let item in cart) {
    category = item.split('-')[0];
    id = item.split('-')[1];
    product = products[category][id];

    const row = document.createElement('tr');

    const titleCell = document.createElement('td');
    titleCell.textContent = product.title;

    const priceCell = document.createElement('td');
    priceCell.textContent = product.price;

    const quantityCell = document.createElement('td');
    const decreaseBtn = document.createElement('button');
    decreaseBtn.className = 'btn btn-sm btn-secondary';
    decreaseBtn.textContent = '-';
    const quantitySpan = document.createElement('span');
    quantitySpan.className = 'mx-2';
    quantitySpan.textContent = cart[item].quantity;
    const increaseBtn = document.createElement('button');
    increaseBtn.className = 'btn btn-sm btn-secondary';
    increaseBtn.textContent = '+';

    quantityCell.appendChild(decreaseBtn);
    quantityCell.appendChild(quantitySpan);
    quantityCell.appendChild(increaseBtn);

    const totalCell = document.createElement('td');
    totalCell.textContent = cart[item].quantity * product.price;

    const removeCell = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn btn-danger btn-sm';
    removeBtn.textContent = 'Remove';
    removeCell.appendChild(removeBtn);

    row.appendChild(titleCell);
    row.appendChild(priceCell);
    row.appendChild(quantityCell);
    row.appendChild(totalCell);
    row.appendChild(removeCell);

    cartTable.appendChild(row);

    decreaseBtn.addEventListener('click', () => {
        if (cart[item].quantity > 1) {
            cart[item].quantity--;
            quantitySpan.textContent = cart[item].quantity;
            totalCell.textContent = cart[item].quantity * product.price;
            updateCartInLocalStorage();
            updateTotal();
        }
    });

    increaseBtn.addEventListener('click', () => {
        cart[item].quantity++;
        quantitySpan.textContent = cart[item].quantity;
        totalCell.textContent = cart[item].quantity * product.price;
        updateCartInLocalStorage();
        updateTotal();
    });

    removeBtn.addEventListener('click', () => {
        delete cart[item];
        row.remove();
        updateCartInLocalStorage();
        updateTotal();
    });
}


updateTotal();
