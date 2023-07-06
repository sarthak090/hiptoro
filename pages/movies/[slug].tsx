import Cast from "@/components/Movies/Cast";
import YTEmbed from "@/components/Movies/YtEmbed";
import tmdb from "@/configs/tmdb";
import { generateMovieSlug } from "@/utils/movies/movie-slug";
import { MovieDetails } from "moviestmdb/lib/types/type";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { convertMinutesToHoursAndMinutes } from "@/utils/movies/runtime";
import React from "react";

const MovieSingle = (props: { movie: MovieDetails }) => {
  const { movie } = props;
  const {
    title,
    tagline,
    genres,
    overview,
    runtime,
    credits,
    videos,

    slug,
    providers,
  } = movie;

  return (
    <div className="font-montserrat">
      <NextSeo
        title={title}
        openGraph={{
          images: [
            {
              url: `https://image.tmdb.org/t/p/w1280${movie.images?.backdrops[0]?.file_path}`,
              alt: `${title} - ${tagline}`,
              height: 700,
              width: 1020,
              secureUrl: `https://image.tmdb.org/t/p/w1280${movie.images?.backdrops[0]?.file_path}`,
            },
          ],
          title: title,
          description: overview,
          locale: "en",
          url: process.env.NEXT_PUBLIC_DOMAIN + `/movies/${slug}`,
          videos: [
            {
              url: `https://www.youtube.com/watch?v=${videos?.results[0]?.key}`,
              alt: `${title} Trailer`,
              height: 700,
              width: 1020,

              secureUrl: `https://www.youtube.com/watch?v=${videos?.results[0]?.key}`,
            },
          ],
        }}
      />
      <div className=" font-montserrat my-8 ">
        <h1 className="text-24px capitalize lg:text-[50px] break-words  text-center my-3 font-montserrat font-bold">
          {movie.title}
        </h1>
        <div className="text-center lg:text-2xl">{movie.tagline}</div>
      </div>

      <div className="flex justify-center">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.images?.backdrops[0]?.file_path}`}
          width={1020}
          height={720}
          alt={movie.title}
          loading="eager"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="my-4 mt-5 border-t md:flex gap-2 items-center">
        <p className="text-xl font-semibold">Genres: </p>
        <div className="grid grid-cols-2 md:flex  items-center gap-2">
          {genres.map((genre) => (
            <div className="m-1 " key={genre.id}>
              {genre.name}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center">
        <p>
          <span className="text-xl font-semibold"> Runtime:</span>{" "}
          <span> {convertMinutesToHoursAndMinutes(parseFloat(runtime))}</span>
        </p>
      </div>
      <div
        className="flex  
      items-center   lg:flex-row gap-2   "
      >
        <h3 className="my-5 text-xl font-semibold">Watch On :</h3>
        <div className="flex flex-wrap gap-4">
          {providers["US"] &&
            providers["US"].buy &&
            providers["US"].buy
              ?.sort((provider: any) => provider.display_priority)
              .slice(0, 4)
              .map((provider: any) => (
                <div>
                  <Image
                    alt=""
                    className="rounded"
                    width={35}
                    height={35}
                    src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                  />
                </div>
              ))}
          {providers["US"] &&
            providers["US"].flatrate &&
            providers["US"].flatrate
              ?.sort((provider: any) => provider.display_priority)
              .slice(0, 4)
              .map((provider: any) => (
                <div>
                  <Image
                    alt=""
                    className="rounded"
                    width={35}
                    height={35}
                    src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                  />
                </div>
              ))}
        </div>
      </div>

      <div className="  post-content">
        <p>{movie.overview}</p>
      </div>
      <div>
        <div className="text-2xl border-l-4 pl-1 border-red-500 font-montserrat mb-4 font-bold">
          Watch Trailers:
        </div>
        <YTEmbed videos={videos?.results} titleToShow={title} />
      </div>

      <section className="mt-8 ">
        <div className="text-2xl border-l-4 pl-1 border-red-500 font-montserrat mb-4 font-bold">
          Cast & Crew :{" "}
        </div>

        <Cast casts={credits?.cast.concat(credits?.crew)} />
        {/* {credits?.cast.slice(0, 8).map((c) => (
            
          ))} */}
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const filterId = [1128514];
  const slug = ctx?.params?.slug as String;
  const id = parseFloat(slug?.split("-").pop() || "385687");
  if (filterId.includes(id)) {
    return {
      props: {},
      notFound: true,
    };
  }
  const res = await tmdb.movie(id, {
    append: ["videos", "credits", "images"],
  });

  const provider = (await tmdb.getMovieProvider(id)).results;

  return {
    props: {
      movie: { ...res, slug, providers: provider },
    },
  };
  // const res= await tmdb.movie()
};
export const getStaticPaths = async () => {
  const resp = await tmdb.discoverMovies();

  const paths = resp.results
    .filter((movie) => movie.overview.length > 0)
    .map((movie) => {
      return {
        params: {
          slug: generateMovieSlug({
            title: movie.original_title,
            id: movie.id,
          }),
        },
      };
    });

  return {
    paths,
    fallback: "blocking",
  };
};
export default MovieSingle;
