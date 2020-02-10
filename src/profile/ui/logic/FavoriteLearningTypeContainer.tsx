
import React, { Component } from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Form, Button, Icon, Checkbox, Radio } from 'semantic-ui-react';
import classNames from 'classnames';
import { IdNameList } from 'shared';
import { CollegeService } from 'college/stores';

import mainRoutePaths from 'main/routePaths';
import routePaths from '../../routePaths';
import SkProfileService from '../../present/logic/SkProfileService';
import StudySummaryModel from '../../model/StudySummaryModel';


interface Props extends RouteComponentProps {
  collegeService?: CollegeService
  skProfileService?: SkProfileService
}

interface State {
  typeGroup: string
  timeGroup: string
  areaGroup: string[]
  goalGroup: string[]
  focus: boolean
  write: string
}

const type: string[] = ['오프라인', '온라인', '상관없음'];
const area: string[] = ['서울 - 강북', '서울 - 강남', '이천', '대전', '울산', '부산', '광주', '대구', '상관없음'];
const time: string[]  = ['오전', '오후',  '상관없음'];
const goal: string[] = ['새로운 지식과 트렌드를 배우기 위해', '현재 직무의 역량 강화를 위해', '직무 전환을 위한 역량 습득을 위해', '리더로 성장하기 위한 체계적 준비를 위해'];


@inject(mobxHelper.injectFrom(
  'college.collegeService',
  'profile.skProfileService'
))
@observer
@reactAutobind
class FavoriteLearningTypeContainer extends Component<Props, State> {
  //
  state = {
    typeGroup: '오프라인',
    timeGroup: '오전',
    areaGroup: ['서울 - 강북'],
    goalGroup: ['새로운 지식과 트렌드를 배우기 위해'],
    focus: false,
    write: '',
  };

  componentDidMount(): void {
    //
    const { skProfileService } = this.props;
    skProfileService!.findStudySummary();
  }

  onSubmmit() {
    //
    const skProfileService = this.props.skProfileService!;
    const collegeService = this.props.collegeService!;
    const { history } = this.props;


    const { typeGroup, timeGroup, areaGroup, goalGroup, write } = this.state;
    const learningTyps : IdNameList = new IdNameList();

    learningTyps.idNames.push({ id: 'type', name: typeGroup, active: false });
    learningTyps.idNames.push({ id: 'time', name: timeGroup, active: false });

    areaGroup.map((area) => learningTyps.idNames.push({ id: 'area', name: area, active: false }) );
    goalGroup.map((goal) => learningTyps.idNames.push({ id: 'goal', name: goal, active: false }) );
    learningTyps.idNames.push({ id: 'etc', name: write, active: false });

    skProfileService.setStudySummaryProp('favoriteChannels', collegeService.favoriteChannelIdNames);
    skProfileService.setStudySummaryProp('favoriteLearningType', learningTyps);
    skProfileService.modifyStudySummaryFirstTime(StudySummaryModel.asNameValues(skProfileService.studySummary))
      .then(() => {
        history.push(routePaths.favoriteProgress());
        setTimeout(() => history.replace(mainRoutePaths.introduction()), 3000);
      });
  }

  onPrevious() {
    this.props.history.push(routePaths.favoriteJob());
  }

  onChangeRadio(event: any, target: any) {
    //
    const name: 'typeGroup' | 'timeGroup' = target.name;
    const state = { ...this.state };

    state[name] = target.value;
    this.setState(state);
  }

  onChangeCheck(event: any, targetProps: any) {
    //
    const name : 'areaGroup' | 'goalGroup' = targetProps.name;
    const value = targetProps.value;
    const state = { ...this.state };

    if (targetProps.checked && targetProps.name === 'goalGroup' &&  state.goalGroup.length === 3) {
      reactAlert({ title: '교육목적', message: '중복 3개까지 선택 가능합니다.', onClose: () => targetProps.checked = false });
      return;
    }

    if (targetProps.checked) {
      state[name].push(value);
    } else {
      state[name] = state[name].filter(data =>  data !== value);
    }

    this.setState(state);
  }

  render() {
    //
    const { typeGroup, timeGroup, goalGroup } = this.state;

    return (
      <Form>
        <div className="type-check-wrap">
          <div className="type-check-box type">
            <h3 className="title-filter">학습유형</h3>
            <div className="check-area">
              {type && type.map((label, index) => (
                <Radio name="typeGroup"
                  label={label}
                  value={label}
                  className="base"
                  key={index}
                  tabIndex={index}
                  checked={label === typeGroup}
                  onChange={this.onChangeRadio}
                />
              ))
              }
            </div>
          </div>
          <div className="type-check-box location">
            <h3 className="title-filter">오프라인 학습 수강 가능 장소 <span>(중복 선택 가능)</span></h3>
            <div className="check-area">
              {
                area && area.map((label, index) => (
                  <Checkbox name="areaGroup"
                    label={label}
                    value={label}
                    className="base"
                    key={index}
                    defaultChecked={index === 0}
                    onChange={(event: any, props: any) => this.onChangeCheck(event, props)}
                  />
                ))
              }
            </div>
          </div>
          <div className="type-check-box time">
            <h3 className="title-filter">오프라인 학습 선호 시간대</h3>
            <div className="check-area">
              {
                time && time.map((label, index) => (
                  <Radio name="timeGroup" label={label} value={label} className="base" key={index} checked={label === timeGroup} onChange={this.onChangeRadio} />
                ))
              }
            </div>
          </div>
          <div className="type-check-box purpose">
            <h3 className="title-filter">어떤 목적으로 교육을 수강하고 싶은가요? <span>(중복 3개 선택 가능)</span></h3>
            <div className="check-area">
              {
                goal && goal.map((label, index) => (
                  <Checkbox
                    name="goalGroup"
                    label={label}
                    value={label}
                    className="base"
                    key={index}
                    checked={goalGroup.includes(label)}
                    onChange={(event:any, props:any) => this.onChangeCheck(event, props)}
                  />
                ))
              }
              <div className="etc-input">
                <label>기타</label>
                <div className={classNames('ui h48 input', {
                  focus: this.state.focus,
                  write: this.state.write,
                })}
                >
                  <input type="text"
                    placeholder="Optional…"
                    value={this.state.write}
                    onClick={() => this.setState({ focus: true })}
                    onBlur={() => this.setState({ focus: false })}
                    onChange={(e) => this.setState({ write: e.target.value })}
                  />
                  <Icon className="clear link" onClick={() => this.setState({ write: '' })} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*<div className="select-error">*/}
        {/*  <Icon className="error16" /><span className="blind">error</span>*/}
        {/*  <span>학습 유형을 선택해주세요.</span>*/}
        {/*</div>*/}
        <div className="button-area">
          <Button className="fix line" onClick={this.onPrevious}>Previous</Button>
          <Button className="fix bg" onClick={this.onSubmmit}>Submit</Button>
        </div>
      </Form>
    );
  }
}

export default withRouter(FavoriteLearningTypeContainer);
