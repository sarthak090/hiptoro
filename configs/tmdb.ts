import MoviesTmdb from "moviestmdb";
const apiKey: string = String(process.env.TMDB_API_KEY);
const tmdb = new MoviesTmdb(apiKey);

export default tmdb;
