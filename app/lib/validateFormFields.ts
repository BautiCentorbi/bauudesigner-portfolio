export interface ContactFormFields {
  nombre: string;
  apellido: string;
  asunto: string;
  mensaje: string;
}
export function validateFormFields(
  fields: ContactFormFields
): string | null {
  const { nombre, apellido, asunto, mensaje } = fields;

  if (!nombre || !apellido || !asunto || !mensaje) {
    return "Todos los campos son obligatorios.";
  }

  const campos = [nombre, apellido, asunto, mensaje];
  const tieneHTML = campos.some((campo) => /<[^>]*>/.test(campo));

  if (tieneHTML) {
    return "El contenido no puede tener etiquetas HTML.";
  }

  return null;
}