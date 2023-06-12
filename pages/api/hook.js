import { exec } from "child_process";

export default function handler(req, res) {
  const { secret } = req.query;

  // Verify the secret token
  if (secret !== "your-secret-token") {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  // Execute a Git pull request to update the code
  exec("git pull origin main", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json({ error: "Deployment failed" });
      return;
    }

    console.log(`Git pull completed. Output: ${stdout}`);
    exec("git add .");
    exec(`git commit -m "Deployment From Hook" `);
    exec("git push heroku main", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: "Deployment on Heroku failed" });
        return;
      }

      console.log(`Heroku deployment completed. Output: ${stdout}`);
      res.status(200).json({ message: "Deployment successful" });
    });
  });
}
