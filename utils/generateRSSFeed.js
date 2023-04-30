import fs from "fs";

import allPosts from "./allPosts";
export default async function generateRssFeed() {
  const c = await fetch(`https://secureback.hiptoro.com/feed`).then((r) =>
    r.text()
  );
  const format = c.replaceAll(`secureback.hiptoro.com`, "www.hiptoro.com");
  fs.writeFileSync("./public/rss.xml", format);
}
