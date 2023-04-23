import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/router";
export default function CategoriesGrid(props: any) {
  const [data, setData] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    const posts = Object.keys(props.posts)
      .filter((t) => t !== "latest_posts")
      .map((t) => ({ header: t, ...props.posts[t] }));

    setData(posts);
  }, [props, router.asPath]);
  function oddOrEven(num: number) {
    if (num % 2 == 0) return "even";
    return "odd";
  }
  const calc = (i: number) => {
    return oddOrEven(i + 1);
  };
  return (
    <section className="grid    grid-cols-2 md:grid-cols-3 gap-4">
      {data
        .filter((t) => t.featuredImg.id.length > 0)
        .map((post: any, index: number) => (
          <div
            key={post.id}
            className={
              props.isHeader && post.header === "trending"
                ? "block md:hidden"
                : ""
            }
          >
            {props.isHeader && (
              <Link href={`/p/category/${post.header.toLowerCase()}`}>
                <div
                  className={`${
                    calc(index) === "even" ? `bg-red-600` : `bg-black`
                  } capitalize  mb-2 text-white font-bold p-1`}
                >
                  {post.header}
                </div>
              </Link>
            )}

            <div className="grid  md:grid-cols-1 gap-2 md:gap-4">
              <div className="flex md:block   justify-center items-center">
                {post.base64 &&
                post.featuredImg.medium &&
                post.featuredImg.id &&
                post.featuredImg.id.length > 0 ? (
                  <>
                    <CldImage
                      alt={post.title.rendered}
                      src={post.featuredImg.id}
                      width={500}
                      height={500}
                      loading="eager"
                      placeholder="blur"
                      blurDataURL={post.base64}
                      sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                    />
                  </>
                ) : (
                  <CldImage
                    loading="eager"
                    src={post.featuredImg.id}
                    width={500}
                    height={500}
                    alt={post.title.rendered}
                    className={"object-contain"}
                    sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
                  />
                )}
              </div>

              <div className="flex flex-col   sm:flex-row md:block justify-start items-start">
                <>
                  <Link className="hover:text-red-400" href={`/p/${post.slug}`}>
                    <div
                      // className="text-[9px] md:text-xs font-semibold"
                      className="text-[10px] sm:text-md md:text-xl font-semibold   "
                      dangerouslySetInnerHTML={{
                        __html: post.title.rendered,
                      }}
                    />
                  </Link>
                </>
              </div>
            </div>
          </div>
        ))}
    </section>
  );
}