import { Palettes } from "../../types"

const palettes: Palettes = {
  default: {
    properties: {
      light: 'gainsboro',
      dark: '#323313',
      primary: 'yellow',
      secondary: 'magenta',
      tertiary: 'cyan',
      font: 'noto_sans'
    },
  },
  shrek: {
    properties: {
      light: '#e1dfb6',
      dark: '#5c452d',
      primary: '#c5ee7d',
      secondary: '#8cb04e',
      tertiary: '#7a9244',
      font: 'Shrek'
    },
    audio: '/audio/shrek.mp3'
  },
  doom: {
    properties: {
    light: 'rgb(203, 0, 30)',
    tertiary: 'rgb(116,108,148)',
    primary: 'rgb(234, 170, 54)',
    secondary: 'rgb(85, 155, 166)',
    dark: 'rgb(162, 175, 192)',
    font: 'Doom'
    },
    audio: '/audio/doom.mp3'
  },
  vaporwave: {
    properties: {
    light: '#ff00c1',
    dark: '#4900ff',
    primary: '#00fff9',
    secondary: '#9600ff',
    tertiary: '#00b8ff',
    font: 'Vaporwave'
    },
    audio: '/audio/vaporwave.mp3'
  },
  queer: {
    properties: {
    light: '#E8C948',
    dark: '#7D417D',
    primary: '#FFAEC9',
    secondary: '#FFFFFF',
    tertiary: '#12B8FF',
    font: 'Noto Sans'
    }
  }
}

export default palettes