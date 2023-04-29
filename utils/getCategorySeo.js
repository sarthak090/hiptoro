import categories from "../categories.json";
import * as cheerio from "cheerio";

export async function getCategorySeo(slug) {
  const category = categories.find((c) => c.slug === slug);
  if (category) {
    const link = category.link;
    const CMS_URL = process.env.CMS_URL;
    const url = `${CMS_URL}/wp-json/rankmath/v1/getHead?url=${link}`;

    const rankMathDaata = await fetch(url).then((r) => r.json());
    if (rankMathDaata.success) {
      const $ = cheerio.load(rankMathDaata.head.replaceAll("\n"), null, false);

      return {
        head: rankMathDaata.head.split("\n"),
        schema: $("script")
          .text()
          .replaceAll(/\\/g, "")
          .replaceAll("secureback.hiptoro.com", "www.hiptoro.com"),
      };
    } else {
      return {};
    }
  } else {
    return {};
  }

  return category;
}
