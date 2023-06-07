import React from "react";
import StaticHtml from "../../components/StaticHTML/StaticHtml";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
interface Props {
  post: {
    id: number;
    date: string;
    date_gmt: string;
    guid: {
      rendered: string;
    };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    x_featured_media: string;
    title: {
      rendered: string;
    };
    content: {
      rendered: string;
    };
    excerpt: {
      rendered: string;
      protected: boolean;
    };
    author: number;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    sticky: boolean;
    template: string;
    format: string;
    meta: any[]; // Update this with the actual type if possible
    categories: number[];
    tags: number[];
  };
}
function StaticPosts({ post }: Props) {
  return (
    <div className="max-w-site-full">
      <StaticHtml post={post} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const { slug } = params!;
  const url = process.env.NEXT_WP_API_URL + `/posts/${slug}`;
  const post = await fetch(url).then((r) => r.json());

  if (post.id) {
    return {
      props: {
        post: post,
        notFound: true,
      },
      redirect: {
        destination: `/p/${post.slug}`,
      },
    };
  } else {
    return {
      props: {
        post: null,
        notFound: true,
      },
    };
  }
};
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetch(
    process.env.NEXT_WP_API_URL + "/posts?per_page=100"
  ).then((r) => r.json());

  const paths = posts.map((post: any) => {
    return {
      params: { slug: post.slug.toString() },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export default StaticPosts;
