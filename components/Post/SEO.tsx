import Head from "next/head";

export default function SEO(props: any) {
  const { post } = props;
  return (
    <>
      <Head>
        {post.nextSeoData.videos &&
          post.nextSeoData.videos.length > 0 &&
          post.nextSeoData.videos.map((v: any) => (
            <meta property="og:video" content={`${v.url}`} />
          ))}

        <meta name="article:publisher" content="https://facebook.com/hiptoro" />

        <meta name="og:updated_time" content={post.publishDate} />
        <meta name="twitter:creator" content="@HiptoroNews" />

        <meta name="twitter:image" content={post.featuredImg.large} />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content={post.author.name} />
        <meta name="twitter:label2" content="Time to read" />
        <meta name="twitter:data2" content={post.timeToRead + " minutes"} />
      </Head>
    </>
  );
}
