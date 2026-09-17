"use client";

import { Users, Mail } from "lucide-react";
import { useClubMembers } from "@/lib/club";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ClubView() {
  const members = useClubMembers();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-forest">
            Club Pharma Dream
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Correos suscritos desde el popup del sitio.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-sage/20 px-4 py-2 text-sm font-medium text-forest">
          <Users className="h-4 w-4" />
          {members.length} suscriptores
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-sand bg-white">
        {members.length === 0 ? (
          <p className="p-8 text-center text-sm text-ink-soft">
            Todavía no hay suscriptores registrados.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-cream-deep text-left text-xs uppercase tracking-wide text-ink-soft">
              <tr>
                <th className="px-5 py-3 font-medium">Correo</th>
                <th className="px-5 py-3 font-medium">Origen</th>
                <th className="px-5 py-3 font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand">
              {members.map((m) => (
                <tr key={m.email}>
                  <td className="flex items-center gap-2 px-5 py-3 text-ink">
                    <Mail className="h-4 w-4 text-sage" />
                    {m.email}
                  </td>
                  <td className="px-5 py-3 capitalize text-ink-soft">
                    {m.source}
                  </td>
                  <td className="px-5 py-3 text-ink-soft">
                    {fmtDate(m.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
