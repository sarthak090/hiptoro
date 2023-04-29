import RSS from "rss";
import fs from "fs";

import allPosts from "./allPosts";
export default async function generateRssFeed() {
  const site_url = "www.hiptoro.com";

  const feedOptions = {
    title: "Hiptoro",
    description: "Buzzworthy Entertainment, Anime, Sports, and Pop Culture",
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/wp-content/uploads/2022/12/unnamed.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Ibas`,
  };

  const feed = new RSS(feedOptions);
  const p = await allPosts();
  await p.map((post) => {
    feed.item({
      title: post.title.rendered,

      image: `https://icons.feedercdn.com/hiptoro.com`,
      description: post.excerpt.rendered,
      url: `${site_url}/p/${post.slug}`,
      date: post.publishDate,
      content: post.content.excerpt,
      media: {
        thumbnail: post.featuredImg.thumbnail,
      },
    });
  });
  fs.writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
}
