import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-5xl font-bold">Proyecto no encontrado</h1>
      <p className="mt-4 text-neutral-700">
        El proyecto que buscás no existe o cambió de dirección. Volvé a la
        galería para ver el resto de los trabajos.
      </p>
      <Link
        href="/#projects"
        className="mt-6 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold border border-black bg-black text-white hover:-translate-y-0.5 transition"
      >
        Ver proyectos
      </Link>
    </div>
  );
}
