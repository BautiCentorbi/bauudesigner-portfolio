const BASE_URL = "https://bcentorbi.com";

/**
 * JSON-LD structured data (schema.org) for Bautista Centorbi / Infinite Graphics.
 * Helps Google, Google Business/Maps, and AI-driven search (Gemini, ChatGPT search,
 * Perplexity, etc.) understand who this is, what services are offered, and which
 * locations are served — beyond just brand-name matching.
 */
export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        name: "Bautista Centorbi",
        alternateName: "B. Centorbi",
        url: BASE_URL,
        image: `${BASE_URL}/icon.png`,
        email: "bcentorbi.designer@gmail.com",
        jobTitle:
          "Diseñador Gráfico & Desarrollador Web / Graphic Designer & Web Developer",
        description:
          "Diseñador gráfico y desarrollador web con base en Mendoza, Argentina. Especializado en identidad visual, branding y desarrollo web para clientes en Argentina, Chile, Uruguay, Estados Unidos y Europa.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mendoza",
          addressCountry: "AR",
        },
        worksFor: {
          "@id": `${BASE_URL}/#organization`,
        },
        sameAs: [
          "https://www.instagram.com/bauucentorbi",
          "https://www.behance.net/bautistcentorb",
          "https://www.linkedin.com/in/bautista-centorbi-designer/",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${BASE_URL}/#organization`,
        name: "Infinite Graphics",
        alternateName: "Infinite Graphics — Bautista Centorbi",
        url: BASE_URL,
        image: `${BASE_URL}/icon.png`,
        logo: `${BASE_URL}/icon.png`,
        email: "bcentorbi.designer@gmail.com",
        description:
          "Estudio de diseño gráfico, branding y desarrollo web. Diseñador gráfico en Mendoza y desarrollador web en Mendoza, disponible para proyectos remotos en toda Argentina, Chile, Uruguay, Estados Unidos y Europa.",
        founder: {
          "@id": `${BASE_URL}/#person`,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mendoza",
          addressCountry: "AR",
        },
        areaServed: [
          { "@type": "City", name: "Mendoza" },
          { "@type": "Country", name: "Argentina" },
          { "@type": "Country", name: "Chile" },
          { "@type": "Country", name: "Uruguay" },
          { "@type": "Country", name: "Estados Unidos" },
          { "@type": "Country", name: "United States" },
          { "@type": "Place", name: "Europa" },
        ],
        sameAs: [
          "https://www.instagram.com/infinite_grphcs/",
          "https://www.instagram.com/bauucentorbi",
          "https://www.behance.net/bautistcentorb",
          "https://www.linkedin.com/in/bautista-centorbi-designer/",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
