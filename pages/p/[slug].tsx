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
        <NotFound />
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
    const post = await fetch(url).then((r) => r.json());
    console.log(post);
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

      base64,
      img,
      nextSeoData: genNextSeo({ tags: post.tags, slug: post.slug }),
    };

    return {
      props: {
        post: postTosend,
      },
      revalidate: 60,
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        post: null,
        notFound: true,
      },
      revalidate: 60,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetch(
    process.env.NEXT_WP_API_URL + "/posts?per_page=50"
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
