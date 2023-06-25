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
  if (tweetHtml && tweetHtml.length > 0 && tweetHtml[0].length > 0) {
    formattedPost.content.rendered = $.html();
  }
  return formattedPost;
}
function reformatHtml(tweet) {
  const $ = cheerio.load(tweet, null, false);
  $("img").each((i, el) => {
    $(el).attr("alt", "profile img");
    $(el).addClass("lozad");

    $(el).attr("width", "500");
    $(el).attr("height", "500");
    $(el).css("height", "auto");

    $(el).attr("data-src", $(el).attr("src"));
    $(el).attr("src", "");
  });
  $("video").each((i, el) => {
    $(el).addClass("lozad");
    $(el).attr("data-src", $(el).attr("src"));
    $(el).attr("src", "");
  });

  return $.html();
}
