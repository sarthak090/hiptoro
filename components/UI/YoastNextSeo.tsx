import { YoastSeoData } from "@/types";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

export default function YoastNextSeo(props: YoastSeoData) {
  const openGrap = {
    locale: props.og_locale,
    type: props.og_type,
    title: props.og_title,
    description: props.og_description,
    url: props.og_url,
    siteName: props.og_site_name,
    images: [
      props.og_image
        ? [...props.og_image]
        : "https://lendaloan.au/wp-content/uploads/2022/04/LEND-A-LOAN-LOGO-1.svg",
    ],
  };

  return (
    <NextSeo
      title={props.title}
      description={props.description}
      openGraph={openGrap}
      canonical={
        props.slug
          ? process.env.NEXT_PUBLIC_SITE_URL + `/${props.slug}`
          : process.env.NEXT_PUBLIC_SITE_URL
      }
    />
  );
}
