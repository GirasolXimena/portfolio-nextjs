

import type {Meta} from '@storybook/react';
import { Button } from '../components/ui/Button'
const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;

export const Example = (args: any) => <Button {...args}>Press me</Button>;

Example.args = {
  onPress: () => alert('Hello world!')
};
