import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import {
  Button,
  TextArea,
  Form,
  Modal,
  Segment,
  Select,
  Icon,
  Grid,
  Ref,
} from 'semantic-ui-react';
import { FileBox2, PatronType, ValidationType } from '@nara.drama/depot';
import { MemberViewModel } from '@nara.drama/approval';
import moment, { Moment } from 'moment';
import DatePicker from 'react-datepicker';
import AplService from '../../present/logic/AplService';
import SelectType from '../../model/SelectType';
import { CollegeService } from '../../../college/stores';

import { depotHelper } from '../../../shared';
import ManagerListModalContainer from '../../../approval/member/ui/logic/ManagerListModalContainer';
import { ApprovalMemberModel } from '../../../approval/member/model/ApprovalMemberModel';
import { SkProfileService } from '../../../profile/stores';
import {
  CompanyApproverService,
  DepartmentService,
  MemberService,
} from '../../../approval/stores';
import SkProfileModel from '../../../profile/model/SkProfileModel';
import { DepartmentModel } from '../../../approval/department/model/DepartmentModel';
import { AplType } from '../../model/AplType';
import { AplApprovalType } from '../../model/AplApprovalType';
import { AplQueryModel } from '../../model/AplQueryModel';
import { AplModel } from '../../model';
import { CollegeLectureCountRdo } from '../../../lecture/model';
import { CollegeLectureCountService } from '../../../lecture/stores';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../lecture/model/LangSupport';

interface Props
  extends RouteComponentProps<{
    cineroomId: string;
    studentId: string;
    cubeType: string;
    cubeState: string;
  }> {
  skProfileService?: SkProfileService;
  memberService?: MemberService;
  companyApproverService?: CompanyApproverService;
  departmentService?: DepartmentService;
  aplService: AplService;
  onChangeAplPropsValid: (name: string, value: string) => void;
  onChangeAplTimePropsValid: (name: string, value: string | number) => void;
  apl?: AplModel;
  focusControlName?: string;
  onResetFocusControl?: () => void;
  collegeService?: CollegeService;
  queryModel?: AplQueryModel;
  handleOk: (member: MemberViewModel) => void;
  handleSave: (mode: string) => void;
  handleCancel: (mode?: string) => void;
  collegeLectureCountService?: CollegeLectureCountService;
}

interface States {
  collegeSelect: any;
}

@inject(
  mobxHelper.injectFrom(
    'myTraining.aplService',
    'shared.sharedService',
    'college.collegeService',
    'approval.memberService',
    'approval.companyApproverService',
    'approval.departmentService',
    'profile.skProfileService',
    'lecture.collegeLectureCountService'
  )
)
@observer
@reactAutobind
class AplCreateContainer extends React.Component<Props, States> {
  managerModal: any = null;

