import NotFound from "@/components/UI/404";
import WPHTMLContent from "@/components/WPHTMLContent";
import { getRankMathHead } from "@/utils/formatInfitePost";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";
export default function Single({ pageData, slug }: any) {
  if (pageData !== null) {
    return (
      <>
        <Head>
          <meta
            name="robots"
            content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
          />
          <link rel="canonical" href={`https://www.hiptoro.com/${slug}`} />

          <meta property="og:title" content={pageData.title.rendered} />
          <meta
            property="og:description"
            content="Hiptoro is your destination for a good laugh, a moving story, and all the latest news updates from the world of entertainment. If it&#039;s viral, it&#039;s on Hiptoro."
          />

          <meta
            property="article:publisher"
            content="https://facebook.com/hiptoro"
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={pageData.title.rendered} />
          <meta
            name="twitter:description"
            content={pageData.excerpt.rendered}
          />
          <meta name="twitter:site" content="@HiptoroNews" />
          <meta name="twitter:creator" content="@nox" />
          <meta name="twitter:label1" content="Time to read" />
          <meta name="twitter:data1" content="1 minute" />
        </Head>
        <NextSeo
          title={pageData.title.rendered}
          openGraph={{
            title: pageData.title.rendered,
            description: pageData.excerpt.rendered,
            url: "https://www.hiptoro.com/" + pageData.slug,
            locale: "en_US",
            type: "article",
            siteName: "Hiptoro",
            article: { modifiedTime: "2023-05-10T11:01:52+05:30" },
          }}
          titleTemplate=""
        />

        <div className="container mx-auto px-2 lg:px-8 py-8 max-w-site-full">
          <h1
            className="text-4xl font-montserrat mb-4 font-semibold"
            dangerouslySetInnerHTML={{ __html: pageData.title.rendered }}
          />

          <WPHTMLContent html={pageData.content.rendered} />
        </div>
      </>
    );
  }
  return (
    <div>
      <NotFound />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  res,
  params,
}) => {
  const { slug } = params!;

  if (slug && slug.includes(".xml")) {
    const url = process.env.CMS_URL + `/${slug}`;
    const resp = await fetch(url).then((r) => r.text());

    const format = resp
      .replace(`//secureback.hiptoro.com/news-sitemap.xsl`, "/v.xsl")
      .replace("//secureback.hiptoro.com/main-sitemap.xsl", "/main-sitemap.xsl")
      .replaceAll(`secureback.hiptoro.com`, "www.hiptoro.com");

    res.setHeader("Content-Type", "text/xml");

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=20, stale-while-revalidate=59"
    );
    res.write(format);
    res.end();

    return {
      props: {},
    };
  } else {
    const url = process.env.NEXT_WP_API_URL + `/pages?slug=${slug}`;

    const pageData = await fetch(url).then((r) => r.json());

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=20, stale-while-revalidate=59"
    );

    if (pageData.length > 0) {
      const rankMathHeadUrl =
        process.env.NEXT_CUSTOM_WP_API_URL + `/rank-seo?url=${slug}`;

      const seo = await fetch(rankMathHeadUrl).then((r) => r.json());
      return {
        props: {
          pageData: pageData[0],
          seo,
          slug,
        },
      };
    } else {
      return {
        props: {
          pageData: null,
        },
        notFound: true,
      };
    }
  }
};
