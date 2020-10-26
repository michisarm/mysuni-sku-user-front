import React, { useCallback, useEffect, useState } from 'react';
import { reactConfirm } from '@nara.platform/accent';
import { Form, Icon, Button, List } from 'semantic-ui-react';
import Reportheader from './ReportHeader';
import Editor from './Editor';
import { LectureReport, StudentReport } from '../../../viewModel/LectureReport';
import depot, {
  FileBox,
  ValidationType,
  DepotFileViewModel,
} from '@nara.drama/depot';
import { PatronType } from '@nara.platform/accent';
import { depotHelper } from 'shared';
import { setLectureReport } from 'lecture/detail/store/LectureReportStore';

// 개발 참고 데이터 주석 - 차후 삭제
// cube 개발화면        :  http://localhost:3000/lecture/cineroom/ne1-m2-c2/college/CLG00001/cube/CUBE-2jd/lecture-card/LECTURE-CARD-26t/report
// cube 개발화면 관리자  : http://ma.mysuni.sk.com/manager/cineroom/ne1-m2-c2/learning-management/cubes/cube-detail/CUBE-2jd/Video
// cube 원본 화면 참조 :   http://ma.mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00001/course-plan/COURSE-PLAN-d5/Course/C-LECTURE-7d
//                        http://ma.mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00001/cube/CUBE-2jd/lecture-card/LECTURE-CARD-26t

interface LectureReportViewProps {
  lectureReport: LectureReport;
  setLectureReport: (reportValue: LectureReport) => void;
  setCubeLectureReport: () => void;
}

