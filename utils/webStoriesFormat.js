import * as cheerio from "cheerio";
const scrpt = (schema) => {
  return `
    <script type="application/ld+json">
    ${schema}
    </script>
    `;
};
export default function webStoriesFormat(content, rankMathSeoSchema) {
  const $ = cheerio.load(content);
  $("head").append(scrpt(rankMathSeoSchema));

  const html = `<!DOCTYPE html>
   ${$.html().replaceAll("secureback.hiptoro.com", "www.hiptoro.com")}
  `;
  return html;
}
