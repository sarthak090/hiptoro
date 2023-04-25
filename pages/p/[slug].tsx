import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import genNextSeo from "@/utils/seo/genPostSeo";
import formatInfitePost from "@/utils/formatInfitePost";
import { getPlaiceholder } from "plaiceholder";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Details from "@/components/Post/Details";
import Loading from "@/components/UI/Loading";

export default function SinglePost(props: any) {
  const { post } = props;
  console.log({ post });
  const [posts, setPosts] = useState([props.post]);
  const [hasMore, setHasMore] = useState(true);
  if (post !== null) {
    const getMorePost = async () => {
      const url = `/api/infinite-posts?postid=${post.id}`;

      const res = await fetch(url);
      const newPosts = await res.json();
      if (newPosts.length > 0) {
        setPosts((post: any) => [...post, ...newPosts]);
        setHasMore(false);
      } else {
        setHasMore(false);
      }
    };

    return (
      <>
        <InfiniteScroll
          dataLength={8}
          next={getMorePost}
          hasMore={hasMore}
          loader={<Loading />}
          endMessage={<h4>Nothing more to show</h4>}
        >
          {posts.map((p) => (
            <div key={p.id}>
              <Details post={p} />
            </div>
          ))}
        </InfiniteScroll>
      </>
    );
  } else {
    return (
      <>
        <div className="h-screen flex justify-center items-center">
          <p className="font-montserrat text-3xl font-semibold">
            No Post Found
          </p>
        </div>
      </>
    );
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const { slug } = params!;
  const url = process.env.NEXT_CUSTOM_WP_API_URL + `/posts/${slug}`;

  const rankMathHeadUrl =
    process.env.NEXT_CUSTOM_WP_API_URL + `/rank-seo?url=/p/${slug}`;

  try {
    const seo = await fetch(rankMathHeadUrl).then((r) => r.json());

    const post = await fetch(url).then((r) => r.json());

    if (post.status) {
      return {
        props: {
          post: null,
          notFound: true,
        },
      };
    }

    const { base64, img } = await getPlaiceholder(post.featuredImg.large);

    const postTosend = {
      ...(await formatInfitePost([post])[0]),
      seo,
      base64,
      img,
      nextSeoData: genNextSeo({ seo, tags: post.tags, slug: post.slug }),
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
    process.env.NEXT_WP_API_URL + "/posts?per_page=12"
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
