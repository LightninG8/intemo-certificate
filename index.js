const express = require("express");
const { createCanvas, loadImage } = require("canvas");

const app = express();
const port = 3000;

app.get("/certificate", async (req, res) => {
  try {
    const { name, result } = req.query;

    const canvas = createCanvas(500, 400);
    const ctx = canvas.getContext("2d");

    // Write "Awesome!"
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.restore();
    ctx.font = "30px Impact";
    ctx.fillText(name, 50, 100);
    ctx.fillText(result, 50, 150);

    // Automatically detects image type and does the conversion
    const buffer = canvas.toBuffer();

    // Returns the chosen image type, could be `'image/png'`
    const imageType = "image/jpeg";

    res.statusCode = 200;

    res.setHeader("Content-Type", imageType);

    res.end(buffer);
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log(`App has been started on port ${port}`);
});
