import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import genNextSeo from "@/utils/seo/genPostSeo";
import formatInfitePost from "@/utils/formatInfitePost";
import { getPlaiceholder } from "plaiceholder";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Details from "@/components/Post/Details";
import Loading from "@/components/UI/Loading";
import NotFound from "@/components/UI/404";

export default function SinglePost(props: any) {
  const { post } = props;

  // const [post, setPosts] = useState(props.post);
  // const [hasMore, setHasMore] = useState(true);
  if (post !== null) {
    // const getMorePost = async () => {
    //   const url = `/infinite-posts.json`;

    //   const res = await fetch(url);
    //   const newPosts = await res.json();
    //   if (newPosts.length > 0) {
    //     const excludedPosts = newPosts.filter((p: any) => p.id !== post.id);

    //     setPosts((post: any) => [...post, ...excludedPosts]);

    //     setHasMore(false);
    //   } else {
    //     setHasMore(false);
    //   }
    // };

    return (
      <div className="container mx-auto max-w-site-full">
        <Details post={post} />

        {/* <InfiniteScroll
          dataLength={4}
          next={getMorePost}
          hasMore={hasMore}
          loader={<Loading />}
          endMessage={
            <h4 className="text-center my-8 ">Nothing more to show</h4>
          }
        >
          {posts.map((p) => (
            <div key={p.id}>
            </div>
          ))}
        </InfiniteScroll> */}
      </div>
    );
  } else {
    return <NotFound />;
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const { slug } = params!;
  const url = process.env.NEXT_CUSTOM_WP_API_URL + `/posts/${slug}`;

  const rankMathHeadUrl = process.env.NEXT_WP_API_URL + `/posts/?slug=${slug}`;

  try {
    const post = await fetch(url).then((r) => r.json());
    const _post = await fetch(rankMathHeadUrl).then((r) => r.json());

    if (post.status) {
      return {
        props: {
          post: null,
          notFound: true,
        },
      };
    }

    const { base64, img } = await getPlaiceholder(
      post.featuredImg.large
        ? post.featuredImg.large
        : "https://www.hiptoro.com/imgs/placeholder-image.png"
    );

    const postTosend = {
      ...(await formatInfitePost([post])[0]),

      base64,
      img,

      nextSeoData: genNextSeo({
        videoObject: _post[0].x_metadata.rank_math_schema_VideoObject
          ? _post[0].x_metadata.rank_math_schema_VideoObject
          : null,
        tags: post.tags,
        slug: post.slug,
        ...post,
      }),
    };

    return {
      props: {
        post: postTosend,
      },
    };
  } catch (err) {
    console.log(err);
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
