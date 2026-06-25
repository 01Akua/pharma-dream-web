type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
  showWordmark?: boolean;
};

/* Marca Pharma Dream: hoja de cáñamo estilizada + wordmark */
export default function Logo({
  className = "",
  variant = "dark",
  showWordmark = true,
}: LogoProps) {
  const leaf = variant === "light" ? "#ffffff" : "#5a6b3b";
  const wordTop = variant === "light" ? "#ffffff" : "#3e4a2e";
  const rule = "#c2a14e";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 48 56"
        width="34"
        height="40"
        aria-hidden="true"
        className="shrink-0"
      >
        <g fill={leaf}>
          {/* tallo */}
          <path d="M23.2 54c0-9 .8-15 .8-15s.8 6 .8 15z" opacity="0.9" />
          {/* hojas centrales */}
          <path d="M24 6c2.6 6.8 3.4 13.5 2.4 20.2C25.7 31 24.8 35 24 38c-.8-3-1.7-7-2.4-11.8C20.6 19.5 21.4 12.8 24 6z" />
          {/* par interno */}
          <path d="M24 20c5-2.4 9.8-3 14.4-1.8-3.4 3.4-7.8 5.8-13.2 7.2-1 .26-1.9.4-2.7.5.4-2 .9-3.9 1.5-5.9z" />
          <path d="M24 20c-5-2.4-9.8-3-14.4-1.8 3.4 3.4 7.8 5.8 13.2 7.2 1 .26 1.9.4 2.7.5-.4-2-.9-3.9-1.5-5.9z" />
          {/* par externo */}
          <path d="M25 30c5.4-3.4 10.8-5 16.2-4.8-3 4.4-7.4 7.8-13.2 10-1.5.57-3 1-4.4 1.3.4-2.2.9-4.4 1.4-6.5z" />
          <path d="M23 30c-5.4-3.4-10.8-5-16.2-4.8 3 4.4 7.4 7.8 13.2 10 1.5.57 3 1 4.4 1.3-.4-2.2-.9-4.4-1.4-6.5z" />
        </g>
      </svg>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className="font-display text-[1.05rem] font-semibold tracking-[0.26em]"
            style={{ color: wordTop }}
          >
            PHARMA
          </span>
          <span className="mt-1 flex items-center gap-2">
            <span className="h-px w-4" style={{ background: rule }} />
            <span
              className="text-[0.62rem] font-semibold tracking-[0.42em]"
              style={{ color: rule }}
            >
              DREAM
            </span>
          </span>
        </span>
      )}
    </span>
  );
}
