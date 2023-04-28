import { CldImage } from "next-cloudinary";
import SEO from "@/components/Post/SEO";
import { NextSeo } from "next-seo";
import PostOutline from "@/components/Post/PostOutline";
import PostMeta from "@/components/Post/PostMeta";
import WPHTMLContent from "@/components/WPHTMLContent";
import AuthorBox from "@/components/Post/AuthorBox";
import dynamic from "next/dynamic";
import Link from "next/link";
import Script from "next/script";

const TagBox = dynamic(() => import("@/components/Post/TagBox"));
const SocialShares = dynamic(() => import("@/components/Post/SocialShares"));
const CategoryBox = dynamic(() => import("@/components/Post/CategoryBox"));

export default function Details({ post }: any) {
  const rnd = Math.floor(Math.random() * 4);
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
        <Script id="40e3be63c06a42be96a4956227a96693">
          {`
          (new Image()).src = 'https://capi.connatix.com/tr/si?token=ce0c756d-574b-49f5-9888-57d30090e003&cid=d7375c7c-a8aa-4449-891e-4b3af534cf41';  cnx.cmd.push(function() {    cnx({      playerId: "ce0c756d-574b-49f5-9888-57d30090e003"    }).render("40e3be63c06a42be96a4956227a96693");  });
          `}
        </Script>
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
                href={`/p/${post.related_posts[rnd].slug}`}
              >
                {post.related_posts[rnd].title.rendered}
              </a>
            </p>
          </div>
        )}

        <TagBox tags={post.tags} />
        <AuthorBox author={post.author} />
      </div>
      <div className="OUTBRAIN" data-widget-id="GS_1"></div>
      <Script
        type="text/javascript"
        async
        strategy="lazyOnload"
        src="//widgets.outbrain.com/outbrain.js"
      />
    </>
  );
}
