// import SocialShares from "@/components/Post/SocialShares";
import { CldImage } from "next-cloudinary";
import SEO from "@/components/Post/SEO";
import { NextSeo } from "next-seo";
import PostOutline from "@/components/Post/PostOutline";
import PostMeta from "@/components/Post/PostMeta";

// import CategoryBox from "@/components/Post/CategoryBox";
import WPHTMLContent from "@/components/WPHTMLContent";
import AuthorBox from "@/components/Post/AuthorBox";
import dynamic from "next/dynamic";

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
              loading="lazy"
              quality={40}
              title={post.title.rendered}
            />
          )}
        </div>
        <PostMeta {...post} />
        <SocialShares {...post} />
        {post.toc && post.toc.length > 0 && <PostOutline toc={post.toc} />}

        <WPHTMLContent html={post.content.rendered} />

        <TagBox tags={post.tags} />
        <AuthorBox author={post.author} />
      </div>
    </>
  );
}
