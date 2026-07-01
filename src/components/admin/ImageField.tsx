"use client";

import { useState } from "react";
import { Upload, ImageOff } from "lucide-react";
import { fileToDataURL } from "@/lib/store";

export default function ImageField({
  value,
  onChange,
  onError,
  aspect = "aspect-video",
}: {
  value: string;
  onChange: (dataUrl: string) => void;
  onError?: (msg: string) => void;
  aspect?: string;
}) {
  const [uploading, setUploading] = useState(false);

  const handle = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      onError?.("El archivo debe ser una imagen");
      return;
    }
    try {
      setUploading(true);
      onChange(await fileToDataURL(file, 1400));
    } catch {
      onError?.("No se pudo procesar la imagen");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div
        className={`relative w-full overflow-hidden rounded-xl bg-cream-deep ring-1 ring-sand ${aspect}`}
      >
        {value && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-full w-full object-cover" />
        )}
      </div>
      <div className="mt-2 flex gap-2">
        <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-forest px-3 py-2 text-xs font-semibold text-cream transition hover:bg-gold hover:text-forest">
          <Upload className="h-3.5 w-3.5" />
          {uploading ? "Procesando…" : "Cambiar imagen"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handle(e.target.files?.[0])}
          />
        </label>
        {value && !value.startsWith("http") && (
          <button
            onClick={() => onChange("")}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-sand text-red-600 hover:bg-red-600 hover:text-cream"
            aria-label="Quitar"
          >
            <ImageOff className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
