import "@/styles/globals.css";
import "@/styles/blog.css";
import "@/styles/tmm.css";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { Roboto, Montserrat, Raleway, Noto_Sans } from "next/font/google";

import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import useLazyLoadScripts from "@/hooks/useLazyLoadScripts";
import asyncScriptLoader from "@/utils/asyncScriptLoader";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-open-roboto",
  weight: ["100", "300", "400", "900", "700"],
});
const noto_sans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-open-noto_sans",
  weight: ["100", "300", "400", "900", "700"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-open-montserrat",
  weight: ["100", "300", "400", "900", "700"],
});
const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-open-raleway",
  weight: ["100", "300", "400", "900", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  const scripts = [
    "/js/adsense.js",
    "/js/gtag.js",

    "https://udmserve.net/udm/img.fetch?sid=15497;tid=1;dt=6;",
    "https://www.googletagmanager.com/gtag/js?id=G-LE5P46J4FY",
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7099984888351146",
  ];
  const scriptsLoaded = useLazyLoadScripts(scripts);

  useEffect(() => {
    asyncScriptLoader({
      src: "/js/connatix.js",
      attachTo: document.head,
      loadWithAsync: true,
      onUserInteraction: true,
    });
    var ads = document.getElementsByClassName("adsbygoogle").length;
    for (var i = 0; i < ads; i++) {
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error(`Error While Loading Ads`, e);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="block-all-mixed-content"
        />

        <meta charSet="UTF-8" />
        <meta
          name="twitter:image"
          content="https://static.hiptoro.com/wp-content/uploads/2022/12/cropped-hiptoro.png"
        />

        <link
          rel="alternate"
          type="application/rss+xml"
          title="Hiptoro &raquo; Feed"
          href="https://www.hiptoro.com/feed/"
        />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//ssl.google-analytics.com" />
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="//googleads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="//tpc.googlesyndication.com" />
        <link rel="dns-prefetch" href="//stats.g.doubleclick.net" />
        <link rel="dns-prefetch" href="//www.gstatic.com" />
        {/* <link rel="dns-prefetch" href="//platform.twitter.com" /> */}

        {/* <link
          href="//www.googletagmanager.com"
          rel="preconnect"
          crossOrigin="anonymous"
        /> */}
        {/* <link rel="dns-prefetch" href="//adservice.google.com" />
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" /> */}
      </Head>
      {/* <Script
        data-cfasync="false"
        lang="javascript"
        defer
        strategy="afterInteractive"
        referrerPolicy="no-referrer-when-downgrade"
        src="https://udmserve.net/udm/img.fetch?sid=15497;tid=1;dt=6;"
      /> */}

      <Script strategy="beforeInteractive">
        {`
       
        !function(n){if(!window.cnx){window.cnx={},window.cnx.cmd=[];var t=n.createElement('iframe');t.src='javascript:false'; t.display='none',t.onload=function(){var n=t.contentWindow.document,c=n.createElement('script');c.src='//cd.connatix.com/connatix.player.js?cid=d7375c7c-a8aa-4449-891e-4b3af534cf41',c.setAttribute('async','1'),c.setAttribute('type','text/javascript'),n.body.appendChild(c)},n.head.appendChild(t)}}(document);
        
       
        `}
      </Script>
      {/* <!-- Google tag (gtag.js) --> */}
      {/* <Script
        defer
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-LE5P46J4FY"
      /> */}

      {/* <Script strategy="afterInteractive" id="google-analytics">
        {` window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());          
                gtag('config', 'G-LE5P46J4FY');
        `}
      </Script> */}
      {/* <!--- UNDERDOGMEDIA EDGE_hiptoro.com JavaScript ADCODE START---> */}
      {/* <Script strategy="afterInteractive">{`(adsbygoogle = window.adsbygoogle || []).push({});`}</Script> */}

      {/* <!--- UNDERDOGMEDIA EDGE_hiptoro.com JavaScript ADCODE END---> */}

      <style jsx global>{`
        :root {
          --roboto-font: ${roboto.style.fontFamily};
          --montserrat-font: ${montserrat.style.fontFamily};
          --raleway-font: ${raleway.style.fontFamily};
          --noto_sans-font: ${noto_sans.style.fontFamily};
        }
      `}</style>
      <Header />
      <DefaultSeo
        openGraph={{
          locale: "en_US",
          siteName: "Hiptoro",
          url: process.env.WEBSITE_URL,
          images: [
            {
              url: "https://secureback.hiptoro.com/wp-content/uploads/2022/12/cropped-hiptoro.png",
              secureUrl:
                "https://secureback.hiptoro.com/wp-content/uploads/2022/12/cropped-hiptoro.png",
              width: 1280,
              height: 720,
              type: "image/png",
            },
          ],
          title:
            "Hiptoro - Buzzworthy Entertainment, Anime, Sports, and Pop Culture",
          description:
            "Hiptoro is your destination for a good laugh, a moving story, and all the latest news updates from the entertainment world. If it&#039;s viral, it&#039;s on Hiptoro.",
          type: "website",
        }}
        twitter={{
          cardType: "summary_large_image",
          handle: "@HiptoroNews",
          site: "@HiptoroNews",
        }}
        title="Hiptoro"
        description={`Hiptoro is your destination for a good laugh, a moving story, and all the latest news updates from the world of entertainment. If it&#039;s viral, it&#039;s on Hiptoro.`}
      />

      <div className="container mx-auto px-2 lg:px-8 xl:px-0 lg:py-8 max-w-site-full">
        <Component {...pageProps} />
      </div>

      <Footer />
    </>
  );
}
