import formatInfitePost from "../../utils/formatInfitePost";
const memo = [];
export default async function handler(req, res) {
  const id = req.query.postid;
  if (memo[id] != null) {
    console.log("CACHE IS SERVED", id);
    return res.status(200).json(memo[id]);
  } else {
    const data = await getMorePost(req.query.postid);
    res.status(200).json(data);
    memo[id] = data;
    return;
  }
}
const getMorePost = async (id) => {
  const url = `${process.env.NEXT_PUBLIC_CUSTOM_WP_API_URL}/infinite-posts?exclude=${id}&start=1&limit=8`;

  const res = await fetch(url);
  const newPosts = await res.json();

  if (newPosts.length > 0) {
    const formattedPosts = await Promise.all(formatInfitePost(newPosts));

    return formattedPosts;
  } else {
    return [];
  }
};
