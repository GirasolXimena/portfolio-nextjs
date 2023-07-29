'use client'
import palettes from "../styles/themes"
import styles from '../styles/palette-switcher.module.scss'

function PaletteSwitcher() {
  const handleChange = ({ target }) => {
    const root = document.documentElement
    for (const [property, value] of Object.entries(palettes[target.value])) {
      if (typeof value === 'string') {
        root.style.setProperty(`--${property}`, value)
      }
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.label}>Palette</div>
      <div className={styles.options}>
        {Object.keys(palettes).map((palette) => (
          <div key={palette} className="palette-switcher__option">
            <input
            onChange={handleChange}
              type="radio"
              name="palette"
              id={`palette-${palette}`}
              value={palette}
            />
            <label htmlFor={`palette-${palette}`}>{palette}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PaletteSwitcher;