
let categoryArr = [];

const addToBasket = (prod) => {
    console.log("addToBasket")
    const basket = JSON.parse(sessionStorage.getItem('basketArray')) || [];

    const index = basket.findIndex(item => item.productId === prod.productId);
    if (index !== -1) {
        basket[index].quantity++;
    } else {
        prod = {...prod, quantity: 1 };
        basket.push(prod);
    }

    sessionStorage.setItem('basketArray', JSON.stringify(basket));
    updateSum(prod.price)
}



//const getBasketFromStorage = () => {
//    const items = JSON.parse(sessionStorage.getItem('basketArray'));
//    console.log(items)
//    drawBasketProducts(items);
//}


//const drawBasketProducts = (items) => {
//    const template = document.getElementById("temp-row");
//    const tbody = document.querySelector("#items tbody");
//    items.forEach(product => {
//        const clone = document.importNode(template.content, true);
//        clone.querySelector(".itemName").textContent = product.name;
//        clone.querySelector(".availabilityColumn div").textContent = product.availability;
//        clone.querySelector(".price").textContent = product.price;

//        tbody.appendChild(clone);
//    });

//    const arr = JSON.parse(sessionStorage.getItem('basketArray'));
//    console.log(arr)
//    //drawSelectedProducts(arr);
//}

//const clearBasket = () => {
//    sessionStorage.removeItem('basketArray');
//    sessionStorage.removeItem('sumToPay');
//    getBasketFromStorage();
//}

//const addOrder = async () => {
//    const order = {

//        userId: JSON.parse(sessionStorage.getItem('user')).userId,
//        orderItems: JSON.parse(sessionStorage.getItem('basketArray')),
//        orderSum: JSON.parse(sessionStorage.getItem('sumToPay'))
//    }
//    const response = await fetch("api/order", {
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json'
//        },
//        body: JSON.stringify(order)
//    });
//    const data = await response.json()
//    if (response.ok == false) {

//        throw new Error(`error! status:${response.status}`)
//    }
//    else {
//        alert("add order")
//        clearBasket();
//        updateSum1()
//        sessionStorage.removeItem("basketArray")
//        return data.orderId
//        window.location.href = "products.html"
//    }

//}



//const placeOrder = async () => {
//    debugger
//    let orderItems = [];
//    const productsArray = JSON.parse(sessionStorage.getItem('basketArray'));
//    productsArray.forEach(p => {
//        orderItem = { ProductId: p.productId, Quantity: p.quantity };
//        orderItems.push(orderItem)
//    });

//    const orderItemToSend = {
//        OrderDate: new Date(),
//        OrderSum: parseInt(document.getElementById('totalAmount').innerHTML),
//        UserId: JSON.parse(sessionStorage.getItem('user')).userId,
//        OrderItems: orderItems,
//    }

//    const responsePost = await fetch('api/order', {

//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json'
//        },
//        body: JSON.stringify(orderItemToSend)
//    });

//    if (responsePost.ok) {
//        const dataPost = await responsePost.json();

//        sessionStorage.removeItem('basketArray')
//        alert('Thank you buying in our shop...')
//        window.location.href = 'Products.html'
//    }
//}


//getBasketFromStorage();

const placeOrder = async () => {
    const sumElement = document.getElementById('sum');
    if (!sumElement) {
        console.error("Element with ID 'sum' does not exist.");
        return;
    }

    let orderItems = [];
    const productsArray = JSON.parse(sessionStorage.getItem('basketArray'));
    if (!productsArray) {
        console.error("No products in the basket.");
        alert("Your basket is empty.");
        return;
    }

    productsArray.forEach(p => {
        const orderItem = { ProductId: p.productId, Quantity: p.quantity };
        orderItems.push(orderItem);
    });

    const orderItemToSend = {
        OrderDate: new Date(),
        OrderSum: parseFloat(sumElement.innerHTML),
        UserId: JSON.parse(sessionStorage.getItem('user')).userId,
        OrderItems: orderItems,
    }

    try {
        const responsePost = await fetch('api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderItemToSend)
        });

        if (responsePost.ok) {
            const dataPost = await responsePost.json();
            sessionStorage.removeItem('basketArray');
            alert('Thank you for buying in our shop...');
            window.location.href = 'Products.html';
        } else {
            console.error('Error placing order:', responsePost.status, responsePost.statusText);
            alert('Failed to place order. Please try again.');
        }
    } catch (error) {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again.');
    }
}

