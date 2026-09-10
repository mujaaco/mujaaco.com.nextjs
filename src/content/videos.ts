export type VideoCategory = "music" | "development" | "lifestyle";

export interface Video {
  id: string;
  title: string;
  description: string;
  category: VideoCategory;
  uploadDate: string;
  duration?: string;
  featured?: boolean;
}

export const videos: Video[] = [
  {
    id: "XLiBdOhSnF0",
    title: "Rockstar — Official Audio",
    description:
      'Official audio for "Rockstar" by Mujaa, from the upcoming Rockstar EP.',
    category: "music",
    uploadDate: "2026-08-15",
    featured: true,
  },
];

export function getVideo(id: string): Video | undefined {
  return videos.find((video) => video.id === id);
}

export function getVideosByCategory(category: VideoCategory): Video[] {
  return videos.filter((video) => video.category === category);
}

export function videoEmbedUrl(id: string): string {
  return `https://www.youtube.com/embed/${id}`;
}

export function videoWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function videoThumbnails(id: string): string[] {
  return [
    `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  ];
}

export const categoryTheme: Record<
  VideoCategory,
  {
    label: Record<"en" | "ar" | "fr", string>;
    badge: string;
    dot: string;
    glow: string;
  }
> = {
  music: {
    label: { en: "Music", ar: "موسيقى", fr: "Musique" },
    badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    dot: "bg-purple-500",
    glow: "from-purple-500/20 via-fuchsia-500/10 to-transparent",
  },
  development: {
    label: { en: "Development", ar: "تطوير", fr: "Développement" },
    badge: "bg-sky-500/10 text-sky-300 border-sky-500/20",
    dot: "bg-sky-500",
    glow: "from-sky-500/20 via-cyan-500/10 to-transparent",
  },
  lifestyle: {
    label: { en: "Lifestyle", ar: "حياة", fr: "Lifestyle" },
    badge: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    dot: "bg-amber-500",
    glow: "from-amber-500/20 via-emerald-500/10 to-transparent",
  },
};
