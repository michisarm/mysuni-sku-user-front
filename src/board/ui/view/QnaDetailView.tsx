import * as React from 'react';
import { PatronType, ReactComponent } from '@nara.platform/accent';
import BoardDetailContentHeaderView from './BoardDetailContentHeaderView';
import ReactQuill from 'react-quill';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';
import depot, { DepotFileViewModel, FileBox, ValidationType } from '@nara.drama/depot';
import QnAModel from '../../model/QnAModel';
import { Checkbox, Radio, Table, TextArea } from 'semantic-ui-react';
import { parsePolyglotString } from '../../../shared/viewmodel/PolyglotString';
import moment from 'moment';
import OperatorModel from '../../model/vo/OperatorModel';

interface Props {
  getCategoryName: (id: string ) => string;
  onClickList: () => void;

  qna: QnAModel;
  filesMap: Map<string, any>;
}

class QnaDetailView extends ReactComponent<Props, {}> {
  //
  render() {
    //
    const { getCategoryName, onClickList } = this.props;
    const { qna, filesMap } = this.props;

    return (
      <>
        <div className="post-view qna">
          <BoardDetailContentHeaderView
            deletable
            title={
              qna.question.title
            }
            time={qna.question.registeredTime}
            subField={
              <span className="category">
                {`${getCategoryName(qna.question.mainCategoryId)} > ${getCategoryName(qna.question.subCategoryId)}`}
              </span>
            }
            onClickList={onClickList}
            // onClickDelete={this.deleteQnaDetail}
            // onClickModify={this.onClickModify}
          />

          {qna.question.content && (
            <div className="content-area">
              <div className="content-inner">
                <ReactQuill
                  theme="bubble"
                  value={qna.question.content}
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
          ) || null}
        </div>
      </>
    )
  }
}

export default QnaDetailView;
