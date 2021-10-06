import * as React from 'react';
import { ReactComponent } from '@nara.platform/accent';
import ReactQuill from 'react-quill';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';
import depot, { DepotFileViewModel, FileBox, ValidationType } from '@nara.drama/depot';
import QnAModel from '../../model/QnAModel';
import OperatorModel from '../../model/vo/OperatorModel';
import QnaDetailHeader from './QnaDetailHeader';

interface Props {
  getCategoryName: (id: string ) => string;
  onClickList: () => void;

  qna: QnAModel;
  finalOperator: OperatorModel;
  filesMap: Map<string, any>;
}

class QnaDetailView extends ReactComponent<Props, {}> {
  //
  render() {
    //
    const { getCategoryName, onClickList } = this.props;
    const { qna, finalOperator, filesMap } = this.props;

    return (
      <>
        <div className="spt-answer-view">
          <QnaDetailHeader
            deletable
            title={
              qna.question.title
            }
            time={qna.question.registeredTime}
            onClickList={onClickList}
            getCategoryName={getCategoryName}
            qna={qna}
            finalOperator={finalOperator}
          />

          {qna.question.content && (
            <div className="content-area">
              <div className="content-inner">
                <ReactQuill
                  theme="bubble"
                  value={qna.question.content}
                  readOnly
                />
                {
                  qna.question.depotId ? (
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
                            <>
                              <br />
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
                            </>
                          ))) ||
                      ''}
                    </div>
                  ) : null
                }
                <br />
              </div>
            </div>
          ) || null}
        </div>
      </>
    )
  }
}

export default QnaDetailView;
