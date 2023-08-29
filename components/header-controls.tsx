import AudioPlayer from "./audio-player";
import PaletteSwitcher from "./palette-switcher";
import ThemeSwitcher from "./theme-switcher";
import styles from '../styles/layout.module.scss'

function HeaderControls({ segment }) {

  return (
    <div className={styles.controls}>
      <AudioPlayer
        segment={segment}
      />
      <ThemeSwitcher
        segment={segment}
      />
      <PaletteSwitcher
        segment={segment}
      />
    </div>
  );

}

export default HeaderControls;