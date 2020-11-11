import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { reactAutobind, reactAlert, mobxHelper } from '@nara.platform/accent';
import { MemberViewModel } from '@nara.drama/approval';
import { patronInfo } from '@nara.platform/dock';
import { Breadcrumb, Button, Container, Form, Header, Segment } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import AplService from 'myTraining/present/logic/AplService';
import { ContentLayout } from 'shared';
import { AplState } from '../../model/AplState';
import { APL_FOCUS_MAP } from '../../model/AplValidationData';
import SharedService from '../../../shared/present/logic/SharedService';
import AplCreateContainer from '../logic/AplCreateContainer';
import AlertWin from '../../../shared/ui/logic/AlertWin';
import AlertWin2 from '../../../shared/ui/logic/AlertWin2';
import { AplModel } from '../../model';
import routePaths from '../../routePaths';

interface Props
  extends RouteComponentProps<{ cineroomId: string; aplType: string }> {
  aplService?: AplService;
  aplId?: string;
  apl?: AplModel;
  sharedService?: SharedService;
  handleOk?: (member: MemberViewModel) => void
}

interface States {
  tags: string;
  alertWinOpen: boolean;
  alertIcon: string;
  alertTitle: string;
  alertType: string;
  alertMessage: string;
  alertWinOpen2: boolean;
  alertIcon2: string;
  alertTitle2: string;
  alertType2: string;
  alertMessage2: string;

  //confirmWinArrangeOpen: boolean;
  //isSaveAndApprove: boolean;

  saveAplOn: boolean;
  focusControlName: string;

  objStr: string;
  focusYn: string;
}

@inject(mobxHelper.injectFrom(
  'myTraining.aplService', 'shared.sharedService'))
@observer
@reactAutobind
class AplCreatePage extends React.Component<Props, States> {
  //
  constructor(props: Props) {
    super(props);
    this.state = {
      tags: '',
      alertWinOpen: false,
      //confirmWinArrangeOpen: false,
      alertMessage: '',
      alertIcon: '',
      alertTitle: '',
      alertType: '',
      alertWinOpen2: false,
      //confirmWinArrangeOpen: false,
      alertMessage2: '',
      alertIcon2: '',
      alertTitle2: '',
      alertType2: '',
      //isSaveAndApprove: false,
      saveAplOn: false,
      focusControlName: '',
      objStr: '',
      focusYn: '',
    };
  }

  componentDidMount(): void {
    document.body.classList.add('white');
    this.init();
  }

  componentWillUnmount() {
    //
    document.body.classList.remove('white');
  }
  /*
  clearAll() {
    //
    const { aplService  } = this.props;
    if ( aplService ) {
      aplService.clearApl();
      aplService.clearMenuArrange();
      aplService.clearMenuArranges();
    }
  }
  */

  // 화면 처음 진입 시
  init() {
    // 승인자 조회 ADD

  }

  routeToAplList() {
    //
    //APL 등록 화면으로 이동하시겠습니까?
    //APL 등록 화면으로 이동 시 입력된 정보는 저장되지 않습니다.

    const { aplService, sharedService, aplId } = this.props;
    const { aplType } = this.props.match.params;
    const { aplQuery, apl } = this.props.aplService || ({} as AplService);
    let aplTypeUpper = '';
    if (aplType !== null && aplType !== '') {
      aplTypeUpper = aplType.toUpperCase();
    }
    if (sharedService && aplService) {
      Promise.resolve()
        .then(() => aplService.clearApl())
        .then(() => {
          this.props.history.push(`/my-training/learning/InProgress/pages/1`);
        })
        .then(() => {
          sharedService.setCount('arrange', aplService.apls.totalCount || 0);
        });
    }
  }

  onChangeAplProps(name: string, value: string | number | {} | [] | undefined) {
    //
    const { aplService } = this.props;
    if (aplService) aplService.changeAplProps(name, value);
  }

  confirmBlank(message: string | any, aplBlankField: string) {
    //confirmBlank(message: string, aplBlankField: string) {
    //
    /*
    reactAlert({
      title: '필수 정보 입력 안내',
      message,
      onClose: () => this.setFocusControl(aplBlankField),
    });
    */
    this.setState({
      alertMessage2: message,
      alertWinOpen2: true,
      alertTitle2: '필수 정보 입력 안내',
      alertIcon2: 'triangle',
      alertType2: '안내',
    });
  }

