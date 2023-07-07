import InfiniteTVGrid from "@/components/Grid/InfiniteTVGrid";

import tmdb from "@/configs/tmdb";
import { getRankMathHead } from "@/utils/formatInfitePost";
import { formateTvList } from "@/utils/tv/format-tv-lists";
import generateTVSitemap from "@/utils/tv/generate-tv-sitemap";

import { NextSeo } from "next-seo";
import Head from "next/head";

const TvShowPage = (props: any) => {
  return (
    <>
      <Head>
        <meta name="twitter:title" content="TV Shows" />
        <meta
          name="twitter:description"
          content={`Your ultimate guide to the latest TV series is here at Hiptoro. Explore our vast database for exclusive series details, reviews, and more.`}
        />
        <meta
          property="article:publisher"
          content="https://facebook.com/hiptoro"
        />

        <meta name="twitter:site" content="@HiptoroNews" />
        <meta name="twitter:creator" content="@HiptoroNews" />
        <meta
          name="twitter:image"
          content="https://static.hiptoro.com/wp-content/uploads/2023/06/Hiptoro-Cover-3.png"
        />
        <meta name="twitter:label1" content="Time to read" />
        <meta name="twitter:data1" content="Less than a minute" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: props.schema }}
        />
      </Head>
      <NextSeo
        title="TV Shows"
        titleTemplate=""
        description="Your ultimate guide to the latest TV series is here at Hiptoro. Explore our vast database for exclusive series details, reviews, and more."
        canonical="https://www.hiptoro.com/tv-shows"
        openGraph={{
          description: `Your ultimate guide to the latest TV series is here at Hiptoro. Explore our vast database for exclusive series details, reviews, and more.`,
          title: `TV Shows`,
          images: [
            {
              url: `https://static.hiptoro.com/wp-content/uploads/2023/06/Hiptoro-Cover-3.png`,
              secureUrl: `https://static.hiptoro.com/wp-content/uploads/2023/06/Hiptoro-Cover-3.png`,
              width: 1280,
              height: 720,
              alt: "tv shows",
              type: "image/png",
            },
          ],

          url: `https://www.hiptoro.com/tv-shows`,
        }}
      />
      <InfiniteTVGrid posts={props.movies} />
    </>
  );
};
export const getStaticProps = async () => {
  await generateTVSitemap();
  const resp = await tmdb.tvShows("top_rated");
  const seoData = await getRankMathHead("/tv-shows");

  const formattedMovies = formateTvList(resp.results);

  return {
    props: {
      movies: formattedMovies,
      schema: seoData.schema,
    },
  };
};
export default TvShowPage;
