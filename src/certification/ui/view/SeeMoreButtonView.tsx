import React, { forwardRef } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  onClick: () => void;
}

const SeeMoreButtonView = forwardRef<HTMLDivElement, Props>((Props, ref) => {
  //
  const { onClick } = Props;

  return (
    <div className="more-comments" ref={ref}>
      <Button icon className="left moreview" onClick={onClick}>
        <Icon className="moreview" />
        <PolyglotText id="Create-MainList-ListMore" defaultString="list more" />
      </Button>
    </div>
  );
});

export default SeeMoreButtonView;