  confirmSaveCheck(message: string | any) {
    //
    /*
    reactAlert({ title: '저장 안내', message: message });
    */

    this.setState({
      alertMessage2: message,
      alertWinOpen2: true,
      alertTitle2: '요청 정보 입력 안내',
      alertIcon2: 'triangle',
      alertType2: '안내',
    });
  }

  confirmSave(message: string | any, mode: string | any) {
    //
    /*
    reactAlert({ title: '저장 안내', message: message });
    */

    this.setState({
      alertMessage: message,
      alertWinOpen: true,
      alertTitle: '승인 요청 안내',
      alertIcon: 'circle',
      alertType: mode,
    });
  }

  confirmList(message: string | any) {
    //
    this.setState({
      alertMessage: message,
      alertWinOpen: true,
      alertTitle: '안내',
      alertIcon: 'circle',
      alertType: 'list',
    });
  }

  handleCloseSaveWin() {
    //
    this.onChangeAplProps('state', AplState.Created);
    if (this.state.focusYn === 'Y') {
      const objStr = this.state.objStr;
      this.setFocusControl(objStr);
    }
    this.setState({
      alertWinOpen: false,
      focusYn: '',
    });
  }

  handleCloseAlertWin() {
    //
    this.onChangeAplProps('state', AplState.Created);
    if (this.state.focusYn === 'Y') {
      const objStr = this.state.objStr;
      this.setFocusControl(objStr);
    }
    this.setState({
      alertWinOpen2: false,
      focusYn: '',
    });
  }

  handleOKConfirmWinApl() {
    //
    const { apl } = this.props.aplService!;
    const { aplService } = this.props;

    //SAVE 진행 중 체크
    if (!this.state.saveAplOn) {
      this.setState({ saveAplOn: true });

      aplService!
        .saveApl(apl)
        .then(() => this.clearAll())
        /*.then(() => this.routeToAplList())*/
        .finally(() => {
          this.setState({ saveAplOn: false });
          this.setState({
            alertWinOpen: false,
            focusYn: '',
          });
        });
    }
  }

  async clearAll() {
    //
    const { aplService } = this.props;
    if (aplService) {
      //await aplService.clearAplQueryModel();
      await aplService.clearApl();
    }
  }

  async handleSave(mode: string) {
    //
    const { apl } = this.props.aplService!;

    //기본정보 입력항목 체크
    const aplObject = AplModel.isBlank(apl);
    let aplMessageList = (
      <>
        <p className="center">{aplObject} 은(는) 필수 입력 항목입니다.</p>
        <p className="center">해당 정보를 입력하신 후 승인 요청 해주세요.</p>
      </>
    );
    this.setState({
      objStr: aplObject,
      focusYn: 'Y',
    });

    if (aplObject !== 'success') {
      //this.confirmBlank(aplMessage, aplObject);
      this.confirmBlank(aplMessageList, aplObject);
      return;
    }

    if (apl.period.endDateLong < apl.period.startDateLong) {
      aplMessageList = (
        <>
          <p className="center">
            {' '}
            교육 종료일자는 시작일과 같거나 이후여야 합니다.
          </p>
        </>
      );
      this.confirmSaveCheck(aplMessageList);
      this.setState({
        objStr: '교육종료일자',
        focusYn: 'Y',
      });

      return;
    }

    if (aplObject === 'success') {

      this.setState({
        objStr: '',
        focusYn: 'N',
      });
      //message = '입력된 내용으로 '+title+' 승인요청 하시겠습니까?';
      aplMessageList = (
        <>
          <p className="center">
            {' '}
            입력된 내용으로 개인학습 정보를 승인 요청하시겠습니까?
          </p>
          <p className="center">
            {' '}
            승인 요청 후에는 개인학습 정보를 변경하실 수 없습니다.
          </p>
        </>
      );
      this.confirmSave(aplMessageList, mode);
    }

    this.onChangeAplProps('state', AplState.OpenApproval);
  }

  handleCancel(mode?: string) {
    const aplMessageList = (
      <>
        <p className="center">
          {' '}
          개인학습 정보 등록을 취소하시겠습니까?
        </p>
        <p className="center">
          {' '}
          취소 시 입력했던 정보는 저장되지 않습니다.
        </p>
      </>
    );
    this.confirmList(aplMessageList);
    this.setState({
      objStr: '',
      focusYn: 'N',
    });
  }

