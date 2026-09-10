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
