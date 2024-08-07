import * as cheerio from "cheerio";
function youtube_parser(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

function getYtEmbed(embedId, title) {
  const embedHtml = `
  <div style="width: 100%; max-width: 600px;  margin: 0 auto;">
  <div style="position: relative; padding-bottom: 56.15%; height: 0; overflow: hidden;">
    <iframe 
      class="youtube-embed"
      style="position: absolute; top: 0; left:0; width: 100%; height: 100%; border: 0;"
      loading="lazy";
      srcdoc="<style>
        * {
        padding: 0;
        margin: 0;
        overflow: hidden;
        }
        
        body, html {
          height: 100%;
        }
        
        img, svg {
          position: absolute;
          width: 100%;
          top: 0;
          bottom: 0;
          margin: auto;
        }
        
        svg {
          filter: drop-shadow(1px 1px 10px hsl(206.5, 70.7%, 8%));
          transition: all 250ms ease-in-out;
        }
        
        body:hover svg {
          filter: drop-shadow(1px 1px 10px hsl(206.5, 0%, 10%));
          transform: scale(1.2);
        }
      </style>
      <a href='https://www.youtube.com/embed/${embedId}?autoplay=1'>
        <img loading='lazy' class='lozad'  src='https://img.youtube.com/vi/${embedId}/hqdefault.jpg' src=''alt='${title}' >
        <svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='#ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-play-circle'><circle cx='12' cy='12' r='10'></circle><polygon points='10 8 16 12 10 16 10 8'></polygon></svg>
      </a>
      "
      src="https://www.youtube.com/embed/${embedId}" 
   
      frameborder="0"
      title="${title}"

      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  </div>
</div>  `;
  return embedHtml;
}
function releatedPost(related_posts) {
  const rnd = Math.floor(Math.random() * related_posts.length);

  return `
    <div className="">
      <p  style="
      background: #EAEAEA;
      padding: 12px;
      font-weight: 700;
  "  >
        Read More:
        <a
          className="underline"
          href="/p/${related_posts[rnd].slug}"
        >
          ${related_posts[rnd].title.rendered}
        </a>
      </p>
    </div>
    `;
}

function autoAds() {
  return "";
  return `
   
<!-- Adsense New -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7099984888351146"
     data-ad-slot="5392495815"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
 
  `;
}
export default function formatPost(post) {
  let formattedPost = post;
  let iframes = [];
  const $ = cheerio.load(post.content.rendered, null, false);

  $("iframe").each((i, el) => {
    if (el.attribs && el.attribs.src) {
      iframes.push(el.attribs.src);
    }
  });
  // console.log({ iframes });
  const iframeSrc = $("iframe").attr("src");
  const isYtEmbed = iframeSrc?.includes("youtube");
  const tweetBlockQuotes = $(".twitter-tweet a");
  const scriptSrc = $("script").attr("src");
  const isTweetEmbed = scriptSrc?.includes("twitter");
  let test = [];

  $($("p")[1]).append(releatedPost(post.related_posts));
  tweetBlockQuotes.filter((t, y) => {
    const href = y.attribs.href;
    test.push(href);
  });

  if (isTweetEmbed !== undefined && isTweetEmbed === true);
  {
    // $("script").replaceWith("");
    formattedPost.twitter_embed = false;
    formattedPost.twitter_html = test;
  }

  $("p").each((i, p) => {
    if (i % 4 === 0) {
      $(p).append(
        $(
          `<div class="google-auto-ads flex justify-center lg:block  my-8">${autoAds()}</div>`
        )
      );
    }
  });

  $("blockquote .google-auto-ads").remove();
  $("img").each((i, el) => {
    $(el).addClass("lozad");

    $(el).attr("data-srcset", $(el).attr("srcset"));
    $(el).attr("data-src", $(el).attr("src"));
    $(el).attr("srcset", "");
    $(el).attr("src", "");
  });
  if (
    $("img") &&
    $("img")?.parent() &&
    $("img")?.parent()?.attr("href") &&
    $("img")?.parent()?.attr("href").length > 0
  ) {
    $("img")?.unwrap();
  }
  if (isYtEmbed) {
    if (iframes.length > 0) {
      iframes.forEach((src) => {
        const embedId = youtube_parser(src);

        $(`iframe[src^="${src}"]`).replaceWith(
          getYtEmbed(embedId, post.title.rendered)
        );
      });
    }
    // $("iframe").replaceWith(getYtEmbed(embedId, post.title.rendered));

    formattedPost.yt_embedd = iframeSrc;
  }
  formattedPost.content.rendered = $.html()
    .replaceAll(`secureback.hiptoro.com`, `www.hiptoro.com`)
    .replaceAll(
      "https://www.hiptoro.com/wp-content/uploads/",
      "https://secureback.hiptoro.com/wp-content/uploads/"
    );

  formattedPost.author = {
    ...post.author,

    slug: post.author.name.toLowerCase() + "-" + post.author.id,
  };

  return formattedPost;
}
