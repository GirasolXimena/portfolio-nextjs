import palettes from "../styles/palettes"
import styles from "../styles/palette-switcher.module.scss"
import utilStyles from "../styles/utils.module.scss"

function PaletteSwitcher({ currentPalette, setPalette }) {
  return (
    <div className="palette-switcher">
      <div className={utilStyles.srOnly}>Palette Switcher</div>
      <div className={styles.options}>
        {Object.keys(palettes).map((palette) => (
          <div key={palette} className="palette-switcher__option">
            <input
              onChange={() => setPalette(palette)}
              checked={currentPalette === palette}
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