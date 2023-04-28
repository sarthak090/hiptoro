import Link from "next/link";
import MetaBox from "./MetaBox";
import Image from "next/image";

export default function MainGrid(props: any) {
  const { post } = props;
  return (
    <div className="grid md:grid-cols-2 gap-2 my-6">
      <div className="flex justify-center lg:justify-start">
        {post.base64 &&
        post.featuredImg.medium &&
        post.featuredImg.id &&
        post.featuredImg.id.length > 0 ? (
          <>
            <Image
              alt={post.title.rendered}
              src={post.featuredImg.medium}
              width={500}
              height={500}
              loading="eager"
              placeholder="blur"
              blurDataURL={post.base64}
              quality={40}
              sizes="(max-width: 768px) 100vw,
           (max-width: 1200px) 50vw,
           33vw"
            />
          </>
        ) : (
          <Image
            alt={post.title.rendered}
            src={post.featuredImg.medium}
            width={600}
            height={600}
            loading="eager"
            fill
            sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
          />
        )}
      </div>
      <div>
        <Link href={`/p/${post.slug}`}>
          <p
            className="text-16px   hover:cursor-pointer hover:text-red-400 md:text-xl lg:text-3xl font-bold"
            dangerouslySetInnerHTML={{
              __html: post.title.rendered,
            }}
          />
        </Link>
        <p
          className="text-xs md:text-13px   lg:text-[16px] leading-5 lg:leading-7         "
          dangerouslySetInnerHTML={{
            __html: post.excerpt.rendered,
          }}
        />
        <MetaBox author={post.author} diff={post.diff} />
      </div>
    </div>
  );
}
