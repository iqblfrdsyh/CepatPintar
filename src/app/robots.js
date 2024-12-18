export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/public/",
    },
    sitemap: "https://cepat-pintar.vercel.app/sitemap.xml",
  };
}
