import fs from "fs";
import formatInfitePost from "./formatInfitePost";

export default async function generateRssFeed() {
  const c = await fetch(`https://secureback.hiptoro.com/feed`).then((r) =>
    r.text()
  );
  const format = c.replaceAll(`secureback.hiptoro.com`, "www.hiptoro.com");
  generatePostForInfiniteScroll();
  fs.writeFileSync("./public/rss.xml", format);
}
const generatePostForInfiniteScroll = async () => {
  const c = await getMorePost();
  const format = c;
  fs.writeFileSync("./public/infinite-posts.json", JSON.stringify(format));
};

const getMorePost = async (id) => {
  const url = `${process.env.NEXT_PUBLIC_CUSTOM_WP_API_URL}/infinite-posts?start=1&limit=3`;

  const res = await fetch(url);
  const newPosts = await res.json();

  if (newPosts.length > 0) {
    const formattedPosts = await Promise.all(formatInfitePost(newPosts));

    return formattedPosts;
  } else {
    return [];
  }
};
