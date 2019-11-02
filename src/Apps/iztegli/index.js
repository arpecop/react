import React, { useState, useEffect } from 'react';
import axios from 'axios';

const svg = `<svg version="1.1" baseProfile="full" width="300" height="200"
xmlns="http://www.w3.org/2000/svg">
   <rect width="100%" height="100%" fill="red" />
   <circle cx="150" cy="100" r="80" fill="green" />
   <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text></svg>`;
svgToPng(svg, (imgData) => {
  const pngImage = document.createElement('img');

  pngImage.src = imgData;
  console.log(imgData);
});
function svgToPng(svg, callback) {
  const url = getSvgUrl(svg);
  svgUrlToPng(url, (imgData) => {
    callback(imgData);
    URL.revokeObjectURL(url);
  });
}
function getSvgUrl(svg) {
  return URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
}
function svgUrlToPng(svgUrl, callback) {
  const svgImage = document.createElement('img');

  document.body.appendChild(svgImage);
  svgImage.onload = function () {
    const canvas = document.createElement('canvas');
    canvas.width = svgImage.clientWidth;
    canvas.height = svgImage.clientHeight;
    const canvasCtx = canvas.getContext('2d');
    canvasCtx.drawImage(svgImage, 0, 0);
    const imgData = canvas.toDataURL('image/png');
    callback(imgData);
    // document.body.removeChild(imgPreview);
  };
  svgImage.src = svgUrl;
}
const App = (props) => {
  const [data, setData] = useState({});
  const [query, setQuery] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://ip-api.com/json/${query}`);
      setData(result.data);
    };
    if (query) {
      fetchData();
    }
  }, []);
  // Declare state variables with current value and function to update it!
  return (
    <div />
  );
};
export default App;
