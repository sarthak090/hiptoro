import { NextSeo } from "next-seo";
import Head from "next/head";

export default function SEO(props: any) {
  const { data } = props;

  return (
    <Head>
      <NextSeo
        title={"data.name"}
        openGraph={{ title: data.name, description: data.description }}
        description={data.description}
        canonical={`${process.env.NEXT_PUBLIC_DOMAIN}/p/category/${data.slug}`}
      />
      {/* <title>{data.name}</title>
      <meta name="description" content={data.description} />
      <meta property="og:title" content={data.name} />
      <meta property="og:description" content={data.description} /> */}
      <meta property="og:type" content="article" />
      <meta
        property="article:publisher"
        content="https://facebook.com/hiptoro"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={data.name} />

      <meta name="twitter:site" content="@HiptoroNews" />
      <meta name="twitter:label1" content="Posts" />
      <meta name="twitter:data1" content={data.count} />
    </Head>
  );
}
