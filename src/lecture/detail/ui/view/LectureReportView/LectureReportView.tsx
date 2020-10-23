import React from 'react';
import { Form, Icon, Button } from 'semantic-ui-react';
import Reportheader from './ReportHeader';
import Editor from './Editor';
import AttachFileUpload from './AttachFileUpload';
import { LectureReport } from '../../../viewModel/LectureReport';

interface LectureReportViewProps {
  lectureStructure: LectureReport;
}

const LectureReportView: React.FC<LectureReportViewProps> = function LectureReportView({
  lectureStructure,
}) {
  return (
    <div className="course-info-detail responsive-course">
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
                    <label>주제</label>
                    <div className="ui editor-wrap">
                      현재 전 세계 반도체 회사들은 뜨거운 성능 경쟁을 벌이고
                      있어요. 특히 2020년 연말 – 2021년 연초 정도에 신제품들이
                      대거 쏟아질 것으로 예상되고 있죠. 먼저 CPU 쪽을 볼까요?
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <label>작성</label>
                    <div className="ui editor-wrap">
                      <Editor />
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <label>첨부파일</label>
                    <div className="download-file">
                      <div className="btn-wrap">
                        <Button icon className="left icon-big-line2">
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
