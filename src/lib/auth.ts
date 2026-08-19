"use client";

/* ============================================================
   Autenticación real del panel admin (Firebase Auth).
   Reemplaza el login de demo (usuario/clave hardcodeados) para
   que las reglas de Firestore puedan exigir un admin autenticado.
   ============================================================ */

import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "./firebase";

export const auth = getAuth(firebaseApp);

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setReady(true);
    });
  }, []);

  return { user, ready };
}

export async function adminLogin(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function adminLogout() {
  await signOut(auth);
}
