const { google } = require("googleapis");
import services from "./services.json"; // This is the Service Account JSON you downloaded

const handler = async (req, res) => {
  const slug = req.query.slug;
  if (!slug) res.send("Nothing Found");
  try {
    // Create new auth object, pass it the client email, private key, and ask for permission to use the indexing service.
    const verifyPostSlug = await fetch(
      process.env.NEXT_CUSTOM_WP_API_URL + "/posts/" + slug
    ).then((r) => r.json());

    if (verifyPostSlug.status) {
      res.status(404).send({ error: true, msg: `Post Was Not Found` });
    } else {
      // await redeployHook();

      const auth = new google.auth.JWT(
        services.client_email,
        null,
        services.private_key,
        ["https://www.googleapis.com/auth/indexing"],
        null
      );

      const indexer = google.indexing({
        version: "v3",
        auth: auth,
      });

      const indexRequest = await indexer.urlNotifications.publish({
        requestBody: {
          type: "URL_UPDATED",
          url: `https://www.hiptoro.com/p/${slug}`,
        },
      });
      if (indexRequest.status === 200) {
        res
          .status(200)
          .send({ slug, msg: `${slug} Was indexed `, indexRequest });
        return;
      }
      res.status(404).send({ error: "True", msg: "Some Error was there " });
    }
  } catch (error) {
    console.log("error while indexing");
    res.status(400).send(error.response.data.error);
  }
};
async function redeployHook() {
  const url = process.env.DO_PORJECT_URL;
  const TOKEN = process.env.DO_TOKEN;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "json",
      Authorization: `Bearer ${TOKEN}`,
      body: JSON.stringify({
        force_build: true,
      }),
    },
  })
    .then((r) => r.json())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(`Error`, err));
}

export default handler;
