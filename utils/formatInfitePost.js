import { readingTime } from "reading-time-estimator";
import formatPost from "./formatPost";
import tweetFormatter from "./tweetFormatter";
import genToc from "./genToc";
export default function (posts) {
  let fomattedPosts = JSON.parse(JSON.stringify(posts));

  fomattedPosts = fomattedPosts.map(async (post) => {
    const p = {
      ...post,
      timeToRead: readingTime(post.content.rendered),
      toc: genToc(post.content).toc,
      content: {
        rendered: genToc(post.content).parsedcontent,
      },
    };
    const postTosend = formatPost(p);
    const htmlTweets = await postTosend.twitter_html.map(
      async (t) => await getTweetHtml(t)
    );
    const html = await Promise.all(htmlTweets).then((r) => r);
    const tweetHtml = html.filter((t) => t !== undefined);
    const formattedHtmlWithTweet = await tweetFormatter(postTosend, tweetHtml);
    return formattedHtmlWithTweet;
  });

  return fomattedPosts;
}
async function getTweetHtml(url) {
  const tweet = await fetch(
    `https://www.tweetic.io/api/tweet?url=${url}&css=tailwind&show_media=true`
  ).then((r) => r.json());
  return tweet.html;
}
