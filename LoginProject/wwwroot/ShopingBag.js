function addToBasket(prod) {
    const basket = JSON.parse(sessionStorage.getItem('basket')) || [];
    const productIndex = basket.findIndex(product => product.productId === prod.productId);

    if (productIndex !== -1) {
        basket[productIndex].quaninty++;
    } else {
        prod = { ...prod, quaninty: 1 };
        basket.push(prod);
    }

    sessionStorage.setItem('basket', JSON.stringify(basket));
    updateSum(prod.price);
    counter(1);
    updateBasket();
}

const removeFromBasket = (prop) => {
    const basket = JSON.parse(sessionStorage.getItem('basket')) || [];
    const productIndex = basket.findIndex(product => product.productId === prop.productId);

    if (productIndex !== -1) {
        basket.splice(productIndex, 1);
        sessionStorage.setItem('basket', JSON.stringify(basket));
    }

    updateSum(-1 * (prop.price * prop.quaninty));
    counter(-prop.quaninty);
    updateBasket();
}

function decreaseFromBasket(prod) {
    const basket = JSON.parse(sessionStorage.getItem('basket')) || [];
    const productIndex = basket.findIndex(product => product.productId === prod.productId);

    if (productIndex !== -1) {
        if (basket[productIndex].quaninty == 1) {
            removeFromBasket(prod);
        } else {
            basket[productIndex].quaninty--;
            sessionStorage.setItem('basket', JSON.stringify(basket));
            updateSum(-prod.price);
            counter(-1);
        }
    }
    updateBasket();
}

const updateSum = async (sum) => {
    const currentSum = JSON.parse(sessionStorage.getItem("sumToPay")) || 0;
    const newSum = currentSum + sum;
    sessionStorage.setItem('sumToPay', JSON.stringify(newSum));
}

const counter = (c) => {
    const currentCount = JSON.parse(sessionStorage.getItem("ItemsCountText")) || 0;
    const newCount = currentCount + c;
    sessionStorage.setItem('ItemsCountText', JSON.stringify(newCount));
}

const getBasketFromStorage = () => {
    const baskets = JSON.parse(sessionStorage.getItem("basket"));
    if (baskets) {
        drawBasket(baskets);
    }
}

const addOrder = async () => {
    const order = {
        userId: JSON.parse(sessionStorage.getItem('user')).userId,
        orderItems: JSON.parse(sessionStorage.getItem("basket")),
        OrderSum: JSON.parse(sessionStorage.getItem("sumToPay"))
    };

    try {
        const response = await fetch("api/order", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        if (!response.ok) {
            throw new Error(`Error! Status: ${response.status}`);
        }

        const data = await response.json();
        alert("Order added successfully");
        clearStorage();
        //clearDom();
        updateBasket();
    } catch (error) {
        console.error(error.message);
    }
};

const clearStorage = () => {
    sessionStorage.removeItem('basket');
    sessionStorage.removeItem('sumToPay');
    sessionStorage.removeItem("ItemsCountText");
}

const drawBasket = (products) => {
    const template = document.getElementById('temp-row');
    const tbody = document.querySelector('tbody');

    products.forEach(product => {
        const clone = document.importNode(template.content, true);

        clone.querySelector('img').src = `../Images/${product.picture.trim()}.jpg`;
        clone.querySelector('.itemName').textContent = product.productName;
        clone.querySelector('.itemNumber').textContent = product.quaninty;
        clone.querySelector('.itemDescription').textContent = product.description;
        clone.querySelector('.price').textContent = product.price * product.quaninty;
        clone.querySelector('.decrease').addEventListener('click', () => {
            decreaseFromBasket(product);
        });
        clone.querySelector('.addButton').addEventListener('click', () => {
            addToBasket(product);
        });
        clone.querySelector('.removeProduct').addEventListener('click', () => {
            removeFromBasket(product);
        });
        tbody.appendChild(clone);
    });
}

const updateBasket = () => {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // Clear current basket items in the DOM

    const baskets = JSON.parse(sessionStorage.getItem("basket")) || [];
    drawBasket(baskets);

    const sumToPay = JSON.parse(sessionStorage.getItem("sumToPay")) || 0;
    const countItems = JSON.parse(sessionStorage.getItem("ItemsCountText")) || 0;
    const currentSumElement = document.getElementById('totalAmount');
    const totalAmountElement = document.getElementById('itemCount');

    if (currentSumElement) {
        currentSumElement.textContent = sumToPay;
    }

    if (totalAmountElement) {
        totalAmountElement.textContent = countItems;
    }
}

getBasketFromStorage();
updateBasket();





