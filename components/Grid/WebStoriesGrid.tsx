import decodeHTMLEntities from "@/utils/htmlDecoder";

import Image from "next/image";
import Link from "next/link";
import MetaBox from "./MetaBox";
export default function WebStoriesGrid(props: any) {
  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-1 gap-4 my-6 md:my-8">
      {props.posts.map((post: any) => (
        <article
          className="lg:border-b-[2px] grid md:grid-cols-2 py-2"
          key={post.id}
          itemScope
          itemType="https://schema.org/Article"
        >
          <div className="flex  justify-center lg:justify-start">
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
                  className="max-h-[400px] object-contain  "
                />
              </>
            ) : (
              <Image
                className="max-h-[400px] object-cover  "
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
          </div>

          <div className="md:px-2 lg:flex lg:flex-col lg:justify-center">
            <Link
              className="hover:text-red-400"
              href={`/web-stories/${post.slug}`}
              target="_blank"
            >
              <p
                className="text-md md:text-xl mt-3 md:mt-0 font-semibold   "
                dangerouslySetInnerHTML={{
                  __html: post.title.rendered,
                }}
              />
            </Link>

            <p
              className="text-xs lg:text-[16px]  lg:mt-4 leading-5 lg:leading-7 overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: decodeHTMLEntities(post.excerpt.rendered),
              }}
            />

            <MetaBox author={post.author} diff={post.diff} />
          </div>
        </article>
      ))}
    </section>
  );
}
