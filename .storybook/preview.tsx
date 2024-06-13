import React from 'react'
import type { Preview } from "@storybook/react";
import '../styles/global.scss'

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className='spectrum spectrum--light spectrum--large'><Story /></div>
    )
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
