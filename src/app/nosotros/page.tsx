import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FlaskConical,
  Globe2,
  Leaf,
  MapPin,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { withBasePath } from "@/lib/paths";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Nosotros — Pharma Dream",
  description:
    "Conoce la historia de Pharma Dream: dermocosmética colombiana que conecta ciencia y naturaleza con Tecnología Fitomolecular y aceite de HEMP.",
};

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
  phone: "+57 300 997 9933",
  email: "info@pharmadream.com.co",
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
      <section className="bg-cream py-28">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <Reveal>
            <span className="eyebrow text-gold-deep">Quiénes somos</span>
            <p className="mt-6 text-xl leading-relaxed text-ink sm:text-2xl">
              Somos una marca enfocada en la elaboración, comercialización y
              exportación de productos cosméticos faciales de base natural.
              Utilizamos materias primas provenientes de la naturaleza en
              forma de aceites y extractos vegetales y moleculares, sometidos
              a procesos de mínima transformación química con el fin de
              conservar sus propiedades originales.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-14 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card">
              <Image
                src={withBasePath("/images/nosotros/modelo-1.webp")}
                alt="Modelo Pharma Dream con Contorno de Ojos y Sérum Revitalizante Facial"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="leading-relaxed text-ink-soft sm:text-lg">
              En PHARMA DREAM hemos desarrollado nuestras fórmulas alrededor
              de dos activos clave: la{" "}
              <strong className="text-forest">Placenta Vegetal</strong> y el{" "}
              <strong className="text-forest">Aceite de HEMP</strong>.
              Trabajamos con materias primas de alta calidad y trazabilidad
              certificada, que garantizan la seguridad del producto y
              potencian sus beneficios. Nuestros productos están diseñados
              para ser seguros, confiables y aptos para el uso diario.
            </p>
          </Reveal>

          <Reveal className="lg:order-4" delay={0.1}>
            <p className="leading-relaxed text-ink-soft sm:text-lg">
              Es importante comprender el valor de estos activos. La Placenta
              Vegetal se obtiene de la extracción de proteínas y células madre
              de plantas seleccionadas por su alto contenido en aminoácidos,
              vitaminas y factores de crecimiento naturales, aportando un
              efecto regenerador y nutritivo profundo. El Aceite de HEMP,
              extraído de la semilla del cáñamo, es reconocido por su riqueza
              en Omega 3 y 6, y por su capacidad para calmar, equilibrar y
              fortalecer la barrera cutánea. Juntos, forman una combinación
              botánica utilizada a lo largo de la historia de la cosmetología
              por sus propiedades únicas y su versatilidad como aliados
              naturales de la piel.
            </p>
          </Reveal>
          <Reveal className="lg:order-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card">
              <Image
                src={withBasePath("/images/nosotros/modelo-2.webp")}
                alt="Modelo Pharma Dream aplicando Contorno de Ojos con HEMP"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
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
                href="https://wa.me/573009979933"
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
