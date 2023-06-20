import Script from "next/script";

export default function AutoAds() {
  if (process.env.NEXT_PUBLIC_MAIN_BRANCH === "true") {
    return <></>;
  }

  return null;
}
