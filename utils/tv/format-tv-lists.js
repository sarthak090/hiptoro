import { generateMovieSlug } from "../movies/movie-slug";

export function formateTvList(seriesList = []) {
  return seriesList
    .filter(
      (series) =>
        series.overview.length > 0 &&
        series.poster_path !== null &&
        series.backdrop_path !== null &&
        series.origin_country[0] !== "IN" &&
        !series.name.includes("Harem")
    )

    .map((series) => ({
      featuredImg: {
        id: series.id,
        large: `https://image.tmdb.org/t/p/w500${series.poster_path}`,
        medium: `https://image.tmdb.org/t/p/w1280${series.backdrop_path}`,
      },
      title: {
        rendered: series.name,
      },
      excerpt: {
        rendered: series.overview,
      },
      slug: generateMovieSlug({ title: series.name, id: series.id }),

      release_date: series.release_date || "",
      releaseStatus: ``,
    }));
}
