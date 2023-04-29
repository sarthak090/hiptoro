export default async function () {
  const posts = await fetch(
    process.env.NEXT_CUSTOM_WP_API_URL + "/infinite-posts?limit=50"
  ).then((r) => r.json());

  const allPosts = posts;

  return posts;
}
