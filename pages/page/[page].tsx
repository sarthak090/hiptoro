import { GetStaticProps, GetStaticPropsContext } from "next";
import genPagination from "../../utils/genPagination";
import Pagination from "@/components/Pagination";
import PostGrid from "@/components/Grid/PostGrid";
import { getPlaiceholder } from "plaiceholder";

export default function Page(props: any) {
  return (
    <>
      <section className="grid md:grid-cols-12">
        <div className="md:col-span-12">
          <PostGrid posts={props.pageData} />
        </div>
      </section>

      <Pagination
        pagination={props.pagination}
        currentPage={parseInt(props.currentPageNo)}
      />
    </>
  );
}
export const getStaticPaths = async () => {
  return {
    paths: Array.from({ length: 5 }).map((_, i) => `/page/${i + 2}`),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const { page } = params!;

  const url = process.env.NEXT_CUSTOM_WP_API_URL + `/posts?page=${page}`;
  try {
    const pageData = await fetch(url).then((r) => r.json());
    const formattedLatestPosts = pageData.map(async (post: any) => {
      const { base64, img } = await getPlaiceholder(post.featuredImg.medium);

      return {
        ...post,
        base64,
        img,
      };
    });
    var latest_posts = [];
    await Promise.all(formattedLatestPosts).then((r) => {
      latest_posts.push(...r);
    });
    return {
      props: {
        pageData: latest_posts,
        currentPageNo: page,
        pagination: genPagination(page),
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        notFound: true,
      },
    };
  }
};
