import Image from "next/image";
import { withBasePath } from "@/lib/paths";

type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
};

/* Marca Pharma Dream (logo oficial) */
export default function Logo({ className = "", variant = "dark" }: LogoProps) {
  const src =
    variant === "light"
      ? withBasePath("/images/logo/logo-white.png")
      : withBasePath("/images/logo/logo-color.png");

  return (
    <Image
      src={src}
      alt="Pharma Dream"
      width={380}
      height={158}
      priority
      className={`h-10 w-auto ${className}`}
    />
  );
}
