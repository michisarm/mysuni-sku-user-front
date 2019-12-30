import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Form, Button, Icon, Checkbox, Radio } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';

import classNames from 'classnames';
import { ContentLayout, IdNameList } from '../../../shared';

import CollegeService from '../../../college/present/logic/CollegeService';
import TitleView from '../view/TitleView';
import SkProfileService from '../../present/logic/SkProfileService';
import { StudySummary } from '../../model/StudySummary';

interface Props extends RouteComponentProps{
  collegeService? : CollegeService
  skProfileService? : SkProfileService
}

interface States{
  typeGroup : string
  timeGroup : string
  areaGroup : string []
  goalGroup : string []
  focus:boolean
  write:string
}

const type : string [] = ['오프라인', '온라인', '상관없음'];
const area  : string [] = ['서울 - 강북', '서울 - 강남', '이천', '대전', '울산', '부산', '광주', '대구', '상관없음'];
const time : string []  = ['오전', '오후',  '상관없음'];
const goal  : string [] = ['새로운 지식과 트렌드를 배우기 위해', '현재 직무의 역량 강화를 위해', '직무 전환을 위한 역량 습득을 위해', '리더로 성장하기 위한 체계적 준비를 위해'];

@inject('collegeService', 'skProfileService')
@observer
@reactAutobind
class FavoriteLearningTypeContainer extends React.Component<Props, States> {

  constructor(props:Props) {
    super(props);
    this.state = {
      typeGroup: '오프라인',
      timeGroup: '오전',
      areaGroup: ['서울 - 강북'],
      goalGroup: ['새로운 지식과 트렌드를 배우기 위해'],
      focus: false,
      write: '',
    };
  }

  componentDidMount(): void {
    const { skProfileService } = this.props;
    if (skProfileService) {
      skProfileService.findStudySummary();
    }
  }

  handleChange(event : any, target: any) {
    const name: 'typeGroup' | 'timeGroup' = target.name;
    const state = { ...this.state };
    state[name] = target.value;
    this.setState(state);
  }

  handleCheckBox(event:any, targetProps:any) {
    const name : 'areaGroup' | 'goalGroup' = targetProps.name;
    const value = targetProps.value;
    const state = { ...this.state };
    console.log(state[name]);
    if (targetProps.checked) {
      state[name].push(value);
    } else {
      state[name] = state[name].filter(data =>  data !== value);
    }

    this.setState(state);
  }


  onSKIntroClick() {

  }

  onPreviousClick() {
    this.props.history.push('/profile/interest/job');
  }


  onSubmmit() {
    const { skProfileService, collegeService } = this.props;

    const { typeGroup, timeGroup, areaGroup, goalGroup, write } = this.state;
    const learningTyps : IdNameList = new IdNameList();

    if (skProfileService && collegeService )  {
      learningTyps.idNames.push({ id: 'type', name: typeGroup });
      learningTyps.idNames.push({ id: 'time', name: timeGroup });
      areaGroup.forEach((area) => learningTyps.idNames.push({ id: 'area', name: area }) );
      goalGroup.forEach((goal) => learningTyps.idNames.push({ id: 'goal', name: goal }) );
      learningTyps.idNames.push({ id: 'etc', name: write });

      skProfileService.setStudySummaryProp('favoriteChannels', collegeService.favoriteChannelIdNames);
      skProfileService.setStudySummaryProp('favoriteLearningType', learningTyps);
      skProfileService.modifyStudySummary(StudySummary.asNameValues(skProfileService.studySummary));
      console.log(StudySummary.asNameValues(skProfileService.studySummary));
    }

    this.props.history.push('/');
    //window.location.href = `${process.env.PUBLIC_URL}/`;
  }

  render() {
    const { typeGroup, timeGroup } = this.state;

    return (
      <ContentLayout breadcrumb={[
        { text: 'd1', path: '/depth1-path' },
        { text: 'd2' },
      ]}
        className="bg-white"
      >
        <div className="interest-content step3">
          <TitleView step={3} onSKIntroClick={this.onSKIntroClick} />
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
                      onChange={this.handleChange}
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
                        onChange={(event:any, props:any) => this.handleCheckBox(event, props)}
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
                      <Radio name="timeGroup" label={label} value={label} className="base" key={index} checked={label === timeGroup} onChange={this.handleChange} />
                    ))
                  }
                </div>
              </div>
              <div className="type-check-box purpose">
                <h3 className="title-filter">어떤 목적으로 교육을 수강하고 싶은가요? <span>(중복 3개 선택 가능)</span></h3>
                <div className="check-area">
                  {
                    goal && goal.map((label, index) => (
                      <Checkbox name="goalGroup"
                        label={label}
                        value={label}
                        className="base"
                        defaultChecked={index === 0}
                        key={index}
                        onChange={(event:any, props:any) => this.handleCheckBox(event, props)}
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
            <div className="select-error">
              <Icon className="error16" /><span className="blind">error</span>
              <span>학습 유형을 선택해주세요.</span>
            </div>
            <div className="button-area">
              <Button className="fix line" onClick={this.onPreviousClick}>Previous</Button>
              <Button className="fix bg" onClick={this.onSubmmit}>Submit</Button>
            </div>
          </Form>
        </div>
      </ContentLayout>
    );
  }
}

export default FavoriteLearningTypeContainer;
