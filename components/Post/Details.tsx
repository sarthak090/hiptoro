import SEO from "@/components/Post/SEO";
import { NextSeo } from "next-seo";
import PostOutline from "@/components/Post/PostOutline";
import PostMeta from "@/components/Post/PostMeta";
import WPHTMLContent from "@/components/WPHTMLContent";
import AuthorBox from "@/components/Post/AuthorBox";
import dynamic from "next/dynamic";
import Image from "next/image";
// import Script from "next/script";
// import AutoAds from "../Ads/AutoAds";
import RelatedPost from "./RelatedPost";
import Script from "next/script";
import useLazyLoadScriptsBody from "@/hooks/useLazyLoadScriptsBody";
import useLazyLoadScripts from "@/hooks/useLazyLoadScripts";
const OutbrainAds = dynamic(() => import("@/components/Ads/Outbrain"));
const AutoAds = dynamic(() => import("@/components/Ads/AutoAds"), {
  ssr: false,
});
const TagBox = dynamic(() => import("@/components/Post/TagBox"));
const SocialShares = dynamic(() => import("@/components/Post/SocialShares"));
const CategoryBox = dynamic(() => import("@/components/Post/CategoryBox"));

export default function Details({ post }: any) {
  // const scripts = ["https://widgets.outbrain.com/outbrain.js"];

  // const scriptsLoaded = useLazyLoadScriptsBody(scripts);
  return (
    <>
      <div>
        {post.nextSeoData && (
          <>
            <SEO
              post={{
                ...post,
                nextSeoData: post.nextSeoData,
                timeToRead: post.timeToRead.minutes,
              }}
            />
            <NextSeo
              robotsProps={{
                maxImagePreview: "large",
                maxVideoPreview: -1,
                maxSnippet: -1,
              }}
              title={post.title.rendered}
              titleTemplate="%s "
              description={post.excerpt.rendered}
              {...post.nextSeoData}
            />
          </>
        )}
        <div className="my-4">
          <AutoAds />
        </div>

        <CategoryBox category={post.category} />

        <h1
          className="text-24px capitalize lg:text-[44px] break-words  text-center my-3 font-montserrat font-bold"
          dangerouslySetInnerHTML={{
            __html: post.title.rendered.toString(),
          }}
        />

        <div className="flex justify-center my-4 ">
          {post.featuredImg &&
            post.featuredImg.id.length > 0 &&
            post.featuredImg.original && (
              <Image
                src={post.featuredImg.original}
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

        <div className="my-4">
          <script
            async
            id="40e3be63c06a42be96a4956227a96693"
            dangerouslySetInnerHTML={{
              __html: `
                   (new Image()).src = 'https://capi.connatix.com/tr/si?token=ce0c756d-574b-49f5-9888-57d30090e003&cid=d7375c7c-a8aa-4449-891e-4b3af534cf41';  cnx.cmd.push(function() {    cnx({      playerId: "ce0c756d-574b-49f5-9888-57d30090e003"    }).render("40e3be63c06a42be96a4956227a96693");  });
          
          `,
            }}
          ></script>
        </div>

        <AutoAds />

        {post.toc && post.toc.length > 0 && <PostOutline toc={post.toc} />}

        <WPHTMLContent html={post.content.rendered} />
        <AutoAds />

        <RelatedPost related_posts={post.related_posts} />
        <AutoAds />
        {post.tags && <TagBox tags={post.tags} />}

        <AuthorBox author={post.author} />
      </div>

      <div className="OUTBRAIN" data-widget-id="GS_1"></div>

      <script
        type="text/javascript"
        defer
        src="https://widgets.outbrain.com/outbrain.js"
      ></script>
    </>
  );
}
