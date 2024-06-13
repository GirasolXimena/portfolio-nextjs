import {Button as RACButton, ButtonProps} from 'react-aria-components';
/*
  Recommended: For components with multiple contexts available, if you
  want access to all contexts, load the index.css file, which includes
  all contexts and component variables.
*/
import "node_modules/@spectrum-css/button/dist/index.css";

export function Button(props: ButtonProps) {
  return <RACButton className={'spectrum-Button spectrum-Button--fill spectrum-Button--primary spectrum-Button--sizeS'} {...props} />;
}
