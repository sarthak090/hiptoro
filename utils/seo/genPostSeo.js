import decode from "@/utils/htmlDecoder";

export default function (post) {
  const data = post.seo;
  const nextSeo = {
    openGraph: {
      site_name: "Hiptoro",
      article: { tags: post.tags.map((t) => t.name) },
    },

    twitter: {
      site: "@HiptoroNews",
      creator: "@HiptoroNews",
      card: "summary_large_image",
    },
    videos: [],
    canonical: `${process.env.NEXT_PUBLIC_DOMAIN}/p/${post.slug}`,
  };
  const newsArticle = data.find((t) => t["@type"] === "NewsArticle");
  const imageObject = data.find((t) => t["@type"] === "ImageObject");
  const breadcrumbList = data.find((t) => t["@type"] === "BreadcrumbList");
  const person = data.find((t) => t["@type"] === "Person");
  const videoObject = data.find((t) => t["@type"] === "VideoObject");

  const organization = data.find(
    (t) => t["@type"].length > 1 && t["@type"][1] === "Organization"
  );
  if (organization) {
    nextSeo.openGraph.type = "article";
  }
  if (newsArticle) {
    nextSeo.title = decode(newsArticle.headline);
    nextSeo.description = newsArticle.description;

    nextSeo.openGraph.article.publishedTime = newsArticle.datePublished;
    nextSeo.openGraph.article.modifiedTime = newsArticle.dateModified;
    nextSeo.twitter.title = newsArticle.headline;
    nextSeo.twitter.description = newsArticle.description;
  }

  if (imageObject) {
    nextSeo.openGraph.images = [
      {
        url: imageObject.url,
        width: 1200,
        height: 630,
        alt: newsArticle?.headline,
        secureUrl: imageObject.url,
        type: "image/webp",
      },
    ];
    nextSeo.twitter.image = imageObject.url;
  }
  if (breadcrumbList) {
    nextSeo.openGraph.article.section =
      breadcrumbList.itemListElement[1].item.name;
  }

  if (person) {
    nextSeo.twitter.label1 = "Written by";
    nextSeo.twitter.data1 = person.name;
  }

  if (videoObject && videoObject.contentUrl) {
    nextSeo.videos.push({
      url: videoObject.contentUrl,
      width: videoObject.width,
      height: videoObject.height,
    });
  }
  if (
    videoObject &&
    videoObject.contentUrl == undefined &&
    videoObject.embedUrl
  ) {
    nextSeo.videos.push({
      url: videoObject.embedUrl,
      width: videoObject.width,
      height: videoObject.height,
    });
  }

  return nextSeo;
}
