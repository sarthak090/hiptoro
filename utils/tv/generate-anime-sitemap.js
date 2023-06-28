import fs from "fs";

import tmdb from "@/configs/tmdb";
import { generateMovieSlug } from "./../movies/movie-slug";
export default async function generateAnimeSitemap() {
  await movieSitemap();
}
export const movieSitemap = async () => {
  return;
  var n = 1;
  var m = 151;
  var myArray = [...Array(m - n + 1).keys()].map((_, index) => index + n);

  const Pages = myArray.map((i) =>
    tmdb.discover("tv", [
      { param: "with_genres", value: "16" },
      { param: "with_keywords", value: "210024" },
      { param: "sort_by", value: "popularity.desc" },
      { param: "page", value: i },
    ])
  );
  const combined = (await Promise.all(Pages)).map((p) => p.results);

  const newPosts = [].concat(...combined);

  const items = newPosts.map((item) => itemFormatter(item));
  fs.writeFileSync("./public/sitemap_anime.xml", rssOuterFormat(items));
};

const rssOuterFormat = (items) => {
  return `<?xml version="1.0" encoding="UTF-8"?> <?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>

  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${items.join("")}
</urlset>
  `;
};
const itemFormatter = (item) => {
  return `
  
  
  <url>
    <loc>https://www.hiptoro.com/anime/${generateMovieSlug({
      title: item.name,
      id: item.id,
    })}</loc>
    <lastmod>2023-06-21T05:19:53.704Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  `;
};
