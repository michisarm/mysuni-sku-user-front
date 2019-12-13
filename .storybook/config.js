
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
import { BrowserRouter } from 'react-router-dom';


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
  <div id="root">
    <BrowserRouter>
      <Provider
        {...stores}
      >
        {storyFn()}
      </Provider>
    </BrowserRouter>
  </div>
));

mobxConfigure({
  enforceActions: 'observed',
});

configure(require.context('../src', true, /\.stories\.(tsx|mdx)$/), module);
