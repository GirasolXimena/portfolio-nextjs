import { Palettes } from "../../types"

const palettes: Palettes = {
  default: {
    properties: {
      light: '#DCDCDC',
      dark: '#323313',
      primary: '#FFFF00',
      secondary: '#FF00FF',
      tertiary: '#00FFFF',
      font: 'noto_sans'
    },
    audio: '/audio/default.mp3'
  },
  raingurl: {
    properties: {
      light: '#F7F7F7',
      dark: '#1A1A1A',
      primary: '#FFC0CB',
      secondary: '#FF69B4',
      tertiary: '#FF1493',
      font: 'Noto Sans'
    },
    audio: '/audio/raingurl.mp3'
  },
  doom: {
    properties: {
      light: '#CB001E',
      tertiary: '#746C94',
      primary: '#EAAA36',
      secondary: '#559BA6',
      dark: '#A2AFC0',
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
}

export default palettes