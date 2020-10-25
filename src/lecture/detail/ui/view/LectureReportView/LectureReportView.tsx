import React from 'react';
import { Form, Icon, Button } from 'semantic-ui-react';
import Reportheader from './ReportHeader';
import Editor from './Editor';
import AttachFileUpload from './AttachFileUpload';
import { LectureReport, StudentReport } from '../../../viewModel/LectureReport';
import depot, { FileBox, ValidationType } from '@nara.drama/depot';
import { PatronType } from '@nara.platform/accent';
import { depotHelper } from 'shared';

// 개발 참고 데이터 주석 - 차후 삭제
// cube 개발화면        :  http://localhost:3000/lecture/cineroom/ne1-m2-c2/college/CLG00001/cube/CUBE-2jd/lecture-card/LECTURE-CARD-26t/report
// cube 개발화면 관리자  : http://ma.mysuni.sk.com/manager/cineroom/ne1-m2-c2/learning-management/cubes/cube-detail/CUBE-2jd/Video
// cube 원본 화면 참조 :   http://ma.mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00001/course-plan/COURSE-PLAN-d5/Course/C-LECTURE-7d

// http://ma.mysuni.sk.com/api/depot/vaultFile/flow/combine/ 파일 업로드 API 호출시 에러 http://ma.mysuni.sk.com report Upload 에서도 에러

interface LectureReportViewProps {
  lectureReport: LectureReport;
  setLectureReport:(reportValue:LectureReport) => void;
}

const LectureReportView: React.FC<LectureReportViewProps> = function LectureReportView({
  lectureReport,
  setLectureReport
}) {

  // AS-IS 붙여봄 
  function getFileBoxIdForReference(depotId: string) {
    //
      //TODO : 코드 리뷰 후 개선 필요
      const studentReport: StudentReport = lectureReport.studentReport||{};
      studentReport.homeworkFileBoxId= depotId;
      lectureReport.studentReport = studentReport;
      setLectureReport(lectureReport);
  }



  return (
    <div className="course-info-detail responsive-course">
      <div className="course-detail-center">
        <div className="main-wrap">
          <div className="scrolling-area area2 ">
            <div className="ui segment full">
              {/* Header */}
              <div className="course-info-header">
                <Reportheader lectureReport = {lectureReport} />
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
                      <Editor lectureReport = {lectureReport} setLectureReport = {setLectureReport} />
                    </div>
                  </Form.Field>
                  {/*TODO : 첨부파일이 없는 경우도 있는지 확인, 없는 경우의 처리 방법 문의  */}
                  <Form.Field>
                    <label>첨부파일</label>
                    <div className="download-file">
                      <div className="btn-wrap">
                        <Button icon className="left icon-big-line2" onClick={() => depot.downloadDepot(lectureReport?.reportFileBox?.fileBoxId||'')}>
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
                <AttachFileUpload />
                {/* AS-IS 호출 하여 붙여봄 변경 예정 */}
                <FileBox
                  // id={lectureReport?.studentReport?.homeworkFileBoxId || ''}
                  id={lectureReport?.reportFileBox?.fileBoxId || ''}
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
              </div>

              <div className="survey-preview">
                <button className="ui button fix line">저장</button>
                <button className="ui button fix bg">제출</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureReportView;
