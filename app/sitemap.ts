import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

const BASE = "https://ethanchacko.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/for-agencies"];
  const workRoutes = projects.map((p) => `/work/${p.slug}`);
  const lastModified = new Date();

  return [...staticRoutes, ...workRoutes].map((path) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
