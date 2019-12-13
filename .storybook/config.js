
/** Style for app */
import './theme.css';

/** Style for app */
import 'semantic-ui-css/semantic.css';
import '../src/style/css/main.88878584.chunk.css';
import '../src/style/css/2.4a9eacb3.chunk.css';

import React from 'react';
import { configure, addParameters, addDecorator } from '@storybook/react';
import { create } from '@storybook/theming/create';
import { withKnobs } from '@storybook/addon-knobs';
import { configure as mobxConfigure } from 'mobx';
import { Provider } from 'mobx-react';

import image from './nara-logo.jpeg';
import stores from '../src/stores';


addParameters({
  options: {
    theme: create({
      base: 'dark',
      brandTitle: 'NaraDrama',
      brandImage: image,
    }),
  },
});

addDecorator(withKnobs);

addDecorator((storyFn) => (
  <Provider
    {...stores}
  >
    <div style={{ padding: 20 }}>{storyFn()}</div>
  </Provider>
));

mobxConfigure({
  enforceActions: 'observed',
});

configure(require.context('../src', true, /\.stories\.(tsx|mdx)$/), module);
