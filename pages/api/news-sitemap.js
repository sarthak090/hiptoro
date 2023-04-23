const SitemapXMLParser = require("sitemap-xml-parser");

export default async function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");

  // Instructing the Vercel edge to cache the file
  res.setHeader("Cache-control", "stale-while-revalidate, s-maxage=3600");
  const url = process.env.CMS_URL + "/news-sitemap.xml";
  const resp = await fetch(url).then((r) => r.text());
  const format = resp.replace(`//www.hiptoro.com/news-sitemap.xsl`, "/v.xsl");

  res.end(format);
}
