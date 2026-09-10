const SITE_URL = "https://mujaaco.com";
const PERSON_ID = `${SITE_URL}/#mujahid-siyam`;
const ARTIST_ID = `${SITE_URL}/music#mujaa`;

const KNOWS_LANGUAGE = [
  { "@type": "Language", name: "Arabic", alternateName: "اللغة العربية" },
  { "@type": "Language", name: "English", alternateName: "English" },
  { "@type": "Language", name: "French", alternateName: "Français" },
];

const personRef = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Mujahid Siyam",
  url: SITE_URL,
};

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function PersonStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Mujahid Siyam",
    alternateName: ["Mujaa"],
    disambiguatingDescription:
      "Software engineer, network engineer, and AI/cloud architect. Also known by the artist name Mujaa.",
    description:
      "Software engineer, network engineer, AI cloud architect, and data scientist based in Paris, France. Also releases music as Mujaa.",
    url: SITE_URL,
    image: `${SITE_URL}/img/profile-engineer-1200x630.png`,
    nationality: {
      "@type": "Country",
      name: "Sudan",
    },
    homeLocation: {
      "@type": "Place",
      name: "Paris, France",
    },
    knowsLanguage: KNOWS_LANGUAGE,
    sameAs: [
      "https://github.com/mujaaco",
      "https://linkedin.com/in/mujaaco",
      "https://dev.to/mujaaco",
      "https://reddit.com/user/mujaaco",
      "https://x.com/mujaaco",
      "https://youtube.com/@mujaaco",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Software Engineer",
      occupationLocation: {
        "@type": "City",
        name: "Paris",
      },
      skills:
        "Software engineering, network engineering, AI/cloud architecture, data science, Rust, systems programming",
    },
  };

  return <JsonLd data={structuredData} />;
}

export function MusicArtistStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": ARTIST_ID,
    name: "Mujaa",
    alternateName: ["موجا", "Mawja", "iammawja"],
    disambiguatingDescription:
      "Music artist, rapper and producer. Solo artist persona of engineer Mujahid Siyam.",
    description: "Mujaa is a rapper and producer. Real name Mujahid Siyam.",
    url: `${SITE_URL}/music`,
    image: `${SITE_URL}/img/profile-artist-1200x630.png`,
    jobTitle: "Music Artist",
    knowsLanguage: KNOWS_LANGUAGE,
    sameAs: [
      "https://open.spotify.com/artist/24n3um6erIOUxobs69qDPX",
      "https://www.deezer.com/en/artist/409144252",
      "https://play.anghami.com/artist/29651679",
      "https://soundcloud.com/mujaaco",
      "https://www.youtube.com/@MujaaMusic",
      "https://music.youtube.com/@MujaaMusic",
      "https://mujaaco.bandcamp.com",
      "https://music.amazon.fr/artists/B0HDMF43R7",
      "https://www.pandora.com/artist/mujaaco",
      "https://instagram.com/mujaaco",
      "https://tiktok.com/@mujaaco",
    ],
  };

  return <JsonLd data={structuredData} />;
}

export function AboutPageStructuredData({ url }: { url: string }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${url}#webpage`,
    url,
    name: "About Mujahid Siyam",
    about: {
      "@id": PERSON_ID,
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
    },
  };

  return <JsonLd data={structuredData} />;
}

export function KakashiAlbumStructuredData() {
  const albumId = `${SITE_URL}/music/kakashi#album`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MusicAlbum",
        "@id": albumId,
        name: "Kakashi",
        byArtist: {
          "@id": ARTIST_ID,
        },
        url: `${SITE_URL}/music`,
        albumProductionType: "https://schema.org/StudioAlbum",
      },
      {
        "@type": "MusicRecording",
        "@id": `${SITE_URL}/music/kakashi#nafs-alwshosh`,
        name: "Nafs Alwshosh",
        byArtist: {
          "@id": ARTIST_ID,
        },
        inAlbum: {
          "@type": "MusicAlbum",
          "@id": albumId,
        },
      },
    ],
  };

  return <JsonLd data={structuredData} />;
}

export function FaqPageStructuredData({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return <JsonLd data={structuredData} />;
}

export function SoftwareApplicationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#zaroxi-app`,
    name: "Zaroxi Studio",
    url: "https://zaroxi.com",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux, macOS, Windows",
    description:
      "Zaroxi Studio is a GPU-accelerated IDE written in Rust, built by Mujahid Siyam. An AI-first developer environment with wgpu-powered rendering.",
    programmingLanguage: "Rust",
    author: personRef,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return <JsonLd data={structuredData} />;
}

export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#org`,
    name: "Zaroxi Studio",
    url: "https://zaroxi.com",
    description:
      "Zaroxi Studio is the software development and creative technology company founded by Mujahid Siyam. Building AI-first systems, developer tools, and creative technology solutions including a GPU-accelerated IDE written in Rust.",
    email: "hello@mujaaco.com",
    foundingDate: "2023",
    location: {
      "@type": "Place",
      name: "Paris, France",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Paris",
        addressCountry: "FR",
      },
    },
    founder: personRef,
  };

  return <JsonLd data={structuredData} />;
}

export function WebSiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Mujaa",
    url: SITE_URL,
    description:
      "Official website of Mujahid Siyam, also known by the artist name Mujaa. Hosts his software engineering projects, technical writing, and music.",
    inLanguage: ["en", "ar", "fr"],
    about: personRef,
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Zaroxi Studio",
      url: "https://zaroxi.com",
    },
  };

  return <JsonLd data={structuredData} />;
}

export function ArticleStructuredData({
  title,
  description,
  datePublished,
  dateModified,
  image,
  url,
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title,
    description: description,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    image: image || `${SITE_URL}/img/profile-engineer-1200x630.png`,
    url: url,
    inLanguage: "en",
    isAccessibleForFree: true,
    author: personRef,
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Zaroxi Studio",
      url: "https://zaroxi.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return <JsonLd data={structuredData} />;
}

export function SoftwareSourceCodeStructuredData({
  name,
  description,
  url,
  codeRepository,
  dateCreated,
  programmingLanguage,
}: {
  name: string;
  description: string;
  url: string;
  codeRepository?: string;
  dateCreated?: string;
  programmingLanguage?: string;
}) {
  const structuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": `${url}#code`,
    name,
    description,
    url,
    author: personRef,
  };

  if (codeRepository) {
    structuredData.codeRepository = codeRepository;
  }

  if (dateCreated) {
    structuredData.dateCreated = dateCreated;
  }

  if (programmingLanguage) {
    structuredData.programmingLanguage = programmingLanguage;
  }

  return <JsonLd data={structuredData} />;
}

export function VideoObjectStructuredData({
  video,
  url,
}: {
  video: {
    id: string;
    title: string;
    description: string;
    uploadDate: string;
    duration?: string;
  };
  url: string;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${url}#video`,
    name: video.title,
    description: video.description,
    thumbnailUrl: [
      `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
    ],
    uploadDate: video.uploadDate,
    duration: video.duration,
    embedUrl: `https://www.youtube.com/embed/${video.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Zaroxi Studio",
      url: "https://zaroxi.com",
    },
  };

  return <JsonLd data={structuredData} />;
}
