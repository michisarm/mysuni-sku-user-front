import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { BoardService } from '@sku/personalcube';
import AdditionalInfoForCommunityView from '../view/AdditionalInfoForCommunityView';


interface Props extends RouteComponentProps {
  boardService?: BoardService
}

interface States {

}

@inject('boardService')
@observer
@reactAutobind
class CreateBoardContainer extends React.Component<Props, States> {
  //
  onChangeBoardProps(name: string, value: string | Date | boolean, nameSub?: string) {
    //
    const { boardService } = this.props;
    if (boardService && typeof value === 'object' && nameSub) {
      const stringDate = value.toLocaleDateString()
        .replace('. ', '-')
        .replace('. ', '-')
        .replace('.', '');
      boardService.changeBoardProps(name, value, nameSub, stringDate);
    }
    if (boardService) {
      boardService.changeBoardProps(name, value);
    }
  }

  onClickUnlimitedPeriod() {
    //
    const { board } = this.props.boardService || {} as BoardService;
    if (board) {
      if (board.learningPeriod.endDateSub.toLocaleDateString() === new Date(2100, 12, 30).toLocaleDateString()) {
        this.onChangeBoardProps('learningPeriod.endDateSub', new Date(), 'learningPeriod.endDate');
      } else this.onChangeBoardProps('learningPeriod.endDateSub', new Date(2100, 12, 30), 'learningPeriod.endDate');
    }
  }

  render() {
    const { board } = this.props.boardService || {} as BoardService;
    return (
      <AdditionalInfoForCommunityView
        onChangeBoardProps={this.onChangeBoardProps}
        board={board}
        onClickUnlimitedPeriod={this.onClickUnlimitedPeriod}
      />
    );
  }
}

export default withRouter(CreateBoardContainer);

