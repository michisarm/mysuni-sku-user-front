import React from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { BoardService } from '../../../personalcube/board';
import AdditionalInfoForCommunityView from '../view/AdditionalInfoForCommunityView';
import { DatePeriod } from '../../../shared';

interface Props extends RouteComponentProps {
  boardService?: BoardService
}

@inject(mobxHelper.injectFrom('personalCube.boardService'))
@observer
@reactAutobind
class CreateBoardContainer extends React.Component<Props> {
  //
  onChangeBoardProps(name: string, value: string | Date | boolean, nameSub?: string) {
    //
    const { boardService } = this.props;
    if (boardService && typeof value === 'object' && nameSub) {
      const stringDate = DatePeriod.changeDateToString(value);
      boardService.changeBoardProps(name, value, nameSub, stringDate);
      if (name.indexOf('startDateSub') !== -1) {
        const newName = name.replace('startDateSub', 'endDateSub');
        const startYear = value.getFullYear();
        const newDate = new Date(startYear, 11, 31, 0, 0, 0);
        const newStringDate = DatePeriod.changeDateToString(newDate);
        const newNameSub = nameSub.replace('startDate', 'endDate');
        boardService.changeBoardProps(newName, newDate, newNameSub, newStringDate);
      }
    }
    if (boardService && !nameSub) {
      boardService.changeBoardProps(name, value);
    }
  }

  render() {
    const { board } = this.props.boardService || {} as BoardService;

    return (
      <AdditionalInfoForCommunityView
        onChangeBoardProps={this.onChangeBoardProps}
        board={board}
      />
    );
  }
}

export default withRouter(CreateBoardContainer);

