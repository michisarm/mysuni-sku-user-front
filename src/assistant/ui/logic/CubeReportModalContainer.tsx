import React from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { FileBox, PatronType } from '@nara.drama/depot';
import { StudentService } from '../../../lecture/shared';

interface Props {
  studentService ?: StudentService
  downloadReport: (fileBoxId: string) => void
  downloadFileBoxId: string
  rollBookId: string

  trigger?: React.ReactNode
  onSaveCallback?:() => void
}

interface States {
  open: boolean
}

@inject(mobxHelper.injectFrom(
  'lecture.studentService',
))
@observer
@reactAutobind
class CubeReportModalContainer extends React.Component<Props, States> {

  state= {
    open: false,
  };

  onOpenModal() {
    this.setState({
      open: true,
    }, this.init);
  }

  onCloseModal() {
    this.setState({
      open: false,
    });
  }

  init() {
    const { rollBookId, studentService } = this.props;
    if (studentService && rollBookId) {
      studentService.findStudentByRollBookId(rollBookId);
    }
  }

  onSaveModal() {
    const { studentService, onSaveCallback } = this.props;
    const { student } = this.props.studentService || {} as StudentService;
    const { id: studentId } = student!;
    if (studentId && student) {
      studentService!.modifyStudentForCoursework(studentId, student.homeworkFileBoxId)
        .then(() => this.onCloseModal());
      if (onSaveCallback) onSaveCallback();
    }
  }

  getFileBoxIdForReference(depotId: string) {
    //
    const { studentService } = this.props;
    if (studentService) studentService.setStudentProp('homeworkFileBoxId', depotId);
  }

  render() {
    //
    const { open } = this.state;
    const { downloadReport, downloadFileBoxId, trigger } = this.props;
    const { student } = this.props.studentService || {} as StudentService;

    return (
      <Modal
        open={open}
        onOpen={this.onOpenModal}
        onClose={this.onCloseModal}
        trigger={trigger}
        className="base w700"
      >
        <Modal.Header>
          Report
        </Modal.Header>
        <Modal.Content>
          <div className="scrolling-80vh">
            <div className="content-wrap1">
              <div className="table-css type1 type4">
                <div className="row">
                  <div className="cell th"><span className="dot">Step 01</span></div>
                  <div className="cell">
                    <div className="text2">Report Template Download</div>
                    <span className="text1">아래 버튼으로 등록되어 있는 Report 파일을 다운로드 받으세요.</span>
                    <span className="text5">
                      <Button icon className="left icon-big-line2" onClick={() => downloadReport(downloadFileBoxId)}>
                        <Icon className="download2" /><span>Report Download</span>
                      </Button>
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="cell"><span className="dot">Step 02</span></div>
                  <div className="cell">
                    <div className="text2">Report Upload</div>
                    <span className="text1">다운로드 받은 파일의 내용을 작성하신 후 업로드 해주세요.<br />등록하신 파일은 재 등록할 수 없으니 등록 시 주의해주세요.</span>
                    <div className="line-attach">
                      <div className="attach-inner">
                        <FileBox
                          id={student && student.homeworkFileBoxId || ''}
                          vaultKey={{ keyString: 'sku-depot', patronType: PatronType.Pavilion }}
                          patronKey={{ keyString: 'sku-denizen', patronType: PatronType.Denizen }}
                          // validations={[{ type: ValidationType.Duplication, validator: DepotUtil.duplicationValidator }]}
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
          <Button className="pop2 d" onClick={this.onCloseModal}>Cancel</Button>
          <Button className="pop2 p" onClick={this.onSaveModal}>Submit</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default CubeReportModalContainer;
