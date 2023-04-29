import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import decodeHTMLEntities from "@/utils/htmlDecoder";
import MetaBox from "./MetaBox";

import Image from "next/image";

type Props = {
  posts: any;
  infiniteScrollUrl: string;
};
const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <path
          fill="none"
          stroke="#0a0a0a"
          stroke-width="8"
          stroke-dasharray="42.76482137044271 42.76482137044271"
          d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
          stroke-linecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            repeatCount="indefinite"
            dur="1s"
            keyTimes="0;1"
            values="0;256.58892822265625"
          ></animate>
        </path>
      </svg>
    </div>
  );
};
export default function InfinitePostGrid(props: Props) {
  const { infiniteScrollUrl } = props;
  const [posts, setPosts] = useState(props.posts);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    setPosts(props.posts);
  }, [props]);
  const getMorePost = async () => {
    const url = `${infiniteScrollUrl}?start=${posts.length + 1}&limit=10`;

    const res = await fetch(url);
    const newPosts = await res.json();
    if (newPosts.length > 0) {
      if (posts.length > 40) {
        setHasMore(false);
      }
      setPosts((post: any) => [...post, ...newPosts]);
    } else {
      setHasMore(false);
    }
  };

  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-1 gap-4 md:my-8">
      <InfiniteScroll
        dataLength={posts.length}
        next={getMorePost}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={<h4>Nothing more to show</h4>}
      >
        {posts
          .filter((p: any) => p.featuredImg.id.length > 0)
          .map((post: any) => (
            <article
              className="lg:border-b-[2px] grid md:grid-cols-2 py-2"
              key={post.id}
              itemScope
              itemType="https://schema.org/Article"
            >
              <div className="flex  justify-center lg:justify-start">
                {post.base64 &&
                post.featuredImg.medium &&
                post.featuredImg.id &&
                post.featuredImg.id.length ? (
                  <>
                    <Image
                      className="max-h-[500px]"
                      alt={post.title.rendered}
                      src={post.featuredImg.medium}
                      width={500}
                      height={500}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={post.base64}
                      sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
                    />
                  </>
                ) : (
                  <Image
                    alt={post.title.rendered}
                    src={post.featuredImg.medium}
                    width={500}
                    height={500}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
                    // placeholder="blur"
                  />
                )}
              </div>

              <div className="md:px-2">
                <Link className="hover:text-red-400" href={`/p/${post.slug}`}>
                  <p
                    className="text-md md:text-xl font-semibold   "
                    dangerouslySetInnerHTML={{
                      __html: post.title.rendered,
                    }}
                  />
                </Link>
                <Link className="hover:text-red-400" href={`/p/${post.slug}`}>
                  <p
                    className="text-xs lg:text-[16px] lg:mt-4 leading-5 lg:leading-7 overflow-hidden"
                    dangerouslySetInnerHTML={{
                      __html: decodeHTMLEntities(post.excerpt.rendered),
                    }}
                  />
                </Link>
                <MetaBox author={post.author} diff={post.diff} />
              </div>
            </article>
          ))}
      </InfiniteScroll>
    </section>
  );
}
