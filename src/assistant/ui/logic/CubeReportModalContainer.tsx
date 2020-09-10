import React from 'react';
import { reactAutobind, mobxHelper, reactConfirm } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { FileBox, PatronType, ValidationType } from '@nara.drama/depot';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { depotHelper } from 'shared';
import { StudentService } from 'lecture/stores';
import LectureViewModel from '../../../lecture/model/LectureViewModel';

interface Props {
  studentService?: StudentService;
  downloadReport: (fileBoxId: string) => void;
  downloadFileBoxId: string;
  rollBookId: string;

  trigger?: React.ReactNode;
  onSaveCallback?: () => void;
  lectureView?: LectureViewModel;
}

interface States {
  open: boolean;
}

@inject(mobxHelper.injectFrom('lecture.studentService'))
@observer
@reactAutobind
class CubeReportModalContainer extends React.Component<Props, States> {
  state = {
    open: false,
  };

  onOpenModal() {
    this.setState({
      open: true,
    });

    this.init();
  }

  onCloseModal() {
    const { studentService } = this.props;

    this.setState({
      open: false,
    });

    // 기존의 student homeworkFileboxId 를 clear 해야 함. // by rlaehdrn123
    studentService!.clear();
  }

  /* 
    1. LectureCardPage 에서는 rollBookId가 넘어오나, CoursePage 에서는 넘어오지 않음.
    2. rollBookId로 student 조회해야 함.
    3. CoursePage의 경우, 전달 받은 lectureView를 통해 lecture에 해당하는 rollBookId 를 가져옴.
    4. lectureView 는 coursePage 에서만 전달 됨.
  */
  async init() {
    const { studentService, lectureView } = this.props;
    let { rollBookId } = this.props;

    // rollBookId 가 있을 경우 :: from LectureCardPage
    if (rollBookId) {
      studentService!.findStudentByRollBookId(rollBookId);
      return;
    }
    // rollBookId 가 없는 경우 :: from CoursePage
    if (!rollBookId && lectureView) {
      rollBookId = lectureView.rollBooks[0].id;
    }
    studentService!.findStudentByRollBookId(rollBookId);
  }

  onSaveModal() {
    const { studentService, onSaveCallback } = this.props;
    const { student } = this.props.studentService || ({} as StudentService);
    const { id: studentId, homeworkFileBoxId } = student;

    if (student && studentId) {
      studentService!
        .modifyStudentForCoursework(studentId, homeworkFileBoxId)
        .then(() => this.onCloseModal());
      if (onSaveCallback) onSaveCallback();
    }
  }

  getFileBoxIdForReference(depotId: string) {
    //
    const { studentService } = this.props;
    if (studentService) {
      studentService.setStudentProp('homeworkFileBoxId', depotId);
    }
  }

  onSubmitClick() {
    reactConfirm({
      title: '알림',
      message:
        '과제 제출이 완료되었습니다. 채점이 완료되면 메일로 결과를 확인하실 수 있습니다.',
      onOk: () => this.onSaveModal(),
    });
  }

  render() {
    //
    const { open } = this.state;
    const { downloadReport, downloadFileBoxId, trigger } = this.props;
    const { student } = this.props.studentService || ({} as StudentService);

    return (
      <Modal
        open={open}
        onOpen={this.onOpenModal}
        onClose={this.onCloseModal}
        trigger={trigger}
        className="base w700"
      >
        <Modal.Header>Report</Modal.Header>
        <Modal.Content>
          <div className="scrolling-80vh">
            <div className="content-wrap1">
              <div className="table-css type1 type4">
                <div className="row">
                  <div className="cell th">
                    <span className="dot">Step 01</span>
                  </div>
                  <div className="cell">
                    <div className="text2">Report Template Download</div>
                    <span className="text1">
                      아래 버튼으로 등록되어 있는 Report 파일을 다운로드
                      받으세요.
                    </span>
                    <span className="text5">
                      <Button
                        icon
                        className="left icon-big-line2"
                        onClick={() => downloadReport(downloadFileBoxId)}
                      >
                        <Icon className="download2" />
                        <span>Report Download</span>
                      </Button>
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="cell">
                    <span className="dot">Step 02</span>
                  </div>
                  <div className="cell">
                    <div className="text2">Report Upload</div>
                    <span className="text1">
                      다운로드 받은 파일의 내용을 작성하신 후 업로드 해주세요.
                      <br />
                      등록하신 파일은 재 등록할 수 없으니 등록 시 주의해주세요.
                    </span>
                    <div className="line-attach">
                      <div className="attach-inner">
                        <FileBox
                          id={(student && student.homeworkFileBoxId) || ''}
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
                          onChange={this.getFileBoxIdForReference}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions2">
          <Button className="pop2 d" onClick={this.onCloseModal}>
            Cancel
          </Button>
          <Button className="pop2 p" onClick={this.onSubmitClick}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default CubeReportModalContainer;
