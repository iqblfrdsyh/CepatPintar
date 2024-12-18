export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/signin/"],
    },
    sitemap: "https://acme.com/sitemap.xml",
  };
}
