import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { reactAutobind, reactAlert } from '@nara.platform/accent';
import moment from 'moment';
import { patronInfo } from '@nara.platform/dock';
import { Button, Container, Form, Breadcrumb, Header } from 'semantic-ui-react';
import { AplService, AplModel } from '../../index';
import AplDetailView from '../view/AplDetailView';
import AplBasicInfoContainer from '../view/AplBasicInfoContainer';
import { AplState } from '../../model/AplState';
import { AplType } from '../../model/AplType';
import { APL_FOCUS_MAP } from '../../model/AplValidationData';
import AlertWin from '../../../shared/ui/logic/AlertWin';
import SharedService from '../../../shared/present/logic/SharedService';

interface Props
  extends RouteComponentProps<{
    cineroomId: string;
    aplId: string;
    aplState: string;
    aplType: string;
  }> {
  aplService: AplService;
  //menuMain: AplModel
  //menuApl: MenuAplModel
  //aplId?: number
  //AplType: string
  onChangeAplProps: (name: string, value: string | {} | []) => void;
  sharedService?: SharedService;
}

interface States {
  pageIndex: number;

  tags: string;
  alertWinOpen: boolean;
  alertIcon: string;
  alertTitle: string;
  alertType: string;
  alertMessage: string;

  //confirmWinAplOpen: boolean;
  //isSaveAndApprove: boolean;
  saveAplOn: boolean;
  focusControlName: string;

  objStr: string;
  focusYn: string;
}

