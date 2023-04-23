import PostGrid from "@/components/Grid/PostGrid";
import AuthorBox from "@/components/Post/AuthorBox";

import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";

export const PostsByAuthor = (props: any) => {
  const { postsData, error } = props;
  if (postsData !== null) {
    return (
      <>
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
  return null;
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

  const paths = data.map((author: Author) => {
    return {
      params: {
        slug: `${author.name.toLowerCase().split(" ").join("-")}-${author.id}`,
      },
    };
  });
  console.log(`${process.env.NEXT_CUSTOM_WP_API_URL}/authors`);
  return {
    paths,
    fallback: false,
    // paths:[{slug:}]
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