'use client'
import { useRef } from 'react';
import styles from '../styles/open-props-gradient-generator.module.scss'

import GUIContainer from './dat-gui-controls';

function View() {
  const guiContainerRef = useRef<HTMLDivElement>(null);
  const controls:any = GUIContainer.useContainer()
  const gradientLayer = controls.gradient.enabled ? `var(--gradient-${controls.gradient.value})` : '';
  const noiseLayer = controls.noise.enabled ? `var(--noise-${controls.noise.value})` : '';
  
  const backgroundImage = [gradientLayer, noiseLayer].filter(Boolean).join(', ');
  
  return (
    <div
      ref={guiContainerRef}
      className={styles.container}
      style={{
        position: 'relative',
        alignItems: 'center',
        gridTemplateRows: 'min-content 1fr',
        justifyItems: 'center',
        height: '100%',
        width: '100%',
        gridAutoFlow: 'row',
      }}>
      <div className="generator" style={{
        display: 'grid',
        placeSelf: 'stretch',
        height: '100%',
        width: '100%',
      }}>
        <div className="gradient" style={{
          color: 'white',
          height: '100%',
          width: '100%',
          backgroundImage: backgroundImage,
          filter: controls.filter.enabled && `var(--noise-filter-${controls.filter.value})`,
        }}>
          <h1>
            <pre>
              {JSON.stringify(controls.gradient.value, null, 2)}
            </pre>
          </h1>
        </div>
      </div>
    </div>


  )
}

function OpenPropsGradientGenerator() {
  const ref = useRef<HTMLDivElement>(null);
  const datGuiOptions = {
    gradient: {
        enabled: {
            value: true,
            bounds: [0, 1]
        },
        value: {
            value: 1,
            bounds: [1, 30, 1]
        },
    },
    noise: {
        enabled: {
            value: true,
            bounds: [0, 1]
        },
        value: {
            value: 1,
            bounds: [1, 5, 1]
        }
    },
    filter: {
        enabled: {
            value: true,
            bounds: [0, 1]
        },
        value: {
            value: 1,
            bounds: [1, 5, 1]
        }
    }
};

  return (
    <div style={{
      position: 'relative',
      height: '100%',
      width: '100%'
    }} ref={ref}>
      
      <GUIContainer.Provider
        initialState={{
          datGuiOptions,
          id: styles.controls,
          ref: ref
        }}
      >
        <View />
      </GUIContainer.Provider>
    </div>
  )
}

export default OpenPropsGradientGenerator;