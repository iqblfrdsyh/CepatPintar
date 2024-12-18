export default function sitemap() {
  return [
    {
      url: "https://cepat-pintar.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://cepat-pintar.vercel.app/signin",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
