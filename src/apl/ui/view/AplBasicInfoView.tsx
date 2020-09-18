import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import {
  Checkbox,
  Form,
  Grid,
  Icon,
  Input,
  Ref,
  Select,
  Table,
} from 'semantic-ui-react';
import moment, { Moment } from 'moment';
import DatePicker from 'react-datepicker';
import { AplModel, AplService } from '../..';
import AplMessageList from '../../present/logic/AplService';
import { AplState } from '../../model/AplState';
import SelectType from '../../model/SelectType';

interface Props {
  aplService?: AplService;
  onChangeAplProps: (name: string, value: string | {} | []) => void;
  onChangeAplPropsValid: (name: string, value: string) => void;
  //aplModelModel: aplModelModel
  //aplId?: number
  //state?: string
  apl: AplModel;
  focusControlName?: string;
  onResetFocusControl?: () => void;
}

@inject('aplService', 'sharedService')
@observer
@reactAutobind
class AplBasicInfoView extends React.Component<Props> {

  private fileInputRef = React.createRef<HTMLInputElement>();

  private focusInputRefs: any = {
    name: React.createRef(),
    isNameShow: React.createRef(),
    startDate: React.createRef(),
    endDate: React.createRef(),
  };

  //
  componentDidMount() {
    const {
      apl,
    } = this.props;
    const state = apl.state;
    this.onSetWeek();
    this.setInputFocus();
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    const { apl } = this.props.aplService || ({} as AplService);

    if (prevProps.apl && prevProps.apl.id !== apl.id) {
      this.changeAplProps(
        'period.startDateMoment',
        moment(apl.startDate).startOf('day')
      );
      this.changeAplProps(
        'period.endDateMoment',
        moment(apl.endDate).endOf('day')
      );
    }
    const { focusControlName } = this.props;
    if (focusControlName) {
      this.setInputFocus();
    }
  }

  onSetWeek() {
    //
    this.changeAplProps(
      'period.endDateMoment',
      moment().endOf('day').subtract(-7, 'd')
    );
  }

  setAplProp(name: string, value: string | boolean | undefined) {
    //
    const { aplService } = this.props;
    if (aplService) {
      aplService.changeAplProps(name, value);
    }
  }

  changeAplProps(name: string, value: Moment) {
    //
    const { aplService } = this.props;
    //new Date(yyyy, MM, dd, 0, 0, 0).getTime();

    aplService!.changeAplProps(name, value);
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
        'name', 'isNameShow',
      ].includes(focusControlName)
    ) {
      // selectbox focus
      this.focusInputRefs[focusControlName].current.focus();
      //this.focusInputRefs[focusControlName].current.firstChild.focus();
    } else if (['startDate', 'endDate',].includes(focusControlName)) {
      // input text focus
      this.focusInputRefs[focusControlName].current.input.focus();
    }

    if (onResetFocusControl) onResetFocusControl();
  }

  render() {
    const {
      onChangeAplProps,
      onChangeAplPropsValid,
      apl,
    } = this.props;

    const aplId = apl.id;
    const state = apl.state;

    //const { apl } = this.props.AplMessageList || {} as AplMessageList;
    //과정명 글자수(100자 이내)
    const titleCount = (apl && apl.title && apl.title.length) || 0;

    return (
      <Table celled>
        <colgroup>
          <col width="20%" />
          <col width="80%" />
        </colgroup>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan={2} className="title-header">
              기본 정보
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell className="tb-header">
              교육명 <span className="required">*</span>
            </Table.Cell>
            <Table.Cell>
              <Form.Field>
                {(state === AplState.Opened && (
                  <div>{(apl && apl.title) || ''}</div>
                )) ||
                  (state === AplState.Closed && (
                    <div>{(apl && apl.title) || ''}</div>
                  )) ||
                  (state === AplState.OpenApproval && (
                    <div>{(apl && apl.title) || ''}</div>
                  )) ||
                  (state === AplState.Created && (
                    <div
                      className={
                        titleCount >= 30
                          ? 'ui right-top-count input error'
                          : 'ui right-top-count input'
                      }
                    >
                      <span className="count">
                        <span className="now">{titleCount}</span>/
                        <span className="max">30</span>
                      </span>
                      <input
                        id="name"
                        type="text"
                        placeholder="편성 Set명을 입력해주세요. (30자까지 입력가능)"
                        value={(apl && apl.title) || ''}
                        onChange={(e: any) =>
                          onChangeAplPropsValid('title', e.target.value)
                        }
                        ref={this.focusInputRefs.name}
                      />
                    </div>
                  )) || (
                    <div
                      className={
                        titleCount >= 30
                          ? 'ui right-top-count input error'
                          : 'ui right-top-count input'
                      }
                    >
                      <span className="count">
                        <span className="now">{titleCount}</span>/
                        <span className="max">30</span>
                      </span>
                      <input
                        id="name"
                        type="text"
                        placeholder="편성 Set명을 입력해주세요. (30자까지 입력가능)"
                        value={(apl && apl.title) || ''}
                        onChange={(e: any) =>
                          onChangeAplPropsValid('title', e.target.value)
                        }
                        ref={this.focusInputRefs.name}
                      />
                    </div>
                )}
              </Form.Field>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="tb-header">
              Set명 메인 노출 여부 <span className="required">*</span>
            </Table.Cell>
            <Table.Cell>
              <Ref innerRef={this.focusInputRefs.isNameShow}>
                <Select
                  inline
                  placeholder="Select"
                  value={apl.type}
                  options={SelectType.arrangeNameShow}
                  onChange={(e: any, data: any) =>
                    this.setAplProp('isNameShow', data.value)
                  }
                  //defaultValue={SelectType.arrangeIsUse[1].value}
                />
              </Ref>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="tb-header">
              노출기간 <span className="required">*</span>
            </Table.Cell>
            <Table.Cell>
              <Form.Group>
                <Form.Field>
                  <div className="ui input right icon">
                    <DatePicker
                      placeholderText="시작날짜를 선택해주세요."
                      selected={
                        (apl &&
                          apl.period &&
                          apl.period.startDateSub) ||
                        ''
                      }
                      onChange={(date: Date) =>
                        this.changeAplProps(
                          'period.startDateMoment',
                          moment(date).startOf('day')
                        )
                      }
                      dateFormat="yyyy.MM.dd"
                      minDate={moment().toDate()}
                      ref={this.focusInputRefs.startDate}
                    />
                    <Icon name="calendar alternate outline" />
                  </div>
                </Form.Field>
                <div className="dash">-</div>
                <Form.Field>
                  <div className="ui input right icon">
                    <DatePicker
                      placeholderText="종료날짜를 선택해주세요."
                      selected={
                        (apl &&
                          apl.period &&
                          apl.period.endDateSub) ||
                        ''
                      }
                      onChange={(date: Date) =>
                        this.changeAplProps(
                          'period.endDateMoment',
                          moment(date).endOf('day')
                        )
                      }
                      minDate={
                        apl &&
                        apl.period &&
                        apl.period.startDateSub
                      }
                      dateFormat="yyyy.MM.dd"
                      //maxDate={moment().toDate()}
                      ref={this.focusInputRefs.endDate}
                    />
                    <Icon name="calendar alternate outline" />
                  </div>
                </Form.Field>
              </Form.Group>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

export default AplBasicInfoView;
