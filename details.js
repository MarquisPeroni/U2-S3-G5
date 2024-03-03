const id = new URLSearchParams(window.location.search).get("idProdotto")

const container = document.getElementsByClassName("container")[0];

function create(src, title, description, brand, price) {
    container.innerHTML = `
    <img src=${src} alt="">
    <h1>${title}</h1>
    <p>${description}</p>
    <p>${brand}</p>
    <p>€ ${price}</p>
    `;
}
const apiKey =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxZDNhZDRjNTllYzAwMTk5MGQ4ZGYiLCJpYXQiOjE3MDkyOTg2MDUsImV4cCI6MTcxMDUwODIwNX0.mb1tywt7mUK6KjJ7LSC14VY6TgMaADn0jFNfPfzBsKI";

const url = "https://striveschool-api.herokuapp.com/api/product/"+id;

fetch(url, {
    method: "GET",
    headers: {
        Authorization: apiKey, 
        "Content-Type": "application/json",
    },
})
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            if (response.status === 400) {
                throw new Error ("Error 400 - Client Error");
            }
            if (response.status === 404) {
                throw new Error ("Error 404 - Data not found");
            }
            if (response.status === 500) {
                throw new Error ("Error 500 - Server Error");
            }
            throw new Error ("Error Data retrieval");
        }
    })
    .then((product) => {
        
        create (product.imageUrl, product.name, product.description, product.brand, product.price);
    })
    .catch((err) => console.log (err));