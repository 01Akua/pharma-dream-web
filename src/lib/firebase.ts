"use client";

/* ============================================================
   Conexión a Firebase (Firestore) — proyecto "pharma-dream-web".
   Este apiKey no es secreto: la seguridad real vive en las
   reglas de Firestore, no en ocultar esta configuración.
   ============================================================ */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBENDwUJ6YnjZTgVx5vI8zx0RH7ltSqFXQ",
  authDomain: "pharma-dream-web.firebaseapp.com",
  projectId: "pharma-dream-web",
  storageBucket: "pharma-dream-web.firebasestorage.app",
  messagingSenderId: "381987155704",
  appId: "1:381987155704:web:c1a8abb08a907b47c9d50d",
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
