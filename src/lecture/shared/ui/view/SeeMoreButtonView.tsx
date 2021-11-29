import React, { PureComponent, forwardRef } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Button, Icon } from 'semantic-ui-react';

interface Props {
  onClick: () => void;
}

const SeeMoreButtonView = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { onClick } = props;

  return (
    <div className="more-comments" ref={ref}>
      <Button icon className="left moreview" onClick={onClick}>
        <Icon className="moreview" />
        list more
      </Button>
    </div>
  );
});

export default SeeMoreButtonView;
