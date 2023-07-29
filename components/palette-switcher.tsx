'use client'
import palettes from "../styles/themes"
import styles from "../styles/palette-switcher.module.scss"
import utilities from "../lib/util"
const { setCustomProperties } = utilities

function Options () {
  return Object.keys(palettes).map((palette) => (
    <div key={palette} className="palette-switcher__option">
      <input
        onChange={() => setCustomProperties(palettes[palette])}
        type="radio"
        name="palette"
        id={`palette-${palette}`}
        value={palette}
      />
      <label htmlFor={`palette-${palette}`}>{palette}</label>
    </div>
  ))
}

function PaletteSwitcher() {
  return (
    <div className="palette-switcher">
      <div className="palette-switcher__label">Palette</div>
      <div className={styles.options}>
        <Options />
      </div>
    </div>
  )
}

export default PaletteSwitcher;