import React from "react";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";

export default function index() {
  return <div>index</div>;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { res } = ctx;
  const dynamic = ctx.params !== undefined ? ctx.params.dynamic : "404";

  const c = await fetch(
    `https://secureback.hiptoro.com/p/category/${dynamic}/feed/`
  ).then((r) => r.text());

  const format = c.replaceAll(`secureback.hiptoro.com`, "www.hiptoro.com");
  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=20, stale-while-revalidate=59"
  );
  res.write(format);
  res.end();
  return {
    props: {},
  };
};
