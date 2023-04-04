/* eslint-disable */
import { io } from 'socket.io-client';
import '@babel/polyfill';
import { showAlert } from './alerts';
import { displayMap } from './mapBox';
import { login, logout } from './login';
import { signup } from './signup';
import { updateSettings } from './updateSettings';
import { create } from './create';

// forms
import { loginForm } from './forms/loginForm'
import { settingsForm } from './forms/settingsForm'
import { monsterForm } from './forms/monsterForm'
import { signupForm } from './forms/signupForm'
import { passwordForm } from './forms/passwordForm'

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

if(logoutBtn) logoutBtn.addEventListener('click', logout);

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);