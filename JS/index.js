"use strict";


const baseURL = "http://localhost:8080";

const getByIdOutput = document.querySelector("#getByIdOutput");
const getAllOutput = document.querySelector("#getAllOutput");

const spiceId = document.querySelector("#spiceId");

const getAllSpices = () => {
    axios.get(`${baseURL}/getAllSpices`)
    .then(res => {
        const spices = res.data;

        getAllOutput.innerHTML = "";

        spices.forEach(spice => renderSpice(spice, getAllOutput));
    }).catch(err => console.log(err));
}

getAllSpices();

const renderSpice = (spice, outputDiv) => {   
    const spiceColumn = document.createElement('div');
    spiceColumn.classList.add("col");

    const spiceCard = document.createElement('div');
    spiceCard.classList.add("card");
    spiceColumn.appendChild(spiceCard);

    const newSpice = document.createElement('div');
    newSpice.classList.add("card-body");
    
    const spiceName = document.createElement("h3");
    spiceName.innerText = spice.name;
    spiceName.classList.add("card-title");
    newSpice.appendChild(spiceName);


    const spiceFlavourRating = document.createElement("p");
    spiceFlavourRating.innerText = `Delicousness: ${spice.delicousness}`;
    spiceFlavourRating.classList.add("card-text");
    newSpice.appendChild(spiceFlavourRating);

    const spiceCuisine = document.createElement("p");
    spiceCuisine.innerText = `Cuisine: ${spice.cuisine}`; 
    spiceCuisine.classList.add("card-text");
    newSpice.appendChild(spiceCuisine);

    const spicePrice = document.createElement("p");
    spicePrice.innerText = `Price: ${spice.price}`; 
    spicePrice.classList.add("card-text");
    newSpice.appendChild(spicePrice);

    spiceCard.appendChild(newSpice);

    outputDiv.appendChild(spiceColumn);
}

const getSpiceById = () => {
    axios.get(`${baseURL}/getSpice/${spiceId.value}`)
    .then(res => {
        const spice = res.data;
        getByIdOutput.innerHTML = "";
        renderSpice(spice, getByIdOutput);
    }).catch(err => console.log(err));
}

document.querySelector("button#getByIdButton").addEventListener('click', getSpiceById);



