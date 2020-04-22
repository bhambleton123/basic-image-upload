const express = require("express");
const app = express();
const port = 3001;
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/api/image", upload.single("image"), (req, res) => {
  res.send({ encoded: req.file.buffer.toString("base64") });
});

app.listen(port, () => console.log(`Server listening on ${port}`));
