import React, { useCallback, useEffect, useState } from 'react';
import { reactConfirm, reactAlert } from '@nara.platform/accent';
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
import {
  getLectureReport,
  setLectureReport,
} from 'lecture/detail/store/LectureReportStore';

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
    const homeworkFileBoxId = getLectureReport()?.studentReport?.homeworkFileBoxId;
    if (homeworkFileBoxId === '' || homeworkFileBoxId === null || homeworkFileBoxId === undefined) {
      reactAlert({ title: '알림', message: '첨부파일을 업로드해주세요.' });
      return;
    }

    reactConfirm({
      title: '알림',
      message:
        '과제 제출이 완료되었습니다. 채점이 완료되면 메일로 결과를 확인하실 수 있습니다.',
      onOk: () => setCubeLectureReport(),
    });
  }, []);

  const getFileBoxIdForReference = useCallback((depotId: string) => {
    const lectureReport = getLectureReport();
    const studentReport: StudentReport = lectureReport?.studentReport || {};
    studentReport.homeworkFileBoxId = depotId;
    lectureReport && (lectureReport.studentReport = studentReport);
    setLectureReport(lectureReport);
  }, []);

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
    <>
      <div className="course-detail-center">
        <div className="main-wrap">
          <div className="scrolling-area area2 ">
            <div className="ui segment full">
              {/* Header */}
              <div className="course-info-header">
                <Reportheader />
              </div>

              <div className="apl-form-wrap support">
                <Form>
                  <Form.Field>
                    <label>작성 가이드</label>
                    <div className="ui editor-wrap">
                      {getLectureReport()?.reportFileBox?.reportQuestion}
                    </div>
                  </Form.Field>
                  <Form.Field>
                    {getLectureReport()?.reportFileBox?.fileBoxId && (
                      <>
                        <div className="download-file">
                          <div className="btn-wrap">
                            <Button
                              icon
                              className="left icon-big-line2"
                              onClick={() =>
                                depot.downloadDepot(
                                  getLectureReport()?.reportFileBox
                                    ?.fileBoxId || ''
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
                      </>
                    )}
                    <div className="ui editor-wrap">
                      <Editor lectureReport={lectureReport} />
                    </div>
                  </Form.Field>
                  <Form.Field>
                    <label className="necessary">첨부파일</label>
                    <div className="report-attach">
                      {/* <AttachFileUpload filesMap={filesMap}/> */}
                      <div className="lg-attach">
                        <div className="attach-inner">
                          <FileBox
                            id={
                              getLectureReport()?.studentReport?.homeworkFileBoxId !==
                                null &&
                                getLectureReport()?.studentReport?.homeworkFileBoxId !==
                                'null'
                                ? getLectureReport()?.studentReport?.homeworkFileBoxId
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
                  </Form.Field>
                </Form>
              </div>
              {/* form 태그를 div로 감싸기 */}
              {getLectureReport()?.studentReport?.homeworkOperatorComment && (
                <div className="apl-form-wrap support">
                  <Form>
                    {/* margin-none 클래스 추가 */}
                    <Form.Field className="margin-none">
                      <label>담당자의견</label>
                      <div className="ui editor-wrap">
                        <div className="content-area">
                          <div className="content-inner ql-snow">
                            <div
                              className="ql-editor"
                              dangerouslySetInnerHTML={{
                                __html:
                                  getLectureReport()?.studentReport
                                    ?.homeworkOperatorComment || '',
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Form.Field>
                    {filesMap && (
                      <div className="badge-detail">
                        <div className="ov-paragraph download-area">
                          <List bulleted>
                            <List.Item>
                              <div className="detail">
                                <div className="file-down-wrap">
                                  {filesMap.get('reference') &&
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
                                          getLectureReport()?.studentReport
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
                    )}
                  </Form>
                </div>
              )}
              <div className="survey-preview">
                {getLectureReport()?.state !== 'Completed' && (
                  <button className="ui button fix bg" onClick={onSubmitClick}>
                    제출
                  </button>
                )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LectureReportView;
