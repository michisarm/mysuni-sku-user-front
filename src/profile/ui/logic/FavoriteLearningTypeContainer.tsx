import React, { Component } from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Form, Button, Icon, Checkbox, Radio } from 'semantic-ui-react';
import classNames from 'classnames';
import { IdNameList } from 'shared/model';
import { CollegeService } from 'college/stores';

import mainRoutePaths from 'main/routePaths';
import routePaths from '../../routePaths';
import SkProfileService from '../../present/logic/SkProfileService';
import StudySummaryModel from '../../model/StudySummaryModel';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props extends RouteComponentProps {
  collegeService?: CollegeService;
  skProfileService?: SkProfileService;
}

interface State {
  typeGroup: string;
  timeGroup: string;
  mediaGroup: string[];
  goalGroup: string[];
  focus: boolean;
  write: string;
}

const type: string[] = [getPolyglotText('오프라인', 'learning-learning-오프라인'), getPolyglotText('온라인', 'learning-learning-온라인'), getPolyglotText('상관없음', 'learning-learning-상관없음')];
const media: string[] = [
  getPolyglotText('Video', 'learning-learning-video'),
  getPolyglotText('팟캐스트(Audio)', 'learning-learning-audio'),
  getPolyglotText('문서', 'learning-learning-doc'),
  getPolyglotText('Live(실시간 생중계)', 'learning-learning-live'),
];
const time: string[] = [getPolyglotText('오전', 'learning-learning-am'), getPolyglotText('오후', 'learning-learning-pm'), getPolyglotText('상관없음', 'learning-learning-none')];
const goal: string[] = [
  getPolyglotText('새로운 지식과 트렌드를 배우기 위해', 'learning-learning-trend'),
  getPolyglotText('현재 직무의 역량 강화를 위해', 'learning-learning-job'),
  getPolyglotText('직무 전환을 위한 역량 습득을 위해', 'learning-learning-change'),
  getPolyglotText('리더로 성장하기 위한 체계적 준비를 위해', 'learning-learning-leader'),
];

@inject(
  mobxHelper.injectFrom('college.collegeService', 'profile.skProfileService')
)
@observer
@reactAutobind
class FavoriteLearningTypeContainer extends Component<Props, State> {
  //
  state = {
    typeGroup: '',
    mediaGroup: [''],
    timeGroup: '',
    goalGroup: [''],
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
    const { reAgree } = skProfileService!;

    const { typeGroup, timeGroup, mediaGroup, goalGroup, write } = this.state;
    const learningTyps: IdNameList = new IdNameList();

    learningTyps.idNames.push({ id: 'type', name: typeGroup, active: false });
    learningTyps.idNames.push({ id: 'time', name: timeGroup, active: false });

    mediaGroup.map(media =>
      learningTyps.idNames.push({ id: 'media', name: media, active: false })
    );
    goalGroup.map(goal =>
      learningTyps.idNames.push({ id: 'goal', name: goal, active: false })
    );
    learningTyps.idNames.push({ id: 'etc', name: write, active: false });

    skProfileService.setStudySummaryProp(
      'favoriteChannels',
      collegeService.favoriteChannelIdNames
    );
    skProfileService.setStudySummaryProp('favoriteLearningType', learningTyps);
    skProfileService
      .modifyStudySummaryFirstTime(
        StudySummaryModel.asNameValues(skProfileService.studySummary)
      )
      .then(() => {
        history.push(routePaths.favoriteProgress());
        if (reAgree) {
          setTimeout(() => history.replace(mainRoutePaths.main()), 3000);
        } else {
          setTimeout(
            () => history.replace(mainRoutePaths.introduction()),
            3000
          );
        }
      });
  }

