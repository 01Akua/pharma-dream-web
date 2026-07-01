import type { Metadata } from "next";
import AdminApp from "@/components/admin/AdminApp";

export const metadata: Metadata = {
  title: "Panel administrativo — Pharma Dream",
  description: "Gestión de productos de la tienda Pharma Dream.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminApp />;
}
