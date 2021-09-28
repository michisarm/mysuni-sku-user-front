import React from 'react';
import { observer } from 'mobx-react';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import { reactAutobind } from '@nara.platform/accent';
import ReactQuill from 'react-quill';

import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';

import {
  parsePolyglotString,
  PolyglotString,
} from '../../../shared/viewmodel/PolyglotString';
import QnAModel from '../../model/QnAModel';
import OperatorModel from '../../model/vo/OperatorModel';
import QnaManagementDetailHeaderView from './QnaManagementDetailHeaderView';
import { QnaState } from '../../model/vo/QnaState';

interface Props {
  qna: QnAModel;
  filesMap: Map<string, any>;
  categoriesMap: Map<string, PolyglotString>;
  finalOperator: OperatorModel;
  onClickList: () => void;
  renderState: (state: QnaState) => React.ReactNode;
}

@observer
@reactAutobind
class QnaManagementDetailView extends React.Component<Props> {
  //
  render() {
    //
    const {
      qna,
      filesMap,
      categoriesMap,
      finalOperator,
      onClickList,
      renderState,
    } = this.props;

    return (
      <>
        <QnaManagementDetailHeaderView
          title={qna.question.title}
          requestChannel={qna.question.requestChannel}
          mainCategory={parsePolyglotString(
            categoriesMap.get(qna.question.mainCategoryId)
          )}
          subCategory={parsePolyglotString(
            categoriesMap.get(qna.question.subCategoryId)
          )}
          state={renderState(qna.question.state)}
          operatorName={parsePolyglotString(finalOperator.operatorName)}
          departmentName={parsePolyglotString(finalOperator.department)}
          email={finalOperator.email}
          registeredTime={qna.question.registeredTime}
          onClickList={onClickList}
        />

        {qna.question.content && (
          <div className="content-area">
            <div className="content-inner">
              <ReactQuill
                theme="bubble"
                value={qna.question.content || ''}
                readOnly
              />
              <div className="file">
                <span>
                  <PolyglotText
                    id="support-QnaRead-첨부파일"
                    defaultString="첨부파일 :"
                  />
                </span>
                <br />
                {(filesMap &&
                  filesMap.get('reference') &&
                  filesMap
                    .get('reference')
                    .map((foundedFile: DepotFileViewModel, index: number) => (
                      <div>
                        <a href="#" className="link" key={index}>
                          <span
                            className="ellipsis"
                            onClick={(e) => {
                              depot.downloadDepotFile(foundedFile.id);
                              e.preventDefault();
                            }}
                          >
                            {'    ' + foundedFile.name + '     '}
                          </span>
                          <br />
                        </a>
                        <br />
                      </div>
                    ))) ||
                  ''}
              </div>
              <br />
            </div>
          </div>
        )}
      </>
    );
  }
}

export default QnaManagementDetailView;
