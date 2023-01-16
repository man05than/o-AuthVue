import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYHNNAsO1vjK3wny-cXVI5ZSqi7WoWWnw",
  authDomain: "o-authvue3.firebaseapp.com",
  projectId: "o-authvue3",
  storageBucket: "o-authvue3.appspot.com",
  messagingSenderId: "428067819140",
  appId: "1:428067819140:web:65c5d66665fa17a0f67cd1"
};

// Initialize Firebase
 initializeApp(firebaseConfig);

createApp(App).use(store).use(router).mount('#app')
