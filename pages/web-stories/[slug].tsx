import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context && context.res) {
    const { res, params } = context;
    const slug = params?.slug;

    // fetch your web story here
    const url =
      process.env.NEXT_PUBLIC_CUSTOM_WP_API_URL + "/web-stories/" + slug;
    const data = await fetch(url).then((r) => r.json());

    if (!data.content) {
      return {
        notFound: true,
      };
    }

    res.setHeader("content-type", "text/html");
    res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=900");
    res.write(data.content.rendered);
    res.end();
  }

  return {
    props: {},
  };
};

const StoryPage = () => {};

export default StoryPage;
