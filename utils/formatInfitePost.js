import { readingTime } from "reading-time-estimator";
import formatPost from "./formatPost";
import tweetFormatter from "./tweetFormatter";
import genToc from "./genToc";
import * as cheerio from "cheerio";
import { getWebpBase64 } from "./images/getWebpBase64";

export default function (posts) {
  let fomattedPosts = JSON.parse(JSON.stringify(posts));
  fomattedPosts = fomattedPosts.map(async (post) => {
    const img = await getWebpBase64(post.featuredImg.large);

    const p = {
      ...post,
      timeToRead: readingTime(post.content.rendered),
      toc: genToc(post.content).toc,
      featuredImg: {
        ...post.featuredImg,
        large: img,
      },
      content: {
        rendered: genToc(post.content).parsedcontent.replace(
          /https:\/\/platform\.twitter\.com\/widgets\.js/g,
          ""
        ),
      },
    };
    const postTosend = formatPost(p);
    const htmlTweets = await postTosend.twitter_html?.map(
      async (t) => await getTweetHtml(t)
    );
    const html = await Promise.all(htmlTweets).then((r) => r);
    const rankmath = await getRankMathHead("/p/" + post.slug);
    p._meta = rankmath;
    const tweetHtml = html.filter((t) => t !== undefined);
    const formattedHtmlWithTweet = await tweetFormatter(postTosend, tweetHtml);
    return formattedHtmlWithTweet;
  });

  return fomattedPosts;
}
async function getTweetHtml(url) {
  try {
    const tweet = await fetch(
      `https://tweetic.zernonia.com/api/tweet?url=${url}&css=tailwind&show_media=true`
    ).then((r) => r.json());

    return tweet.html;
  } catch (err) {
    console.log("err");
    return ``;
  }
}

export async function getRankMathHead(slug) {
  const CMS_URL = process.env.CMS_URL;
  const url = `${CMS_URL}/wp-json/rankmath/v1/getHead?url=${CMS_URL}${slug}`;

  const rankMathDaata = await fetch(url).then((r) => r.json());
  if (rankMathDaata.success) {
    const $ = cheerio.load(rankMathDaata.head.replaceAll("\n"), null, false);
    const arr = rankMathDaata.head.split("\n");
    return {
      head: rankMathDaata.head.split("\n"),
      schema: $("script")
        .text()

        .replaceAll("secureback.hiptoro.com", "www.hiptoro.com"),
    };
  } else {
    return {
      head: "",
      schema: "",
    };
  }
}

function parseMetaData(metaString) {
  const metaData = {};

  // Remove unnecessary characters and split the string into individual meta tags

  const metaTags = metaString;

  // Process each meta tag
  metaTags.forEach((tag) => {
    const keyValueArr = tag.split("=");
    const key = keyValueArr[0].replace(/[<>"]/g, "").trim();
    const value = keyValueArr[1].replace(/"|'/g, "").trim();

    metaData[key] = value;
  });
  console.log(metaData);

  return metaData;
}
