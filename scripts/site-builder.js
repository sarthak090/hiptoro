async function redeployHook() {
  const url = process.env.DO_PORJECT_URL;
  const TOKEN = process.env.DO_TOKEN;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: {
      force_build: "true",
    },
  })
    .then((r) => r.json())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(`Error`, err));
}
redeployHook();
