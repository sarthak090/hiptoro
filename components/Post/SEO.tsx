import Head from "next/head";
export default function SEO(props: any) {
  const { post } = props;

  return (
    <>
      <Head>
        {post.nextSeoData.videos &&
          post.nextSeoData.videos.length > 0 &&
          post.nextSeoData.videos.map((v: any, i: any) => (
            <meta property="og:video" key={i} content={v.url} />
          ))}
        {post.category.map((cat: any) => (
          <meta
            property="article:section"
            key={Math.random()}
            content={cat.name}
          />
        ))}
        <meta name="article:publisher" content="https://facebook.com/hiptoro" />

        <meta name="og:updated_time" content={post.publishDate} />
        <meta name="twitter:creator" content="@HiptoroNews" />
        <meta name="twitter:title" content={post.title.rendered} />
        <meta name="twitter:description" content={post.excerpt.rendered} />

        <meta property="article:author" content={post.author.facebook} />

        <meta name="twitter:image" content={post.featuredImg.large} />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content={post.author.name} />
        <meta name="twitter:label2" content="Time to read" />
        <meta name="twitter:data2" content={post.timeToRead + " minutes"} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: post._meta.schema }}
        />
      </Head>
    </>
  );
}
