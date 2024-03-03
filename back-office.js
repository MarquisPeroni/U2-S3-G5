const apiKey =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxZDNhZDRjNTllYzAwMTk5MGQ4ZGYiLCJpYXQiOjE3MDkyOTg2MDUsImV4cCI6MTcxMDUwODIwNX0.mb1tywt7mUK6KjJ7LSC14VY6TgMaADn0jFNfPfzBsKI";
const url = "https://striveschool-api.herokuapp.com/api/product/";
const form = document.querySelector("form");
const btnSubmit = document.getElementsByClassName("btn-primary")[0];
const title = document.getElementById("Titolo");
const description = document.getElementById("Descrizione");
const brand = document.getElementById("brand");
const imgUrl = document.getElementById("img");
const price = document.getElementById("prezzo");

const id = new URLSearchParams(window.location.search).get("idProdotto"); 

if(id !== null) {
    btnSubmit.className = "btn btn-warning";
    btnSubmit.textContent = "Modify";

    fetch(url + id, {
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
        console.log(product);
        document.getElementById("Titolo").value = product.name;
        document.getElementById("Descrizione").value = product.description;
        document.getElementById("brand").value = product.brand;
        document.getElementById("img").value = product.imageUrl;
        document.getElementById("prezzo").value = product.price;
    })
    .catch((err) => console.log(err));
        form.addEventListener("submit", function (event) {
        event.preventDefault();
        putFetch(id);
    });
    btnSubmit.onclick = function () {};
} else {
    btnSubmit.className = "btn btn-primary";
    btnSubmit.textContent = "Submit";
    form.addEventListener("submit", function (event) {
    event.preventDefault();
    postData();
    });
}

function postData() {

    const data = {
        name: title.value,
        description: description.value,
        brand: brand.value,
        imageUrl: imgUrl.value,
        price: price.value
    };

    const storedData = JSON.parse(localStorage.getItem("storedData")) || [];
    storedData.push({ id: generateId(), ...data });
    localStorage.setItem("storedData", JSON.stringify(storedData));

    function generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
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
    .then((newAppointment) => {
        alert("Prodotto aggiunto con successo")
        form.reset();
    })
    .catch((err) => console.log(err));
}

function putFetch(id) {

    const data = {
        name: title.value,
        description: description.value,
        brand: brand.value,
        imageUrl: imgUrl.value,
        price: price.value
    };

    fetch(url + id, {
        method: "PUT",
        body: JSON.stringify(data),
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
    .then((updatedProduct) => {
        console.log(updatedProduct);
        document.getElementById("Titolo").value = updatedProduct.name;
        document.getElementById("Descrizione").value = updatedProduct.description;
        document.getElementById("brand").value = updatedProduct.brand;
        document.getElementById("img").value = updatedProduct.imageUrl;
        document.getElementById("prezzo").value = updatedProduct.price;
        alert("L'Annuncio è stato modificato correttamente");
    })
    .catch((err) => console.log(err));
}
function getDeletedCardIds() {
    const deletedCardIds = localStorage.getItem("deletedCardIds");
    return deletedCardIds ? JSON.parse(deletedCardIds) : [];
}


