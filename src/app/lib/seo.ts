const BASE_URL = "https://mujaaco.com";

export function localeLanguages(path?: string): Record<string, string> {
  const cleanPath = path ? `/${path.replace(/^\/+|\/+$/g, "")}` : "";
  return {
    en: `${BASE_URL}/en${cleanPath}`,
    ar: `${BASE_URL}/ar${cleanPath}`,
    fr: `${BASE_URL}/fr${cleanPath}`,
    "x-default": `${BASE_URL}/en${cleanPath}`,
  };
}
