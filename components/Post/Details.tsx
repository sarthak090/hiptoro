import SEO from "@/components/Post/SEO";
import { NextSeo } from "next-seo";
import PostOutline from "@/components/Post/PostOutline";
import PostMeta from "@/components/Post/PostMeta";
import WPHTMLContent from "@/components/WPHTMLContent";
import AuthorBox from "@/components/Post/AuthorBox";
import dynamic from "next/dynamic";
import Image from "next/image";

import RelatedPost from "./RelatedPost";
import Script from "next/script";
import asyncScriptLoader from "@/utils/asyncScriptLoader";
import { useEffect } from "react";
const AutoAds = dynamic(() => import("@/components/Ads/AutoAds"), {
  ssr: false,
});
const TagBox = dynamic(() => import("@/components/Post/TagBox"));
const SocialShares = dynamic(() => import("@/components/Post/SocialShares"));
const CategoryBox = dynamic(() => import("@/components/Post/CategoryBox"));

export default function Details({ post }: any) {
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
                      console.log('Added Lozad Lazy',el.dataset.src)
                      el.src = el.dataset.src
                      return
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
    </>
  );
}
