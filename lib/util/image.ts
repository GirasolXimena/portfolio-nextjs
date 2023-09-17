import { weightedAverage } from "./number";

type DrawingOptions = {
  canvas?: HTMLCanvasElement;
  [key: string]: any;
}

export const calculateRelativeBrightness = (r: number, g: number, b: number): number =>
  weightedAverage([r, g, b], [0.299, 0.587, 0.114]) / 100;

export function toDataURL(src: string): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();

      xhttp.onload = function (): void {
          const fileReader = new FileReader();
          fileReader.onloadend = function (): void {
              resolve(fileReader.result as string | ArrayBuffer | null);
          };
          fileReader.onerror = function (): void {
              reject(new Error("Failed to read the blob as data URL."));
          };
          fileReader.readAsDataURL(xhttp.response);
      };

      xhttp.onerror = function (): void {
          reject(new Error("Failed to fetch the image."));
      };

      xhttp.responseType = "blob";
      xhttp.open("GET", src, true);
      xhttp.send();
  });
}

export function extractImageData(sourceData: ImageData, x: number, y: number, width: number, height: number): ImageData {

  const output = new ImageData(width, height);
  // console.log('out', output)
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const sourceIndex = ((i + y) * sourceData.width + (j + x)) * 4;
      const outputIndex = (i * width + j) * 4;
      output.data[outputIndex] = sourceData.data[sourceIndex];
      output.data[outputIndex + 1] = sourceData.data[sourceIndex + 1];
      output.data[outputIndex + 2] = sourceData.data[sourceIndex + 2];
      output.data[outputIndex + 3] = sourceData.data[sourceIndex + 3];


    }
  }
  return output;
}

export function mirrorImage(ctx, image, x = 0, y = 0, horizontal = false, vertical = false) {
  ctx.save();  // save the current canvas state
  ctx.setTransform(
    horizontal ? -1 : 1, 0, // set the direction of x axis
    0, vertical ? -1 : 1,   // set the direction of y axis
    x + (horizontal ? image.width : 0), // set the x origin
    y + (vertical ? image.height : 0)   // set the y origin
  );
  ctx.drawImage(image, 0, 0);
  ctx.restore(); // restore the state as it was when this function was called
}

export function mirrorImageData(imageData: ImageData, horizontal = false, vertical = false): ImageData {
  const output = new ImageData(imageData.width, imageData.height);
  const { width, height } = imageData;
  const { data } = imageData;
  const { data: outputData } = output;
  for (let i = 0; i < height; i++) {
    const row: number[][] = [];
    for (let j = 0; j < width; j++) {
      const index = (i * width + j) * 4;
      row.push([
        data[index],
        data[index + 1],
        data[index + 2],
        data[index + 3]
      ]);
    }
    if (horizontal) row.reverse();
    if (vertical) row.reverse();
    for (let j = 0; j < width; j++) {
      const index = (i * width + j) * 4;
      outputData[index] = row[j][0];
      outputData[index + 1] = row[j][1];
      outputData[index + 2] = row[j][2];
      outputData[index + 3] = row[j][3];
    }
  }
  return output;
}

export function getImageDataFromDrawingFunction(
  width: number,
  height: number,
  drawFunction: (ctx: CanvasRenderingContext2D) => void
): HTMLCanvasElement {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  tempCanvas.height = height;
  const tempCtx = tempCanvas.getContext('2d');
  if (!tempCtx) throw new Error('Failed to get canvas context.');

  drawFunction(tempCtx);
  return tempCanvas;
}

