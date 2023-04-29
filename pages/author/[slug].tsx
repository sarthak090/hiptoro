import PostGrid from "@/components/Grid/PostGrid";
import AuthorBox from "@/components/Post/AuthorBox";
import NotFound from "@/components/UI/404";

import { GetStaticProps, GetStaticPaths } from "next";
import { NewsArticleJsonLd, NextSeo } from "next-seo";
import Image from "next/image";
import Head from "next/head";

export const PostsByAuthor = (props: any) => {
  const { postsData, error } = props;
  if (postsData !== null) {
    return (
      <>
        <Head>
          <meta name="twitter:label1" content="Name" />
          <meta name="twitter:data1" content={postsData[0].author.name} />
          <meta name="twitter:label2" content="Posts" />
          <meta name="twitter:data2" content="1668" />
        </Head>
        <NextSeo
          noindex
          title={postsData[0].author.name + " "}
          description={postsData[0].author.description}
          openGraph={{
            type: "profile",
            title: postsData[0].author.name,
            description: postsData[0].author.description,
            url:
              process.env.NEXT_PUBLIC_DOMAIN +
              `/author/${
                postsData[0].author.name.toLowerCase() +
                "-" +
                postsData[0].author.id
              }`,
          }}
        />

        <div>
          <div
            className="my-4
          "
          >
            <div className="flex justify-center rounded-full">
              <Image
                src={postsData[0].author.gravatar}
                height={150}
                width={150}
                className="rounded-full"
                alt={postsData[0].author.name + " Profile"}
              />
            </div>

            <h1 className="text-2xl my-2 text-center  font-semibold">
              {postsData[0].author.name}
            </h1>
            <p className="text-center text-xs md:text-[16px] leading-5 md:leading-7">
              {postsData[0].author.description}
            </p>
          </div>
        </div>

        <section className="grid md:grid-cols-12">
          <div className="md:col-span-12">
            <PostGrid posts={postsData} />
          </div>
        </section>
      </>
    );
  }
  return <NotFound />;
};
interface Author {
  id: number;
  name: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_CUSTOM_WP_API_URL}/authors`
  ).then();
  const data = await res.json();

  const paths = data.slice(0, 10).map((author: Author) => {
    return {
      params: {
        slug: `${author.name.toLowerCase().split(" ").join("-")}-${author.id}`,
      },
    };
  });
  console.log(`${process.env.NEXT_CUSTOM_WP_API_URL}/authors`);
  return {
    paths,
    fallback: "blocking",
  };
};

type Params = {
  params: {
    slug: string;
  };
};
export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const url = `${process.env.NEXT_CUSTOM_WP_API_URL}/authors/${params.slug
    .split("-")
    .pop()}`;

  const res = await fetch(url);

  const postsData = await res.json();
  if (postsData.length > 0) {
    return {
      props: {
        postsData: postsData.filter((p) => p.featuredImg.id.length > 0),
        error: false,
      },
      revalidate: 720,
    };
  } else {
    return {
      props: {
        postsData: null,
        error: true,
      },
    };
  }
};

export default PostsByAuthor;
