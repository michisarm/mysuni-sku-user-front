
import React, { FunctionComponent } from 'react';

import { Button, Icon, Segment } from 'semantic-ui-react';



export const HeaderWrapperView: FunctionComponent = ({ children }) => (
  <div className="my-learning-area">
    <Segment className="full">
      <div className="table-css type1">{/* .type1, .type2 //*/}
        <div className="row">
          {children}
        </div>
      </div>
    </Segment>
  </div>
);


export const ItemWrapper: FunctionComponent = ({ children }) => (
  <div className="cell v-middle">
    <div className="cell-inner">
      {children}
    </div>
  </div>
);


interface LearningTimeViewProps {
  label: string;
  icon: string
  hour: number;
  minute: number;
}

export const LearningTimeView: FunctionComponent<LearningTimeViewProps> = ({ label, icon, hour, minute }) => (
  <SharedHeaderItemView
    icon={icon}
    label={label}
  >
    <span className="t1">{hour || '00'}</span><span className="t2">h</span>
    <span className="t1">{minute || '00'}</span><span className="t2">m</span>
  </SharedHeaderItemView>
);


interface HeaderItemViewProps {
  label: string
  icon: string
  count?: number
  onClick: () => void,
}

export const HeaderItemView: FunctionComponent<HeaderItemViewProps> = ({ label, icon, count, onClick }) => (
  <SharedHeaderItemView
    label={label}
    icon={icon}
    onClick={onClick}
  >
    <span className="t1">{count || 0}</span><span className="t3">개</span>
  </SharedHeaderItemView>
);

interface SharedHeaderItemViewProps {
  label: string
  icon: string
  onClick?: () => void,
}

export const SharedHeaderItemView: FunctionComponent<SharedHeaderItemViewProps> = ({ label, icon, children, onClick }) => (
  <Button className="btn-complex48" onClick={onClick}>
    <span className="i">
      <Icon className={`${icon}48`} />
      <span className="blind">{icon}</span>
    </span>
    <span className="t">
      <span className="underline">{label}</span>
      <span className="div">
        {children}
      </span>
    </span>
  </Button>
);
