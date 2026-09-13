import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://nv-sai-gokul-portfolio.vercel.app/sitemap.xml",
  };
}
