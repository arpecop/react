import React from 'react';

const Iframe = ({ src, height, width }) => (
  <iframe src={src} height={height} width={width} className="fullheight" scrolling="no" frameBorder="0" title="dsd" allow="encrypted-media" />

);
export default Iframe;
