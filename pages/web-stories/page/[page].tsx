import { GetStaticProps, GetStaticPropsContext } from "next";
import genPagination from "../../../utils/getWebStoriesPagination";
import Pagination from "@/components/Pagination";
import { getPlaiceholder } from "plaiceholder";
import NotFound from "@/components/UI/404";
import { NextSeo } from "next-seo";
import { getRankMathHead } from "@/utils/formatInfitePost";
import Head from "next/head";
import WebStoriesGrid from "@/components/Grid/WebStoriesGrid";
export default function Page(props: any) {
  if (props.pageData.length > 0) {
    return (
      <>
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: props.seo.schema }}
          />
        </Head>
        <NextSeo noindex nofollow />
        <section className="grid md:grid-cols-12">
          <div className="md:col-span-12">
            <WebStoriesGrid posts={props.pageData} />
          </div>
        </section>

        <Pagination
          pagination={props.pagination}
          currentPage={parseInt(props.currentPageNo)}
        />
      </>
    );
  }
  return (
    <>
      <NotFound />
    </>
  );
}
export const getStaticPaths = async () => {
  return {
    paths: Array.from({ length: 5 }).map(
      (_, i) => `/web-stories/page/${i + 2}`
    ),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const { page } = params!;

  const url = process.env.NEXT_CUSTOM_WP_API_URL + `/web-stories?page=${page}`;

  try {
    const pageData = await fetch(url).then((r) => r.json());

    const seo = await getRankMathHead(`/web-stories/page/${page}`);
    const formattedLatestPosts = pageData
      .filter((t) => t.featuredImg.id && t.featuredImg.id.length > 0)
      .map(async (post: any) => {
        const { base64, img } = await getPlaiceholder(post.featuredImg.medium);

        return {
          ...post,
          base64,
          img,
        };
      });
    var latest_posts: any = [];
    await Promise.all(formattedLatestPosts).then((r) => {
      latest_posts.push(...r);
    });
    return {
      props: {
        pageData: latest_posts,
        currentPageNo: page,
        pagination: genPagination(page),
        seo,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        notFound: true,
      },
    };
  }
};
