import Head from "next/head";
import React from "react";

interface Props {
  post: {
    id: number;
    date: string;
    date_gmt: string;
    guid: {
      rendered: string;
    };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    x_featured_media: string;
    title: {
      rendered: string;
    };
    content: {
      rendered: string;
    };
    excerpt: {
      rendered: string;
      protected: boolean;
    };
    author: number;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    sticky: boolean;
    template: string;
    format: string;
    meta: any[]; // Update this with the actual type if possible
    categories: number[];
    tags: number[];
  };
}
const StaticPost = (props: Props) => {
  const { post } = props;

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{post.title.rendered}</title>
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title.rendered} />
        <meta property="og:description" content={post.excerpt.rendered} />
        <meta
          property="og:url"
          content={`https://petsarelove.netlify.app/.netlify/functions/post/${post.id}`}
        />
        <meta property="og:site_name" content="Hiptoro" />
        <meta
          property="article:published_time"
          content="2022-09-03T19:54:45+00:00"
        />
        <meta property="og:image" content={post.x_featured_media} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <style>
          {`
          iframe{
            max-width:700px;
            max-height:500px;
          }
            img {
              width: 100%;
              height: auto;
            }

            ul {
              list-style-type: none;
              margin: 0;
              padding: 0;
              overflow: hidden;
              background-color: #333;
            }

            li {
              float: left;
            }

            li a {
              display: block;
              color: white;
              text-align: center;
              padding: 14px 16px;
              text-decoration: none;
            }

            li a:hover:not(.active) {
              background-color: #111;
            }

            .active {
              background-color: #4caf50;
            }
          `}
        </style>
      </Head>

      <body style={{ background: "#eee" }}>
        <div
          style={{
            padding: "20px",
            margin: "30px auto",
            maxWidth: "800px",
            background: "white",
            boxShadow: "5px 5px 5px #888888",
          }}
        >
          <div>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#news">News</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li style={{ float: "right" }}>
                <a className="active" href="#about">
                  About
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h1>{post.title.rendered}</h1>
            <img src={post.x_featured_media} alt="" />
            <p
              className=""
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            ></p>
          </div>
        </div>
      </body>
    </>
  );
};

export default StaticPost;
