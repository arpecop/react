import { css } from 'styled-components';

const screenSizes = {
  xl: 1408,
  lg: 1407,
  md: 1215,
  sm: 1023,
  xs: 768,
};
const media = Object.keys(screenSizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${screenSizes[label] / 16}em) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
export default media;
