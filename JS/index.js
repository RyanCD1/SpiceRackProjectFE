"use strict";


const baseURL = "http://localhost:8080";

const getByIdOutput = document.querySelector("#getByIdOutput");
const getAllOutput = document.querySelector("#getAllOutput");


const updateName = document.querySelector("#updateName");
const updateCuisine = document.querySelector("#updateCuisine");
const updateFlavourRating = document.querySelector("#updateFlavourRating");
const updatePrice = document.querySelector("#updatePrice");



const  updateData = {
    id: 0,
    name: updateName.value,
    cuisine: updateCuisine.value,
    flavourRating: updateFlavourRating.value,
    price: updatePrice.value

}

const spiceId = document.querySelector("#spiceId");

const getAllSpices = () => {
    axios.get(`${baseURL}/getAllSpices`)
    .then(res => {
        const spices = res.data;

        getAllOutput.innerHTML = "";

        spices.forEach(spice => renderSpice(spice, getAllOutput));
    }).catch(err => console.log(err));
}

const toggleGetAll = () => {
    var x = document.getElementById("getAllSection");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
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
    spiceFlavourRating.innerText = `flavourRating: ${spice.flavourRating}`;
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

    const deleteButton = document.createElement('button');
    deleteButton.innerText = "DELETE";
    deleteButton.classList.add("btn", "btn-primary");
    deleteButton.addEventListener('click', () => deleteSpice(spice.id));

    const updateButton = document.createElement('button');
    updateButton.innerText = "UPDATE";
    updateButton.classList.add("btn", "btn-primary");
    updateButton.addEventListener('click', () => {
        updateData.id=spice.id,
        updateName.value = spice.name,
        updateCuisine.value = spice.cuisine,
        updateFlavourRating.value = spice.flavourRating,
        updatePrice.value = spice.price
    });

    newSpice.appendChild(updateButton);

    newSpice.appendChild(deleteButton);

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

document.querySelector("section#postSection form").addEventListener('submit', (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
        name: form.name.value,
        cuisine: form.cuisine.value,
        delicousness: form.delicousness.value,
        price: form.price.value
    }

    console.log("DATA: ", data);

    axios.post(`${baseURL}/createSpice`, data)
    .then((res) => {
        console.log(res);
        getAllSpices();

        form.reset(); 
        form.name.focus();
    }).catch(err => console.log(err));
});

const deleteSpice = id => {
    axios.delete(`${baseURL}/deleteSpice/${id}`)
        .then(res => {
            console.log(res);
            getAllSpices();
        }).catch(err => console.log(err));
}


document.querySelector('#updateSpice>form').addEventListener('submit',  (e) => {
    e.preventDefault();
    const data = {
        name: updateName.value,
        cuisine: updateCuisine.value,
        flavourRating: updateFlavourRating.value,
        price: updatePrice.value
    }

    axios.put(`${baseURL}/replaceSpice/${updateData.id}`, data)
        .then(res => {
           
        }).catch(err => console.log(err));
    
        const updateForm = document.querySelector("section#updateSpice > form");
        getAllSpices();
        location.reload();
    }


)


