import { GetStaticProps } from "next";
import MainGrid from "@/components/Grid/MainGrid";
import Pagination from "@/components/Pagination";
// import PostGrid from "@/components/Grid/PostGrid";
import CategoriesGrid from "@/components/Grid/CategoriesGrid";
import { getPlaiceholder } from "plaiceholder";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
// const Pagination = dynamic(() => import("@/components/Pagination"));
const PostGrid = dynamic(() => import("@/components/Grid/PostGrid"));

export const getStaticProps: GetStaticProps = async () => {
  const url = process.env.NEXT_CUSTOM_WP_API_URL + `/home`;
  const homePage = await fetch(url).then((r) => r.json());
  let idsRendered = [];
  Object.keys(homePage)
    .filter((t) => t !== "latest_posts")
    .map((key) => {
      idsRendered.push(homePage[key].id);
    });

  const formattedLatestPosts = homePage.latest_posts
    .filter(function (item) {
      return idsRendered.indexOf(item.id) === -1;
    })
    .map(async (post: any) => {
      if (post.featuredImg && post.featuredImg.medium) {
        const { base64, img } = await getPlaiceholder(post.featuredImg.medium);

        return {
          ...post,
          base64,
          img,
        };
      } else {
        return post;
      }
    });

  var latest_posts = [];
  await Promise.all(formattedLatestPosts).then((r) => {
    latest_posts.push(...r);
  });
  const postsByCategory = Object.keys(homePage)
    .filter((t) => t !== "latest_posts")
    .map((t) => ({ header: t, ...homePage[t] }));

  return {
    props: {
      postsByCategory,
      latest_posts,
    },
  };
};
const p = [
  {
    label: "1",
    href: "/",
  },
  {
    label: "2",
    href: "/page/2",
  },
  {
    label: "3",
    href: "/page/3",
  },
  {
    label: "4",
    href: "/page/4",
  },
  {
    label: "Next",
    href: `/page/2`,
  },
];
export default function Home(props: any) {
  const { postsByCategory, latest_posts } = props;

  return (
    <>
      <MainGrid post={latest_posts[0]} />
      <NextSeo titleTemplate="%s - Buzzworthy Entertainment, Anime, Sports, and Pop Culture" />
      <CategoriesGrid isHeader posts={postsByCategory} />
      <section className="grid md:grid-cols-12">
        <div className="md:col-span-12">
          <PostGrid posts={latest_posts.slice(1, latest_posts.length)} />
        </div>
      </section>

      <Pagination currentPage={1} pagination={p} />
    </>
  );
}
