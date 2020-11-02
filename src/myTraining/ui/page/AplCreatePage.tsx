import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { reactAutobind, reactAlert, mobxHelper } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';
import { Breadcrumb, Button, Container, Form, Header } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { ContentLayout } from 'shared';
import AplService from '../../present/logic/AplService';
import { AplState } from '../../model/AplState';
import { AplType } from '../../model/AplType';
import AlertWin from '../../../shared/ui/logic/AlertWin';
import SelectType from '../../model/SelectType';
import { APL_FOCUS_MAP } from '../../model/AplValidationData';
import SharedService from '../../../shared/present/logic/SharedService';
import { AplModel } from '../../model';
import AplCreateContainer from '../logic/AplCreateContainer';

interface Props
  extends RouteComponentProps<{ cineroomId: string; aplType: string }> {
  aplService?: AplService;
  aplId?: string;
  apl?: AplModel;
  sharedService?: SharedService;
}

interface States {
  tags: string;
  alertWinOpen: boolean;
  alertIcon: string;
  alertTitle: string;
  alertType: string;
  alertMessage: string;

  //confirmWinArrangeOpen: boolean;
  //isSaveAndApprove: boolean;

  saveAplOn: boolean;
  focusControlName: string;

  objStr: string;
  focusYn: string;
}

