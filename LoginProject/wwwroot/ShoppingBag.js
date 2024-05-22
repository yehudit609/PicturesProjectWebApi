
const getBasketFromStorage = () => {
    const items = JSON.parse(sessionStorage.getItem('basketArray'));
    console.log(items)
    drawBasketProducts(items);
}


const drawBasketProducts = (items) => {
    const template = document.getElementById("temp-row");
    const tbody = document.querySelector("#items tbody");
    items.forEach(product => {
        const clone = document.importNode(template.content, true);
        clone.querySelector(".itemName").textContent = product.name;
        clone.querySelector(".availabilityColumn div").textContent = product.availability;
        clone.querySelector(".price").textContent = product.price;

        tbody.appendChild(clone);
    });

    const arr = JSON.parse(sessionStorage.getItem('basketArray'));
    console.log(arr)
    //drawSelectedProducts(arr);
}

const clearBasket = () => {
    sessionStorage.removeItem('basketArray');
    sessionStorage.removeItem('sumToPay');
    getBasketFromStorage();
}

const addOrder = async () => {
    const order = {
        //orderSum: document.getElementById("sum").value,
        //orderSum: 20,
        userId: JSON.parse(sessionStorage.getItem('user')).userId,
        orderItems: JSON.parse(sessionStorage.getItem('basketArray'))
    }
    const response = await fetch("api/order", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    });
    const data = await response.json()
    if (response.ok == false) {

        throw new Error(`error! status:${response.status}`)
    }
    else {
        alert("add order")
        clearBasket();
        updateSum1()
        sessionStorage.removeItem("basketArray")
        return data.orderId
        window.location.href = "products.html"
    }

}

const placeOrder = async () => {
    debugger
    let orderItems = [];
    const productsArray = JSON.parse(sessionStorage.getItem('basketArray'));
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

        sessionStorage.removeItem('basketArray')
        alert('Thank you buying in our shop...')
        window.location.href = 'Products.html'
    }
}


getBasketFromStorage();

