"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/* Oculta el "chrome" de la tienda (navbar, footer, popups) en /admin */
export default function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
