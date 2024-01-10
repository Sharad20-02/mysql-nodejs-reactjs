import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const addBeer = async () => {
    const name = document.getElementById('addName').value;
    const tagline = document.getElementById('addTagline').value;
    const description = document.getElementById('addDescription').value;
    const image = document.getElementById('addImage').value;
    const response = await axios.post('http://localhost:5000', {
      name,
      tagline,
      description,
      image,
    });
    console.log(response.data);
  };

  const getBeerById = async () => {
    const getId = document.getElementById('getId').value;
    const getName = document.getElementById('getName');
    const getTagline = document.getElementById('getTagline');
    const getDescription = document.getElementById('getDescription');
    const getImage = document.getElementById('getImage');

    console.log('getId', getId);
    const response = await axios.get(`http://localhost:5000/${getId}`);
    console.log(response.data);
    getName.innerHTML = `NAME:       ${response.data[0].name}`;
    getTagline.innerHTML = `TAGLINE:    ${response.data[0].tagline}`;
    getDescription.innerText = `DESCRIPTION:${response.data[0].description}`;
    getImage.innerText = `IMAGE:      ${response.data[0].image}`;
  };

  const getAllBeers = async ()=>{
    const allBeers = document.getElementById('allBeers');
    allBeers.innerHTML = '';
    const response = await axios.get('http://localhost:5000');
    console.log(response.data);
    for(let i=0; i<response.data.length; i++){
      allBeers.innerHTML += `<li>
      <p>${response.data[i].id}</p>
      <p>${response.data[i].name}</p>
      <p>${response.data[i].tagline}</p>
      <p>${response.data[i].description}</p>
      <p>${response.data[i].image}</p>
      </li>`
      response.data[i].id;
    }
  }

  const updateNameById = async ()=>{
    const updateName = document.getElementById('updateName').value;
    const updateId = document.getElementById('updateId').value;
    const response = await axios.put('http://localhost:5000', {id:updateId, name: updateName});
    console.log(response.data);
  }

  const deleteBeerById = async()=>{
    const deleteId = document.getElementById('deleteId').value;
    const response = await axios.delete(`http://localhost:5000/${deleteId}`);
    console.log(response.data);
  }

  return (
    <>
      <h1>Nodejs Beers</h1>
      <hr />
      <h3>Add a new beer</h3>
      name: <input type="text" id="addName" />
      <br />
      <br />
      tagline: <input type="text" id="addTagline" />
      <br />
      <br />
      description: <input type="text" id="addDescription" />
      <br />
      <br />
      image: <input type="text" id="addImage" />
      <br />
      <br />
      <button type="button" onClick={addBeer}>
        Add a Beer
      </button>
      <hr />
      <h3>Get beer by id</h3>
      id: <input id="getId" type="number" />
      <br />
      <br />
      <button type="button" onClick={getBeerById}>
        Get beer
      </button>
      <br />
      <br />
      <p id="getName"></p>
      <p id="getTagline"></p>
      <p id="getDescription"></p>
      <p id="getImage"></p>
      <hr />
      <h3>Get all beers</h3>
      <button type="button" onClick={getAllBeers}>Get all beers</button>
      <ul id='allBeers'>

      </ul>
      <br />
      <hr />
      <h3>Update a beer by id</h3>
      id: <input id='updateId' type="number" />
      <br />
      <br />
      new_name: <input id='updateName' type="text" />
      <br />
      <br />
      <button type="button" onClick={updateNameById}>Update beer</button>
      <hr />
      <h3>Delete beer by id</h3>
      id: <input id='deleteId' type="number" />
      <br />
      <br />
      <button type="button" onClick={deleteBeerById}>Delete beer</button>
      <hr />
    </>
  );
}

export default App;
