import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { AplState } from 'myTraining/model/AplState';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';

interface Props {
  approvalState: AplState;
  onClickList: () => void;
  onClickReject: () => void;
  onClickApproval: () => void;
}

interface RouteParams {
  page: string;
}

function ApprovalButtons(props: Props) {
  const { approvalState, onClickList, onClickReject, onClickApproval } = props;
  const { page } = useParams<RouteParams>();

  /* render functions */
  const renderByApprovalState = (approvalState: AplState) => {
    switch (approvalState) {
      case AplState.Created:
      case AplState.OpenApproval:
        if (page === 'learning') {
          return (
            <div className="buttons editor">
              <Button className="fix line" onClick={onClickList}>
                <PolyglotText
                  id="승인관리-개인상세-List1"
                  defaultString="List"
                />
              </Button>
            </div>
          );
        }
        return (
          <div className="buttons editor">
            <Button className="fix line" onClick={onClickList}>
              <PolyglotText id="승인관리-개인상세-List2" defaultString="List" />
            </Button>
            <Button className="fix line" onClick={onClickReject}>
              <PolyglotText id="승인관리-개인상세-반려" defaultString="반려" />
            </Button>
            <Button className="fix bg" onClick={onClickApproval}>
              <PolyglotText id="승인관리-개인상세-승인" defaultString="승인" />
            </Button>
          </div>
        );
      default:
        return (
          <div className="buttons editor">
            <Button className="fix line" onClick={onClickList}>
              <PolyglotText id="승인관리-개인상세-List3" defaultString="List" />
            </Button>
          </div>
        );
    }
  };

  /* render */
  return <>{renderByApprovalState(approvalState)}</>;
}

export default memo(ApprovalButtons);
