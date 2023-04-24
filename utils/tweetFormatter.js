import * as cheerio from "cheerio";
export default async function tweetFormatter(post, tweetHtml) {
  const $ = cheerio.load(post.content.rendered, null, false);

  let formattedPost = post;
  const tweetBlockQuotes = $(".twitter-tweet a");

  tweetBlockQuotes.filter((t, y) => {
    $(y)
      .parent()
      .parent()
      .replaceWith(
        `<div class="twitter-embed">${
          tweetHtml[t] ? reformatHtml(tweetHtml[t]) : ""
        }</div>`
      );
  });
  if (tweetHtml) {
    formattedPost.content.rendered = $.html();
  }
  return formattedPost;
}
function reformatHtml(tweet) {
  const $ = cheerio.load(tweet, null, false);
  $("img").attr("alt", "profile img");

  return $.html();
}
