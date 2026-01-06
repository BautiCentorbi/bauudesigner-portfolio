import sanitize from "@/app/lib/sanitize";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { validateFormFields } from "@/app/lib/validateFormFields";


export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const token = formData.get("token");
    if (typeof token !== "string") {
      return NextResponse.json(
        { error: "Token de captcha inválido" },
        { status: 400 }
      );
    }

    const captchaRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_PRIVATE_KEY ?? "",
          response: token,
        }),
      }
    ).then((res) => res.json() as Promise<{ success: boolean }>);

    if (!captchaRes.success) {
      return NextResponse.json(
        { error: "Captcha inválido" },
        { status: 400 }
      );
    }

    // --- Campos del formulario ---
    const nombre = formData.get("nombre");
    const apellido = formData.get("apellido");
    const asunto = formData.get("asunto");
    const mensaje = formData.get("mensaje");

    if (
      typeof nombre !== "string" ||
      typeof apellido !== "string" ||
      typeof asunto !== "string" ||
      typeof mensaje !== "string"
    ) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    // Validación adicional
    const error = validateFormFields({ nombre, apellido, asunto, mensaje });
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    // --- Envío con Resend ---
    const resend = new Resend(process.env.RESEND_API_KEY ?? "");

    const response = await resend.emails.send({
      from: "Formulario PORTFOLIO CONTACTO <noreply@bcentorbi.com>",
      to: process.env.RESEND_TO_EMAIL ?? "",
      subject: asunto,
      html: `
        <p><strong>Nombre:</strong> ${sanitize(nombre)} ${sanitize(
        apellido
      )}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${sanitize(mensaje)}</p>
      `,
    });

    return NextResponse.json({ ok: true, response }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el servidor" + error },
      { status: 500 }
    );
  }
}