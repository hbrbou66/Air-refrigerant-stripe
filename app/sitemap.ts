import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { allCollections } from "@/lib/catalog";
import { SNAPSHOT_PRODUCTS } from "@/lib/snapshot";
import { POLICIES } from "@/lib/policies";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();

  const staticPages = [
    "", "/collections/all", "/request-a-quote", "/safety-data-sheets",
    "/pressure-temp-chart", "/track-order", "/about", "/contact", "/cart",
  ].map((p) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 }));

  const collections = allCollections().map((c) => ({
    url: `${base}/collections/${c.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.6,
  }));

  const products = SNAPSHOT_PRODUCTS.map((p) => ({
    url: `${base}/products/${p.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8,
  }));

  const policies = POLICIES.map((p) => ({
    url: `${base}/policies/${p.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3,
  }));

  return [...staticPages, ...collections, ...products, ...policies];
}
