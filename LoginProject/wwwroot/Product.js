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
getCategories()
getAllProduct();
