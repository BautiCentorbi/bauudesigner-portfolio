"use client";
import { useEffect, useState } from "react";

type Gtag = (
  command: "consent",
  action: "update" | "default",
  params: Record<string, "granted" | "denied">
) => void;

type Consent = "accepted_all" | "accepted_essential" | "rejected" | null;
export default function CookiesBanner() {
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem("portfolio-consent") as Consent) || null;
    if (!saved) setOpen(true);
  }, []);

  useEffect(() => {
    const openHandler = () => {
      setOpen(true);
      setShowDetails(true);
    };
    window.addEventListener("open:cookie-settings", openHandler);
    return () =>
      window.removeEventListener("open:cookie-settings", openHandler);
  }, []);

  function updateConsent(next: Consent) {
    localStorage.setItem("portfolio-consent", next || "");

    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    if (gtag) {
      if (next === "accepted_all") {
        gtag("consent", "update", {
          ad_user_data: "granted",
          ad_personalization: "granted",
          analytics_storage: "granted",
          functionality_storage: "granted",
          security_storage: "granted",
        });
      } else if (next === "accepted_essential") {
        gtag("consent", "update", {
          functionality_storage: "granted",
          security_storage: "granted",
        });
      } else {
        gtag("consent", "update", {
          ad_user_data: "denied",
          ad_personalization: "denied",
          analytics_storage: "denied",
          functionality_storage: "denied",
          security_storage: "denied",
        });
      }
    }
    window.dispatchEvent(new Event("consent:ready"));
    setOpen(false);
    setShowDetails(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div
        className="
          w-full max-w-3xl rounded-2xl border border-zinc-200
          bg-white/90 backdrop-blur
          shadow-2xl ring-1 ring-zinc-100
        "
      >
        <div className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <span className="mt-1 inline-block size-2 rounded-full bg-blue-500 shadow-[0_0_20px] shadow-foreground/50" />

            <div className="flex-1">
              <h3 className="text-sm font-medium text-zinc-900">
                Control de privacidad
              </h3>
              <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
                Usamos cookies esenciales y de seguridad (reCAPTCHA) para
                proteger los formularios y mejorar funcionalidades básicas.
                Podés aceptar solo las esenciales o todas.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => updateConsent("accepted_essential")}
                  className="
                    inline-flex items-center justify-center rounded-xl
                    border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs
                    text-zinc-800 transition
                    hover:bg-zinc-100 hover:border-zinc-300
                    focus:outline-none focus:ring-2 focus:ring-foreground/50
                    active:scale-[0.99]
                  "
                >
                  Aceptar esenciales
                </button>

                <button
                  onClick={() => updateConsent("accepted_all")}
                  className="
                    inline-flex items-center justify-center rounded-xl
                    bg-foreground px-3 py-1.5 text-xs text-white
                    transition hover:bg-foreground/90
                    focus:outline-none focus:ring-2 focus:ring-foreground/50
                    active:scale-[0.99]
                  "
                >
                  Aceptar todo
                </button>

                <button
                  onClick={() => updateConsent("rejected")}
                  className="
                    inline-flex items-center justify-center rounded-xl
                    px-3 py-1.5 text-xs text-zinc-500
                    transition hover:text-zinc-700 hover:bg-zinc-100
                    focus:outline-none focus:ring-2 focus:ring-zinc-300
                    active:scale-[0.99]
                  "
                >
                  Rechazar
                </button>

                <button
                  type="button"
                  onClick={() => setShowDetails(true)}
                  className="ml-auto text-[11px] text-zinc-500 underline underline-offset-4 hover:text-zinc-700"
                >
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-1 w-full rounded-b-2xl bg-linear-to-r from-foreground/70 via-foreground to-foreground/70" />
      </div>
      {showDetails && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          aria-labelledby="cookies-details-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-zinc-100">
            <h3
              id="cookies-details-title"
              className="text-base font-semibold text-zinc-900"
            >
              Política de Cookies
            </h3>
            <div className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700">
              <p>
                Utilizamos cookies esenciales y de seguridad (por
                ejemplo, Google reCAPTCHA) para proteger formularios y
                garantizar el funcionamiento básico del sitio.
              </p>
              <ul className="list-disc pl-5">
                <li>
                  <strong>Estrictamente necesarias/seguridad</strong>:
                  imprescindibles para prevenir abuso (reCAPTCHA).
                </li>
                <li>
                  <strong>Funcionalidad</strong>: recuerdan preferencias básicas
                  de la interfaz.
                </li>
                <li>
                  <strong>Analíticas / Publicidad</strong>: solo si las aceptás
                  explícitamente.
                </li>
              </ul>
              <p className="text-xs text-zinc-500">
                Podés cambiar tu elección cuando quieras.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={() => updateConsent("accepted_essential")}
                className="rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-800 transition hover:bg-zinc-100 hover:border-zinc-400 focus:ring-2 focus:ring-foreground/50 active:scale-[0.98]"
              >
                Aceptar esenciales
              </button>
              <button
                onClick={() => updateConsent("accepted_all")}
                className="rounded-xl bg-foreground px-3 py-1.5 text-sm text-white transition hover:bg-foreground/90 focus:ring-2 focus:ring-foreground/50 active:scale-[0.98]"
              >
                Aceptar todo
              </button>
              <button
                onClick={() => updateConsent("rejected")}
                className="rounded-xl px-3 py-1.5 text-sm text-zinc-600 transition hover:text-zinc-800 hover:bg-zinc-100 focus:ring-2 focus:ring-zinc-300 active:scale-[0.98]"
              >
                Rechazar
              </button>

              <button
                onClick={() => setShowDetails(false)}
                className="ml-auto rounded-xl px-3 py-1.5 text-sm text-zinc-600 transition hover:text-zinc-800 hover:bg-zinc-100 focus:ring-2 focus:ring-zinc-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}