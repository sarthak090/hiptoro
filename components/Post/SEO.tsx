import Head from "next/head";

export default function SEO(props: any) {
  const { post } = props;
  return (
    <>
      <Head>
        {post.seo.find((t: any) => t["@type"] === "VideoObject") && (
          <meta
            property="og:video"
            content={`${
              post.seo.find((t: any) => t["@type"] === "VideoObject").contentUrl
                ? post.seo.find((t: any) => t["@type"] === "VideoObject")
                    .contentUrl
                : post.seo.find((t: any) => t["@type"] === "VideoObject")
                    .embedUrl
            }`}
          />
        )}
        <meta name="article:publisher" content="https://facebook.com/hiptoro" />

        <meta name="og:updated_time" content={post.publishDate} />
        <meta name="twitter:creator" content="@HiptoroNews" />

        <meta name="twitter:image" content={post.featuredImg.large} />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content={post.author.name} />
        <meta name="twitter:label2" content="Time to read" />
        <meta name="twitter:data2" content="2 minutes" />
      </Head>
    </>
  );
}
