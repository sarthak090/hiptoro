import decodeHTMLEntities from "@/utils/htmlDecoder";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
import Loading from "../UI/Loading";
interface PostgridProps {
  posts: {
    id: string;
    base64?: string;
    featuredImg: {
      large: string | false;
      medium: string | false;
      id: string;
      original?: string | false;
    };
    title: {
      rendered: string;
    };
    slug: string;
    excerpt: {
      rendered: string;
    };
    author?: {
      name: string;
      slug: string;
    };
    diff?: string;
    release_date: string;
    releaseStatus: string;
  }[];
}
export default function InfiniteTVGrid(props: PostgridProps) {
  const [posts, setPosts] = useState(props.posts);
  const [hasMore, setHasMore] = useState(true);
  const getMoreMovies = async () => {
    if (posts.length < 100) {
      const pageNoToGet = (posts.length + 1) / 20 + 1;

      const response = await fetch(`/api/tv-show?total=${pageNoToGet}`).then(
        (r) => r.json()
      );
      const newPosts = response;
      setPosts((post: any) => [...post, ...newPosts]);
    } else {
      setHasMore(false);
    }
  };
  useEffect(() => {
    setPosts(props.posts);
  }, [props]);
  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-1 gap-4 my-6 md:my-8">
      <InfiniteScroll
        dataLength={posts.length}
        next={getMoreMovies}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={
          <div className="my-4 text-center font-montserrat text-2xl">
            Nothing more to show
          </div>
        }
      >
        {posts.map((post) => (
          <article
            className="lg:border-b-[2px] grid md:grid-cols-2 py-2"
            key={post.id}
            itemScope
            itemType="https://schema.org/Article"
          >
            <div className="flex  justify-center lg:justify-start">
              <Link href={`/tv-shows/${post.slug}`}>
                {post.base64 &&
                post.featuredImg.large &&
                post.featuredImg.id &&
                post.featuredImg.id.length > 0 ? (
                  <>
                    <Image
                      alt={post.title.rendered}
                      src={post.featuredImg.large}
                      width={500}
                      height={500}
                      quality={40}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={post.base64}
                      sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                      className="max-h-[400px] object-cover  "
                    />
                  </>
                ) : (
                  <Image
                    className="max-h-[400px] object-contain  "
                    alt={post.title.rendered}
                    src={
                      post.featuredImg.original
                        ? post.featuredImg.original
                        : post.featuredImg.medium
                    }
                    width={500}
                    height={500}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
                  />
                )}
              </Link>
            </div>

            <div className="md:px-2 flex flex-col items-start justify-center">
              <Link
                className="hover:text-red-400"
                href={`/tv-shows/${post.slug}`}
              >
                <p
                  className="text-md md:text-2xl mt-3 md:mt-0 font-semibold   capitalize"
                  dangerouslySetInnerHTML={{
                    __html: post.title.rendered.toLocaleLowerCase(),
                  }}
                />
              </Link>

              <p
                className="text-xs lg:text-[16px]  lg:mt-4 leading-5 lg:leading-7 overflow-hidden"
                dangerouslySetInnerHTML={{
                  __html: decodeHTMLEntities(post.excerpt.rendered),
                }}
              />
              <p className="font-bold my-4">{post.releaseStatus}</p>
            </div>
          </article>
        ))}
      </InfiniteScroll>
    </section>
  );
}
