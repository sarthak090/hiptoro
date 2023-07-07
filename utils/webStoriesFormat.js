import * as cheerio from "cheerio";
const scrpt = (schema) => {
  return `
    <script type="application/ld+json">
    ${schema}
    </script>
    `;
};
export default function webStoriesFormat(content, rankMathSeoSchema, slug) {
  const $ = cheerio.load(content);
  $("head").append(scrpt(rankMathSeoSchema));

  const newURL = `${process.env.NEXT_PUBLIC_DOMAIN}/web-stories/${slug}`;
  const html = `<!DOCTYPE html>
   ${$.html()
     .replace(/(<link rel="canonical" href=")([^"]+)(")/, "$1" + newURL + "$3")

     .replaceAll("secureback.hiptoro.com", "www.hiptoro.com")}
  `;
  return html;
}
