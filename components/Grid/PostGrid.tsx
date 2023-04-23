import decodeHTMLEntities from "@/utils/htmlDecoder";

import { CldImage } from "next-cloudinary";
import Link from "next/link";
import MetaBox from "./MetaBox";
export default function PostGrid(props: any) {
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
            {post.base64 && post.featuredImg.medium ? (
              <>
                <CldImage
                  alt={post.title.rendered}
                  src={post.featuredImg.id}
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
              <CldImage
                alt={post.title.rendered}
                src={post.featuredImg.id}
                width={500}
                height={500}
                loading="lazy"
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
              />
            )}
          </div>

          <div className="md:px-2 ">
            <Link className="hover:text-red-400" href={`/p/${post.slug}`}>
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
