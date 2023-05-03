import Script from "next/script";

export default function AutoAds() {
  return (
    <>
      <br />
      <br />
      <Script
        async={true}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7099984888351146"
        crossOrigin="anonymous"
        onError={(e) => {
          console.error("Script failed to load", e);
        }}
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
      {/* <Script>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</Script> */}
    </>
  );
}
