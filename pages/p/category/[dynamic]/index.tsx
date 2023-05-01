import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import MainGrid from "@/components/Grid/MainGrid";
import SEO from "@/components/Category/SEO";
import { NextSeo } from "next-seo";
import { getPlaiceholder } from "plaiceholder";
import dynamic from "next/dynamic";
import { getRankMathHead } from "@/utils/formatInfitePost";
import { getCategorySeo } from "@/utils/getCategorySeo";
import NotFound from "@/components/UI/404";
const InfinitePostGrid = dynamic(
  () => import("@/components/Grid/InfinitePostGrid")
);
function CategoryBySlug(props: any) {
  const { pageData, seoData, slug: categroySlug, rankMathSeo } = props;
  if (pageData && pageData.length > 0) {
    const data = seoData[0];

    return (
      <>
        <SEO data={{ ...seoData[0], ...rankMathSeo }} />
        <NextSeo
          title={data.name}
          openGraph={{ title: data.name, description: data.description }}
          description={data.description}
          titleTemplate="%s - Hiptoro"
          canonical={`${process.env.NEXT_PUBLIC_DOMAIN}/p/category/${data.slug}`}
          nofollow
          noindex
        />
        <MainGrid post={pageData[0]} />

        <section className="grid lg:grid-cols-12">
          <div className="md:col-span-12">
            <InfinitePostGrid
              infiniteScrollUrl={`${process.env.NEXT_PUBLIC_CUSTOM_WP_API_URL}/category/${categroySlug}`}
              posts={pageData.slice(1, pageData.length)}
            />
          </div>
        </section>
      </>
    );
  }
  return (
    <>
      <NotFound />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const catPath = [
    "news",
    "viral",
    "action",
    "animation",
    "anime",
    "hiptoro-outliers",
    "technology",
    "science",
  ];
  const paths = catPath.map((post) => {
    return {
      params: { dynamic: post.toString() },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  const dynamic = ctx.params !== undefined ? ctx.params.dynamic : "404";

  const res = await fetch(
    `${process.env.NEXT_CUSTOM_WP_API_URL}/category/${dynamic}`
  ).then();
  const seoUrl = process.env.NEXT_WP_API_URL + `/categories?slug=${dynamic}`;

  try {
    const seoData = await fetch(seoUrl).then((r) => r.json());
    const pageData = await res.json();

    const _seo = await getCategorySeo(dynamic);

    const formatted = pageData.map(async (post: any) => {
      if (post.featuredImg && post.featuredImg.medium) {
        const { base64, img } = await getPlaiceholder(post.featuredImg.medium);

        return {
          ...post,
          base64,
          img,
        };
      } else {
        return post;
      }
    });

    var latest_posts: any = [];
    await Promise.all(formatted).then((r) => {
      latest_posts.push(...r);
    });
    return {
      props: {
        pageData: latest_posts,
        seoData,
        slug: dynamic,
        rankMathSeo: _seo,
        error: false,
      },
      revalidate: 60,
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

export default CategoryBySlug;
