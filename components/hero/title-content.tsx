import { motion } from 'framer-motion'
import useAudioContext from 'hooks/useAudioContext'
import usePaletteContext from 'hooks/usePaletteContext'
import styles from 'styles/hero.module.scss'


const Controls = ({
  columns,
  background,
  imageRef,
  bgCycle,

}) => {
  const { setCustomPalette } = usePaletteContext()
  const { playing, pausePlaying, startPlaying, audioNode, gainNode } = useAudioContext()

  const togglePlaying = () => {
    if (playing) {
      pausePlaying()
    } else if (!playing) {
      startPlaying()
    }
  }
  return (
    <div className={styles.controls}>
      <motion.button
        whileHover={{
          scale: 1.1,
          zIndex: 100
        }}
        whileTap={{
          scale: 0.9
        }}
        style={{
          border: '0.5em solid var(--primary)'
        }}
        onClick={() => {
          setCustomPalette({
          })
          columns.current = 1
          background.current = ''
          imageRef.current = undefined
        }}
      >
        🔄
      </motion.button>
      <motion.button
        whileHover={{
          scale: 1.1,
          zIndex: 100
        }}
        whileTap={{
          scale: 0.9
        }}
        style={{
          border: '0.5em solid var(--secondary)'
        }}
        onClick={bgCycle}
      >
        🖼️
      </motion.button>
      <motion.button
        onClick={togglePlaying}
        whileHover={{
          scale: 1.1,
          zIndex: 100
        }}
        whileTap={{
          scale: 0.9
        }}
        style={{
          border: '0.5em solid var(--tertiary)'
        }}
      >
        ⏯️
      </motion.button>
      <div>
        <label htmlFor="vol">vol</label>
        <input
          id="vol"
          type="range"
          min={0}
          max={1}
          step={0.005}
          defaultValue={0.5}
          onChange={(e) => {
            const value = parseFloat(e.target.value)
            // console.log('setting gain', value, gainNode.current)
            if (gainNode) {
              gainNode.gain.value = value
            }
          }}
        />
      </div>
      <div>
        <label htmlFor="spd">spd</label>
        <input
          id="spd"
          type="range"
          min={0.5}
          max={2}
          step={0.05}
          defaultValue={1}
          onChange={(e) => {
            const value = parseFloat(e.target.value)
            if (audioNode) {
              audioNode.playbackRate.value = value

            }
          }}
        />
      </div>
    </div>
  )
}

const TitleContent = ({
  name,
  columns,
  background,
  imageRef,
  bgCycle
}) => {
  return (
    <motion.div
      animate={{
        borderTopRightRadius: '100%'
      }}
      transition={{
        duration: 1
      }}
      className={styles.title}
    >
      <h1
        style={{
          borderTopRightRadius: '100%',
        }}
        id="name"
      >
        {name}
      </h1>
      <Controls
        columns={columns}
        background={background}
        imageRef={imageRef}
        bgCycle={bgCycle}
      />
    </motion.div>
  )
}

export default TitleContent