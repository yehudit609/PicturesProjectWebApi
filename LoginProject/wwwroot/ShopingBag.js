//const drowBaskets = (baskets) => {
//    // Select the <tbody> element
//    const tbody = document.querySelector("#items tbody");

//    // Select the <template> element
//    const template = document.getElementById("temp-row");

//    // For each product, create a new row and add it to the <tbody>
//    baskets.forEach(product => {
//        const clone = template.content.cloneNode(true);
//        clone.querySelector(".itemName").textContent = product.productName;
//        clone.querySelector(".availabilityColumn div").textContent = product.description;
//        clone.querySelector(".itemName").textContent = product.productName,
//        clone.querySelector(".price").textContent = product.price;
//        tbody.appendChild(clone);
//    });
//}

const getBasketFromStorage = () => {
    const baskets = JSON.parse(sessionStorage.getItem("basket"));
    if (baskets)
        drowBasket(baskets);

}

const addOrder = async () => {
    const order = {
        userId: JSON.parse(sessionStorage.getItem('user')).userId,
        orderItems: JSON.parse(sessionStorage.getItem("basket")),
        OrderSum: JSON.parse(sessionStorage.getItem("sumToPay"))
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
        alert("הזמנה נוספה בהצלחה")
        clearStorage()
       
    }
}

clearStorage = () => {
    sessionStorage.removeItem('basket'),
        sessionStorage.removeItem('sumToPay')
    sessionStorage.removeItem("ItemsCountText")

 
}

function addToBasket2(prod) {
    const basket = JSON.parse(sessionStorage.getItem('basket')) || [];
    const productIndex = basket.findIndex(product => product.productId === prod.productId);
    console.log(productIndex)
    if (productIndex !== -1) {
        basket[productIndex].quaninty++;
    } else {
        prod = { ...prod, quaninty: 1 }
        basket.push(prod);
    }
    //updatesum
    sessionStorage.setItem('basket', JSON.stringify(basket));
    const currentSum = parseInt(document.getElementById('sum').textContent);
    const newSum = currentSum + prod.price;
    document.getElementById('sum').textContent = newSum;
    sessionStorage.setItem('sumToPay', newSum)

    //counter
    const current = parseInt(document.getElementById('ItemsCountText').textContent);
    const newCount = current + 1;
    document.getElementById('ItemsCountText').textContent = newCount;
    sessionStorage.setItem('ItemsCountText', newCount)
    //alert("פריט נוסף לסל בהצלחה")
}

// Function to remove a product from the basket
const removeFromBasket = (productId) => {
    console.log("removeFromBasket");
    const basket = JSON.parse(sessionStorage.getItem('basket')) || [];
    const count = sessionStorage.getItem('countItems') - 1 || 0;
    let sum = sessionStorage.getItem('sumToPay') || 0;

    const index = basket.findIndex(item => item.productId === productId);
    if (index !== -1) {
        let productPrice = basket[index].price;
        if (basket[index].quantity > 1) {
            basket[index].quantity--;
        } else {
            basket.splice(index, 1);
        }
        sessionStorage.setItem('basket', JSON.stringify(basket));
        sessionStorage.setItem('countItems', count);
        sum -= productPrice;
        sessionStorage.setItem('sumToPay', sum);
        
        const removedProduct = basket.find(item => item.productId === productId);
        if (removedProduct) {
            //    updateSum(-removedProduct.price);
        }
    } else {
        console.warn('Product not found in the basket');
    }
    drowBasket()
}

const drowBasket = (products) => {

const template = document.getElementById('temp-row');
const tbody = document.querySelector('tbody');  // Assuming tbody is the target container

products.forEach(product => {
    const clone = document.importNode(template.content, true);

    // Populate with product data

    clone.querySelector('img').src = `../Images/${product.picture.trim()}.jpg`;
    clone.querySelector('.itemName').textContent = product.productName;
    clone.querySelector('.itemNumber').textContent = product.quaninty;
    clone.querySelector('.itemDescription').textContent = product.description;
    clone.querySelector('.price').textContent = product.price * product.quaninty;
    //clone.querySelector('.viewLink').href += "#" + product.productId;  // Assuming you append the product id to the URL
    clone.querySelector('.removeButton').addEventListener('click', () => {
            removeFromBasket(product.productId);
            drowBasket(JSON.parse(sessionStorage.getItem('basket')) || []);
        });
        clone.querySelector('.addButton').addEventListener('click', () => {
            addToBasket2(product);
            drowBasket(JSON.parse(sessionStorage.getItem('basket')) || []);
        });

    tbody.appendChild(clone);
});
}

//const template = document.getElementById("temp-row");
//const tbody = document.querySelector("#items tbody");
//tbody.innerHTML = ''; // Clear the existing items

//items.forEach(product => {
//    const clone = document.importNode(template.content, true);
//    clone.querySelector(".itemName").textContent = product.productName;
//    clone.querySelector(".availabilityColumn div").textContent = product.availability;
//    clone.querySelector(".price").textContent = product.price.toFixed(2) * product.quantity.toFixed(2);
//    console.log(product)
//    clone.querySelector(".ii").textContent = product.quantity


//    // Capture the productId to use for removal
//    clone.querySelector('.removeButton').addEventListener('click', () => {
//        removeFromBasket(product.productId);
//        drawBasketProducts(JSON.parse(sessionStorage.getItem('basketArray')) || []);
//    });
//    clone.querySelector('.addButton').addEventListener('click', () => {
//        addToBasket(product);
//        drawBasketProducts(JSON.parse(sessionStorage.getItem('basketArray')) || []);
//    });

//    tbody.appendChild(clone);
//});




const updateBasket = () => {
    const sumToPay = sessionStorage.getItem("sumToPay");
    const countItems = sessionStorage.getItem("ItemsCountText");
    const currentSumElement = document.getElementById('totalAmount');
    const totalAmountElement = document.getElementById('itemCount');

    if (currentSumElement && sumToPay !== null) {
        currentSumElement.textContent = parseInt(sumToPay) || 0; // default to 0 if parse returns NaN
    }

    if (totalAmountElement && countItems !== null) {
        totalAmountElement.textContent = parseInt(countItems) || 0;
    }
}




updateBasket()

getBasketFromStorage()





