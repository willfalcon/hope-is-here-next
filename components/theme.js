import { css } from 'styled-components';
import { rgba } from 'polished';
const theme = {
  purple: `#761D7D`,
  teal: `#00B0BC`,
  darkTeal: `#00909F`,
  pink: `#F16B77`,
  lightPink: `#FFF2F3`,
  orange: `#F16B77`,
  black: `#232323`,
  dark: `#4C5052`,
  green: `#006066`,
  lightCoral: `#F2CDD0`,
  shadow: `${rgba('#922D2D', 0.4)} 0 2px 13px`,
  font: {
    family: 'kyrial-display-pro,sans-serif',
    regular: 400,
    semibold: 600,
    bold: 700,
    black: 900,
  },
  sizes: {
    break: 768,
    large: 1024,
    content: 800,
    header: 140,
  },
  grid: {
    enabled: true,
  },
};

const media = Object.keys(theme.sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${theme.sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

const grid = Object.keys(theme.grid).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @supports (display: grid) {
      ${css(...args)}
    }
  `;
  return theme.grid.enabled ? acc : null;
}, {});

export default theme;
export { media, grid };
