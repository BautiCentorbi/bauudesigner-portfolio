'use client';
import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import MainButton from "./ui/MainButton";
import { SendIcon } from "lucide-react";
import toast from "react-hot-toast";

type Consent = "accepted_all" | "accepted_essential" | "rejected" | null;

const ContactForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  
  const [consent, setConsent] = useState<Consent>(null);
  const consentGranted = consent === "accepted_all" || consent === "accepted_essential";
  
  const recaptchaRef = useRef<InstanceType<typeof ReCAPTCHA> | null>(null);

   useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("muta-consent")) as Consent | null;
    if (saved) setConsent(saved);

    const onConsent = () => {
      const s = localStorage.getItem("muta-consent") as Consent | null;
      if (s) setConsent(s);
    };
    // Tu banner debe disparar: window.dispatchEvent(new Event("consent:ready"))
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

    // 1️⃣ Guardamos la referencia al form ANTES de cualquier await
    const form = e.currentTarget;

    // 2️⃣ Recopilamos los datos
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

        // 3️⃣ Ahora sí podemos hacer reset con seguridad
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

  return (
    <section id="contact" className="w-full px-4 sm:px-6 md:px-8 lg:px-0 mx-auto max-w-3xl">
      <h2
        className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100 mb-8"
      >
        <span className="italic relative">
          Contactá{" "}
          <span className="absolute bottom-0 left-0 w-full h-1 bg-primary z-0"></span>
        </span>{" "}
        con nosotros
      </h2>

      <form
        onSubmit={handleSubmit}
        className="contact-form space-y-6"
      >
        {/* Apila en móvil, fila en md+ */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          {["nombre", "apellido"].map((field) => (
            <div key={field} className="flex flex-col gap-1 w-full">
              <label className="text-base md:text-lg text-zinc-200 capitalize">
                {field === "nombre" ? "Nombre" : "Apellido"}
              </label>
              <input
                name={field}
                required
                className="
              h-10 px-4 rounded-full
              bg-black/50 text-whit
              focus:ring-2 focus:ring-primary
            "
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className="text-base md:text-lg text-zinc-200">Asunto</label>
          <input
            name="asunto"
            required
            className="
          h-10 px-4 rounded-full
          bg-black/50 text-white
          focus:ring-2 focus:ring-primary
        "
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className="text-base md:text-lg text-zinc-200">Mensaje</label>
          <textarea
            name="mensaje"
            required
            rows={4}
            className="
          p-4 rounded-2xl
          bg-black/50 text-white
          focus:ring-2 focus:ring-primary
        "
          />
        </div>

        <MainButton
          type="submit"
          aria-label="Enviar el formulario"
          className="w-full justify-center"
        >
          {loading ? "Enviando..." : "Enviar →"}
          <SendIcon size={24} className="text-white" />
        </MainButton>
      </form>

      {consentGranted ? (

        <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} />
      ) : (
        <p className="mt-3 text-xs text-zinc-400">
          Para enviar el formulario, aceptá cookies esenciales (seguridad).
        </p>
      )}
    </section>
  );
};

export default ContactForm;