import formatInfitePost from "../../utils/formatInfitePost";
const memo = [];

export default async function handler(req, res) {
  const id = req.query.postid;
  if (memo[id] && memo[id].length > 0) {
    res.setHeader("Cache-Control", "s-maxage=60000000"); // set caching header

    console.log("Cache For Infinite Scroll");
    return res.status(200).json(memo[id]);
  } else {
    const data = await getMorePost(req.query.postid);
    res.setHeader("Cache-Control", "s-maxage=60000000"); // set caching header
    console.log("No Cache Found For Infinite Scroll");

    res.status(200).json(data);
    memo[id] = data;
    return;
  }
}

const getMorePost = async (id) => {
  const url = `${process.env.NEXT_PUBLIC_CUSTOM_WP_API_URL}/infinite-posts?start=1&limit=2&exclude=${id}`;

  const res = await fetch(url);
  const newPosts = await res.json();

  if (newPosts.length > 0) {
    const formattedPosts = await Promise.all(formatInfitePost(newPosts));
    memo["cache"] = formattedPosts;
    return formattedPosts;
  } else {
    return [];
  }
};
