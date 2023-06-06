import Script from "next/script";

import LazyLoad from "react-lazyload";

export default function AutoAds() {
  return (
    <>
      <LazyLoad offset={100} once>
        <div>
          <script
            defer
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7099984888351146"
            crossOrigin="anonymous"
            onError={(e) => {
              console.error("Script failed to load", e);
            }}
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
          <script>{` 
       setTimeout(() => {
        (adsbygoogle = window.adsbygoogle || []).push({});
      
      }, 0);
   
      `}</script>
        </div>
      </LazyLoad>
    </>
  );
}

// export default function AutoAds() {
//   return (
//     <>
//       <br />
//       <br />
//       <Script
//         async={true}
//         src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7099984888351146"
//         crossOrigin="anonymous"
//         onError={(e) => {
//           console.error("Script failed to load", e);
//         }}
//         strategy="lazyOnload"
//       />
//       {/* <!-- Adsense New --> */}
//       <ins
//         className="adsbygoogle"
//         style={{ display: "block" }}
//         data-ad-client="ca-pub-7099984888351146"
//         data-ad-slot="5392495815"
//         data-ad-format="auto"
//         data-full-width-responsive="true"
//       ></ins>
//       <Script strategy="lazyOnload">{`(adsbygoogle = window.adsbygoogle || []).push({});`}</Script>
//     </>
//   );
// }
