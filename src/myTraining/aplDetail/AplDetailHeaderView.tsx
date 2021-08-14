import React from 'react';
import { observer } from 'mobx-react';
import { AplModel } from 'myTraining/model';
import { AplState } from 'myTraining/model/AplState';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface AplDetailHeaderViewProps {
  apl: AplModel;
}

function AplDetailHeaderView({ apl }: AplDetailHeaderViewProps) {
  return (
    <>
      {apl.state === AplState.Opened && (
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
      )}
      {apl.state !== AplState.Opened && (
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
      )}
    </>
  );
}

export default observer(AplDetailHeaderView);
