export interface ContactFormFields {
  nombre: string;
  apellido: string;
  email: string;
  phoneCountry: string;
  phoneNumber: string;
  asunto: string;
  mensaje: string;
}
export function validateFormFields(
  fields: ContactFormFields
): string | null {
  const {
    nombre,
    apellido,
    email,
    phoneCountry,
    phoneNumber,
    asunto,
    mensaje,
  } = fields;

  const nombreT = nombre.trim();
  const apellidoT = apellido.trim();
  const emailT = email.trim();
  const phoneCountryT = phoneCountry.trim();
  const phoneNumberT = phoneNumber.trim();
  const asuntoT = asunto.trim();
  const mensajeT = mensaje.trim();

  if (
    !nombreT ||
    !apellidoT ||
    !emailT ||
    !phoneCountryT ||
    !phoneNumberT ||
    !asuntoT ||
    !mensajeT
  ) {
    return "Todos los campos son obligatorios.";
  }

  const campos = [
    nombreT,
    apellidoT,
    emailT,
    phoneCountryT,
    phoneNumberT,
    asuntoT,
    mensajeT,
  ];
  const tieneHTML = campos.some((campo) => /<[^>]*>/.test(campo));

  if (tieneHTML) {
    return "El contenido no puede tener etiquetas HTML.";
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailT);
  if (!emailOk) {
    return "Ingresá un email válido.";
  }

  const countryOk = /^\+\d{1,4}$/.test(phoneCountryT);
  if (!countryOk) {
    return "Seleccioná un código de país válido.";
  }

  const phoneOk = /^[0-9()\-\s]{6,20}$/.test(phoneNumberT);
  if (!phoneOk) {
    return "Ingresá un teléfono válido.";
  }

  return null;
}
