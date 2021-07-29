"use strict";


const baseURL = "http://localhost:8080";

document.querySelector("section#postSection form").addEventListener('submit', (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
        name: form.name.value,
        cuisine: form.cuisine.value,
        flavourRating: form.flavourRating.value,
        price: form.price.value
    }

    console.log("DATA: ", data);

    axios.post(`${baseURL}/createSpice`, data)
    .then((res) => {
        console.log(res);
        form.reset(); 
        form.name.focus();
        alert("You have succesffuly added a Spice to the list!");
    }).catch(err => console.log(err));
});




