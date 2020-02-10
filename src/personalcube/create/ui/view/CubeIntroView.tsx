
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import classNames from 'classnames';
import ReactQuill from 'react-quill';
import { Form, Icon, Select } from 'semantic-ui-react';
import SelectType from '../../model/SelectOptions';
import { CubeIntroModel } from '../../../cubeintro/model';
import ContentsProviderSelectContainer from '../logic/ContentsProviderSelectContainer';
import CubeIntroBoardContainer from '../logic/CubeIntroBoardContainer';


interface Props {
  cubeIntro: CubeIntroModel
  hour: number
  minute: number
  onChangeCubeIntroProps: (name: string, value: string | number | {}) => void
  onChangeHourAndMinute: (name: string, value: number) => void
  cubeType?: string
}

interface States {
  fieldName : string
}

@observer
@reactAutobind
class CubeIntroView extends Component<Props, States> {
  //
  state = {
    fieldName: '',
  };

  setLearningTime(name: string, value: string) {
    //
    const { onChangeHourAndMinute } = this.props;
    let numberValue = parseInt(value, 10);

    if (Number.isNaN(numberValue)) {
      numberValue = 0;
    }
    onChangeHourAndMinute(name, numberValue);
  }

  onChangeGoal(e: any) {
    //
    const { value } = e.target;
    const { onChangeCubeIntroProps } = this.props;

    if (value.length > 500 ) {
      this.setState({ fieldName: 'description.goal' });
    } else {
      this.setState({ fieldName: '' });
      onChangeCubeIntroProps('description.goal', value);
    }
  }

  onChangeApplicants(e: any) {
    //
    const { value } = e.target;
    const { onChangeCubeIntroProps } = this.props;

    if (value.length > 500 ) {
      this.setState({ fieldName: 'description.applicants' });
    } else {
      this.setState({ fieldName: '' });
      onChangeCubeIntroProps('description.applicants', value);
    }
  }

  onChangeCompletionTerms(e: any) {
    //
    const { value } = e.target;
    const { onChangeCubeIntroProps } = this.props;

    if (value.length > 1000 ) {
      this.setState({ fieldName: 'description.completionTerms' });
    } else {
      this.setState({ fieldName: '' });
      onChangeCubeIntroProps('description.completionTerms', value);
    }
  }

  onChangeLearningTimeHour(e: any) {
    //
    this.setLearningTime('hour', e.target.value);
  }

  onChangeLearningTimeMinute(e: any) {
    //
    this.setLearningTime('minute', e.target.value);
  }


  render() {
    //
    const {
      cubeIntro, cubeType, onChangeCubeIntroProps,
    } = this.props;

    return (
      <>
        <Form.Field>
          <label className="necessary">교육목표</label>
          <div className="ui form">
            <div className={classNames('ui right-top-count input', { error: this.state.fieldName === 'description.goal' })}>
              <span className="count">
                <span className="now">
                  {cubeIntro && cubeIntro.description && cubeIntro.description.goal && cubeIntro.description.goal.length || 0}
                </span>/
                <span className="max">500</span>
              </span>
              <textarea placeholder="교육 목표를 입력해주세요. (최대 500자 입력 가능)"
                value={cubeIntro && cubeIntro.description && cubeIntro.description.goal || ''}
                onChange={this.onChangeGoal}
              />
              <span className="validation">You can enter up to 500 characters.</span>
            </div>
          </div>
        </Form.Field>
        <Form.Field>
          <label className="necessary">교육대상</label>
          <div className={classNames('ui right-top-count input', { error: this.state.fieldName === 'description.applicants' })}>
            <span className="count">
              <span className="now">{cubeIntro && cubeIntro.description && cubeIntro.description.applicants && cubeIntro.description.applicants.length || 0}</span>/
              <span className="max">500</span>
            </span>
            <textarea placeholder="교육 대상을 입력해주세요. (최대 500자 입력가능)"
              value={cubeIntro && cubeIntro.description && cubeIntro.description.applicants || ''}
              onChange={this.onChangeApplicants}
            />
            <span className="validation">You can enter up to 500 characters.</span>
          </div>
        </Form.Field>
        <Form.Field>
          <label className="necessary">교육내용</label>
          <div className="ui editor-wrap">
            <ReactQuill
              theme="snow"
              modules={SelectType.modules}
              formats={SelectType.formats}
              value={cubeIntro && cubeIntro.description && cubeIntro.description.description || ''}
              onChange={html => onChangeCubeIntroProps('description.description', html)}
            />
            {/*<Editor />*/}
          </div>
        </Form.Field>

        <Form.Field>
          <label>이수조건</label>
          <div className={classNames('ui right-top-count input', { error: this.state.fieldName === 'description.completionTerms' })}>
            <span className="count">
              <span className="now">{cubeIntro && cubeIntro.description && cubeIntro.description.completionTerms.length || 0}
              </span>/
              <span className="max">1000</span>
            </span>
            <textarea
              placeholder="이수조건을 입력해주세요."
              value={cubeIntro && cubeIntro.description && cubeIntro.description.completionTerms || ''}
              onChange={this.onChangeCompletionTerms}
            />
            <span className="validation">You can enter up to 1000 characters.</span>
          </div>
        </Form.Field>
        <Form.Field>
          <label>기타안내</label>
          <div className="ui editor-wrap">
            <ReactQuill
              theme="snow"
              modules={SelectType.modules}
              formats={SelectType.formats}
              value={cubeIntro && cubeIntro.description && cubeIntro.description.guide || ''}
              onChange={html => onChangeCubeIntroProps('description.guide', html)}
            />
          </div>
        </Form.Field>

        <Form.Field>
          <div className="ui grid create">
            <div className="column">
              <label className="necessary">교육시간</label>
              <div className="ui h48 input time">
                <input
                  type="text"
                  value={parseInt(String(cubeIntro.learningTime / 60), 10)}
                  onChange={this.onChangeLearningTimeHour}
                />
                <label>h</label>
                <Icon className="clear link" />
              </div>
              <div className="ui h48 input time">
                <input
                  type="text"
                  value={parseInt(String(cubeIntro.learningTime % 60), 10)}
                  onChange={this.onChangeLearningTimeMinute}
                />
                <label>m</label>
                <Icon className="clear link" />
              </div>
            </div>
            <div className="column">
              <label>난이도</label>
              <Select
                className="dropdown"
                placeholder="선택해주세요"
                value={cubeIntro && cubeIntro.difficultyLevel || ''}
                options={SelectType.difficulty}
                onChange={(e: any, data: any) => onChangeCubeIntroProps('difficultyLevel', data.value)}
              />
            </div>
          </div>
        </Form.Field>

        { cubeType === 'Community' && (
          <Form.Field>
            <CubeIntroBoardContainer />
          </Form.Field>
        )}

        <Form.Field>
          <ContentsProviderSelectContainer
            targetProps="operation.organizer"
            type="cubeInfo"
            defaultValue={
              cubeIntro && cubeIntro.operation && cubeIntro.operation.organizer && cubeIntro.operation.organizer.id
              && JSON.stringify({ id: cubeIntro.operation.organizer.id, name: cubeIntro.operation.organizer.name })
            }
          />
        </Form.Field>
      </>
    );
  }
}
export default CubeIntroView;