  onPrevious() {
    this.props.history.push(routePaths.favoriteCollege());
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
    const name: 'mediaGroup' | 'goalGroup' = targetProps.name;
    const value = targetProps.value;
    const state = { ...this.state };

    if (
      targetProps.checked &&
      targetProps.name === 'goalGroup' &&
      state.goalGroup.length === 4
    ) {
      reactAlert({
        title: getPolyglotText('교육목적', 'learning-learning-checkTitle'),
        message: getPolyglotText('learning-learning-checkBody', '중복 3개까지 선택 가능합니다.'),
        onClose: () => (targetProps.checked = false),
      });
      return;
    }

    if (targetProps.checked) {
      state[name].push(value);
    } else {
      state[name] = state[name].filter(data => data !== value);
    }

    this.setState(state);
  }

  render() {
    //
    const { typeGroup, mediaGroup, timeGroup, goalGroup } = this.state;

    return (
      <Form>
        <div className="type-check-wrap">
          <div className="type-check-box type">
            <h3 className="title-filter">
              <PolyglotText defaultString="학습유형" id="learning-learning-제목1" />
            </h3>
            <div className="check-area">
              {type &&
                type.map((label, index) => (
                  <Radio
                    name="typeGroup"
                    label={label}
                    value={label}
                    className="base"
                    key={index}
                    tabIndex={index}
                    checked={label === typeGroup}
                    onChange={this.onChangeRadio}
                  />
                ))}
            </div>
          </div>
          <div className="type-check-box location">
            <h3 className="title-filter">
              <PolyglotText defaultString="온라인 학습 중 선호하는 유형은 무엇인가요?" id="learning-learning-제목2" />
            </h3>
            <div className="check-area">
              {media &&
                media.map((label, index) => (
                  <Checkbox
                    name="mediaGroup"
                    label={label}
                    value={label}
                    className="base"
                    key={index}
                    checked={mediaGroup.includes(label)}
                    onChange={(event: any, props: any) =>
                      this.onChangeCheck(event, props)
                    }
                  />
                ))}
            </div>
          </div>
          <div className="type-check-box time">
            <h3 className="title-filter">
              <PolyglotText defaultString="오프라인 학습 선호 시간대" id="learning-learning-제목3" />
            </h3>
            <div className="check-area">
              {time &&
                time.map((label, index) => (
                  <Radio
                    name="timeGroup"
                    label={label}
                    value={label}
                    className="base"
                    key={index}
                    checked={label === timeGroup}
                    onChange={this.onChangeRadio}
                  />
                ))}
            </div>
          </div>
          <div className="type-check-box purpose">
            <h3 className="title-filter">
              <PolyglotText defaultString="어떤 목적으로 교육을 수강하고 싶은가요?" id="learning-learning-제목4" />
              {' '}
              <span>
                <PolyglotText defaultString="(중복 3개 선택 가능)" id="learning-learning-옵션" />
              </span>
            </h3>
            <div className="check-area">
              {goal &&
                goal.map((label, index) => (
                  <Checkbox
                    name="goalGroup"
                    label={label}
                    value={label}
                    className="base"
                    key={index}
                    checked={goalGroup.includes(label)}
                    onChange={(event: any, props: any) =>
                      this.onChangeCheck(event, props)
                    }
                  />
                ))}
              <div className="etc-input">
                <label>
                  <PolyglotText defaultString="기타" id="learning-learning-etc" />
                </label>
                <div
                  className={classNames('ui h48 input', {
                    focus: this.state.focus,
                    write: this.state.write,
                  })}
                >
                  <input
                    type="text"
                    placeholder="Optional…"
                    value={this.state.write}
                    onClick={() => this.setState({ focus: true })}
                    onBlur={() => this.setState({ focus: false })}
                    onChange={e => this.setState({ write: e.target.value })}
                  />
                  <Icon
                    className="clear link"
                    onClick={() => this.setState({ write: '' })}
                  />
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
          {/* <Button className="fix line" onClick={this.onPrevious}>          
            Previous
          </Button> */}
          <div className="error">
            <PolyglotText defaultString="학습형태 항목별 문의 사항에 대해 선택해주세요." id="learning-learning-주의" />
          </div>
          <Button className="fix bg" onClick={this.onSubmmit}>
            <PolyglotText defaultString="다음" id="learning-learning-다음" />
          </Button>
        </div>
      </Form>
    );
  }
}

export default withRouter(FavoriteLearningTypeContainer);
