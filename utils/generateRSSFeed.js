import fs from "fs";
import formatInfitePost from "./formatInfitePost";

export default async function generateRssFeed() {
  await testRss();
}
export const testRss = async () => {
  const url = `${process.env.NEXT_PUBLIC_CUSTOM_WP_API_URL}/infinite-posts?start=0&limit=19`;

  const res = await fetch(url);
  const newPosts = await res.json();
  const items = newPosts.map((item) => itemFormatter(item));
  fs.writeFileSync("./public/rss.xml", rssOuterFormat(items));

  return rssOuterFormat(items);
};

const rssOuterFormat = (items) => {
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
	xmlns:wfw="http://wellformedweb.org/CommentAPI/"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:atom="http://www.w3.org/2005/Atom"
	xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
	xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
	 xmlns:media="http://search.yahoo.com/mrss/" >

<channel>
	<title>Hiptoro</title>
	<atom:link href="https://www.hiptoro.com/feed/" rel="self" type="application/rss+xml" />
	<link>https://www.hiptoro.com</link>
	<description>Buzzworthy Entertainment, Anime, Sports, and Pop Culture</description>
	<lastBuildDate>Mon, 01 May 2023 05:22:07 +0000</lastBuildDate>
	<language>en-US</language>
	<sy:updatePeriod>
	hourly	</sy:updatePeriod>
	<sy:updateFrequency>
	1	</sy:updateFrequency>
	

<image>
	<url>https://static.hiptoro.com/wp-content/uploads/2022/12/cropped-hiptoro-32x32.png</url>
	<title>Hiptoro</title>
	<link>https://www.hiptoro.com</link>
	<width>32</width>
	<height>32</height>
</image> 
${items.join("")}
  </channel>
</rss>
  `;
};
const itemFormatter = (item) => {
  return `
  
  
  

    <item>
    <title><![CDATA[${item.title.rendered.toString()}]]></title>
    <link>https://www.hiptoro.com/p/${item.slug}</link>
    <dc:creator><![CDATA[${item.author.name}]]></dc:creator>
		
    <pubDate>${item.date}</pubDate>

    ${item.category
      .map((cat) => `  <category><![CDATA[${cat.name}]]></category>`)
      .join("")}
      <guid isPermaLink="false">${item.id}</guid>
      <description></description>
      <enclosure url="${item.featuredImg.original}" type="image/webp"/>
		
		
			</item>
  `;
};

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
