
import React, { FunctionComponent } from 'react';
import { Table, Icon } from 'semantic-ui-react';


export const HeaderWrapperView: FunctionComponent = ({ children }) => (
  <div className="main-info-box">
    <table>
      <tbody>
        <tr>
          {children}
        </tr>
      </tbody>
    </table>
  </div>
);


interface ItemWrapperProps {
  onClick?: () => void,
}

export const ItemWrapper: FunctionComponent<ItemWrapperProps> = ({ children, onClick }) => (
  <Table.Cell onClick={onClick}>
    {children}
  </Table.Cell>
);

interface HeaderItemViewProps {
  label: string
  count?: number,
  onClick: () => void,
}

export const HeaderItemView: FunctionComponent<HeaderItemViewProps> = ({ label, count, onClick }) => (
  <SharedHeaderItemView
    label={label}
    onClick={onClick}
  >
    <span className="big">{count || 0}</span><span className="small">개</span>
  </SharedHeaderItemView>
);

interface SharedHeaderItemViewProps {
  label: string
  onClick?: () => void,
}

export const SharedHeaderItemView: FunctionComponent<SharedHeaderItemViewProps> = ({ label, children, onClick }) => (
  <>
    <div className="title">{label}</div>
    <a onClick={onClick}>
      {children}
    </a>
  </>
);


interface AdditionalToolsMyLearningProps {
  children: React.ReactNode,
  onClickQnA: () => void,
}
export const AdditionalToolsMyLearning: FunctionComponent<AdditionalToolsMyLearningProps> = ({ children, onClickQnA }) => (
  <div className="main-learning-link">
    <div className="inner">
      <div className="left">
        <div>
          {children}
        </div>
        {/*APL 2차 개발*/}
        {/*<div>*/}
        {/*<a href="#">*/}
        {/*<Icon className="add24"/>*/}
        {/*<span>Add Personal Learning</span>*/}
        {/*</a>*/}
        {/*</div>*/}
      </div>
      <div className="right">
        <a href="#" onClick={onClickQnA} className="contact-us">

          <span>1:1 문의하기</span>
          <Icon className="arrow-g-16"/>
        </a>
      </div>
    </div>
  </div>
);
