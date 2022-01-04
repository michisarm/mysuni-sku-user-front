import React, { FunctionComponent } from 'react';
import { Table, Icon, Accordion, Progress } from 'semantic-ui-react';
import { PersonalBoardContainer } from '../PersonalBoard/ui/logic/PersonalBoardContainer';
import { Area } from 'tracker/model';

const PUBLIC_URL = `${process.env.PUBLIC_URL}`;

export const HeaderWrapperView: FunctionComponent = ({ children }) => (
  <div className="main-personal-wrap">
    <div className="main_personal season2" data-area={Area.MAIN_INFO}>
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

export const SharedHeaderItemView: FunctionComponent<
  SharedHeaderItemViewProps
> = ({ label, children, onClick }) => (
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
