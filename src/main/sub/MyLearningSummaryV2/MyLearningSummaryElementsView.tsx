import React, { FunctionComponent } from 'react';
import { Type, AreaType } from 'tracker/model';
import { Table, Icon, Accordion, Progress } from 'semantic-ui-react';
import PersonalBoardContainer from '../PersonalBoard/ui/logic/PersonalBoardContainer';

const PUBLIC_URL = `${process.env.PUBLIC_URL}`

export const HeaderWrapperView: FunctionComponent = ({ children }) => (
  <div 
    className="main-personal-wrap"
    data-area={AreaType.MAIN_INFO}
    data-type={Type.CLICK}
  >
    <div className="main_personal">
      {/* <table>
        <tbody>
          <tr> */}
            {children}
          {/* </tr>
        </tbody>
      </table> */}
    </div>
  </div>
);

interface ItemWrapperProps {
  onClick?: () => void;
}

export const ItemWrapper: FunctionComponent<ItemWrapperProps> = ({
  children,
  onClick,
}) => <Table.Cell onClick={onClick}>{children}</Table.Cell>;

interface HeaderItemViewProps {
  label: string;
  count?: number;
  onClick: () => void;
}

export const HeaderItemView: FunctionComponent<HeaderItemViewProps> = ({
  label,
  count,
  onClick,
}) => (
  <SharedHeaderItemView label={label} onClick={onClick}>
    <span className="big">{count || 0}</span>
    <span className="small">개</span>
  </SharedHeaderItemView>
);

interface SharedHeaderItemViewProps {
  label: string;
  onClick?: () => void;
}

export const SharedHeaderItemView: FunctionComponent<SharedHeaderItemViewProps> = ({
  label,
  children,
  onClick,
}) => (
  <>
    <div
      className="title"
      style={label.indexOf('완료학습') > -1 ? { width: '100px' } : {}}
    >
      {label}
    </div>
    <a onClick={onClick}>{children}</a>
  </>
);

interface AdditionalToolsMyLearningProps {
  children: React.ReactNode,
  activeIndex: number,
  companyCode: string,
  onClickQnA: () => void,
  handleClick: (e: any, data:any) => void
}

export const AdditionalToolsMyLearning: FunctionComponent<AdditionalToolsMyLearningProps> = function ({ children, activeIndex, companyCode, onClickQnA, handleClick }) {
  return (
    <Accordion>
      <Accordion.Title
        active={activeIndex === 1}
        index={1}
        onClick={(e, data) => {
          handleClick(e, data)
        }}
      >
        <img src={activeIndex !== 1 ? `${PUBLIC_URL}/images/all/btn-pboard-open.png` : `${PUBLIC_URL}/images/all/btn-pboard-close.png`} />
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 1}>
        <PersonalBoardContainer companyCode={companyCode} activeIndex={activeIndex}/>
      </Accordion.Content>
    </Accordion>
  );
} 
