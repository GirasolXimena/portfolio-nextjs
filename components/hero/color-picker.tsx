import { hslStringToArray, isHexColor } from "lib/util/color"
import { PaletteProperties } from "types"
import { hsl } from "color-convert"
import { MutableRefObject, useRef } from "react"
import { motion } from "framer-motion"
import { setCustomProperties } from "lib/util"
import usePaletteContext from "hooks/usePaletteContext"
import styles from "styles/hero.module.scss"
const order = [
  'dark',
  'light',
  'primary',
  'secondary',
  'tertiary',
]

const ColorPicker = ({
  label,
  color
}: {
  label: keyof PaletteProperties,
  color: MutableRefObject<string>
}) => {
  const { currentPalette, setCustomPalette } = usePaletteContext()
  const currentColor = color.current
  // const value = isHexColor(currentColor) ?
  //   currentColor :
  //   `#${convert.hsl.hex(hslStringToArray(currentColor))}`
  const inputRef = useRef<HTMLInputElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const pickedColor = useRef<string | undefined>('#BADA55')
  // console.log('rendering color picker', label, value, pickedColor.current)
  return (
    <motion.div
      ref={bgRef} className={styles[label]}
    >
      <label htmlFor={`color-picker-${label}`}>
        Choose {label} gradient color
      </label>
      <motion.input
        whileHover={{
          scale: 1.1,
          zIndex: 100
        }}

        whileTap={{
          scale: 0.9
        }}

        ref={inputRef}
        type="color"
        id={`color-picker-${label}`}
        defaultValue={currentPalette.palette.properties[label]}
        onChange={(e) => {
          // console.log('updating picked color', e.target.value)
          pickedColor.current = e.target.value
          if (bgRef.current) {
            setCustomProperties({
              [`--${label}`]: e.target.value
            }, bgRef.current)
            // inputRef.current.value = e.target.value
          }
        }}
        onBlur={(e) => {
          if (!pickedColor.current) return
          const color = isHexColor(pickedColor.current as string) ?
            pickedColor.current :
            `#${hsl.hex(hslStringToArray(pickedColor.current))}`
          setCustomPalette((prev) => {
            return {
              ...prev,
              [label]: color
            }
          })
        }}
      />
    </motion.div>
  )
}

export default ColorPicker