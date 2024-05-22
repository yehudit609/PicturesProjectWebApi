
const getBasketFromStorage = () => {
    const items = JSON.parse(sessionStorage.getItem('basketArray'));
    console.log(items)
    drawBasketProducts(items);
}


const drawBasketProducts = (items) => {
    const template = document.getElementById("temp-row");





    const tbody = document.querySelector("#items tbody");

    // Select the <template> element


    // For each product, create a new row and add it to the <tbody>
    items.forEach(product => {
        const clone = document.importNode(template.content, true);
        clone.querySelector(".itemName").textContent = product.name;
        clone.querySelector(".availabilityColumn div").textContent = product.availability;
        clone.querySelector(".price").textContent = product.price;

        tbody.appendChild(clone);
    });

}
//getBasketFromStorage()const getSelectedProducts = () => {

    const arr = JSON.parse(sessionStorage.getItem('Basket'));
    console.log(arr)
    drawSelectedProducts(arr);

}



const drawSelectedProducts = (products) => {

    const template = document.getElementById('temp-row');

    let sum = 0, count = 0;

    //for (let i = 0; i < products.length; i++) {
    //    sum += products[i].quantity;
    //    count += products[i].price * products[i].quantity;
    //}
    products.forEach(p => { sum += p.quantity; count += p.price * p.quantity })

    document.getElementById('itemCount').textContent = sum;
    document.getElementById('totalAmount').textContent = count;

    products.forEach(item => {

        const row = template.content.cloneNode(true);
        row.querySelector(".price").innerText = item.price * item.quantity;
        row.querySelector(".image").src = '../Images/' + item.imageUrl;
        row.querySelector(".descriptionColumn").innerText = item.description;
        row.querySelector(".quantity").innerText = item.quantity
        row.querySelector(".DeleteButton").addEventListener('click', () => { item.quantity = 1; removeFromBasket(item) });
        row.querySelector(".plus").addEventListener('click', () => { addToBasket(item) });
        row.querySelector(".minus").addEventListener('click', () => { removeFromBasket(item) });

        document.getElementById("itemList").appendChild(row);
    });
}

const removeFromBasket = (item) => {

    const storedArray = JSON.parse(sessionStorage.getItem('BasketArray'));
    const index = storedArray.findIndex(obj => obj.productId == item.productId);
    if (item.quantity == 1) {

        storedArray.splice(index, 1);

    }
    else {
        storedArray[index].quantity -= 1
    }
    sessionStorage.setItem('Basket', JSON.stringify(storedArray));
    document.getElementById("itemList").replaceChildren();

    drawSelectedProducts(storedArray)

}

const addToBasket = (item) => {

    item.quantity += 1;
    const storedArray = JSON.parse(sessionStorage.getItem('Basket'));
    const index = storedArray.findIndex(obj => obj.productId == item.productId);
    storedArray[index].quantity += 1
    sessionStorage.setItem('Basket', JSON.stringify(storedArray));

    document.getElementById("itemList").replaceChildren();
    drawSelectedProducts(storedArray)
}

const placeOrder = async () => {
    debugger
    let orderItems = [];
    const productsArray = JSON.parse(sessionStorage.getItem('Basket'));
    productsArray.forEach(p => {
        orderItem = { ProductId: p.productId, Quantity: p.quantity };
        orderItems.push(orderItem)
    });

    const orderItemToSend = {
        OrderDate: new Date(),
        OrderSum: parseInt(document.getElementById('totalAmount').innerHTML),
        UserId: JSON.parse(sessionStorage.getItem('user')).userId,
        OrderItems: orderItems,
    }

    const responsePost = await fetch('api/order', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderItemToSend)
    });

    if (responsePost.ok) {
        const dataPost = await responsePost.json();

        sessionStorage.removeItem('Basket')
        alert('Thank you buying in our shop...')
        window.location.href = 'Products.html'
    }
}


getSelectedProducts();

//const getSelectedProducts = () => {

//    const arr = JSON.parse(sessionStorage.getItem('BasketArray'));
//    console.log(arr)
//    drawSelectedProducts(arr);

//}



//const drawSelectedProducts = (products) => {

//    const template = document.getElementById('temp-row');

//    let sum = 0, count = 0;

//    //for (let i = 0; i < products.length; i++) {
//    //    sum += products[i].quantity;
//    //    count += products[i].price * products[i].quantity;
//    //}
//    products.forEach(p => { sum += p.quantity; count += p.price * p.quantity })

//    document.getElementById('itemCount').textContent = sum;
//    document.getElementById('totalAmount').textContent = count;

//    products.forEach(item => {

//        const row = template.content.cloneNode(true);
//        row.querySelector(".price").innerText = item.price * item.quantity;
//        row.querySelector(".image").src = '../Images/' + item.imageUrl;
//        row.querySelector(".descriptionColumn").innerText = item.description;
//        row.querySelector(".quantity").innerText = item.quantity
//        row.querySelector(".DeleteButton").addEventListener('click', () => { item.quantity = 1; removeFromBasket(item) });
//        row.querySelector(".plus").addEventListener('click', () => { addToBasket(item) });
//        row.querySelector(".minus").addEventListener('click', () => { removeFromBasket(item) });

//        document.getElementById("itemList").appendChild(row);
//    });
//}

const removeFromBasket = (item) => {

    const storedArray = JSON.parse(sessionStorage.getItem('BasketArray'));
    const index = storedArray.findIndex(obj => obj.productId == item.productId);
    if (item.quantity == 1) {

        storedArray.splice(index, 1);

    }
    else {
        storedArray[index].quantity -= 1
    }
    sessionStorage.setItem('Basket', JSON.stringify(storedArray));
    document.getElementById("itemList").replaceChildren();

    drawSelectedProducts(storedArray)

}

const addToBasket = (item) => {

    item.quantity += 1;
    const storedArray = JSON.parse(sessionStorage.getItem('Basket'));
    const index = storedArray.findIndex(obj => obj.productId == item.productId);
    storedArray[index].quantity += 1
    sessionStorage.setItem('Basket', JSON.stringify(storedArray));

    document.getElementById("itemList").replaceChildren();
    drawSelectedProducts(storedArray)
}

const placeOrder = async () => {
    debugger
    let orderItems = [];
    const productsArray = JSON.parse(sessionStorage.getItem('Basket'));
    productsArray.forEach(p => {
        orderItem = { ProductId: p.productId, Quantity: p.quantity };
        orderItems.push(orderItem)
    });

    const orderItemToSend = {
        OrderDate: new Date(),
        OrderSum: parseInt(document.getElementById('totalAmount').innerHTML),
        UserId: JSON.parse(sessionStorage.getItem('user')).userId,
        OrderItems: orderItems,
    }

    const responsePost = await fetch('api/order', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderItemToSend)
    });

    if (responsePost.ok) {
        const dataPost = await responsePost.json();

        sessionStorage.removeItem('Basket')
        alert('Thank you buying in our shop...')
        window.location.href = 'Products.html'
    }
}

getBasketFromStorage()