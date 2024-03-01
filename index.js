document.addEventListener("DOMContentLoaded", () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWMwZjRjNTllYzAwMTk5MGQ2ZjkiLCJpYXQiOjE3MDkyODQzNjcsImV4cCI6MTcxMDQ5Mzk2N30.ATRYa2j1X8KBd3VeOu8dXodcRbT4FtQeboMHnIcLweo";
    const apiEndpoint = "https://striveschool-api.herokuapp.com/api/product/";
    const getProduct = async () => {
        try {
            const response = await fetch(apiEndpoint, {
                headers: { 
                    Authorization: `Bearer ${token}`
                }
            });
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error("Errore durante il recupero dei prodotti:", error);
        }
    };   
    
    const displayProducts = (products) => {
        const productsListElement = document.getElementById("productsList");
        productsListElement.innerHTML = "";

        products.forEach(product => {
            const productCard = createProductCard(product);
            productsListElement.appendChild(productCard);
        });
    };

    const createProductCard = (product) => {
        const card = document.createElement('div');
        card.classList.add('col-md-3', 'mb-4', "d-flex");

        card.innerHTML = `
        <div class="card">
        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">Prezzo: ${product.price} €</p>
            <a href="productDetail.html?id=${product._id}" class="btn btn-primary mt-auto">Dettagli</a>
        </div>
    </div>
        `;

        return card;
    };

    getProduct();
});