const getBasketFromStorage = () => {
    const items = JSON.parse(sessionStorage.getItem('basketArray'));
    console.log(items);
    if (items) {
        drawBasketProducts(items);
    }
}


const removeFromBasket = (productId) => {
    console.log("removeFromBasket");
    const basket = JSON.parse(sessionStorage.getItem('basketArray')) || [];

    const index = basket.findIndex(item => item.productId === productId);
    if (index !== -1) {
        if (basket[index].quantity > 1) {
            basket[index].quantity--;
        } else {
            basket.splice(index, 1);
        }
        sessionStorage.setItem('basketArray', JSON.stringify(basket));

        const removedProduct = basket.find(item => item.productId === productId);
        if (removedProduct) {
            updateSum(-removedProduct.price);
        }

        updateCount(-1); // Decrease count by 1
    } else {
        console.warn('Product not found in the basket');
    }
}

const drawBasketProducts = (items) => {
    const template = document.getElementById("temp-row");
    const tbody = document.querySelector("#items tbody");
    tbody.innerHTML = ''; // Clear the existing items

    items.forEach(product => {
        const clone = document.importNode(template.content, true);
        clone.querySelector(".itemName").textContent = product.productName;
        clone.querySelector(".availabilityColumn div").textContent = product.availability;
        clone.querySelector(".price").textContent = product.price * product.quantity;
        console.log(product)
        clone.querySelector(".ii").textContent = product.quantity



        debugger;
        // Capture the productId to use for removal
        clone.querySelector('.removeButton').addEventListener('click', () => {
            removeFromBasket(product.productId);

            drawBasketProducts(JSON.parse(sessionStorage.getItem('basketArray')) || []);
        });
        clone.querySelector('.addButton').addEventListener('click', () => {
            addToBasket(product);

            drawBasketProducts(JSON.parse(sessionStorage.getItem('basketArray')) || []);
        });

        tbody.appendChild(clone);
    });
}

const clearBasket = () => {
    sessionStorage.removeItem('basketArray');
    sessionStorage.removeItem('pay');
    getBasketFromStorage();
}

// Other functions remain unchanged.






const updateSum = async (sum) => {
    //const sum1 = sessionStorage.getItem('sumToPay') || 0;
    const currentSum = parseInt(document.getElementById('sum').textContent);
    const newSum = currentSum + sum;
    document.getElementById('sum').textContent = newSum;
    sessionStorage.setItem('sumToPay', newSum)
}

//const updateSum1 = async () => {
//    const sum = sessionStorage.getItem('sumToPay');
//    const currentSum = parseInt(document.getElementById('sum1').textContent);
//    const newSum = currentSum + sum;
//    document.getElementById('sum1').textContent = newSum;
//    sessionStorage.setItem('sumToPay', newSum)
//}


const getCategories = async () => {
    const responseGet = await fetch('api/Category')

    if (responseGet.ok) {
        const dataGet = await responseGet.json();
        /*categoryArr = await responseGet.json();*/
        console.log(dataGet)
        drawCategories(dataGet)
    }
}


const drawCategories = (arr) => {
    //debugger;
    const template = document.getElementById("temp-category");

    arr.forEach(category => {
        const card = template.content.cloneNode(true)
        card.querySelector('.opt').id = category.categoryId
        card.querySelector('.opt').value = category.categoryName
        card.querySelector('label').for = category.categoryName
        card.querySelector('.OptionName').textContent = category.categoryName
        card.querySelector('.opt').addEventListener("change", (event) => { filterCategories(event, category) })

        document.getElementById("categoryList").appendChild(card)
    })
}

