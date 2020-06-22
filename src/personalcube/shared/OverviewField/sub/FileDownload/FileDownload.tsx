import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import depot from '@nara.drama/depot';
import { Label, Icon, List } from 'semantic-ui-react';

interface Props {
  fileBoxIds: string[];
}

interface State {
  files: any[];
}

@reactAutobind
class FileDownload extends Component<Props, State> {
  // popupDownload 에서 리스트 다운로드로 변경 by gon
  state = {
    files: [],
  };

  componentDidMount() {
    this.init();
  }

  init() {
    const { fileBoxIds } = this.props;
    let files: any[] = [];

    const boxIds = fileBoxIds.filter(id => id);
    if (boxIds.length) {
      Promise.all(boxIds.map(fileBoxId => depot.getDepotFiles(fileBoxId))).then(
        filesArr => {
          if (filesArr.length) {
            filesArr.map(fileList => {
              if (Array.isArray(fileList)) files = files.concat(fileList);
              else files.push(fileList);
            });
          }
          this.setState({ files });
        }
      );
    }
  }

  onDownloadOne(fileId: string) {
    depot.downloadDepotFiles([fileId]);
  }

  onDownloadAll() {
    const { files }: State = this.state;
    const downloadAll = files.map(file => file.id);
    depot.downloadDepotFiles(downloadAll);
  }

  render() {
    //
    const { fileBoxIds } = this.props;
    const boxIds = fileBoxIds.filter(id => id);
    if (!boxIds || !boxIds.length) return null;

    const { files }: State = this.state;

    return (
      <>
        {/* 파일다운로드 (선택) */}
        <div className="ov-paragraph download-area">
          <h3 className="title-style">
            <Label className="onlytext bold size24">
              <Icon className="document24" />
              <span>참고자료</span>
            </Label>
          </h3>
          <List bulleted>
            <List.Item>
              <div className="title">첨부파일</div>
              <div className="detail">
                <div className="file-down-wrap">
                  {(files &&
                    files.length &&
                    files.map((file: any) => (
                      <div className="down">
                        <a onClick={() => this.onDownloadOne(file.id)}>
                          <span>{file.name}</span>
                        </a>
                      </div>
                    ))) ||
                    null}
                  <div className="all-down">
                    <a onClick={() => this.onDownloadAll()}>
                      <Icon className="icon-down-type4" />
                      <span>전체 다운로드</span>
                    </a>
                  </div>
                </div>
              </div>
            </List.Item>
          </List>
        </div>
      </>
    );
  }
}

export default FileDownload;
