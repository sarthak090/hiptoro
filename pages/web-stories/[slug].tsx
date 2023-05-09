import { getRankMathHead } from "@/utils/formatInfitePost";
import webStoriesFormat from "@/utils/webStoriesFormat";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context && context.res) {
    const { res, params } = context;
    const slug = params?.slug;

    // fetch your web story here
    const url =
      process.env.NEXT_PUBLIC_CUSTOM_WP_API_URL + "/web-stories/" + slug;
    const seo = await getRankMathHead(`/web-stories/${slug}`);

    const data = await fetch(url).then((r) => r.json());
    if (!data.content) {
      return {
        notFound: true,
      };
    }
    const content = webStoriesFormat(data.content.rendered, seo.schema);

    res.setHeader("content-type", "text/html");
    res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=900");
    res.write(content);
    res.end();
  }

  return {
    props: {},
  };
};

const StoryPage = () => {};

export default StoryPage;
