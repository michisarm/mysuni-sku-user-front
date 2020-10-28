import React, { useCallback } from 'react';
import { List, Icon, Label } from 'semantic-ui-react';
import depot from '@nara.drama/depot';
import LectureFile from '../../../viewModel/LectureOverview/LectureFile';

interface LectureFileViewProps {
  lectureFile: LectureFile;
}

const LectureFileView: React.FC<LectureFileViewProps> = function LectureFileView({
  lectureFile,
}) {
  const fileDownload = useCallback((fileId: string) => {
    depot.downloadDepotFile(fileId);
  }, []);

  const allFilesDownload = useCallback(() => {
    depot.downloadDepotFiles(lectureFile.files.map(({ id }) => id));
  }, [lectureFile]);

  return (
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
              {lectureFile.files.map(file => (
                <div className="down">
                  <a onClick={() => fileDownload(file.id)}>
                    <span>{file.name}</span>
                  </a>
                </div>
              ))}
              <div className="all-down">
                <a onClick={allFilesDownload}>
                  <Icon className="icon-down-type4" />
                  <span>전체 다운로드</span>
                </a>
              </div>
            </div>
          </div>
        </List.Item>
      </List>
    </div>
  );
};

export default LectureFileView;
