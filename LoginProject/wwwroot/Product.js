const drawProducts = (products) => {
    const template = document.getElementById('temp-card');
    products.forEach(product => {
        const clone = template.content.cloneNode(true);

        clone.querySelector('img').src = `../Images/${product.description.trim()}.jpg`;
        clone.querySelector('h1').textContent = product.productName;
        clone.querySelector('.price').textContent = product.price;
        clone.querySelector('.description').textContent = product.description;

        clone.querySelector('button').addEventListener('click', () => {

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
        //row.querySelector('button').addEventListener('click', () => { addToBasket(product) });

        document.getElementById("PoductList").appendChild(row);

        /*cln.querySelector(".totalColumn").addEventListener('click', () => { deleteItem(prod[i]) });*/
    });
    /*})*/
}

getAllProduct();
