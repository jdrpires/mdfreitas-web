import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { isIndexable } from "@/lib/deployment";
export default function robots(): MetadataRoute.Robots {
  return isIndexable(process.env)
    ? {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${site.url}/sitemap.xml`,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
