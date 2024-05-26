import { hex, rgb } from 'color-convert';
import { PaletteProperties } from 'types';

export function hslStringToArray(hslStr) {
  // Remove "hsl(" and ")" from the string
  const strippedStr = hslStr.replace(/hsl\(|\)/g, '');

  // Split by comma and map each value to its integer representation
  return strippedStr.split(',').map(value => {
    if (value.includes('%')) {
      return parseInt(value.trim().replace('%', ''));
    }
    return parseInt(value.trim());
  });
}

export const toColorString = (color: number[]) => `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`

export function isHexColor(value: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);
}

export const hexToHsl = (hexString: string): number[] => {
  const [r, g, b] = hex.rgb(hexString)
  const [h, s, l] = rgb.hsl(r, g, b)
  return [h, s, l]
}

export const convertHexToHsl = (paletteProperties: PaletteProperties) => Object.entries(paletteProperties)
  .reduce((acc, [k, v]) => ({
    ...acc,
    [k as keyof PaletteProperties]: isHexColor(v) ? hexToHsl(v) : v
  }), {});
