import React from "react";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";

export default function feed() {
  return <div>feed</div>;
}
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { res } = ctx;

  const c = await fetch(`https://secureback.hiptoro.com/feed`).then((r) =>
    r.text()
  );
  const format = c.replaceAll(`secureback.hiptoro.com`, "www.hiptoro.com");
  res.setHeader("Content-Type", "text/xml");
  res.write(format);
  res.end();
  return {
    props: {},
  };
};