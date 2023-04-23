import WPHTMLContent from "@/components/WPHTMLContent";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

export default function Single({ pageData, seo }: any) {
  if (pageData !== null) {
    return (
      <>
        <NextSeo title={pageData.title.rendered} titleTemplate="" />

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
  return <div>No Data Found</div>;
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
      .replace(`//cms.hiptoro.com/news-sitemap.xsl`, "/v.xsl")
      .replace("//cms.hiptoro.com/main-sitemap.xsl", "/main-sitemap.xsl")
      .replaceAll(`cms.hiptoro.com`, "www.hiptoro.com");

    res.setHeader("Content-Type", "text/xml");

    res.write(format);
    res.end();

    return {
      props: {},
    };
  } else {
    const url = process.env.NEXT_WP_API_URL + `/pages?slug=${slug}`;

    const pageData = await fetch(url).then((r) => r.json());
    const rankMathHeadUrl =
      process.env.NEXT_CUSTOM_WP_API_URL + `/rank-seo?url=/${slug}`;
    const seo = await fetch(rankMathHeadUrl).then((r) => r.json());
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=20, stale-while-revalidate=59"
    );
    console.log({ rankMathHeadUrl });
    if (pageData.length > 0) {
      return {
        props: {
          pageData: pageData[0],
          seo,
        },
      };
    } else {
      return {
        props: {
          pageData: null,
        },
      };
    }
  }
};
