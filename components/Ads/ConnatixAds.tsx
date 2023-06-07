import LazyLoad from "react-lazyload";

function ConnatixAds() {
  return (
    <>
      <LazyLoad>
        <script
          async
          id="40e3be63c06a42be96a4956227a96693"
          dangerouslySetInnerHTML={{
            __html: `
                   (new Image()).src = 'https://capi.connatix.com/tr/si?token=ce0c756d-574b-49f5-9888-57d30090e003&cid=d7375c7c-a8aa-4449-891e-4b3af534cf41';  cnx.cmd.push(function() {    cnx({      playerId: "ce0c756d-574b-49f5-9888-57d30090e003"    }).render("40e3be63c06a42be96a4956227a96693");  });
          
          `,
          }}
        ></script>
      </LazyLoad>
    </>
  );
}

export default ConnatixAds;
