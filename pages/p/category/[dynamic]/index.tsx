import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import MainGrid from "@/components/Grid/MainGrid";
import SEO from "@/components/Category/SEO";
import { NextSeo } from "next-seo";
import { getPlaiceholder } from "plaiceholder";
import dynamic from "next/dynamic";
const InfinitePostGrid = dynamic(
  () => import("@/components/Grid/InfinitePostGrid")
);
function CategoryBySlug(props: any) {
  const { pageData, seoData, slug: categroySlug } = props;
  if (pageData && pageData.length > 0) {
    const data = seoData[0];

    return (
      <>
        <SEO data={seoData[0]} />
        <NextSeo
          title={data.name}
          openGraph={{ title: data.name, description: data.description }}
          description={data.description}
          titleTemplate="%s - Hiptoro"
          canonical={`${process.env.NEXT_PUBLIC_DOMAIN}/p/category/${data.slug}`}
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
      <p className="text-3xl font-semibold h-screen flex justify-center items-center">
        <p className="text-center"> No Category Found</p>
      </p>
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
  console.log({ slug: ctx.params.dynamic });
  const res = await fetch(
    `${process.env.NEXT_CUSTOM_WP_API_URL}/category/${dynamic}`
  ).then();
  const seoUrl = process.env.NEXT_WP_API_URL + `/categories?slug=${dynamic}`;
  try {
    const seoData = await fetch(seoUrl).then((r) => r.json());
    const pageData = await res.json();
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

    var latest_posts = [];
    await Promise.all(formatted).then((r) => {
      latest_posts.push(...r);
    });
    return {
      props: {
        pageData: latest_posts,
        seoData,
        slug: dynamic,
        error: false,
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

export default CategoryBySlug;
