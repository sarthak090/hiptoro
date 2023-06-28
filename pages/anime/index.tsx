import InfiniteAnimeGrid from "@/components/Grid/InfiniteAnimeGrid";
import MovieGrid from "@/components/Grid/InfiniteMovieGrid";

import tmdb from "@/configs/tmdb";
import { getRankMathHead } from "@/utils/formatInfitePost";
import { formateTvList } from "@/utils/tv/format-tv-lists";
import generateAnime from "@/utils/tv/generate-anime-sitemap";

import { Movie } from "moviestmdb/lib/types/response";
import { NextSeo } from "next-seo";
import Head from "next/head";

interface Props {
  movies: Movie[];
}
const MoviesPage = (props: any) => {
  return (
    <>
      <Head>
        <meta name="twitter:title" content="Anime" />
        <meta
          name="twitter:description"
          content="Your ultimate destination for anime is here. Hiptoro presents a detailed database of the latest anime movies and TV series."
        />
        <meta name="twitter:site" content="@HiptoroNews" />
        <meta name="twitter:creator" content="@HiptoroNews" />
        <meta
          property="article:publisher"
          content="https://facebook.com/hiptoro"
        />

        <meta
          name="twitter:image"
          content="https://static.hiptoro.com/wp-content/uploads/2023/06/Untitled-design156.webp"
        />
        <meta name="twitter:label1" content="Time to read" />
        <meta name="twitter:data1" content="Less than a minute" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: props.schema }}
        />
      </Head>
      <NextSeo
        title="Anime"
        description="Your ultimate destination for anime is here. Hiptoro presents a detailed database of the latest anime movies and TV series."
        canonical="https://www.hiptoro.com/anime/"
        openGraph={{
          type: "article",
          description: `Your ultimate destination for anime is here. Hiptoro presents a detailed database of the latest anime movies and TV series.`,
          title: `Anime`,
          images: [
            {
              url: `https://static.hiptoro.com/wp-content/uploads/2023/06/Untitled-design156.webp`,
              secureUrl: `https://static.hiptoro.com/wp-content/uploads/2023/06/Untitled-design156.webp`,
              width: 1280,
              height: 720,
              alt: "anime",
              type: "image/webp",
            },
          ],

          url: `https://www.hiptoro.com/anime/`,
        }}
      />
      <InfiniteAnimeGrid posts={props.movies} />
    </>
  );
};
export const getStaticProps = async () => {
  await generateAnime();
  const resp = await tmdb.discover("tv", [
    { param: "with_genres", value: "16" },
    { param: "with_keywords", value: "210024" },
    { param: "sort_by", value: "popularity.desc" },
  ]);
  const seoData = await getRankMathHead("/anime");

  const formattedMovies = formateTvList(resp.results);

  return {
    props: {
      movies: formattedMovies,
      schema: seoData.schema,
    },
  };
};
export default MoviesPage;
