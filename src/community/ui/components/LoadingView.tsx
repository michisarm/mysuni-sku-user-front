import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

interface Props {
  color?: string;
}

export function LoadingView(props: Props) {
  const { color } = props;
  return (
    <Dimmer
      active={true}
      inverted
      style={{ background: color === undefined ? '#f4f7fd' : color }}
    >
      <Loader size="medium" content="Waiting" />
    </Dimmer>
  );
}
