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
    "/js/gtag.js",

    "https://www.googletagmanager.com/gtag/js?id=G-LE5P46J4FY",
  ];
  const scriptsLoaded = useLazyLoadScripts(scripts);

  useEffect(() => {
    asyncScriptLoader({
      src: "https://scripts.pubnation.com/tags/f97a5118-a8dd-43ac-ac4d-220fd1d2edaf.js",
      attachTo: document.head,
      loadWithAsync: true,
      onUserInteraction: true,
      attributes: [
        { key: "data-noptimize", value: "1" },
        { key: "data-cfasync", value: "false" },
      ],
    });

    // asyncScriptLoader({
    //   src: "/js/connatix.js",
    //   attachTo: document.head,
    //   loadWithAsync: true,
    //   onUserInteraction: true,
    // });
    // var ads = document.getElementsByClassName("adsbygoogle").length;
    // for (var i = 0; i < ads; i++) {
    //   try {
    //     (adsbygoogle = window.adsbygoogle || []).push({});
    //   } catch (e) {
    //     console.error(`Error While Loading Ads`, e);
    //   }
    // }
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
        {/* <script
          type="text/javascript"
          async="true"
          data-noptimize="1"
          data-cfasync="false"
          src="scripts.pubnation.com/tags/f97a5118-a8dd-43ac-ac4d-220fd1d2edaf.js"
        ></script> */}
      </Head>

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
