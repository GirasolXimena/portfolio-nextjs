export default (canvas, image) => {
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height)
  // console.log(scannedImage)
  const scannedData = scannedImage.data;
  for (let i = 0; i < scannedData.length; i += 4) {
    const average = (scannedData[i] + scannedData[i + 1] + scannedData[i + 2]) / 3;
    scannedData[i] = average;
    scannedData[i + 1] = average;
    scannedData[i + 2] = average;
    // scannedData[i + 3] = 255;
  }
  imageData.data.set(scannedData);
  // scannedImage.data = scannedData;
  ctx.putImageData(imageData, 0, 0);
}