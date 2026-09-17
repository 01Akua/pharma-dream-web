"use client";

/* ============================================================
   Club Pharma Dream — suscripciones del popup, persistidas en
   Firestore (misma lógica que src/lib/crm.ts para Pedidos).
   ============================================================ */

import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export type ClubMember = {
  email: string;
  createdAt: string; // ISO
  source: "popup" | "otro";
};

const CLUB_COLLECTION = "club_members";

let cache: ClubMember[] = [];
const listeners = new Set<(members: ClubMember[]) => void>();

function subscribe() {
  const q = query(collection(db, CLUB_COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    cache = snap.docs.map((d) => d.data() as ClubMember);
    listeners.forEach((l) => l(cache));
  });
}

export function useClubMembers(): ClubMember[] {
  const [state, setState] = useState<ClubMember[]>(cache);
  useEffect(() => {
    const listener = (members: ClubMember[]) => setState(members);
    listeners.add(listener);
    const unsub = subscribe();
    return () => {
      listeners.delete(listener);
      unsub();
    };
  }, []);
  return state;
}

/** Da de alta un correo en el Club. Usa el email (normalizado) como id
 *  para que suscribirse dos veces no duplique el registro. */
export async function addClubMember(
  email: string,
  source: ClubMember["source"] = "popup",
) {
  const normalized = email.trim().toLowerCase();
  const member: ClubMember = {
    email: normalized,
    createdAt: new Date().toISOString(),
    source,
  };
  await setDoc(doc(db, CLUB_COLLECTION, normalized), member, { merge: true });
  return member;
}
