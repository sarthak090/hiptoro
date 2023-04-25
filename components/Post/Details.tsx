import { CldImage } from "next-cloudinary";
import SEO from "@/components/Post/SEO";
import { NextSeo } from "next-seo";
import PostOutline from "@/components/Post/PostOutline";
import PostMeta from "@/components/Post/PostMeta";
import WPHTMLContent from "@/components/WPHTMLContent";
import AuthorBox from "@/components/Post/AuthorBox";
import dynamic from "next/dynamic";
import Link from "next/link";

const TagBox = dynamic(() => import("@/components/Post/TagBox"));
const SocialShares = dynamic(() => import("@/components/Post/SocialShares"));
const CategoryBox = dynamic(() => import("@/components/Post/CategoryBox"));

export default function Details({ post }: any) {
  return (
    <>
      <div>
        {post.seo && <SEO post={post} />}
        {post.nextSeoData && (
          <NextSeo
            robotsProps={{
              maxImagePreview: "large",
              maxVideoPreview: -1,
              maxSnippet: -1,
            }}
            {...post.nextSeoData}
          />
        )}

        <CategoryBox category={post.category} />

        <h1
          className="text-24px lg:text-[44px] text-center my-3 font-montserrat font-bold"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <div className="flex justify-center my-4 ">
          {post.base64 ? (
            <CldImage
              src={post.featuredImg.id}
              width={1020}
              height={720}
              alt={post.title.rendered}
              blurDataURL={post.base64}
              placeholder="blur"
              loading="eager"
              quality={40}
              title={post.title.rendered}
            />
          ) : (
            <CldImage
              src={post.featuredImg.id}
              width={1020}
              height={720}
              alt={post.title.rendered}
              loading="eager"
              quality={40}
              title={post.title.rendered}
            />
          )}
        </div>
        <PostMeta {...post} />
        <SocialShares {...post} />
        {post.toc && post.toc.length > 0 && <PostOutline toc={post.toc} />}

        <WPHTMLContent html={post.content.rendered} />
        {post.related_posts && post.related_posts.length > 4 && (
          <div className="">
            <p className="bg-gray-bg text-darkText hover:underline  font-bold p-4">
              Read More:
              <a
                className=" underline"
                href={`/p/${
                  post.related_posts[Math.floor(Math.random() * 4)].slug
                }`}
              >
                {
                  post.related_posts[Math.floor(Math.random() * 4)].title
                    .rendered
                }
              </a>
            </p>
          </div>
        )}

        <TagBox tags={post.tags} />
        <AuthorBox author={post.author} />
      </div>
    </>
  );
}
