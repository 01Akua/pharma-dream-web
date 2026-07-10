import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Droplets,
  Flame,
  FlaskConical,
  Globe2,
  Leaf,
  MapPin,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Sprout,
} from "lucide-react";
import { withBasePath } from "@/lib/paths";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Nosotros — Pharma Dream",
  description:
    "Conoce la historia de Pharma Dream: dermocosmética colombiana que conecta ciencia y naturaleza con Tecnología Fitomolecular y aceite de HEMP.",
};

const hempBenefits = [
  {
    icon: Droplets,
    title: "Hidratación profunda",
    text: "Restablece la barrera cutánea y mantiene la piel suave.",
  },
  {
    icon: Flame,
    title: "Efecto calmante",
    text: "Alivia rojeces, picazón e irritaciones gracias a sus propiedades antiinflamatorias.",
  },
  {
    icon: Sparkles,
    title: "Acción antioxidante",
    text: "Protege frente al daño oxidativo y previene el envejecimiento prematuro.",
  },
  {
    icon: Sprout,
    title: "Regeneración celular",
    text: "Favorece la cicatrización y mejora la apariencia de cicatrices, quemaduras o eccemas.",
  },
  {
    icon: Leaf,
    title: "Antiedad natural",
    text: "Estimula la producción de colágeno y ayuda a mantener la elasticidad de la piel.",
  },
];

const valores = [
  {
    icon: MapPin,
    title: "Orgullosamente Colombianos",
    text: "Nuestros productos se elaboran en Colombia con materias primas naturales y HEMP de alta calidad, combinando ciencia e innovación para ofrecer cosmética segura, efectiva y pensada para el bienestar de tu piel.",
  },
  {
    icon: Leaf,
    title: "100% Ingredientes Naturales",
    text: "Seleccionamos cuidadosamente cada ingrediente de origen natural para garantizar productos puros y efectivos. Combinamos extractos vegetales y HEMP con tecnología fitomolecular, ofreciendo cosmética que cuida tu piel y respeta tu salud.",
  },
  {
    icon: ShieldCheck,
    title: "Libres de Crueldad Animal",
    text: "Nos comprometemos con la ética y el respeto por la vida. Todos nuestros productos son formulados sin pruebas en animales, garantizando cosmética segura, efectiva y responsable, que cuida tu piel y protege el planeta.",
  },
];

const contacto = {
  phone: "+57 321 745 0695",
  email: "info@pharma-dream.com",
};

