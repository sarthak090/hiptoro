import React from "react";
import { GetStaticProps, GetStaticPropsContext } from "next";
import WebStoriesGrid from "@/components/Grid/WebStoriesGrid";
import { NextSeo } from "next-seo";
import Pagination from "@/components/Pagination";
import genPagination from "@/utils/getWebStoriesPagination";

export default function WebStories(props: any) {
  return (
    <>
      <NextSeo
        noindex
        nofollow
        openGraph={{
          title: "Stories",
          url: "https://www.hiptoro.com/web-stories/",
        }}
        title="Stories"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `
      {"@context":"https://schema.org","@graph":[{"@type":"NewsMediaOrganization","@id":"https://www.hiptoro.com/#organization","name":"Hiptoro","url":"https://www.hiptoro.com","sameAs":["https://facebook.com/hiptoro","https://twitter.com/HiptoroNews","https://www.pinterest.com/HiptoroNews/","https://www.youtube.com/@hiptoro"],"logo":{"@type":"ImageObject","@id":"https://www.hiptoro.com/#logo","url":"https://www.hiptoro.com/wp-content/uploads/2022/12/hiptorosplash1000x.png","contentUrl":"https://www.hiptoro.com/wp-content/uploads/2022/12/hiptorosplash1000x.png","caption":"Hiptoro","inLanguage":"en-US","width":"1000","height":"1000"}},{"@type":"WebSite","@id":"https://www.hiptoro.com/#website","url":"https://www.hiptoro.com","name":"Hiptoro","publisher":{"@id":"https://www.hiptoro.com/#organization"},"inLanguage":"en-US"},{"@type":"BreadcrumbList","@id":"https://www.hiptoro.com/web-stories/#breadcrumb","itemListElement":[{"@type":"ListItem","position":"1","item":{"@id":"https://www.hiptoro.com","name":"Home"}},{"@type":"ListItem","position":"2","item":{"@id":"https://www.hiptoro.com/web-stories/","name":"Stories"}}]},{"@type":"CollectionPage","@id":"https://www.hiptoro.com/web-stories/#webpage","url":"https://www.hiptoro.com/web-stories/","name":"Stories","isPartOf":{"@id":"https://www.hiptoro.com/#website"},"inLanguage":"en-US","breadcrumb":{"@id":"https://www.hiptoro.com/web-stories/#breadcrumb"}}]}
      `,
        }}
      />

      <WebStoriesGrid posts={props.stories} />
      <Pagination
        pagination={props.pagination}
        currentPage={parseInt(props.currentPageNo)}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const url = process.env.NEXT_PUBLIC_CUSTOM_WP_API_URL + "/web-stories/";
  const data = await fetch(url).then((r) => r.json());

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      stories: data,
      pagination: genPagination(1),
      currentPageNo: 1,
    },
  };
};
