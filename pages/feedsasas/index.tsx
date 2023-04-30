import { GetServerSideProps, GetServerSidePropsContext } from "next";

export default function index() {
  return <div>index</div>;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { res } = ctx;
  const dynamic = ctx.params !== undefined ? ctx.params.dynamic : "404";
  const url = `https://www.hiptoro.com/p/category/${dynamic}/feed/`;

  const c = await fetch(url).then((r) => r.text());
  const format = c.replaceAll(`secureback.hiptoro.com`, "www.hiptoro.com");

  res.setHeader("Content-Type", "text/xml");

  res.write(format);
  res.end();
  return {
    props: {},
  };
};
