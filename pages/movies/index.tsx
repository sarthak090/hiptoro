import MovieGrid from "@/components/Grid/InfiniteMovieGrid";

import tmdb from "@/configs/tmdb";
import { getRankMathHead } from "@/utils/formatInfitePost";
import { formateMoviesList } from "@/utils/movies/format-movies-list";
import generateMovieSitemap from "@/utils/movies/sitemap_generator";

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
        <meta name="twitter:title" content="Movies" />
        <meta
          name="twitter:description"
          content="Discover the world of cinema with Hiptoro&#039;s detailed movie database. Immerse in detailed plot summaries, star casts, and trailers."
        />
        <meta name="twitter:site" content="@HiptoroNews" />
        <meta name="twitter:creator" content="@HiptoroNews" />
        <meta
          name="twitter:image"
          content="https://static.hiptoro.com/wp-content/uploads/2023/06/Hiptoro-Cover-1.png"
        />
        <meta name="twitter:label1" content="Time to read" />
        <meta name="twitter:data1" content="Less than a minute" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: props.schema }}
        />
      </Head>
      <NextSeo
        title="Movies"
        canonical="https://www.hiptoro.com/movies"
        description="Discover the world of cinema with Hiptoro&#039;s detailed movie database. Immerse in detailed plot summaries, star casts, and trailers."
        openGraph={{
          description: `Discover the world of cinema with Hiptoro&#039;s detailed movie database. Immerse in detailed plot summaries, star casts, and trailers.`,
          title: `Movies`,
          images: [
            {
              url: `https://static.hiptoro.com/wp-content/uploads/2023/06/Hiptoro-Cover-1.png`,
              secureUrl: `https://static.hiptoro.com/wp-content/uploads/2023/06/Hiptoro-Cover-1.png`,
              width: 1280,
              height: 720,
              alt: "movies",
              type: "image/png",
            },
          ],

          url: `https://www.hiptoro.com/movies`,
        }}
      />
      <MovieGrid posts={props.movies} api="movies" />
    </>
  );
};
export const getStaticProps = async () => {
  await generateMovieSitemap();
  const resp = await tmdb.discover("movie");
  const seoData = await getRankMathHead("/movies");

  const formattedMovies = formateMoviesList(resp.results);

  return {
    props: {
      movies: formattedMovies,
      schema: seoData.schema,
    },
  };
};
export default MoviesPage;
