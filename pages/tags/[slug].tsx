/* eslint-disable */

import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import PostGrid from "@/components/Grid/PostGrid";

export const PostsByTag = (props: any) => {
  const { postsData, error } = props;

  return (
    <>
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
    return {
      props: {
        postsData: postsData,
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
