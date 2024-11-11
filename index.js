const express = require("express");
const { createCanvas, loadImage, registerFont } = require("canvas");

const app = express();
const port = 80;

app.get("/certificate", async (req, res) => {
  try {
    const { name, result } = req.query;

    const canvas = createCanvas(2000, 1125);
    const ctx = canvas.getContext("2d");

    registerFont("./font.ttf", { family: "Montserrat", weight: "bold" });
    // Основа сертификата
    await loadImage("cert.jpg").then((image) => {
      ctx.drawImage(image, 0, 0);
    });

    // Write "Awesome!"
    ctx.save();

    ctx.restore();
    ctx.fillStyle = "#3D3D3D";
    ctx.font = "bold 42px Montserrat";
    ctx.fillText(name.toUpperCase(), 175, 645);

    const formattedResult = `${Math.round(result.split("/")[0] / result.split("/")[1] * 100)}% из 100%`
    ctx.fillText(formattedResult, 1470, 695);

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
