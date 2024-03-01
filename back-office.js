    // document.addEventListener("DOMContentLoaded", () => {
    //     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWMwZjRjNTllYzAwMTk5MGQ2ZjkiLCJpYXQiOjE3MDkyODQzNjcsImV4cCI6MTcxMDQ5Mzk2N30.ATRYa2j1X8KBd3VeOu8dXodcRbT4FtQeboMHnIcLweo";
    //     const apiEndpoint = "https://striveschool-api.herokuapp.com/api/product/";
    //     const productForm = document.getElementById("productForm");
    //     const editProductBtn = document.getElementById("editProductBtn");
    //     const deleteProductBtn = document.getElementById("deleteProductBtn");

    //     let isEditMode = false;

    
    //     function setEditMode(editMode) {
    //         isEditMode = editMode;
    //         editProductBtn.style.display = isEditMode ? "block" : "none";
    //         deleteProductBtn.style.display = isEditMode ? "block" : "none";
    //     }
    
    //     productForm.addEventListener("submit", async (e) => {
    //         e.preventDefault();
    
    //         const productName = document.getElementById("productName").value;
    //         const productDescription = document.getElementById('productDescription').value;
    //         const productBrand = document.getElementById('productBrand').value;
    //         const productImageUrl = document.getElementById('productImageUrl').value;
    //         const productPrice = document.getElementById('productPrice').value;
    //         const productId = document.getElementById('productId').value;
            
    
    //         const newProduct = {
    //             name: productName,
    //             description: productDescription,
    //             brand: productBrand,
    //             imageUrl: productImageUrl,
    //             price: parseFloat(productPrice),
    //         };
    
    //         try {
    //             let response;
    //             if (productId) {
    //                 response = await fetch(apiEndpoint + productId, {
    //                     method: "PUT",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                     body: JSON.stringify(newProduct),
    //                 });
    //             } else {
    //                 response = await fetch(apiEndpoint, {
    //                     method: "POST",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                     body: JSON.stringify(newProduct),
    //                 });
    //             }
    
    //             if (response.ok) {
    //                 console.log("Prodotto salvato con successo!", newProduct);
    //                 productForm.reset();
    //                 document.getElementById('productId').value = "";
    //             } else {
    //                 console.error("Errore durante l'operazione:", response.statusText);
    //             }
    //         } catch (error) {
    //             console.error("Errore durante l'operazione:", error);
    //         }
    //     });
    
    //     editProductBtn.addEventListener("click", async () => {
    //         const productId = document.getElementById("productId").value;

    //         console.log("ID del prodotto:", productId);
    
            
    //         if (productId) {
    //             try {
    //                 const response = await fetch(apiEndpoint + productId, {
    //                     method: "PUT", 
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                     body: JSON.stringify(newProduct),
    //                 });
    
    //                 if (response.ok) {
    //                     console.log("Prodotto aggiornato con successo!", newProduct);
    //                 } else {
    //                     console.error("Errore durante l'aggiornamento del prodotto:", response.statusText);
    //                 }
    //             } catch (error) {
    //                 console.error("Errore durante l'aggiornamento del prodotto:", error);
    //             }
    //         } else {
    //             console.error("ID del prodotto non valido per l'aggiornamento.");
    //         }
    //     });

    //     deleteProductBtn.addEventListener("click", async () => {
    //         const productId = document.getElementById("productId").value;
    
    //         if (productId) {
    //             try {
    //                 const response = await fetch(apiEndpoint + productId, {
    //                     method: "DELETE", 
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                 });
    
    //                 if (response.ok) {
    //                     console.log("Prodotto cancellato con successo!");
    //                     productForm.reset();
    //                     document.getElementById('productId').value = "";
    //                 } else {
    //                     console.error("Errore durante la cancellazione del prodotto:", response.statusText);
    //                 }
    //             } catch (error) {
    //                 console.error("Errore durante la cancellazione del prodotto:", error);
    //             }
    //         } else {
    //             console.error("ID del prodotto non valido per la cancellazione.");
    //         }
    //     });
    //     setEditMode(false);
    // });


    document.addEventListener("DOMContentLoaded", () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWMwZjRjNTllYzAwMTk5MGQ2ZjkiLCJpYXQiOjE3MDkyODQzNjcsImV4cCI6MTcxMDQ5Mzk2N30.ATRYa2j1X8KBd3VeOu8dXodcRbT4FtQeboMHnIcLweo";
        const apiEndpoint = "https://striveschool-api.herokuapp.com/api/product/";
        const productForm = document.getElementById("productForm");
        const editProductBtn = document.getElementById("editProductBtn");
        const deleteProductBtn = document.getElementById("deleteProductBtn");
    
        let isEditMode = false;
    
        function setEditMode(editMode) {
            isEditMode = editMode;
            editProductBtn.style.display = isEditMode ? "block" : "none";
            deleteProductBtn.style.display = isEditMode ? "block" : "none";
        }
    
        function validateForm() {
            const productName = document.getElementById("productName").value;
            const productDescription = document.getElementById('productDescription').value;
            const productBrand = document.getElementById('productBrand').value;
            const productImageUrl = document.getElementById('productImageUrl').value;
            const productPrice = document.getElementById('productPrice').value;
    
            if (!productName || !productDescription || !productBrand || !productImageUrl || !productPrice) {
                alert("Compila tutti i campi obbligatori");
                return false;
            }
    
            if (isNaN(parseFloat(productPrice)) || parseFloat(productPrice) <= 0) {
                alert("Il prezzo deve essere un numero positivo");
                return false;
            }
    
            return true;
        }
    
        productForm.addEventListener("submit", async (e) => {
            e.preventDefault();
    
            if (!validateForm()) {
                return;
            }
    
            const productName = document.getElementById("productName").value;
            const productDescription = document.getElementById('productDescription').value;
            const productBrand = document.getElementById('productBrand').value;
            const productImageUrl = document.getElementById('productImageUrl').value;
            const productPrice = document.getElementById('productPrice').value;
            const productId = document.getElementById('productId').value;
    
            const newProduct = {
                name: productName,
                description: productDescription,
                brand: productBrand,
                imageUrl: productImageUrl,
                price: parseFloat(productPrice),
            };
    
            try {
                let response;
                if (productId) {
                    response = await fetch(apiEndpoint + productId, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(newProduct),
                    });
                } else {
                    response = await fetch(apiEndpoint, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(newProduct),
                    });
                }
    
                if (response.ok) {
                    console.log("Prodotto salvato con successo!", newProduct);
                    productForm.reset();
                    document.getElementById('productId').value = "";
                } else {
                    console.error("Errore durante l'operazione:", response.statusText);
                }
            } catch (error) {
                console.error("Errore durante l'operazione:", error);
            }
        });
    
        editProductBtn.addEventListener("click", async () => {
            const productId = document.getElementById("productId").value;
    
            if (!validateForm()) {
                return;
            }
    
            const newProduct = {
            };
    
            console.log("ID del prodotto:", productId);
    
            if (productId) {
                try {
                    const response = await fetch(apiEndpoint + productId, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(newProduct),
                    });
    
                    if (response.ok) {
                        console.log("Prodotto aggiornato con successo!", newProduct);
                        setEditMode(true);
                    } else {
                        console.error("Errore durante l'aggiornamento del prodotto:", response.statusText);
                    }
                } catch (error) {
                    console.error("Errore durante l'aggiornamento del prodotto:", error);
                }
            } else {
                console.error("ID del prodotto non valido per l'aggiornamento.");
            }
        });
    
        deleteProductBtn.addEventListener("click", async () => {
            const productId = document.getElementById("productId").value;
    
            if (productId) {
                try {
                    const response = await fetch(apiEndpoint + productId, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
    
                    if (response.ok) {
                        console.log("Prodotto cancellato con successo!");
                        productForm.reset();
                        document.getElementById('productId').value = "";
                    } else {
                        console.error("Errore durante la cancellazione del prodotto:", response.statusText);
                    }
                } catch (error) {
                    console.error("Errore durante la cancellazione del prodotto:", error);
                }
            } else {
                console.error("ID del prodotto non valido per la cancellazione.");
            }
        });
    
        setEditMode(false);
    });