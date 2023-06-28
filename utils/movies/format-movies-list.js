import { generateMovieSlug } from "./movie-slug";
import { formatReleaseDate } from "./format-date";
export function formateMoviesList(movies = []) {
  return movies
    .filter((movie) => movie.overview.length > 0 && movie.poster_path !== null)

    .map((movie) => ({
      featuredImg: {
        id: movie.id,
        large: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        medium: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
      },
      title: {
        rendered: movie.title,
      },
      excerpt: {
        rendered: movie.overview,
      },
      slug: generateMovieSlug({ title: movie.original_title, id: movie.id }),

      release_date: formatReleaseDate(movie.release_date || ""),
      releaseStatus: isDatePassed(movie.release_date)
        ? `Released on : ${formatReleaseDate(movie.release_date || "")} `
        : `Releasing on : ${formatReleaseDate(movie.release_date || "")}`,
    }));
}

function isDatePassed(dateString) {
  // Convert the date string to a Date object
  var date = new Date(dateString);

  // Get the current date
  var currentDate = new Date();

  // Compare the given date with the current date
  if (date < currentDate) {
    return true; // The date has passed
  } else {
    return false; // The date is in the future
  }
}