  private focusInputRefs: any = {
    title: React.createRef(),
    type: React.createRef(),
    typeName: React.createRef(),
    collegeId: React.createRef(),
    channelId: React.createRef(),
    institute: React.createRef(),
    requestHour: React.createRef(),
    requestMinute: React.createRef(),
    content: React.createRef(),
    startDate: React.createRef(),
    endDate: React.createRef(),
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      //open :  false,
      //titleWrite: '',
      //typeNameWrite: '',
      //instituteWrite: ''
      collegeSelect: [],
    };
  }

  //
  componentDidMount() {
    //const state = apl.state;

    const { queryModel, collegeService } = this.props;
    this.findAllColleges();
    if (collegeService && queryModel && queryModel.collegeId) {
      //SelectBox 호출
      collegeService.findMainCollege(queryModel.collegeId);
    }
    this.onSetWeek();
    this.setInputFocus();
    this.init();
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    const { aplService } = this.props;
    const { apl } = aplService;

    if (prevProps.apl && prevProps.apl.id !== apl.id) {
      this.onChangeAplProps(
        'period.startDateMoment',
        moment(apl.startDate).startOf('day')
      );
      this.onChangeAplProps(
        'period.endDateMoment',
        moment(apl.endDate).endOf('day')
      );
    }
    const { focusControlName } = this.props;
    if (focusControlName) {
      this.setInputFocus();
    }
  }

  init() {
    //
    const {
      skProfileService,
      departmentService,
      memberService,
      companyApproverService,
    } = this.props;
    skProfileService!
      .findSkProfile()
      .then((profile: SkProfileModel) =>
        departmentService!.findDepartmentByCode(profile.departmentCode)
      )
      .then((department: DepartmentModel) =>
        memberService!.findApprovalMemberByEmployeeId(department.managerId)
      )
      .then(() => companyApproverService!.findCompanyAplApprover())
      .then((companyAplApprover) =>
        memberService!.findApprovalMemberByEmployeeId(companyAplApprover.id)
      )
      .then((companyApprover) => {
        this.onChangeAplProps('approvalId', companyApprover.id);
        this.onChangeAplProps('approvalEmail', companyApprover.email);
        this.onChangeAplProps('approvalName', companyApprover.name);
        this.onChangeAplProps('approvalCompany', companyApprover.companyName);
        this.onChangeAplProps(
          'approvalDepartment',
          companyApprover.departmentName
        );
      });
  }

  async findAllColleges() {
    //
    const { collegeLectureCountService } = this.props;
    //const { collegeService } = this.props;
    //if (collegeService) collegeService.findCollegesForCurrentCineroom();
    if (window.navigator.onLine) {
      const category = sessionStorage.getItem('category');
      if (
        category !== null &&
        collegeLectureCountService!.collegeLectureCounts.length > 0
      ) {
        const collegeLectureCounts = JSON.parse(category);
        if (collegeLectureCounts.length > 0) {
          this.setCollege(collegeLectureCounts);
        }
      } else {
        const collegeLectureCounts =
          await collegeLectureCountService!.findCollegeLectureCounts();
        if (collegeLectureCounts.length > 0) {
          this.setCollege(collegeLectureCounts);
        }
      }
    }
  }

  setCollege(colleges: CollegeLectureCountRdo[]) {
    //
    //const { mainColleges } = this.props.collegeService || ({} as CollegeService);
    const collegeSelect: any = [];
    if (colleges) {
      collegeSelect.push({ key: 'Select', text: 'Select', value: 'Select' });
      colleges.map((college, index) => {
        if (college.collegeType === 'Company') {
          collegeSelect.push({
            key: index + 1,
            text: parsePolyglotString(
              college.name,
              getDefaultLang(college.langSupports)
            ),
            value: college.id,
          });
        }
      });
    }
    this.setState({ collegeSelect });
    //return collegeSelect;
  }

  selectCollege(name: string, collegeId: string) {
    const { collegeService } = this.props;
    if (collegeService && collegeId !== 'Select') {
      collegeService
        .findMainCollege(collegeId)
        .then(() => this.onChangeAplProps(name, collegeId))
        .then(() => {
          this.onChangeAplProps('channelId', 'Select');
        });
    } else if (collegeService && collegeId === 'Select') {
      this.onChangeAplProps(name, collegeId);
    }
  }

  setChannel() {
    const { mainCollege } = this.props.collegeService || ({} as CollegeService);
    const channels = mainCollege && mainCollege.channels;
    const channelSelect: any = [];
    channelSelect.push({ key: 'Select', text: 'Select', value: 'Select' });
    channels.map((channel, index) => {
      channelSelect.push({
        key: index + 1,
        text: parsePolyglotString(
          channel.name,
          getDefaultLang(channel.langSupports)
        ),
        value: channel.id,
      });
    });
    return channelSelect;
  }

  onSetWeek() {
    //
    this.onChangeAplProps(
      'period.endDateMoment',
      moment().endOf('day').subtract(-7, 'd')
    );
  }

  onChangeAplProps(
    name: string,
    value: string | {} | string[] | boolean | undefined | Moment
  ) {
    //
    const { changeAplProps } = this.props.aplService || ({} as AplService);
    if (changeAplProps) changeAplProps(name, value);
  }

  setInputFocus() {
    const { focusControlName, onResetFocusControl } = this.props;
    if (
      !focusControlName ||
      !this.focusInputRefs[focusControlName] ||
      !this.focusInputRefs[focusControlName].current
    ) {
      return;
    }
    //this.focusInputRefs[focusControlName].current.focus();

    if (
      [
        'title',
        'type',
        'typeName',
        'collegeId',
        'channelId',
        'institute',
        'requestHour',
        'requestMinute',
        'content',
        'approvalId',
      ].includes(focusControlName)
    ) {
      // input focus
      this.focusInputRefs[focusControlName].current.focus();
    } else if (['startDate', 'endDate'].includes(focusControlName)) {
      // calendar focus
      this.focusInputRefs[focusControlName].current.input.focus();
    }

    if (onResetFocusControl) onResetFocusControl();
  }

  getFileBoxIdForReference(fileBoxId: string) {
    //
    this.onChangeAplProps('fileIds', fileBoxId);
  }

  onClear(name: string) {
    //
    const { onChangeAplTimePropsValid } = this.props;
    if (name === 'requestHour' || name === 'requestMinute') {
      onChangeAplTimePropsValid(name, 0);
    } else {
      this.onChangeAplProps(name, '');
    }
  }

  onClickManagerListOk(approvalMember: ApprovalMemberModel) {
    //
    //const { memberService } = this.props;
    //memberService!.changeApprovalManagerProps(approvalMember);
    this.onChangeAplProps('approvalId', approvalMember.id);
    this.onChangeAplProps('approvalEmail', approvalMember.email);
    this.onChangeAplProps('approvalName', approvalMember.name);
    this.onChangeAplProps('approvalCompany', approvalMember.companyName);
    this.onChangeAplProps('approvalDepartment', approvalMember.departmentName);
  }

  onClickChangeApplyReference() {
    //
    this.managerModal.onShow(true);
  }

  close() {
    //
    //this.setState({ open: false });
  }

  onOk() {
    //
    const { handleOk, memberService, companyApproverService } = this.props;
    const { approvalMember } = memberService!;
    handleOk(approvalMember);
    this.close();
  }

  render() {
    const {
      memberService,
      companyApproverService,
      aplService,
      onChangeAplPropsValid,
      onChangeAplTimePropsValid,
      handleSave,
      handleCancel,
    } = this.props;
    const { apl } = aplService;
    const { approvalMember } = memberService!;
    const { companyApprover, originCompanyApprover } = companyApproverService!;
    //교육명 글자수(100자 이내)
    //sconst titleCount = (apl && apl.title && apl.title.length) || 0;
    //const collegeSelect = this.setCollege();
    const collegeSelect = this.state.collegeSelect;
    const channelSelect = apl && apl.collegeId && this.setChannel();
    const titleCount = (apl && apl.title && apl.title.length) || 0;
    const typeNameCount = (apl && apl.typeName && apl.typeName.length) || 0;
    const instituteCount = (apl && apl.institute && apl.institute.length) || 0;
    const contentCount = (apl && apl.content && apl.content.length) || 0;
    const requestHourCount =
      (apl && apl.requestHour && apl.requestHour.toString().length) || 0;
    const requestMinuteCount =
      (apl && apl.requestMinute && apl.requestMinute.toString().length) || 0;
    // 승인자 변경하기 활성, 비활성처리
    const approvalShow =
      originCompanyApprover.aplApproverType === AplApprovalType.Leader_Approve;

    return (
      /*<div className="ui full segment">*/
      <Segment className="full">
        <div className="apl-form-wrap">
          {/*<Form className="ui form">*/}
          <Form>
            <Form.Field>
              <label className="necessary">
                <PolyglotText
                  id="개학등록-uisf-교육명"
                  defaultString="교육명"
                />
              </label>
              <div
                className={
                  titleCount === 0
                    ? 'ui right-top-count input'
                    : titleCount >= 100
                    ? 'ui right-top-count write input error'
                    : 'ui right-top-count write input'
                }
              >
                <span className="count">
                  <span className="now">{titleCount}</span>/
                  <span className="max">100</span>
                </span>
                <input
                  id="title"
                  type="text"
                  placeholder={getPolyglotText(
                    '교육명을 입력해주세요.',
                    '개학등록-uisf-기본tt'
                  )}
                  value={(apl && apl.title) || ''}
                  onChange={(e: any) => {
                    onChangeAplPropsValid('title', e.target.value);
                  }}
                  ref={this.focusInputRefs.title}
                />
                <Icon
                  aria-hidden="true"
                  className="clear link"
                  onClick={() => this.onClear('title')}
                />
                <span className="validation">
                  <PolyglotText
                    id="개학등록-uisf-교육명100"
                    defaultString="최대 100자까지 입력 가능합니다."
                  />
                </span>
              </div>
            </Form.Field>
            <Form.Field>
              <label className="necessary">
                <PolyglotText
                  id="개학등록-uisf-교육형태"
                  defaultString="교육형태"
                />
              </label>
              <div className="edu-wrap">
                <Ref innerRef={this.focusInputRefs.type}>
                  <Select
                    className="w302"
                    placeholder={getPolyglotText(
                      'Select',
                      '개학등록-uisf-slbx'
                    )}
                    options={SelectType.aplLearningType}
                    value={(apl && apl.type) || 'Select'}
                    onChange={(e: any, data: any) => {
                      this.onChangeAplProps('type', data.value);
                      if (data.value !== AplType.Etc) {
                        const selectedIndex = data.options.findIndex(
                          (option: any) => option.value === data.value
                        );
                        this.onChangeAplProps(
                          'typeName',
                          data.options[selectedIndex].text
                        );
                      } else {
                        this.onChangeAplProps('typeName', '');
                      }
                    }}
                  />
                </Ref>
                {apl && apl.type === AplType.Etc ? (
                  <div className="w878">
                    <div
                      className={
                        typeNameCount === 0
                          ? 'ui h48 input ml18'
                          : typeNameCount >= 100
                          ? 'ui h48 input ml18 write error'
                          : 'ui h48 input ml18 write input'
                      }
                    >
                      <input
                        type="text"
                        id="typeName"
                        placeholder={getPolyglotText(
                          '기타 교육형태를 입력해주세요.',
                          '개학등록-uisf-직접입력'
                        )}
                        value={(apl && apl.typeName) || ''}
                        onChange={(e: any) => {
                          onChangeAplPropsValid('typeName', e.target.value);
                        }}
                        ref={this.focusInputRefs.typeName}
                      />
                      {/*<Icon aria-hidden="true" className="clear link" onClick={this.onClear('typeName')} />*/}
                      <Icon
                        aria-hidden="true"
                        className="clear link"
                        onClick={() => this.onClear('typeName')}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </Form.Field>
            <Form.Field>
              {/*<label className="necessary">Channel</label>*/}
              <label className="necessary">
                <PolyglotText
                  id="개학등록-uisf-코스채널"
                  defaultString="College / Channel"
                />
              </label>
              <Ref innerRef={this.focusInputRefs.collegeId}>
                <Select
                  className="w302 mr15px"
                  /*control={Select}*/
                  placeholder={getPolyglotText('Select', '개학등록-uisf-slbx2')}
                  options={collegeSelect}
                  value={(apl && apl.collegeId) || 'Select'}
                  onChange={(e: any, data: any) => {
                    const selectedIndex = data.options.findIndex(
                      (option: any) => option.value === data.value
                    );
                    this.selectCollege('collegeId', data.value);
                    this.onChangeAplProps(
                      'collegeName',
                      data.options[selectedIndex].text
                    );
                  }}
                />
              </Ref>
              {apl && apl.collegeId ? (
                <Ref innerRef={this.focusInputRefs.channelId}>
                  <Select
                    className="w302 ml18"
                    /*control={Select}*/
                    placeholder="Select"
                    options={channelSelect && channelSelect}
                    value={(apl && apl.channelId) || 'Select'}
                    onChange={(e: any, data: any) => {
                      const selectedIndex = data.options.findIndex(
                        (option: any) => option.value === data.value
                      );
                      this.onChangeAplProps('channelId', data.value);
                      this.onChangeAplProps(
                        'channelName',
                        data.options[selectedIndex].text
                      );
                    }}
                  />
                </Ref>
              ) : null}
            </Form.Field>
            <Form.Field>
              <label className="necessary">
                <PolyglotText
                  id="개학등록-uisf-교육기간"
                  defaultString="교육기간"
                />
              </label>
              <div className="calendar-wrap">
                <div className="ui calendar" id="rangestart">
                  {/*<div className="ui input right icon">
                    <label>시작일</label>
                    <i className="calendar24 icon">
                      <span className="blind">date</span>
                    </i>
                    <input type="text" />
                  </div>*/}
                  <div className="ui input right icon">
                    <label>
                      <PolyglotText
                        id="개학등록-uisf-시작"
                        defaultString="시작일"
                      />
                    </label>
                    <DatePicker
                      placeholderText="시작날짜를 선택해주세요."
                      selected={
                        (apl && apl.period && apl.period.startDateObj) || ''
                      }
                      onChange={(date: Date) =>
                        this.onChangeAplProps(
                          'period.startDateMoment',
                          moment(date).startOf('day')
                        )
                      }
                      dateFormat="yyyy.MM.dd"
                      //minDate={moment().toDate()}
                      ref={this.focusInputRefs.startDate}
                    />
                    <Icon className="calendar24">
                      <span className="blind">date</span>
                    </Icon>
                  </div>
                </div>
                <span className="dash">-</span>
                <div className="ui calendar" id="rangeend">
                  <div className="ui input right icon">
                    <label>
                      <PolyglotText
                        id="개학등록-uisf-종료"
                        defaultString="종료일"
                      />
                    </label>
                    <DatePicker
                      placeholderText="시작날짜를 선택해주세요."
                      selected={
                        (apl && apl.period && apl.period.endDateObj) || ''
                      }
                      onChange={(date: Date) =>
                        this.onChangeAplProps(
                          'period.endDateMoment',
                          moment(date).startOf('day')
                        )
                      }
                      dateFormat="yyyy.MM.dd"
                      minDate={apl.period.startDateObj}
                      ref={this.focusInputRefs.endDate}
                    />
                    <Icon className="calendar24">
                      <span className="blind">date</span>
                    </Icon>
                    {/*<input type="text" />*/}
                  </div>
                </div>
                <div className="info-text">
                  <Icon className="info16">
                    <span className="blind">infomation</span>
                  </Icon>
                  <PolyglotText
                    id="개학등록-uisf-부가1"
                    defaultString="일일 강좌 등록 시 시작일과 종료일의 날짜를 동일하게 설정해주시기 바랍니다."
                  />
                </div>
              </div>
            </Form.Field>
            <Form.Field>
              <label className="necessary">
                <PolyglotText
                  id="개학등록-uisf-교육기관"
                  defaultString="교육기관"
                />
              </label>
              <div
                className={
                  instituteCount === 0
                    ? 'ui right-top-count input'
                    : instituteCount >= 100
                    ? 'ui right-top-count write input error'
                    : 'ui right-top-count write input'
                }
              >
                <span className="count">
                  <span className="now">{instituteCount}</span>/
                  <span className="max">100</span>
                </span>
                <input
                  id="institute"
                  type="text"
                  placeholder={getPolyglotText(
                    '교육을 수료한 기관명을 입력해주세요.',
                    '개학등록-uisf-기관입력'
                  )}
                  value={(apl && apl.institute) || ''}
                  onChange={(e: any) =>
                    onChangeAplPropsValid('institute', e.target.value)
                  }
                  ref={this.focusInputRefs.institute}
                />
                <Icon
                  aria-hidden="true"
                  className="clear link"
                  onClick={() => this.onClear('institute')}
                />
                <span className="validation">
                  <PolyglotText
                    id="개학등록-uisf-백자입력"
                    defaultString="최대 100자까지 입력 가능합니다."
                  />
                </span>
              </div>
            </Form.Field>

            <Form.Field>
              <label className="necessary">
                <PolyglotText
                  id="개학등록-uisf-교육시간"
                  defaultString="교육시간"
                />
              </label>
              <div className="time-wrap">
                <div className="time">
                  <div
                    className={
                      requestHourCount === 0
                        ? 'ui h48 input time'
                        : 'ui h48 input time write'
                    }
                  >
                    <input
                      id="requestHour"
                      type="text"
                      value={
                        isNaN(apl && apl.requestHour)
                          ? 0
                          : parseInt(String(apl && apl.requestHour))
                      }
                      min="0"
                      onChange={(e: any) =>
                        onChangeAplTimePropsValid('requestHour', e.target.value)
                      }
                      onBlur={(e: any) =>
                        onChangeAplTimePropsValid('requestHour', e.target.value)
                      }
                      ref={this.focusInputRefs.requestHour}
                    />
                    <label>
                      <PolyglotText id="개학등록-uisf-h" defaultString="시간" />
                    </label>
                    <Icon
                      aria-hidden="true"
                      className="clear link"
                      onClick={() => this.onClear('requestHour')}
                    />
                  </div>
                </div>
                <div className="time">
                  <div
                    className={
                      requestMinuteCount === 0
                        ? 'ui h48 input time'
                        : 'ui h48 input time write'
                    }
                  >
                    <input
                      id="requestMinute"
                      type="text"
                      value={
                        isNaN(apl && apl.requestMinute)
                          ? 0
                          : parseInt(String(apl && apl.requestMinute))
                      }
                      min="0"
                      onChange={(e: any) =>
                        onChangeAplTimePropsValid(
                          'requestMinute',
                          e.target.value
                        )
                      }
                      onBlur={(e: any) =>
                        onChangeAplTimePropsValid(
                          'requestMinute',
                          e.target.value
                        )
                      }
                      ref={this.focusInputRefs.requestMinute}
                    />
                    <label>
                      <PolyglotText id="개학등록-uisf-m" defaultString="분" />
                    </label>
                    <Icon
                      aria-hidden="true"
                      className="clear link"
                      onClick={() => this.onClear('requestMinute')}
                    />
                  </div>
                </div>
                <div className="info-text">
                  <Icon className="info16">
                    <span className="blind">infomation</span>
                  </Icon>
                  <PolyglotText
                    id="개학등록-uisf-부가2"
                    defaultString="학습시간으로 인정되는 교육시간을 입력해주세요."
                  />
                  <br />
                  <Icon className="info16">
                    <span className="blind">infomation</span>
                  </Icon>
                  <PolyglotText
                    id="개학등록-uisf-부가3"
                    defaultString="교육시간은 100시간 이상, 1분 이내는 등록할 수 없습니다."
                  />
                  <br />
                  <Icon className="info16">
                    <span className="blind">infomation</span>
                  </Icon>
                  <PolyglotText
                    id="개학등록-uisf-부가4"
                    defaultString="승인자에 의해 교육시간은 변경될 수 있습니다."
                  />
                </div>
              </div>
            </Form.Field>

            <Form.Field>
              <label className="necessary">
                <PolyglotText
                  id="개학등록-uisf-교육내용"
                  defaultString="교육내용"
                />
              </label>
              <div className="ui form">
                <div
                  className={
                    contentCount >= 1000
                      ? 'ui right-top-count write input error'
                      : 'ui right-top-count write input'
                  }
                >
                  <span className="count">
                    <span className="now">{contentCount}</span>/
                    <span className="max">1000</span>
                  </span>
                  <TextArea
                    id="content"
                    type="text"
                    placeholder={getPolyglotText(
                      '교육내용을 1,000자 이내로 입력해주세요.',
                      '개학등록-uisf-기본내용'
                    )}
                    value={(apl && apl.content) || ''}
                    onChange={(e: any) =>
                      onChangeAplPropsValid('content', e.target.value)
                    }
                    ref={this.focusInputRefs.content}
                  />
                  <span className="validation">
                    <PolyglotText
                      id="개학등록-uisf-천자입력"
                      defaultString="최대 1000자 까지 입력 가능합니다."
                    />
                  </span>
                </div>
              </div>
            </Form.Field>
            <Form.Field>
              <label>
                <PolyglotText
                  id="개학등록-uisf-첨부파일"
                  defaultString="첨부파일"
                />
              </label>
              <div className="lg-attach">
                <div className="attach-inner">
                  <FileBox2
                    vaultKey={{
                      keyString: 'sku-depot',
                      patronType: PatronType.Audience,
                    }}
                    patronKey={{
                      keyString: 'sku-denizen',
                      patronType: PatronType.Audience,
                    }}
                    /*validations={[{ type: ValidationType.Duplication, validator: depotHelper.duplicationValidator },{ type: ValidationType.Extension, validator: depotHelper.extensionValidator }]}*/
                    validations={[
                      {
                        type: ValidationType.Duplication,
                        validator: depotHelper.duplicationValidator,
                      },
                    ]}
                    onChange={this.getFileBoxIdForReference}
                  />
                  <div className="bottom">
                    <span className="text1">
                      <Icon className="info16" />
                      <span className="blind">information</span>

                      <PolyglotText
                        id="개학등록-uisf-부가5"
                        defaultString="DOC,PPT,PDF,EXL 파일을 등록하실 수 있습니다. / 1개 이상의 첨부파일을 등록하실 수 있습니다."
                      />
                      {/*파일 확장자가 exe를 제외한 모든 첨부파일을 등록하실 수 있습니다. / 1개 이상의 첨부파일을 등록하실 수 있습니다.*/}
                    </span>
                  </div>
                </div>
              </div>
            </Form.Field>
            <Form.Field>
              <Grid className="create create2">
                <Grid.Column>
                  <label>
                    <PolyglotText
                      id="개학등록-uisf-승인자"
                      defaultString="승인자"
                    />
                  </label>
                </Grid.Column>
                <Grid.Column>
                  <Modal.Actions>
                    {approvalShow && (
                      <Button
                        className="post change-admin btn"
                        onClick={this.onClickChangeApplyReference}
                      >
                        <PolyglotText
                          id="개학등록-uisf-승인변경"
                          defaultString="승인자 변경"
                        />
                      </Button>
                    )}
                    <ManagerListModalContainer
                      ref={(managerModal) => (this.managerModal = managerModal)}
                      handleOk={this.onClickManagerListOk}
                      multiSelect={false}
                    />
                    <span className="text1">
                      <b>
                        {(apl &&
                          parsePolyglotString(
                            apl.approvalUserIdentity?.name
                          )) ||
                          ''}
                      </b>
                      <span className="ml40">
                        {(apl &&
                          parsePolyglotString(
                            apl.approvalUserIdentity?.companyName
                          )) ||
                          ''}
                      </span>
                      <span className="line">
                        {(apl &&
                          parsePolyglotString(
                            apl.approvalUserIdentity?.departmentName
                          )) ||
                          ''}
                      </span>
                      {approvalShow && (
                        <div className="info-text">
                          <Icon className="info16">
                            <span className="blind">infomation</span>
                          </Icon>
                          <PolyglotText
                            id="개학등록-uisf-부가설명"
                            defaultString="본인 조직의 리더가 아닐 경우 [승인자변경]을 눌러 수정해주세요."
                          />
                        </div>
                      )}
                    </span>
                  </Modal.Actions>
                </Grid.Column>
              </Grid>
            </Form.Field>
            <div className="buttons">
              <Button className="fix2 line" onClick={() => handleCancel()}>
                <PolyglotText id="개학등록-uisf-취소" defaultString="취소" />
              </Button>
              <Button className="fix2 bg" onClick={() => handleSave('save')}>
                <PolyglotText
                  id="개학등록-uisf-승인요청"
                  defaultString="승인요청"
                />
              </Button>
            </div>
          </Form>
        </div>
        {/*</div>*/}
      </Segment>
    );
  }
}

export default withRouter(AplCreateContainer);
