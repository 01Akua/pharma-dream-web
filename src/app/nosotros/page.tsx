import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Droplets,
  Flame,
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
    text: "Repone la barrera lipídica y retiene la humedad en las capas más profundas de la piel.",
  },
  {
    icon: Flame,
    title: "Efecto calmante antiinflamatorio",
    text: "Reduce el enrojecimiento y la irritación en pieles sensibles o reactivas.",
  },
  {
    icon: Sparkles,
    title: "Acción antioxidante",
    text: "Protege contra el daño ambiental y el envejecimiento prematuro de la piel.",
  },
  {
    icon: Sprout,
    title: "Regeneración celular",
    text: "Estimula la producción de colágeno para un efecto antiedad visible y duradero.",
  },
];

const valores = [
  {
    icon: MapPin,
    title: "Origen colombiano",
    text: "Fabricamos y exportamos desde Colombia, con estándares internacionales de calidad en cada lote.",
  },
  {
    icon: Leaf,
    title: "100% ingredientes naturales",
    text: "Seleccionamos cada activo vegetal con cuidado, sin compromisos químicos ni rellenos innecesarios.",
  },
  {
    icon: ShieldCheck,
    title: "Libre de crueldad animal",
    text: "Ninguna fórmula se prueba en animales, en ningún punto de nuestro proceso.",
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
              Pharma Dream es una compañía colombiana especializada en
              dermocosmética facial y corporal de origen natural.
              Fabricamos, comercializamos y exportamos productos elaborados
              con <strong className="text-forest">HEMP certificado</strong> y
              extractos fitomoleculares de alta pureza — porque creemos que
              la verdadera belleza nace cuando la ciencia y la naturaleza
              trabajan juntas.
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
                Desde la legalización del cáñamo en Colombia, el aceite de
                HEMP es la base de nuestras fórmulas. Trabajamos con
                Tecnología Fitomolecular para extraer sus compuestos
                bioactivos con alta pureza, logrando fórmulas más limpias,
                potentes y efectivas.
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

      {/* Valores */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow text-gold-deep">Lo que nos sostiene</span>
            <h2 className="mt-4 font-display text-4xl font-medium text-forest sm:text-5xl">
              Nuestros valores
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {valores.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="flex h-full flex-col items-center rounded-3xl bg-white p-8 text-center shadow-soft ring-1 ring-forest/5">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sand text-forest">
                    <v.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-forest">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
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
