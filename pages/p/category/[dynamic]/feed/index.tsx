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
  const dynamic = ctx.params !== undefined ? ctx.params.dynamic : "404";
  console.log({ slug: ctx.params });
  return {
    props: {},
  };
};
