import Script from "next/script";

export default function AutoAds() {
  return (
    <>
      <Script
        async={true}
        defer
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7099984888351146"
        crossOrigin="anonymous"
        strategy="lazyOnload"
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