@inject('AplService', 'sharedService')
@observer
@reactAutobind
class AplDetailContainer extends React.Component<Props, States> {
  //
  constructor(props: Props) {
    super(props);
    this.state = {
      pageIndex: 0,
      tags: '',
      alertWinOpen: false,
      //confirmWinAplOpen: false,
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

  componentDidUpdate(prevProps: Props) {
    const { aplId } = this.props.match.params;
    const { aplId: prevaplId } = prevProps.match.params;
    const { apl } = this.props.aplService || ({} as AplService);
    if (aplId !== prevaplId) {
      this.findApl();
    }
  }

  componentWillUnmount() {
    const { aplService } = this.props;
    if (aplService) {
      aplService.clearApl();
    }
  }

  init() {
    this.clearAll();
    this.findApl();
  }

  async findApl() {
    //
    const { aplService } = this.props;
    const { aplId } = this.props.match.params;
    if (aplId) {
      await aplService!.findApl(aplId);
    }
  }

  onChangeAplProps(name: string, value: string | number | {} | []) {
    //
    const { aplService } = this.props;
    if (aplService) aplService.changeAplsProps(name, value);
  }

  confirmBlank(message: string | any, aplBlankField: string) {
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
  /*

  confirmLength(message: string) {
    //
    this.setState({
      alertMessage: message,
      alertWinOpen: true,
      alertTitle: '저장 안내',
      alertIcon: 'triangle',
      alertType: '안내',
    });
  }
  */

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
    const { aplState } = this.props.match.params;
    //this.onChangeAplProps('state', AplState.Created);
    let aplStateUpper = '';
    if (aplState === AplState.Created.toLowerCase()) {
      aplStateUpper = AplState.Created;
    } else if (aplState === AplState.Opened.toLowerCase()) {
      aplStateUpper = AplState.Opened;
    } else if (aplState === AplState.Closed.toLowerCase()) {
      aplStateUpper = AplState.Closed;
    }
    //this.onChangeAplProps('state', AplState);
    this.onChangeAplProps('state', aplStateUpper);
    if (this.state.focusYn === 'Y') {
      const objStr = this.state.objStr;
      this.setFocusControl(objStr);
    }
    this.setState({
      alertWinOpen: false,
      focusYn: '',
    });
  }

  routeToAplConfirm() {
    const { aplQuery, apl } = this.props.aplService!;
    const { aplState } = this.props.match.params;
    let aplStateUpper = '';
    if (aplState === AplState.Created.toLowerCase()) {
      aplStateUpper = AplState.Created;
    } else if (aplState === AplState.Opened.toLowerCase()) {
      aplStateUpper = AplState.Opened;
    } else if (aplState === AplState.Closed.toLowerCase()) {
      aplStateUpper = AplState.Closed;
    }
    //let message = '';
    const title = 'APL';

    //if (AplState === AplState.Created) {
    /*
    if (aplStateUpper === AplState.Created) {
      message =
        title +
        '  List 화면으로 이동하시겠습니까?\n' +
        title +
        '  화면으로 이동 시 입력된 정보는 저장되지 않습니다.';
    } else {
      message = title + '  List 화면으로 이동하시겠습니까?';
    }
    */
    let aplMessageList = null;
    if (aplStateUpper === AplState.Created) {
      aplMessageList = (
        <>
          <p className="center">
            {' '}
            {title}  List 화면으로 이동하시겠습니까?
          </p>
          <p className="center">
            {' '}
            {title}  화면으로 이동 시 입력된 정보는 저장되지 않습니다.
          </p>
        </>
      );
    } else {
      aplMessageList = (
        <>
          <p className="center">
            {' '}
            {title}  List 화면으로 이동하시겠습니까?
          </p>
        </>
      );
    }

    this.confirmList(aplMessageList);
    this.setState({
      objStr: '',
      focusYn: 'N',
    });
  }

  routeToAplList() {
    //
    const { aplService, sharedService } = this.props;
    const { aplType } = this.props.match.params;
    const { apl } = this.props.aplService || ({} as AplService);
    let aplTypeUpper = '';
    if (aplType !== null && aplType !== '') {
      aplTypeUpper = aplType.toUpperCase();
    }
    if (sharedService && aplService) {
      aplService.changeAplSearchInit(false);
      aplService.changeAplQueryProps(
        'type',
        apl.type || aplTypeUpper
      );

      Promise.resolve()
        .then(() => aplService.clearApl())
        .then(() => aplService.clearApls())
        .then(() => {
          this.props.history.push(
            `/my-training/learning/add-personal-learning-create`
          );
        })
        .then(() => aplService.findAplsTreeByQuery())
        .then(() => {
          sharedService.setCount(
            'apl',
            aplService.apls.totalCount || 0
          );
        });
    }
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
  }

  async clearAll() {
    //
    const { aplService } = this.props;
    if (aplService) {
      await aplService.clearApl();
    }
  }

  handleOKConfirmWinApl(mode?: string) {
    //
    const { apl } =
      this.props.aplService || ({} as AplService);
    const { aplService } = this.props;

    //SAVE 진행 중 체크
    if (!this.state.saveAplOn) {
      this.setState({ saveAplOn: true });
      aplService
        .saveApl(apl, mode && mode)
        .then(() => this.clearAll())
        .then(() => this.routeToAplList())
        .finally(() => {
          this.setState({ saveAplOn: false });
        });
    }
  }

  async handleSave(mode?: string) {
    //
    const { apl, aplQuery } =
      this.props.aplService || ({} as AplService);
    const { aplId, aplType } = this.props.match.params;
    const { state } = apl;
    //const AplType = menuMain.AplType;

    //기본정보 입력항목 체크(노출정보의 아이콘 항목 포함)
    const aplObject = AplModel.isBlank(apl);
    /*
    let AplMessage =
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

    const toDateStart = moment(new Date()).startOf('day').toDate().getTime();
    if (apl.period.startDateNumber < toDateStart) {
      const aplMessageList = (
        <>
          <p className="center">
            {' '}
            노출기간의 시작일자는 오늘이거나 이후여야 합니다.
          </p>
        </>
      );
      this.confirmSaveCheck(aplMessageList);
      this.setState({
        objStr: '시작일자',
        focusYn: 'Y',
      });

      return;
    }

    if (apl.period.endDateNumber < apl.period.startDateNumber) {
      const aplMessageList = (
        <>
          <p className="center">
            {' '}
            종료일자는 시작일과 같거나 이후여야 합니다.
          </p>
        </>
      );
      this.confirmSaveCheck(aplMessageList);
      this.setState({
        objStr: '종료일자',
        focusYn: 'Y',
      });

      return;
    }

    if (aplObject === 'success') {
      //let message = '';
      const title = '개인학습';
      let menuMainMessageList = null;

      this.confirmSaveCheck(menuMainMessageList);
      this.setState({
        objStr: '',
        focusYn: 'N',
      });

      menuMainMessageList = (
        <>
          <p className="center">
            {' '}
            입력된 내용으로 {title} 정보를 저장 하시겠습니까?
          </p>
        </>
      );

      this.confirmSave(menuMainMessageList, mode);
    }

    this.onChangeAplProps('state', AplState.OpenApproval);
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
    const { aplState, aplType } = this.props.match.params;
    const {
      apl,
      aplQuery,
      aplSectionsSelectType,
    } = this.props.aplService || ({} as AplService);
    const { pageIndex } = this.state;
    const {
      tags,
      alertWinOpen,
      alertMessage,
      alertIcon,
      alertTitle,
      alertType,
      focusControlName,
    } = this.state;
    //const result = menuApls.results;

    let aplTypeUpper = '';
    if (aplType !== null && aplType !== '') {
      aplTypeUpper = aplType.toUpperCase();
    }

    return (
      <>
        <Container fluid>
          <div>
            <Breadcrumb
              icon="right angle"
              sections={aplSectionsSelectType}
            />
            <Header as="h2">
              개인 학습
            </Header>
          </div>
          <Form className="search-box">
            <AplBasicInfoContainer
              aplId={apl.id}
              onChangeAplProps={this.onChangeAplProps}
              //AplModel={menuMain}
              aplService={aplService}
              focusControlName={focusControlName}
              onResetFocusControl={this.onResetFocusControl}
            />
          </Form>

          <AplDetailView
            //menuMain={menuMain}
            //menuApls={result}
            onChangeAplProps={this.onChangeAplProps}
            aplType={apl.type}
            aplService={aplService}
          />

          <div className="btn-group">
            <Button onClick={this.routeToAplConfirm} type="button">
              목록
            </Button>
            <div className="fl-right">

              {((apl.state === AplState.OpenApproval ||
                apl.state === null) && (
                <>
                  <Button
                    basic
                    onClick={() => this.handleSave('reject')}
                    type="button"
                  >
                    반려
                  </Button>
                  <Button
                    primary
                    onClick={() => this.handleSave('save')}
                    type="button"
                  >
                    승인
                  </Button>
                </>
              )) ||
                null}
            </div>
          </div>

          <AlertWin
            message={alertMessage}
            handleClose={this.handleCloseAlertWin}
            open={alertWinOpen}
            alertIcon={alertIcon}
            title={alertTitle}
            type={alertType}
            handleOk={this.handleAlertOk}
          />
        </Container>
      </>
    );
  }
}

export default withRouter(AplDetailContainer);
