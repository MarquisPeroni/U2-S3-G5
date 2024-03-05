const apiKey =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWMwZjRjNTllYzAwMTk5MGQ2ZjkiLCJpYXQiOjE3MDk2NjA0NDAsImV4cCI6MTcxMDg3MDA0MH0.wFDetwDPbXS5nKbA2Sp2pweqgzbVnkJJ1ei_RVH7pko";
const url = "https://striveschool-api.herokuapp.com/api/product/";
const form = document.querySelector("form");
const btnSubmit = document.getElementsByClassName("btn-primary")[0];
const title = document.getElementById("title");
const description = document.getElementById("description");
const brand = document.getElementById("brand");
const imgUrl = document.getElementById("img");
const price = document.getElementById("price");

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
        document.getElementById("title").value = product.name;
        document.getElementById("description").value = product.description;
        document.getElementById("brand").value = product.brand;
        document.getElementById("img").value = product.imageUrl;
        document.getElementById("price").value = product.price;
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
        alert("Product Added successfully")
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
        document.getElementById("title").value = updatedProduct.name;
        document.getElementById("description").value = updatedProduct.description;
        document.getElementById("brand").value = updatedProduct.brand;
        document.getElementById("img").value = updatedProduct.imageUrl;
        document.getElementById("price").value = updatedProduct.price;
        alert("Announce modified successfully");
    })
    .catch((err) => console.log(err));
}
function getDeletedCardIds() {
    const deletedCardIds = localStorage.getItem("deletedCardIds");
    return deletedCardIds ? JSON.parse(deletedCardIds) : [];
}


