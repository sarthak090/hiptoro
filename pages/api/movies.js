import tmdb from "@/configs/tmdb";
import { formateMoviesList } from "../../utils/movies/format-movies-list";

const memo = [];

export default async function handler(req, res) {
  let pageNo = req.query.total;
  pageNo !== undefined ? (pageNo = pageNo) : (pageNo = 1);
  if (memo[pageNo.toString()] && memo[pageNo.toString()].length > 0) {
    res.setHeader("Cache-Control", "s-maxage=60000000");
    console.log("Cache For Infinite Scroll");

    return res.status(200).json(memo[pageNo.toString()]);
  } else {
    const data = await getMorePost(parseInt(pageNo));
    res.setHeader("Cache-Control", "s-maxage=60000000");

    res.status(200).json(data);
    memo[pageNo.toString()] = data;
    return;
  }
}

const getMorePost = async (pageNo) => {
  const response = await tmdb.discoverMovies([
    {
      param: "page",
      value: pageNo ? pageNo : 2,
    },
  ]);
  return formateMoviesList(response.results);
};
