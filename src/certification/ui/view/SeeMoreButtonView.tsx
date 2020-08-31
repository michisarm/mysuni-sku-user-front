
import React from 'react';
import {Icon, Button} from 'semantic-ui-react';

interface Props {
  onClick: () => void,
}

const SeeMoreButtonView: React.FC<Props> = (Props) => {
  //
  const { onClick } = Props;

  return (
    <div className="more-comments">
      <Button icon className="left moreview" onClick={onClick}>
        <Icon className="moreview"/> list more
      </Button>
    </div>
  );
};

export default SeeMoreButtonView;
