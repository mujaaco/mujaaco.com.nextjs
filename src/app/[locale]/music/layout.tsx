import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Music | Mujaa",
    template: "%s | Music | Mujaa",
  },
  description:
    "Mujaa is a rapper and producer — the music artist persona of Mujahid Siyam. Arabic, Middle Eastern, and African rap and hip-hop.",
  openGraph: {
    title: "Music | Mujaa",
    description:
      "Mujaa is a rapper and producer — the music artist persona of Mujahid Siyam. Arabic, Middle Eastern, and African rap and hip-hop.",
    type: "website",
    images: [
      {
        url: "/img/profile-artist-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Mujaa",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function MusicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
