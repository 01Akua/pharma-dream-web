import Reveal from "@/components/ui/Reveal";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

export type LegalContact = {
  email: string;
  whatsapp: string;
  hours: string;
};

export default function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
  contact,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  sections: LegalSection[];
  contact?: LegalContact;
}) {
  return (
    <main className="flex-1 pt-[110px]">
      <section className="bg-forest px-5 py-16 text-cream lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow text-gold-soft">{eyebrow}</span>
          <h1 className="mt-4 font-display text-4xl font-medium sm:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 leading-relaxed text-cream/80">{intro}</p>
          )}
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          {contact && (
            <Reveal>
              <div className="mb-12 rounded-2xl bg-white p-6 shadow-soft ring-1 ring-forest/5">
                <h2 className="font-display text-lg font-semibold text-forest">
                  Contacto oficial
                </h2>
                <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
                  <li>
                    Correo:{" "}
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-forest underline-offset-4 hover:underline"
                    >
                      {contact.email}
                    </a>
                  </li>
                  <li>
                    WhatsApp:{" "}
                    <a
                      href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                      className="text-forest underline-offset-4 hover:underline"
                    >
                      {contact.whatsapp}
                    </a>
                  </li>
                  <li>Horario de atención: {contact.hours}</li>
                </ul>
              </div>
            </Reveal>
          )}

          <div className="space-y-12">
            {sections.map((s, i) => (
              <Reveal key={s.heading} delay={Math.min(i, 6) * 0.04}>
                <div>
                  <h2 className="font-display text-xl font-semibold text-forest">
                    {i + 1}. {s.heading}
                  </h2>
                  <div className="mt-3 space-y-4">
                    {s.blocks.map((b, bi) => {
                      if (b.type === "p") {
                        return (
                          <p
                            key={bi}
                            className="leading-relaxed text-ink-soft"
                          >
                            {b.text}
                          </p>
                        );
                      }
                      if (b.type === "list") {
                        return (
                          <ul
                            key={bi}
                            className="list-disc space-y-1.5 pl-5 text-ink-soft"
                          >
                            {b.items.map((it, ii) => (
                              <li key={ii} className="leading-relaxed">
                                {it}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <div key={bi} className="overflow-x-auto">
                          <table className="w-full min-w-[480px] border-collapse text-sm">
                            <thead>
                              <tr className="border-b border-forest/15 text-left">
                                {b.headers.map((h, hi) => (
                                  <th
                                    key={hi}
                                    className="py-2 pr-4 font-semibold text-forest"
                                  >
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {b.rows.map((row, ri) => (
                                <tr
                                  key={ri}
                                  className="border-b border-sand/70"
                                >
                                  {row.map((cell, ci) => (
                                    <td
                                      key={ci}
                                      className="py-2 pr-4 align-top text-ink-soft"
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