@inject('aplService', 'sharedService')
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
      //isSaveAndApprove: false,
      saveAplOn: false,
      focusControlName: '',
      objStr: '',
      focusYn: '',
    };
  }

  componentDidMount(): void {
    this.init();
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

  //초기화 버튼 클릭 시
  defaultInit() {
    //this.findAllArrangesTree();
    // apl 초기화
    // 인기 권장 신규 편성 없이 default -- ing
    const { apl } = this.props.aplService || ({} as AplService);
  }

  // 화면 처음 진입 시
  init() { }

  routeToAplConfirm() {
    const { aplQuery } = this.props.aplService!;
    //let message = '';

    const title = 'Apl';
    /*
    if (aplQuery.type === AplType.Rqd) {
      title = '권장 과정';
    } else if (aplQuery.type === AplType.Pop) {
      title = '인기 과정';
    } else if (aplQuery.type === AplType.New) {
      title = '신규 과정';
    }
    */
    /*
    message =
      title +
      ' 편성 List 화면으로 이동하시겠습니까?\n' +
      title +
      ' 편성 화면으로 이동 시 입력된 정보는 저장되지 않습니다.';
    */
    const aplMessageList = (
      <>
        <p className="center"> {title} 편성 List 화면으로 이동하시겠습니까?</p>
        <p className="center">
          {' '}
          {title} 편성 화면으로 이동 시 입력된 정보는 저장되지 않습니다.
        </p>
      </>
    );

    this.confirmList(aplMessageList);
    this.setState({
      objStr: '',
      focusYn: 'N',
    });
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
    //aplService.changeAplProps(name, value);
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
      alertMessage: message,
      alertWinOpen: true,
      alertTitle: '필수 정보 입력 안내',
      alertIcon: 'triangle',
      alertType: '안내',
    });
  }

  confirmSaveCheck(message: string | any) {
    //
    /*
    reactAlert({ title: '저장 안내', message: message });
    */

    this.setState({
      alertMessage: message,
      alertWinOpen: true,
      alertTitle: '저장 안내',
      alertIcon: 'triangle',
      alertType: '안내',
    });
  }

  confirmTempSave(message: string | any, mode: string | any) {
    //
    /*
    reactAlert({ title: '저장 안내', message: message });
    */

    this.setState({
      alertMessage: message,
      alertWinOpen: true,
      alertTitle: '임시 저장 안내',
      alertIcon: 'circle',
      alertType: mode,
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
      alertTitle: '저장 안내',
      alertIcon: 'circle',
      alertType: mode,
    });
  }

  confirmList(message: string | any) {
    //
    /*
    reactAlert({ title: '저장 안내', message: message });
    */

    this.setState({
      alertMessage: message,
      alertWinOpen: true,
      alertTitle: '안내',
      alertIcon: 'circle',
      alertType: 'list',
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
      alertWinOpen: false,
      focusYn: '',
    });
  }
  /*
  handleCloseCheckAlertWinFocus() {
    //
    //this.onChangeAplProps('state', AplState.Init);
    this.setState({
      alertWinOpen: false,
    });
    const objStr = this.state.objStr;
    this.setFocusControl(objStr);
  }
  */
  /*
  handleCloseConfirmWinArrange() {
    //
    this.setState({
      confirmWinArrangeOpen: false,
    });
  }
  */

  handleOKConfirmWinApl(mode?: string) {
    //
    const { apl, aplQuery } = this.props.aplService!;
    const { aplService } = this.props;

    //SAVE 진행 중 체크
    if (!this.state.saveAplOn) {
      this.setState({ saveAplOn: true });

      // aplService
      //   .saveApl(apl, mode && mode)
      //   .then(() => this.clearAll())
      //   .then(() => this.routeToAplList())
      //   .finally(() => {
      //     this.setState({ saveAplOn: false });
      //   });
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

  async handleSave(mode?: string) {
    //
    const { apl, aplQuery } = this.props.aplService!;
    const { aplId } = this.props;
    const { state } = apl;

    //기본정보 입력항목 체크(노출정보의 아이콘 항목 포함)
    const aplObject = AplModel.isBlank(apl);
    /*
    let aplMessage =
      '"' +
      aplObject +
      '" 은 필수 입력 항목입니다. 해당 정보를 입력하신 후 저장해주세요.';
    */
    const aplMessageList = (
      <>
        <p className="center">{aplObject} 은 필수 입력 항목입니다.</p>
        <p className="center">해당 정보를 입력하신 후 저장해주세요.</p>
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

    if (apl.period.endDateNumber < apl.period.startDateNumber) {
      const aplMessageList = (
        <>
          <p className="center">
            {' '}
            노출기간의 종료일자는 시작일과 같거나 이후여야 합니다.
          </p>
        </>
      );
      this.confirmSaveCheck(aplMessageList);
      this.setState({
        objStr: '편성종료일자',
        focusYn: 'Y',
      });

      /*
      reactAlert({
        title: '알림',
        message: '노출기간의 종료일자는 시작일과 같거나 이후여야 합니다.',
        onClose: () => this.setFocusControl('편성종료일자'),
      });
      */
      return;
    }

    if (aplObject === 'success') {
      /*
      if (state === AplState.Init) {
        this.setState({ confirmWinArrangeOpen: true, isSaveAndApprove: true });
        return;
      }
      */
      //let message = '';
      const title = 'APL';
      let aplMessageList = null;

      this.confirmSaveCheck(aplMessageList);
      this.setState({
        objStr: '',
        focusYn: 'N',
      });
      //message = '입력된 내용으로 '+title+' 승인요청 하시겠습니까?';
      aplMessageList = (
        <>
          <p className="center">
            {' '}
            입력된 내용으로 {title} 승인요청 하시겠습니까?
          </p>
        </>
      );
      this.confirmSave(aplMessageList, mode);
    }

    this.onChangeAplProps('state', AplState.Opened);
    //this.handleOKConfirmWinApl();
  }

  handleAlertOk(type: string) {
    //
    if (type === 'modify') {
      this.handleOKConfirmWinApl('modify');
    }
    if (type === '안내') this.handleCloseAlertWin();
    if (type === 'save') {
      this.handleOKConfirmWinApl('save');
    }
    if (type === 'list') this.routeToAplList();
    //if (type === 'checkAlert') this.handleCloseCheckAlertWinFocus();
  }

  setFocusControl(aplBlankField: string) {
    if (APL_FOCUS_MAP[aplBlankField]) {
      this.setState({ focusControlName: APL_FOCUS_MAP[aplBlankField] });
    }
  }

  onResetFocusControl() {
    this.setState({ focusControlName: '' });
  }

  render() {
    const { aplService } = this.props;
    const {
      tags,
      alertWinOpen,
      alertMessage,
      alertIcon,
      alertTitle,
      alertType,
      focusControlName,
    } = this.state;
    const { apl, aplQuery, aplSectionsSelectType } =
      this.props.aplService || ({} as AplService);
    const { aplId } = this.props;
    const message = (
      <>
        <p className="center">입력하신 개인학습을 저장하시겠습니까?</p>
      </>
    );
    const AplType = apl && apl.type;
    const AplState = apl && apl.state;
    return (
      <ContentLayout className="no-padding">
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
          onChangeAplProps={this.onChangeAplProps}
          //AplModel={apl}
          aplService={aplService}
          focusControlName={focusControlName}
          onResetFocusControl={this.onResetFocusControl}
        />
      </ContentLayout>
    );
  }
}

//export default withRouter(AplCreatePage);
export default inject(mobxHelper.injectFrom('aplService', 'sharedService'))(
  withRouter(observer(AplCreatePage))
);
