/* eslint-disable */

import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import PostGrid from "@/components/Grid/PostGrid";
import { NextSeo } from "next-seo";
import { getRankMathHead } from "@/utils/formatInfitePost";
import Head from "next/head";

export const PostsByTag = (props: any) => {
  const { postsData, seo } = props;

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: props.seo.schema }}
        />
      </Head>
      <NextSeo nofollow noindex />
      <section className="grid md:grid-cols-12">
        <div className="md:col-span-12">
          <PostGrid posts={postsData} />
        </div>
      </section>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_WP_API_URL}/tags?per_page=10`
  ).then();
  const data = await res.json();

  const paths = data.map((tag: any) => {
    return {
      params: {
        slug: tag.slug,
      },
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
  const slug = ctx.params !== undefined ? ctx.params.slug : "404";
  const res = await fetch(
    `${process.env.NEXT_CUSTOM_WP_API_URL}/tags/${slug}`
  ).then();

  const postsData = await res.json();

  if (postsData.length > 0) {
    const seo = await getRankMathHead(`/tags/${slug}`);

    return {
      props: {
        postsData: postsData,
        seo,
        error: false,
      },
    };
  } else {
    return {
      props: {
        postsData: postsData,
        error: true,
      },
    };
  }
};

export default PostsByTag;
