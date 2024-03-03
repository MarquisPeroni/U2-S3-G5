const row = document.getElementsByClassName("row")[0];

const apiKey =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxZDNhZDRjNTllYzAwMTk5MGQ4ZGYiLCJpYXQiOjE3MDkyOTg2MDUsImV4cCI6MTcxMDUwODIwNX0.mb1tywt7mUK6KjJ7LSC14VY6TgMaADn0jFNfPfzBsKI";

const url = "https://striveschool-api.herokuapp.com/api/product/";

function createCard(image, title, description, id) {
    const col = document.createElement("div");
    col.className = "col-6 col-md-3";

    const card = document.createElement("div");
    card.className = "card";
    card.style.height = "100%";

    const img = document.createElement("img");
    img.className = "card-img-top object-fit-cover";
    img.src = image;
    img.style.height = "70%";

    const body = document.createElement("div");
    body.className = "card-body";

    const h5 = document.createElement("h5");
    h5.className = "card-title";
    h5.textContent = title;

    const p = document.createElement("p");
    p.className = "card-text";
    p.textContent = description;

    const btnDetail = document.createElement("a");
    btnDetail.href = `/details.html?idProdotto=${id}`;
    btnDetail.className = "btn btn-secondary me-1";
    btnDetail.innerText = "Info";

    const btnModify = document.createElement("a");
    btnModify.href = `/back-office.html?idProdotto=${id}`;
    btnModify.className = "btn btn-success me-1";
    btnModify.innerText = "Modify";

    row.appendChild(col);
    col.appendChild(card);
    card.appendChild(img);
    card.appendChild(body);
    body.appendChild(h5);
    body.appendChild(p);
    body.appendChild(btnDetail);
    body.appendChild(btnModify);
}

fetch(url, {
    method: "GET",
    headers:{
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
        newAppointment.forEach((object) => {
            createCard(object.imageUrl, object.name, object.description, object._id);
        });
    })
    .catch((err) => console.log(err));

    