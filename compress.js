const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dir = "public/gallery";

fs.readdirSync(dir).forEach(async (file) => {
  if (!file.toLowerCase().endsWith(".jpg")) return;

  const inputPath = path.join(dir, file);

  try {
    await sharp(inputPath)
      .resize({ width: 1600 })
      .jpeg({ quality: 70 })
      .toFile(inputPath + ".tmp");

    fs.renameSync(inputPath + ".tmp", inputPath);

    console.log("Compressed:", file);
  } catch (err) {
    console.error("Error:", file, err);
  }
});