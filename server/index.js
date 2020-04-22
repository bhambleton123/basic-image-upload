require("dotenv").config();
const express = require("express");
const app = express();
const port = 3001;
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
let AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_S3_REGION,
});

let s3 = new AWS.S3();

app.post("/api/image", upload.single("image"), (req, res) => {
  let data = {
    Bucket: process.env.AWS_S3_BUCKET,
    Body: req.file.buffer,
    ContentEncoding: "base64",
    ContentType: "image/png",
    Key: `blog_images/${req.file.originalname}`,
  };

  s3.putObject(data, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(
        s3.getSignedUrl("getObject", {
          Bucket: process.env.AWS_S3_BUCKET,
          Key: `blog_images/${req.file.originalname}`,
        })
      );
    }
  });
});

app.listen(port, () => console.log(`Server listening on ${port}`));
