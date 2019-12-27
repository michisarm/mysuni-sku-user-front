import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { BoardService } from '../../../personalcube/board';
import AdditionalInfoForCommunityView from '../view/AdditionalInfoForCommunityView';
import { mobxHelper } from '../../../shared';


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

