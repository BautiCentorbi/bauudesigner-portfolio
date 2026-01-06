"use client";

import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import MainButton from "../ui/MainButton";
import { SendIcon } from "lucide-react";
import toast from "react-hot-toast";

type Consent = "accepted_all" | "accepted_essential" | "rejected" | null;

const ContactForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [consent, setConsent] = useState<Consent>(null);
  const consentGranted =
    consent === "accepted_all" || consent === "accepted_essential";

  const recaptchaRef = useRef<InstanceType<typeof ReCAPTCHA> | null>(null);

  useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      localStorage.getItem("muta-consent")) as Consent | null;
    if (saved) setConsent(saved);

    const onConsent = () => {
      const s = localStorage.getItem("muta-consent") as Consent | null;
      if (s) setConsent(s);
    };

    window.addEventListener("consent:ready", onConsent);
    return () => window.removeEventListener("consent:ready", onConsent);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!consentGranted) {
      toast.error("Para enviar, aceptá cookies esenciales (seguridad).");
      window.dispatchEvent(new Event("open:cookie-settings"));
      return;
    }

    setLoading(true);

    // 1) Guardamos referencia al form ANTES de awaits
    const form = e.currentTarget;

    // 2) Recopilamos datos
    const formData = new FormData(form);
    const token = await recaptchaRef.current?.executeAsync();
    if (!token) {
      toast.error("No se obtuvo el token de reCAPTCHA");
      setLoading(false);
      return;
    }
    formData.append("token", token);

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody.error || `HTTP ${res.status}`);
      }

      const result = await res.json();
      if (result.ok) {
        toast.success("¡Mensaje enviado correctamente!", { duration: 4000 });
        form.reset();
        return;
      }

      toast.error(result.error || "Error al enviar.", { duration: 5000 });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error en el servidor";
      toast.error(message, { duration: 5000 });
    } finally {
      recaptchaRef.current?.reset();
      setLoading(false);
    }
  };

  const baseField =
  "w-full outline-none rounded-2xl transition-all duration-200 " +
  "bg-transparent text-foreground placeholder:text-zinc-500 " +

  // ✅ Borde SIEMPRE (forzado)
  "!border !border-foreground/25 " +

  // ✅ Hover (incompleto)
  "hover:bg-black/5 hover:!border-foreground/40 " +

  // Focus
  "focus-visible:!border-primary/70 focus-visible:ring-2 focus-visible:ring-primary/25 " +

  // ✅ Completo: negro + blanco + sin borde (forzado)
  "not-placeholder-shown:bg-black not-placeholder-shown:text-white " +
  "not-placeholder-shown:!border-transparent " +

  // ✅ Completo + hover: mantener negro (no lavarlo)
  "not-placeholder-shown:hover:bg-black not-placeholder-shown:hover:!border-transparent " +

  // Disabled
  "disabled:opacity-60 disabled:cursor-not-allowed";




  const labelClass = "text-sm md:text-base text-foreground/85";
  const hintClass = "text-sm text-zinc-500";

  return (
    <section
      id="contact"
      className="w-full px-4 sm:px-6 md:px-8 lg:px-0 mx-auto max-w-3xl"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-8">
        Contactame para subir tu proyecto al próximo nivel.
      </h2>

      {/* Card / panel (más alineado al look “premium + dark”) */}
      <div className="rounded-3xl border border-white/10 bg-white/3 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
        <div className="p-5 sm:p-7 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre + Apellido */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="nombre" className={labelClass}>
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  required
                  autoComplete="given-name"
                  placeholder="Tu nombre"
                  className={`${baseField} h-11 rounded-2xl px-4`}
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="apellido" className={labelClass}>
                  Apellido
                </label>
                <input
                  id="apellido"
                  name="apellido"
                  required
                  autoComplete="family-name"
                  placeholder="Tu apellido"
                  className={`${baseField} h-11 rounded-2xl px-4`}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Asunto */}
            <div className="flex flex-col gap-2">
              <label htmlFor="asunto" className={labelClass}>
                Asunto
              </label>
              <input
                id="asunto"
                name="asunto"
                required
                autoComplete="off"
                placeholder="Ej: Proyecto web / Branding / Consulta"
                className={`${baseField} h-11 rounded-2xl px-4`}
                disabled={loading}
              />
              <p className={hintClass}>
                Respondemos a la brevedad con una propuesta clara y sin vueltas.
              </p>
            </div>

            {/* Mensaje */}
            <div className="flex flex-col gap-2">
              <label htmlFor="mensaje" className={labelClass}>
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                required
                rows={5}
                placeholder="Contame qué necesitás, plazos y contexto. Si ya tenés referencias, mejor."
                className={`${baseField} resize-none rounded-2xl p-4 leading-relaxed`}
                disabled={loading}
              />
            </div>

            <div className="pt-1">
              <MainButton
                type="submit"
                aria-label="Enviar el formulario"
                className="w-full justify-center"
              >
                <div className="flex text-xl align-center gap-2 items-center justify-center">
                  {loading ? "Enviando..." : "Enviar"}
                  <SendIcon size={22} className="text-auto" />
                </div>
              </MainButton>

              {!consentGranted ? (
                <p className="mt-3 text-xs text-zinc-400">
                  Para enviar el formulario, aceptá cookies esenciales
                  (seguridad).
                </p>
              ) : (
                <p className="mt-3 text-xs text-zinc-500">
                  Protección activa: reCAPTCHA invisible para evitar spam.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

      {consentGranted ? (
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        />
      ) : null}
    </section>
  );
};

export default ContactForm;