const LectureReportView: React.FC<LectureReportViewProps> = function LectureReportView({
  lectureReport,
  // setLectureReport,
  setCubeLectureReport,
}) {
  const onSubmitClick = useCallback(() => {
    reactConfirm({
      title: '알림',
      message:
        '과제 제출이 완료되었습니다. 채점이 완료되면 메일로 결과를 확인하실 수 있습니다.',
      onOk: () => setCubeLectureReport(),
    });
  }, []);

  // AS-IS 붙여봄
  function getFileBoxIdForReference(depotId: string) {
    //
    //TODO : 코드 리뷰 후 개선 필요
    const studentReport: StudentReport = lectureReport.studentReport || {};
    studentReport.homeworkFileBoxId = depotId;
    lectureReport.studentReport = studentReport;
    setLectureReport(lectureReport);
  }

  // filesMap: new Map<string, any>(),

  const [filesMap, setFilesMap] = useState<Map<string, any>>(
    new Map<string, any>()
  );

  useEffect(() => {
    getFileIds();
  }, [lectureReport]);

  const getFileIds = useCallback(() => {
    const referenceFileBoxId =
      lectureReport && lectureReport.studentReport?.homeworkOperatorFileBoxId;

    Promise.resolve().then(() => {
      if (referenceFileBoxId) findFiles('reference', referenceFileBoxId);
    });
  }, [lectureReport]);

  const findFiles = useCallback((type: string, fileBoxId: string) => {
    depot.getDepotFiles(fileBoxId).then(files => {
      filesMap.set(type, files);
      const newMap = new Map(filesMap.set(type, files));
      setFilesMap(newMap);
    });
  }, []);

  return (
    <div className="course-info-detail responsive-course">
      <div className="course-detail-center">
        <div className="main-wrap">
          <div className="scrolling-area area2 ">
            <div className="ui segment full">
              {/* Header */}
              <div className="course-info-header">
                <Reportheader lectureReport={lectureReport} />
              </div>

              <div className="apl-form-wrap support">
                <Form>
                  <Form.Field>
                    <label>주제</label>
                    <div className="ui editor-wrap">
                      {lectureReport?.reportFileBox?.reportQuestion}
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <label>작성</label>
                    <div className="ui editor-wrap">
                      <Editor
                        lectureReport={lectureReport}
                        setLectureReport={setLectureReport}
                      />
                    </div>
                  </Form.Field>
                  {/*TODO : 첨부파일이 없는 경우도 있는지 확인, 없는 경우의 처리 방법 문의  */}
                  <Form.Field>
                    <label>첨부파일</label>
                    <div className="download-file">
                      <div className="btn-wrap">
                        <Button
                          icon
                          className="left icon-big-line2"
                          onClick={() =>
                            depot.downloadDepot(
                              lectureReport?.reportFileBox?.fileBoxId || ''
                            )
                          }
                        >
                          <Icon className="download2" />
                          <span>Download File</span>
                        </Button>
                      </div>
                    </div>
                    <div className="bottom">
                      <span className="text1">
                        <Icon className="info16" />
                        <span className="blind">information</span>
                        과정담당자가 등록한 Report 양식을 Download 받으실 수
                        있습니다.
                      </span>
                    </div>
                  </Form.Field>
                </Form>
              </div>

              <div className="report-attach">
                {/* <AttachFileUpload filesMap={filesMap}/> */}
                {/* AS-IS 호출 하여 붙여봄 이대로 사용해도 되는지 확인 후 사용 */}
                <div className="lg-attach">
                  <div className="attach-inner">
                    {/* TODO  homeworkFileBoxId 데이터가 null 문자열로 저장되어 있는 경우가 있음, 공백 or String 으로 처리 되어야 할것으로 보임*/}
                    <FileBox
                      // id={lectureReport?.studentReport?.homeworkFileBoxId || ''}
                      id={
                        lectureReport?.studentReport?.homeworkFileBoxId !==
                          null &&
                        lectureReport?.studentReport?.homeworkFileBoxId !==
                          'null'
                          ? lectureReport?.studentReport?.homeworkFileBoxId
                          : ''
                      }
                      vaultKey={{
                        keyString: 'sku-depot',
                        patronType: PatronType.Pavilion,
                      }}
                      patronKey={{
                        keyString: 'sku-denizen',
                        patronType: PatronType.Denizen,
                      }}
                      validations={[
                        {
                          type: ValidationType.Duplication,
                          validator: depotHelper.duplicationValidator,
                        },
                      ]}
                      onChange={getFileBoxIdForReference}
                    />
                    <div className="bottom">
                      <span className="text1">
                        <Icon className="info16" />
                        <span className="blind">information</span>
                        작성된 Report를 Upload하시면 과정 담당자가 확인 후
                        의견을 드릴 예정입니다.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {lectureReport?.studentReport?.homeworkOperatorComment && (
                <Form>
                  <Form.Field>
                    <label>담당자의견</label>
                    <div className="ui editor-wrap">
                      <div className="content-area">
                        <div className="content-inner ql-snow">
                          <div
                            className="ql-editor"
                            dangerouslySetInnerHTML={{
                              __html:
                                lectureReport?.studentReport
                                  ?.homeworkOperatorComment,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Form.Field>
                  <div className="badge-detail">
                    <div className="ov-paragraph download-area">
                      <List bulleted>
                        <List.Item>
                          <div className="detail">
                            <div className="file-down-wrap">
                              {filesMap &&
                                filesMap.get('reference') &&
                                filesMap
                                  .get('reference')
                                  .map(
                                    (
                                      foundedFile: DepotFileViewModel,
                                      index: number
                                    ) => (
                                      <div className="down">
                                        <a
                                          key={index}
                                          onClick={() =>
                                            depot.downloadDepotFile(
                                              foundedFile.id
                                            )
                                          }
                                        >
                                          <span>{foundedFile.name}</span>
                                        </a>
                                      </div>
                                    )
                                  )}
                              <div className="all-down">
                                <a
                                  onClick={() =>
                                    depot.downloadDepot(
                                      lectureReport?.studentReport
                                        ?.homeworkOperatorFileBoxId || ''
                                    )
                                  }
                                >
                                  <Icon className="icon-down-type4" />
                                  <span>전체 다운로드</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </List.Item>
                      </List>
                    </div>
                  </div>
                </Form>
              )}
              <div className="survey-preview">
                <button className="ui button fix bg" onClick={onSubmitClick}>
                  제출
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureReportView;
