import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/*
  ?? ВСТАВЬ СЮДА СВОЙ CONFIG ИЗ FIREBASE
  Firebase Console > Project settings > Web App
*/

const firebaseConfig = {
  apiKey: "AIzaSyBRIC8ZvBsvntvS4w2HnsjlD64So7HQ8f4",
  authDomain: "animal-company-hub.firebaseapp.com",
  projectId: "animal-company-hub",
  storageBucket: "animal-company-hub.firebasestorage.app",
  messagingSenderId: "240587929117",
  appId: "1:240587929117:web:6dc7f88cc309747260b8f4"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Auth (аккаунты)
export const auth = getAuth(app);

// Firestore (assets / база данных)
export const db = getFirestore(app);
console.log("firebase loaded");