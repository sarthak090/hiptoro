import "@/styles/globals.css";
import "@/styles/blog.css";
import "@/styles/tmm.css";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { Roboto, Montserrat, Raleway, Noto_Sans } from "next/font/google";
// import dynamic from "next/dynamic";
// import NextNProgress from "nextjs-progressbar";
import { Analytics } from "@vercel/analytics/react";

import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Head from "next/head";

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

// const Footer = dynamic(() => import("../components/Layout/Footer"));

export default function App({ Component, pageProps }: AppProps) {
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
          content="https://cms.hiptoro.com/wp-content/uploads/2022/12/cropped-hiptoro.png"
        />
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
          locale: "en",
          siteName: "Hiptoro",
          url: process.env.WEBSITE_URL,
          images: [
            {
              url: "https://cms.hiptoro.com/wp-content/uploads/2022/12/cropped-hiptoro.png",
              secureUrl:
                "https://cms.hiptoro.com/wp-content/uploads/2022/12/cropped-hiptoro.png",
              width: 512,
              height: 512,
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
        <Analytics />
      </div>

      <Footer />
    </>
  );
}
