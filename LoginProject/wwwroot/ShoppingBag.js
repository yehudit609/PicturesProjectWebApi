
////const getBasketFromStorage = () => {
////    const items = JSON.parse(sessionStorage.getItem('basketArray'));
////    console.log(items)
////    drawBasketProducts(items);
////}


////const drawBasketProducts = (items) => {
////    const template = document.getElementById("temp-row");
////    const tbody = document.querySelector("#items tbody");
////    items.forEach(product => {
////        const clone = document.importNode(template.content, true);
////        clone.querySelector(".itemName").textContent = product.name;
////        clone.querySelector(".availabilityColumn div").textContent = product.availability;
////        clone.querySelector(".price").textContent = product.price;

////        tbody.appendChild(clone);
////    });

////    const arr = JSON.parse(sessionStorage.getItem('basketArray'));
////    console.log(arr)
////    //drawSelectedProducts(arr);
////}

////const clearBasket = () => {
////    sessionStorage.removeItem('basketArray');
////    sessionStorage.removeItem('sumToPay');
////    getBasketFromStorage();
////}

////const addOrder = async () => {
////    const order = {

////        userId: JSON.parse(sessionStorage.getItem('user')).userId,
////        orderItems: JSON.parse(sessionStorage.getItem('basketArray')),
////        orderSum: JSON.parse(sessionStorage.getItem('sumToPay'))
////    }
////    const response = await fetch("api/order", {
////        method: 'POST',
////        headers: {
////            'Content-Type': 'application/json'
////        },
////        body: JSON.stringify(order)
////    });
////    const data = await response.json()
////    if (response.ok == false) {

////        throw new Error(`error! status:${response.status}`)
////    }
////    else {
////        alert("add order")
////        clearBasket();
////        updateSum1()
////        sessionStorage.removeItem("basketArray")
////        return data.orderId
////        window.location.href = "products.html"
////    }

////}



////const placeOrder = async () => {
////    debugger
////    let orderItems = [];
////    const productsArray = JSON.parse(sessionStorage.getItem('basketArray'));
////    productsArray.forEach(p => {
////        orderItem = { ProductId: p.productId, Quantity: p.quantity };
////        orderItems.push(orderItem)
////    });

////    const orderItemToSend = {
////        OrderDate: new Date(),
////        OrderSum: parseInt(document.getElementById('totalAmount').innerHTML),
////        UserId: JSON.parse(sessionStorage.getItem('user')).userId,
////        OrderItems: orderItems,
////    }

////    const responsePost = await fetch('api/order', {

////        method: 'POST',
////        headers: {
////            'Content-Type': 'application/json'
////        },
////        body: JSON.stringify(orderItemToSend)
////    });

////    if (responsePost.ok) {
////        const dataPost = await responsePost.json();

////        sessionStorage.removeItem('basketArray')
////        alert('Thank you buying in our shop...')
////        window.location.href = 'Products.html'
////    }
////}


////getBasketFromStorage();

//const placeOrder = async () => {
//    const sumElement = document.getElementById('sum');
//    if (!sumElement) {
//        console.error("Element with ID 'sum' does not exist.");
//        return;
//    }

//    let orderItems = [];
//    const productsArray = JSON.parse(sessionStorage.getItem('basketArray'));
//    if (!productsArray) {
//        console.error("No products in the basket.");
//        alert("Your basket is empty.");
//        return;
//    }

//    productsArray.forEach(p => {
//        const orderItem = { ProductId: p.productId, Quantity: p.quantity };
//        orderItems.push(orderItem);
//    });

//    const orderItemToSend = {
//        OrderDate: new Date(),
//        OrderSum: parseFloat(sumElement.innerHTML),
//        UserId: JSON.parse(sessionStorage.getItem('user')).userId,
//        OrderItems: orderItems,
//    }

//    try {
//        const responsePost = await fetch('api/order', {
//            method: 'POST',
//            headers: {
//                'Content-Type': 'application/json'
//            },
//            body: JSON.stringify(orderItemToSend)
//        });

//        if (responsePost.ok) {
//            const dataPost = await responsePost.json();
//            sessionStorage.removeItem('basketArray');
//            alert('Thank you for buying in our shop...');
//            window.location.href = 'Products.html';
//        } else {
//            console.error('Error placing order:', responsePost.status, responsePost.statusText);
//            alert('Failed to place order. Please try again.');
//        }
//    } catch (error) {
//        console.error('Error placing order:', error);
//        alert('Failed to place order. Please try again.');
//    }
//}

//const getBasketFromStorage = () => {
//    const items = JSON.parse(sessionStorage.getItem('basketArray'));
//    console.log(items);
//    if (items) {
//        drawBasketProducts(items);
//    }
//}


//const removeFromBasket = (productId) => {
//    console.log("removeFromBasket");
//    const basket = JSON.parse(sessionStorage.getItem('basketArray')) || [];

//    const index = basket.findIndex(item => item.productId === productId);
//    if (index !== -1) {
//        if (basket[index].quantity > 1) {
//            basket[index].quantity--;
//        } else {
//            basket.splice(index, 1);
//        }
//        sessionStorage.setItem('basketArray', JSON.stringify(basket));

//        const removedProduct = basket.find(item => item.productId === productId);
//        if (removedProduct) {
//            updateSum(-removedProduct.price);
//        }

//        updateCount(-1); // Decrease count by 1
//    } else {
//        console.warn('Product not found in the basket');
//    }
//}

//const drawBasketProducts = (items) => {
//    const template = document.getElementById("temp-row");
//    const tbody = document.querySelector("#items tbody");
//    tbody.innerHTML = ''; // Clear the existing items

//    items.forEach(product => {
//        const clone = document.importNode(template.content, true);
//        clone.querySelector(".itemName").textContent = product.productName;
//        clone.querySelector(".availabilityColumn div").textContent = product.availability;
//        clone.querySelector(".price").textContent = product.price * product.quantity;
//        console.log(product)
//        clone.querySelector(".ii").textContent = product.quantity
       



//        // Capture the productId to use for removal
//        clone.querySelector('.removeButton').addEventListener('click', () => {
//            removeFromBasket(product.productId);

//            drawBasketProducts(JSON.parse(sessionStorage.getItem('basketArray')) || []);
//        });
//        clone.querySelector('.addButton').addEventListener('click', () => {
//            addToBasket(product);

//            drawBasketProducts(JSON.parse(sessionStorage.getItem('basketArray')) || []);
//        });

//        tbody.appendChild(clone);
//    });
//}

//const clearBasket = () => {
//    sessionStorage.removeItem('basketArray');
//    sessionStorage.removeItem('pay');
//    getBasketFromStorage();
//}

//// Other functions remain unchanged.



