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
  const [posts, setPosts] = useState([props.post]);
  const [hasMore, setHasMore] = useState(true);
  const getNextPosts = async () => {
    if (posts.length < 7) {
      const postsFetched = await fetch(
        "/api/infinite-posts?postid=" + props.post.id
      ).then((r) => r.json());
      const newPosts = postsFetched;
      setPosts((post: any) => [...post, ...newPosts]);
    } else {
      setHasMore(false);
    }
  };
  if (posts !== null) {
    return (
      <>
        <div className="container mx-auto max-w-site-full">
          <InfiniteScroll
            hasMore={hasMore}
            next={getNextPosts}
            dataLength={posts.length}
            loader={<Loading />}
            endMessage={
              <div className="my-4 text-center font-montserrat text-2xl">
                Nothing more to show
              </div>
            }
          >
            {posts.map((post) => (
              <div key={post.id}>
                <Details post={post} />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </>
    );
  } else {
    return <NotFound />;
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview,
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
        revalidate: 120,
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
      revalidate: 120,
    };
  } catch (err) {
    console.log(err);
    console.log(`Error While Fetching: `, url);
    return {
      props: {
        post: null,
        notFound: true,
      },
      revalidate: 120,
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
