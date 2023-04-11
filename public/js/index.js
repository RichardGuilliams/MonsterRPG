/* eslint-disable */
import { io } from 'socket.io-client';
import '@babel/polyfill';

import { showAlert } from './actions/alerts';
import { displayMap } from './actions/mapBox';
import { login, logout } from './actions/login';
import { signup } from './actions/signup';
import { updateSettings } from './actions/updateSettings';
import { create } from './actions/create';

// AUTH Forms
import { loginForm } from './forms/loginForm'
import { settingsForm } from './forms/settingsForm'
import { signupForm } from './forms/signupForm'
import { passwordForm } from './forms/passwordForm'


// Creator Forms
import { monsterForm } from './forms/monsterForm'
import { moveForm } from './forms/moveForm'
import { itemForm } from './forms/itemForm'
import { weaponForm } from './forms/weaponForm'
import { armorForm } from './forms/armorForm'
import { charmForm } from './forms/charmForm'
import { collarForm } from './forms/collarForm'
import { locationForm } from './forms/locationForm'
import { buildingForm } from './forms/buildingForm'
import { allianceForm } from './forms/allianceForm'


// DOM ELEMENTS
const mapBox = document.getElementById('map');
const logoutBtn = document.querySelector('.nav__el--logout');


const socket = io('http://localhost:3000');

socket.on('connect', () => {
    showAlert('success', "You have connected to the server", 20)
})

socket.on('receive-connect', (event) => {
    console.log(event)
    showAlert('success', `${event.socket.id}`, 20)
})

// DELEGATE EVENTS
if(mapBox){
    const locations = JSON.parse(mapBox.dataset.locations);
    displayMap(locations);
}

loginForm(login);
signupForm(signup);
settingsForm(updateSettings)
passwordForm(updateSettings)

monsterForm(create);
moveForm(create);
weaponForm(create);
armorForm(create);
itemForm(create);
charmForm(create);
collarForm(create);
buildingForm(create);
allianceForm(create);
locationForm(create);

if(logoutBtn) logoutBtn.addEventListener('click', logout);

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);