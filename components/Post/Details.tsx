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
import asyncScriptLoader from "@/utils/asyncScriptLoader";
import useLazyLoadScriptsBody from "@/hooks/useLazyLoadScriptsBody";
import useLazyLoadScripts from "@/hooks/useLazyLoadScripts";
import { useEffect } from "react";
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
  useEffect(() => {
    asyncScriptLoader({
      src: "/js/connatixbody.js",
      attachTo: document.getElementById("connatix-ads"),
      loadWithAsync: true,
      onUserInteraction: true,
      attributes: [{ key: "id", value: "40e3be63c06a42be96a4956227a96693" }],
    });

    asyncScriptLoader({
      src: "https://widgets.outbrain.com/outbrain.js",
      attachTo: document.getElementById("outbrain-script"),
      loadWithAsync: true,
      onUserInteraction: true,
    });
  }, []);
  return (
    <>
      <Script src="/js/lozad.js" strategy="beforeInteractive" />

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

        <div id="connatix-ads" className="my-4 connatix-ads">
          {/* <script
            async
            id="40e3be63c06a42be96a4956227a96693"
            dangerouslySetInnerHTML={{
              __html: `
                   (new Image()).src = 'https://capi.connatix.com/tr/si?token=ce0c756d-574b-49f5-9888-57d30090e003&cid=d7375c7c-a8aa-4449-891e-4b3af534cf41';  cnx.cmd.push(function() {    cnx({      playerId: "ce0c756d-574b-49f5-9888-57d30090e003"    }).render("40e3be63c06a42be96a4956227a96693");  });
          
          `,
            }}
          ></script> */}
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
      <Script strategy="lazyOnload">
        {`
            const observer = lozad('.lozad', {
              load: el => {
  
  
  
                  if (el.tagName === "IMG") {
                      // For Image Lazy Loading
                      console.log('Added Lozad Lazy')
                      el.src = el.dataset.src
                  }
  
                  const bq = document.createElement('blockquote');
                  bq.className = 'twitter-tweet';
  
                  const p = document.createElement('p');
                  p.lang = 'ja';
                  p.dir = 'ltr';
                  bq.appendChild(p);
  
                  const twitterSrc = el.dataset.twitterSrc;
                  const a = document.createElement('a');
                  a.href = twitterSrc;
                  bq.appendChild(a);
  
                  const script = document.createElement('script');
                  script.src = 'https://platform.twitter.com/widgets.js';
                  script.charset = 'utf-8';
                  script.async = true;
  
                  el.insertAdjacentElement('beforeEnd', bq);
                  el.insertAdjacentElement('beforeEnd', script);
              },
  
          });
          observer.observe();
  
          `}
      </Script>
      <div className="OUTBRAIN" data-widget-id="GS_1"></div>
      <div id="outbrain-script"></div>
      {/* <Script defer src="https://widgets.outbrain.com/outbrain.js"></Script> */}
    </>
  );
}
