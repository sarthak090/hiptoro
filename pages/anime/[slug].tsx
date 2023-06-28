import Cast from "@/components/Movies/Cast";
import YTEmbed from "@/components/Movies/YtEmbed";
import tmdb from "@/configs/tmdb";
import { generateMovieSlug } from "@/utils/movies/movie-slug";
import { getYtEmbed } from "@/utils/movies/yt-embed";
import { MovieDetails, TVDetails } from "moviestmdb/lib/types/type";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { convertMinutesToHoursAndMinutes } from "@/utils/movies/runtime";
import React from "react";
import { formatReleaseDate } from "@/utils/movies/format-date";
import SeasonsSlider from "@/components/Anime/Seasons";

const AnimeSinglePage = (props: { anime: TVDetails }) => {
  const { anime } = props;
  const {
    name,
    tagline,
    genres,
    overview,
    credits,
    videos,
    slug,
    episode_run_time,
  } = anime;

  return (
    <div className="font-montserrat">
      <NextSeo
        title={name}
        openGraph={{
          images: [
            {
              url: `https://image.tmdb.org/t/p/w1280${anime.images?.backdrops[0]?.file_path}`,
              alt: `${name} - ${tagline}`,
              height: 700,
              width: 1020,
              secureUrl: `https://image.tmdb.org/t/p/w1280${anime.images?.backdrops[0]?.file_path}`,
            },
          ],
          title: name,
          description: overview,
          locale: "en",
          url: process.env.NEXT_PUBLIC_DOMAIN + `/anime/${slug}`,
          videos: [
            {
              url: `https://www.youtube.com/watch?v=${videos?.results[0]?.key}`,
              alt: `${name} Trailer`,
              height: 700,
              width: 1020,

              secureUrl: `https://www.youtube.com/watch?v=${videos?.results[0]?.key}`,
            },
          ],
        }}
      />
      <div className=" font-montserrat my-8 ">
        <h1 className="text-24px capitalize lg:text-[50px] break-words  text-center my-3 font-montserrat font-bold">
          {name}
        </h1>
        <div className="text-center lg:text-2xl">{tagline}</div>
      </div>

      <div className="flex justify-center">
        <Image
          src={`https://image.tmdb.org/t/p/original${anime.images?.backdrops[0]?.file_path}`}
          width={1200}
          height={720}
          alt={name}
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
        <p className="flex gap-4 items-center">
          <span className="text-xl font-semibold"> Runtime:</span>

          <span> {convertMinutesToHoursAndMinutes(episode_run_time[0])}</span>
        </p>
      </div>
      {anime.first_air_date && (
        <div className="grid grid-cols-1 md:grid md:grid-cols-2  my-4  lg:my-4 gap-3   ">
          <div className=" flex gap-2 items-center">
            <h3 className="  text-xl font-semibold">First episode air on :</h3>
            <p>{formatReleaseDate(anime.first_air_date)}</p>
          </div>
          {anime.last_air_date && (
            <div className="flex gap-2 items-center">
              <h3 className="  text-xl font-semibold">
                Last episode aired on:
              </h3>
              <p>{formatReleaseDate(anime.last_air_date)}</p>
            </div>
          )}
        </div>
      )}

      {anime.status && (
        <div className="grid grid-cols-1 md:grid md:grid-cols-2  my-4  lg:my-4 gap-3   ">
          <div className=" flex gap-2 items-center">
            <h3 className="  text-xl font-semibold">Status:</h3>
            <p>{anime.status}</p>
          </div>
          {anime.status === "Returning Series" && anime.next_episode_to_air && (
            <div className="flex gap-2 items-center">
              <h3 className="  text-xl font-semibold">
                Next episode will air on:
              </h3>
              <p>{formatReleaseDate(anime.next_episode_to_air?.air_date)}</p>
            </div>
          )}
        </div>
      )}

      <div className="flex  items-center   lg:flex-row gap-2   ">
        <h3 className="  text-xl font-semibold">Total seasons :</h3>
        <p>{anime.number_of_seasons}</p>
      </div>
      <div
        className="flex  
      items-center   lg:flex-row gap-2   "
      >
        {anime.providers["US"] && (
          <h3 className="my-5 text-xl font-semibold">Watch On :</h3>
        )}
        <div className="flex flex-wrap gap-4">
          {anime.providers["US"] &&
            anime.providers["US"].buy &&
            anime.providers["US"].buy
              ?.sort((provider: any) => provider.display_priority)
              .slice(0, 4)
              .map((provider: any) => (
                <div>
                  <Image
                    alt={provider.provider_name}
                    title={provider.provider_name}
                    className="rounded"
                    width={35}
                    height={35}
                    src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                  />
                </div>
              ))}
          {anime.providers["US"] &&
            anime.providers["US"].flatrate &&
            anime.providers["US"].flatrate
              ?.sort((provider: any) => provider.display_priority)
              .slice(0, 4)
              .map((provider: any) => (
                <div>
                  <Image
                    title={provider.provider_name}
                    alt={provider.provider_name}
                    className="rounded"
                    width={35}
                    height={35}
                    src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                  />
                </div>
              ))}
        </div>
      </div>

      <div className=" border-t my-4 post-content">
        <p>{overview}</p>
      </div>
      {videos?.results && videos?.results.length > 0 && (
        <div>
          <div className="text-2xl border-l-4 pl-1 border-red-500 font-montserrat mb-4 font-bold">
            Watch Trailers:
          </div>
          <YTEmbed videos={videos?.results} titleToShow={name} />
        </div>
      )}

      <section className="mt-8 ">
        <div className="text-2xl border-l-4 pl-1 border-red-500 font-montserrat mb-4 font-bold">
          Seasons :{" "}
        </div>
        {anime.seasons && <SeasonsSlider seasons={anime.seasons} />}
      </section>

      <section className="mt-8 ">
        <div className="text-2xl border-l-4 pl-1 border-red-500 font-montserrat mb-4 font-bold">
          Cast & Crew :{" "}
        </div>
        {/* @ts-ignore-next */}
        <Cast casts={credits?.cast.concat(...credits?.crew)} />
        {/* {credits?.cast.slice(0, 8).map((c) => (
            
          ))} */}
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx?.params?.slug as String;
  const id = parseFloat(slug?.split("-").pop() || "385687");

  try {
    const res = await tmdb.tv(id, {
      append: ["videos", "credits", "images"],
    });
    let dataToSend = { ...res, slug, provider: {} };

    try {
      const provider = (await tmdb.getTvProvider(id)).results;
      if (provider) {
        dataToSend.provider = provider;
      }
    } catch (err) {
      console.log(err);
    }

    return {
      props: {
        anime: { ...res, slug, providers: {} },
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        anime: null,
      },
      notFound: true,
    };
  }
  // const res= await tmdb.movie()
};
export const getStaticPaths = async () => {
  const resp = await tmdb.discoverTv();

  const paths = resp.results
    .filter((tv) => tv.overview.length > 0)
    .map((tv) => {
      return {
        params: {
          slug: generateMovieSlug({
            title: tv.name,
            id: tv.id,
          }),
        },
      };
    });

  return {
    paths,
    fallback: "blocking",
  };
};
export default AnimeSinglePage;