  handleSaveOk(type: string) {
    //
    if (type === 'save') this.handleOKConfirmWinApl();
    if (type === 'list') this.routeToArrangeList();
  }

  handleAlertOk(type: string) {
    //
    if (type === '안내') this.handleCloseAlertWin();
  }

  setFocusControl(aplBlankField: string) {
    if (APL_FOCUS_MAP[aplBlankField]) {
      this.setState({ focusControlName: APL_FOCUS_MAP[aplBlankField] });
    }
  }

  onResetFocusControl() {
    this.setState({ focusControlName: '' });
  }

  onChangeAplPropsValid(name: string, value: string) {
    //
    const { aplService } = this.props;
    //const invalid = value.length > 30;
    //const invalid = Number(this.byteCheck(value)) > 30;
    const invalid = value.length > 100;
    const invalidHour = Number(value) < 0;
    const invalidMin = Number(value) > 59 || Number(value) < 0;
    const invalidContent = value.length > 1000;
    if(name === 'title' || name ==='typeName' || name === 'institute'){
      if (invalid) {
        return;
      }
    }

    if(name === 'requestHour'){
      if(this.timeValid(name, value)){
        return;
      }
      if (invalidHour) {
        return;
      }
    }

    if(name === 'requestMinute'){
      if(this.timeValid(name, value)){
        return;
      }
      if (invalidMin) {
        return;
      }
    }

    if(name === 'content'){
      if (invalidContent) {
        return;
      }
    }

    if (aplService) aplService.changeAplProps(name, value);
  }

  timeValid( name: string, value: string ) {
    //
    const { aplService } = this.props;
    if(isNaN(Number(value))){
      const newValue = value.replace(/[^0-9]/g, '');
      if (aplService)aplService.changeAplProps(name, newValue);
      return true;
    }
    return false;
  }

  handleOK(member: MemberViewModel) {
    //
    const { handleOk } = this.props;

    //SAVE 진행 중 체크
    if (handleOk) {
      handleOk(member);
    }
  }

  //learning - 개인학습완료 이동
  routeToArrangeList() {
    this.props.history.push(routePaths.myPageLearningTab('PersonalCompleted'));
  }

  render() {
    const { aplService, handleOk } = this.props;
    const {
      tags,
      alertWinOpen,
      alertMessage,
      alertIcon,
      alertTitle,
      alertType,
      alertWinOpen2,
      alertMessage2,
      alertIcon2,
      alertTitle2,
      alertType2,
      focusControlName,
    } = this.state;

    return (
      <ContentLayout breadcrumb={[{ text: '개인학습' },{ text: 'Create' }]}>
        <div className="add-personal-learning">
          <div className="add-personal-learning-wrap">
            <div className="apl-tit">개인학습</div>
            <div className="apl-notice">
              ‘mySUNI / 각 사 교육’ 외 개인적으로 학습하였을 경우, <br />
              승인권자의 확인 후 학습시간으로 등록 할 수 있습니다.
            </div>
          </div>
        </div>
        <AplCreateContainer
          //aplId={aplId}
          //onChangeAplProps={this.onChangeAplProps}
          //AplModel={apl}
          focusControlName={focusControlName}
          onChangeAplPropsValid={this.onChangeAplPropsValid}
          onResetFocusControl={this.onResetFocusControl}
          //onGetFileBoxIdForApl={this.getFileBoxIdForApl}
          handleOk={this.handleOK}
          handleSave={this.handleSave}
          handleCancel={this.handleCancel}
        />
        <AlertWin
          message={alertMessage}
          handleClose={this.handleCloseSaveWin}
          open={alertWinOpen}
          alertIcon={alertIcon}
          title={alertTitle}
          type={alertType}
          handleOk={this.handleSaveOk}
        />
        <AlertWin2
          message={alertMessage2}
          handleClose={this.handleCloseAlertWin}
          open={alertWinOpen2}
          alertIcon={alertIcon2}
          title={alertTitle2}
          type={alertType2}
          handleOk={this.handleAlertOk}
        />
      </ContentLayout>
    );
  }
}
export default withRouter(AplCreatePage);
