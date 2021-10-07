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
import { RequestChannel } from '../../model/vo/RequestChannel';

interface Props {
  qna: QnAModel;
  filesMap: Map<string, any>;
  categoriesMap: Map<string, PolyglotString>;
  renderState: (state: QnaState) => React.ReactNode;
  getChannelToString: (channel: RequestChannel) => string;
  onClickList: () => void;
  onClickDelete: () => void;
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
      renderState,
      getChannelToString,
      onClickList,
      onClickDelete,
    } = this.props;

    return (
      <>
        <QnaManagementDetailHeaderView
          title={qna.question.title}
          requestChannel={getChannelToString(qna.question.requestChannel)}
          mainCategory={parsePolyglotString(
            categoriesMap.get(qna.question.mainCategoryId)
          )}
          subCategory={parsePolyglotString(
            categoriesMap.get(qna.question.subCategoryId)
          )}
          state={renderState(qna.question.state)}
          operatorName={parsePolyglotString(qna.inquirerIdentity.name)}
          departmentName={parsePolyglotString(
            qna.inquirerIdentity.departmentName
          )}
          email={qna.inquirerIdentity.email}
          registeredTime={qna.question.registeredTime}
          onClickList={onClickList}
          onClickDelete={onClickDelete}
        />

        {qna.question.content && (
          <div className="content-area">
            <div className="content-inner">
              <ReactQuill
                theme="bubble"
                value={qna.question.content || ''}
                readOnly
              />
              {qna.question.depotId && (
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
              )}
              <br />
            </div>
          </div>
        )}
      </>
    );
  }
}

export default QnaManagementDetailView;
