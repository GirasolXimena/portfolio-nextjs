export default function grayscale(canvas, image) {
  const { width, height } = canvas;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);
  const imageData = ctx.createImageData(width, height);
  const scannedImage = ctx.getImageData(0, 0, width, height);

  const scannedData = scannedImage.data;
  for (let i = 0; i < scannedData.length; i += 4) {
    const r = scannedData[i];
    const g = scannedData[i + 1];
    const b = scannedData[i + 2];
    // const a = scannedData[i + 3];
    const avg = (r + g + b) / 3;
    // red
    scannedData[i] = avg;
    // green
    scannedData[i + 1] = avg;
    // blue
    scannedData[i + 2] = avg;
    // alpha
    // scannedData[i + 3] = avg;
  }

  imageData.data.set(scannedData);
  ctx.putImageData(imageData, 0, 0);
}
