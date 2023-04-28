import formatInfitePost from "../../utils/formatInfitePost";
export default async function handler(req, res) {
  if (req.query.postid) {
    const data = await getMorePost(req.query.postid);
    return res.status(200).json(data);
  }
  res.status(200).json([]);
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
