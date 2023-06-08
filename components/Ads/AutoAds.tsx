import Script from "next/script";

export default function AutoAds() {
  if (process.env.NEXT_PUBLIC_MAIN_BRANCH === "true") {
    return (
      <>
        <Script
          defer
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7099984888351146"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        {/* <!-- Adsense New --> */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-7099984888351146"
          data-ad-slot="5392495815"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <Script strategy="lazyOnload">{`(adsbygoogle = window.adsbygoogle || []).push({});`}</Script>
      </>
    );
  }

  return null;
}