const filterProducts = async () => {
    const maxPrice = document.getElementById("maxPrice").value;
    const minPrice = document.getElementById("minPrice").value;
    const productName = document.getElementById("nameSearch").value;
    let c = ''
    categoryArr.forEach(e => c += `&categoryIds=${e}`)
    //console.log(categoryArr[0])
    //const responseGet = await fetch(`api/product?minPrice=${minPrice}&maxPrice=${maxPrice}&description=${description}${categories}`);

    const responsePost = await fetch(`api/Product?minPrice=${minPrice}&maxPrice=${maxPrice}&desc=${productName}${c}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const dataPost = await responsePost.json();
    console.log(dataPost)
    document.getElementById("ProductList").replaceChildren();
    drawProducts(dataPost);

}

const filterCategories = async (event, category) => {
    //debugger
    if (event.target.checked) {
        categoryArr.push(category.categoryId)
        filterProducts();
    }
    else {
        categoryArr.splice(categoryArr.indexOf(category.categoryId), 1)
        filterProducts();
    }

}

const drawProducts = (products) => {
    const template = document.getElementById('temp-card');
    products.forEach(product => {
        const clone = template.content.cloneNode(true);

        clone.querySelector('img').src = `../Images/${product.description.trim()}.jpg`;
        clone.querySelector('h1').textContent = product.productName;
        clone.querySelector('.price').textContent = product.price;
        clone.querySelector('.description').textContent = product.description;

        clone.querySelector('button').addEventListener('click', () => {
            console.log(product)
            addToBasket(product);
            console.log('Product added to cart:', product.description);
        });

        document.getElementById('ProductList').appendChild(clone);
    });
}








const getAllProduct = async () => {
    const responseGet = await fetch('api/Product')
    if (responseGet.ok) {
        const dataGet = await responseGet.json();
        console.log(dataGet)
        drawProducts(dataGet)
    }
}



const drawBasket = () => {
    const productsArr = JSON.parse(sessionStorage.getItem("basket"));
    const template = document.getElementById('temp-row');
    productsArr.forEach(product => {
        const row = template.content.cloneNode(true);
        row.querySelector(".price").innerText = product.price;
        row.querySelector(".image").src = '../Images/' + product.imageUrl;
        row.querySelector(".descriptionColumn").innerText = product.description;
        row.querySelector('img').src = '../Images/' + product.imageUrl;
        document.getElementById("PoductList").appendChild(row);
    });

}
const pay = () => {
    const sumElement = document.getElementById('sum');
    if (sumElement && sessionStorage.getItem("sumToPay") !== null) {
        sumElement.textContent = sessionStorage.getItem("sumToPay");
    }
};



// Call updateSum function every 1 second
setInterval(pay, 50);
// Update immediately on load
pay();
getBasketFromStorage();
getCategories()
getAllProduct();






//let categoryArr = [];

//const addToBasket = (prod) => {

//    console.log("addToBasket");
//    const basket = JSON.parse(sessionStorage.getItem('basketArray')) || [];

//    const index = basket.findIndex(item => item.productId === prod.productId);
//    if (index !== -1) {
//        basket[index].quantity++;
//    } else {
//        prod = { ...prod, quantity: 1 };
//        basket.push(prod);
//    }

//    sessionStorage.setItem('basketArray', JSON.stringify(basket));
//    updateSum(prod.price);
//    updateCount();
//}

//// Function to remove a product from the basket
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
//let globalSum = 0;
//// Function to update the count of items in the basket
//const updateCount = () => {
//    const currentCount = parseInt(document.getElementById('ItemsCountText').textContent) || 0;
//    const newCount = currentCount + 1;
//    document.getElementById('ItemsCountText').textContent = newCount;
//}

//// Function to update the total sum
//const updateSum = (sum) => {
//    const currentSum = parseFloat(document.getElementById('sum').textContent) || 0;
//    console.log(currentSum);
//    const newSum = currentSum + sum;
//    document.getElementById('sum').textContent = newSum.toFixed(2);
//    globalSum = newSum;
//    sessionStorage.setItem('pay', globalSum);

//}
//const getCategories = async () => {

//    const responseGet = await fetch('api/Category')
//    if (responseGet.ok) {
//        const dataGet = await responseGet.json();
//        /*categoryArr = await responseGet.json();*/
//        console.log(dataGet)
//        drawCategories(dataGet)
//    }
//}


//const drawCategories = (arr) => {
//    //debugger;
//    const template = document.getElementById("temp-category");

//    arr.forEach(category => {
//        const card = template.content.cloneNode(true)
//        card.querySelector('.opt').id = category.categoryId
//        card.querySelector('.opt').value = category.categoryName
//        card.querySelector('label').for = category.categoryName
//        card.querySelector('.OptionName').textContent = category.categoryName
//        card.querySelector('.opt').addEventListener("change", (event) => { filterCategories(event, category) })

//        document.getElementById("categoryList").appendChild(card)
//    })
//}

//const filterProducts = async () => {
//    const maxPrice = document.getElementById("maxPrice").value;
//    const minPrice = document.getElementById("minPrice").value;
//    const productName = document.getElementById("nameSearch").value;
//    let c = ''
//    categoryArr.forEach(e => c += `&categoryIds=${e}`)
//    //console.log(categoryArr[0])
//    //const responseGet = await fetch(`api/product?minPrice=${minPrice}&maxPrice=${maxPrice}&description=${description}${categories}`);

//    const responsePost = await fetch(`api/Product?minPrice=${minPrice}&maxPrice=${maxPrice}&desc=${productName}${c}`, {
//        method: 'GET',
//        headers: {
//            'Content-Type': 'application/json'
//        }
//    });

//    const dataPost = await responsePost.json();
//    console.log(dataPost)
//    document.getElementById("ProductList").replaceChildren();
//    drawProducts(dataPost);

//}

//const filterCategories = async (event, category) => {
//    if (event.target.checked) {

//        categoryArr.push(category.categoryId)
//        filterProducts();
//    }
//    else {
//        categoryArr.splice(categoryArr.indexOf(category.categoryId), 1)
//        filterProducts();
//    }

//}
//// Function to draw products list
//const drawProducts = (products) => {
//    const template = document.getElementById('temp-card');
//    products.forEach(product => {
//        const clone = template.content.cloneNode(true);
//        console.log(product.picture)
//        clone.querySelector('img').src = `../Images/${product.picture.trim()}.jpg`;
//        clone.querySelector('h1').textContent = product.productName;
//        clone.querySelector('.price').textContent = product.price;
//        clone.querySelector('.description').textContent = product.description;
//        clone.querySelector('button').addEventListener('click', () => {
//            addToBasket(product);
//            console.log('Product added to cart:', product.description);
//        });

//        document.getElementById('ProductList').appendChild(clone);
//    });
//}

//// Function to fetch all products
//const getAllProduct = async () => {
//    const responseGet = await fetch('api/Product');
//    if (responseGet.ok) {
//        const dataGet = await responseGet.json();
//        console.log(dataGet);
//        drawProducts(dataGet);
//    }
//}

//// Function to draw basket items
//const drawBasket = () => {
//    const productsArr = JSON.parse(sessionStorage.getItem('basketArray')) || [];
//    const template = document.getElementById('temp-row');

//    const basketList = document.getElementById('BasketList');
//    basketList.innerHTML = ''; // Clear existing items

//    productsArr.forEach(product => {
//        const row = template.content.cloneNode(true);
//        row.querySelector(".price").innerText = product.price;
//        row.querySelector(".ii").innerText = product.quantity;
//        row.querySelector(".descriptionColumn").innerText = product.description;
//        if (product.imageUrl) {
//            row.querySelector("img").src = '../Images/' + product.imageUrl
//        }

//        // Attach the remove event listener to the button
//        row.querySelector('.removeButton').addEventListener('click', () => {
//            removeFromBasket(product.productId);
//            drawBasket();
//        });

//        basketList.appendChild(row);
//    });
//}

//// Fetch and display all products initially

///*************************************************************************************************** */


//getCategories();
//getAllProduct();
