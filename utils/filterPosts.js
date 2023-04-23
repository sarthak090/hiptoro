export default function (posts) {
  const _posts = posts.map((p) => ({
    id: p.id,
    date: p.date,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    x_featured_media_large: p.x_featured_media_large,
    x_author: p.x_author,
  }));

  return _posts;
}
