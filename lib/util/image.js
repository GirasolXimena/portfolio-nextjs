export const calculateRelativeBrightness = (r, g, b) =>
  (r * 0.299 + g * 0.587 + b * 0.114) / 100;

export function toDataURL(src, callback) {
  const xhttp = new XMLHttpRequest();

  xhttp.onload = function () {
    const fileReader = new FileReader();
    fileReader.onloadend = function () {
      callback(fileReader.result);
    };
    fileReader.readAsDataURL(xhttp.response);
  };

  xhttp.responseType = "blob";
  xhttp.open("GET", src, true);
  xhttp.send();
}
