import React from 'react';
import { AplModel } from 'myTraining/model';
import { AplState } from 'myTraining/model/AplState';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';

interface Props {
  model?: AplModel;
}

function MyApprovalContentHeader(props: Props) {
  const { model } = props;

  /* render functions */
  const renderByApprovalState = (model: AplModel) => {
    /* AplDetailPage 에서 승인상태에 따라 다르게 보여지는 화면. */
    if (model.state === AplState.Opened) {
      return (
        <div className="add-personal-learning support">
          <div className="add-personal-learning-wrap">
            <div className="apl-tit">
              <PolyglotText
                id="승인관리-개인상세-타이틀1"
                defaultString="개인학습"
              />
            </div>
            <div className="apl-notice">
              <PolyglotText
                id="승인관리-개인상세-개인학습"
                defaultString="승인 완료된 개인학습 정보입니다."
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="ap-title border">
        <div className="inner">
          <div className="txt1">
            <PolyglotText
              id="승인관리-개인상세-타이틀2"
              defaultString="개인학습"
            />
          </div>
          <div className="txt2">
            <PolyglotText
              id="승인관리-개인상세-부가1"
              defaultString="구성원이 입력한 개인학습 정보에 대해 확인하실 수 있습니다."
            />
            <br />
            <PolyglotText
              id="승인관리-개인상세-부가2"
              defaultString="입력된 내용을 잘 확인해주세요."
            />
          </div>
        </div>
      </div>
    );
  };

  const renderListContentHeader = () => {
    /* Apl 목록 Page 에서 보여지는 화면.  */
    return (
      <div className="ap-title">
        <div className="inner">
          <div className="txt1">
            <PolyglotText id="승인관리-mifa-타이틀" defaultString="승인관리" />
          </div>
          <div className="txt2">
            <PolyglotText
              id="승인관리-mifa-부가설명"
              defaultString="유료과정 및 개인학습 정보에 대해 승인관리를 하실 수 있습니다."
            />
          </div>
        </div>
      </div>
    );
  };

  /* render */
  return (
    <>{(model && renderByApprovalState(model)) || renderListContentHeader()}</>
  );
}

export default MyApprovalContentHeader;
