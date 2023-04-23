import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import WPHTMLContent from "@/components/WPHTMLContent";
import { NextSeo } from "next-seo";
export default function PrivacyPolicies({ post }: { post: any }) {
  if (post.id) {
    return (
      <>
        <NextSeo title={post.title.rendered} />

        <div className="container mx-auto px-2 lg:px-8 py-8 max-w-site-full">
          <h1
            className="text-4xl font-montserrat mb-4 font-semibold"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          <WPHTMLContent html={post.content.rendered} />
        </div>
      </>
    );
  }
  return <div>No Data Found</div>;
}
export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const { slug } = params!;
  const url = process.env.NEXT_WP_API_URL + `/pages?slug=${slug}`;
  const rankMathHeadUrl =
    process.env.NEXT_CUSTOM_WP_API_URL +
    `/rank-seo?url=/privacy-policy/${slug}`;

  try {
    const seo = await fetch(rankMathHeadUrl).then((r) => r.json());

    const post = await fetch(url).then((r) => r.json());
    return {
      props: {
        post: {
          ...post[0],
          ...seo,
        },
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

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = [
    "corrections-policy",
    "disclaimer",
    "ethics-policy",
    "fact-checking-policy",
    "terms-and-conditions",
  ];

  const paths = projects.map((project: any) => {
    return {
      params: { slug: project.toString() },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};
