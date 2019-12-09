import React from 'react';

import { Provider } from 'mobx-react';
import { sharedService } from '../../shared';
import { postService } from '../../post';

const withPostStore = (Component: any) => {
  class PostStore extends React.PureComponent {
    render() {
      return (
        <Provider
          sharedService={sharedService}
          postService={postService}
        >
          <Component />
        </Provider>
      );
    }
  }

  return PostStore;
};

export default withPostStore;