export default function NosotrosPage() {
  return (
    <main className="flex-1 pt-[110px]">
      {/* Hero */}
      <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden">
        <Image
          src={withBasePath("/images/nosotros/hero.webp")}
          alt="Equipo Pharma Dream"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/60 to-forest/20" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 lg:px-8">
          <span className="eyebrow text-gold-soft">Nuestra historia</span>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
            Donde la ciencia y la naturaleza trabajan juntas
          </h1>
        </div>
      </section>

      {/* Propuesta de valor */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <Reveal>
            <p className="text-lg leading-relaxed text-ink sm:text-xl">
              En Pharma Dream creemos que la verdadera belleza nace cuando la
              ciencia y la naturaleza trabajan juntas. Somos una marca
              especializada en la fabricación, comercialización y exportación
              de cosméticos faciales y corporales de origen natural,
              elaborados con{" "}
              <strong className="text-forest">HEMP certificado</strong> y
              extractos fitomoleculares de alta pureza.
            </p>
            <p className="mt-5 leading-relaxed text-ink-soft">
              Nuestra propuesta es clara: productos seguros, efectivos y
              confiables, desarrollados con procesos que conservan al máximo
              las propiedades de los ingredientes, para que tu piel disfrute
              lo mejor de la naturaleza con el respaldo de la ciencia.
            </p>
          </Reveal>
        </div>
      </section>

      {/* HEMP: ingrediente clave */}
      <section className="bg-forest py-24 text-cream">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <span className="eyebrow text-gold-soft">El corazón de Pharma Dream</span>
              <h2 className="mt-4 font-display text-4xl font-medium leading-tight sm:text-5xl">
                HEMP: nuestro ingrediente clave
              </h2>
              <p className="mt-5 max-w-lg text-cream/80">
                Desde que la ley en Colombia lo permitió, hemos incorporado
                HEMP certificado y de alta calidad en nuestras fórmulas. Este
                activo natural se ha convertido en el corazón de Pharma Dream
                gracias a sus propiedades hidratantes, antioxidantes,
                calmantes y regeneradoras, ideales para pieles sensibles, con
                tendencia a irritaciones o signos de envejecimiento.
              </p>

              <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
                {hempBenefits.map((b, i) => (
                  <Reveal key={b.title} delay={i * 0.08}>
                    <div className="flex gap-3">
                      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-olive/40 ring-1 ring-gold/30">
                        <b.icon className="h-4 w-4 text-gold-soft" />
                      </span>
                      <div>
                        <h4 className="font-display text-base font-semibold text-cream">
                          {b.title}
                        </h4>
                        <p className="mt-0.5 text-sm text-cream/70">{b.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <p className="mt-8 max-w-lg text-sm italic text-cream/70">
                En conclusión, el HEMP es tu aliado natural para mantener una
                piel saludable, luminosa y protegida, día tras día.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card">
                <Image
                  src={withBasePath("/images/nosotros/hemp.webp")}
                  alt="Aceite de HEMP en fórmula Pharma Dream"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Innovación Fitomolecular + Confianza internacional */}
      <section className="bg-cream py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-soft ring-1 ring-forest/5">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-forest">
                <FlaskConical className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-forest">
                Innovación Fitomolecular
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Nuestra tecnología de extracción fitomolecular nos permite
                obtener compuestos bioactivos de las plantas con la más alta
                pureza, seleccionando solo los ingredientes que realmente
                aportan beneficios a la piel. Esto garantiza fórmulas más
                limpias, potentes y efectivas, que marcan la diferencia
                frente a la cosmética convencional.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-soft ring-1 ring-forest/5">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-forest">
                <Globe2 className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-forest">
                Compromiso y Confianza Internacional
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Cada uno de nuestros productos cumple con la legislación
                europea, americana y latinoamericana, garantizando seguridad,
                transparencia y calidad premium. Desarrollamos cosmética
                pensada no solo para el cuidado diario, sino también para
                convertirse en una experiencia de bienestar integral que
                conecta contigo.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-forest py-24 text-cream">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow text-gold-soft">Lo que nos sostiene</span>
            <h2 className="mt-4 font-display text-4xl font-medium sm:text-5xl">
              Nuestros valores
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {valores.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="flex h-full flex-col items-center rounded-3xl bg-cream/10 p-8 text-center ring-1 ring-cream/15">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream/15 text-gold-soft">
                    <v.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/75">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA contacto */}
      <section className="bg-olive/15 py-20">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-medium text-forest sm:text-4xl">
              ¿Tienes preguntas sobre tus productos?
            </h2>
            <p className="mt-3 text-ink-soft">
              Escríbenos, con gusto te ayudamos a encontrar tu rutina ideal.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/573113000325"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition-all hover:bg-olive"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href={`tel:${contacto.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-forest px-6 py-3 text-sm font-semibold text-forest transition-all hover:bg-forest hover:text-cream"
              >
                <Phone className="h-4 w-4" /> {contacto.phone}
              </a>
              <a
                href={`mailto:${contacto.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-forest px-6 py-3 text-sm font-semibold text-forest transition-all hover:bg-forest hover:text-cream"
              >
                <Mail className="h-4 w-4" /> {contacto.email}
              </a>
            </div>
            <Link
              href="/tienda"
              className="mt-8 inline-block text-sm font-semibold text-gold-deep underline-offset-4 hover:underline"
            >
              Ver catálogo completo →
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
