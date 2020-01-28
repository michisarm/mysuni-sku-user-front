
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import classNames from 'classnames';
import ReactQuill from 'react-quill';
import { Form, Icon, Select } from 'semantic-ui-react';
import SelectType from '../../model/SelectOptions';
import { CubeIntroModel } from '../../../cubeintro';
import ContentsProviderSelectContainer from '../logic/ContentsProviderSelectContainer';
import CubeIntroBoardContainer from '../logic/CubeIntroBoardContainer';


interface Props {
  cubeIntro: CubeIntroModel
  hour: number
  minute: number
  onChangeCubeIntroProps: (name: string, value: string | number | {}) => void
  setHourAndMinute: (name: string, value: number) => void
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

  render() {
    //
    const {
      cubeIntro, onChangeCubeIntroProps, setHourAndMinute, cubeType,
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
                onChange={(e:any) => {
                  if (e.target.value.length > 500 ) {
                    this.setState({ fieldName: 'description.goal' });
                  } else {
                    this.setState({ fieldName: '' });
                    onChangeCubeIntroProps('description.goal', e.target.value); }
                }
                }
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
              onChange={(e:any) => {
                if (e.target.value.length > 500 ) {
                  this.setState({ fieldName: 'description.applicants' });
                } else {
                  this.setState({ fieldName: '' });
                  onChangeCubeIntroProps('description.applicants', e.target.value);
                }
              }}
            />
            <span className="validation">You can enter up to 500 characters.</span>
          </div>
        </Form.Field>
        <Form.Field>
          <label className="necessary">교육내용</label>
          <div className="ui editor-wrap">
            <ReactQuill theme="snow"
              modules={SelectType.modules}
              formats={SelectType.formats}
              onChange={html => onChangeCubeIntroProps('description.description', html)}
              value={cubeIntro && cubeIntro.description && cubeIntro.description.description || ''}
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
              onChange={(e:any) => {
                if (e.target.value.length > 1000 ) {
                  this.setState({ fieldName: 'description.completionTerms' });
                } else {
                  this.setState({ fieldName: '' });
                  onChangeCubeIntroProps('description.completionTerms', e.target.value);
                }
              }}
            />
            <span className="validation">You can enter up to 1000 characters.</span>
          </div>
        </Form.Field>
        <Form.Field>
          <label>기타안내</label>
          <div className="ui editor-wrap">
            <ReactQuill theme="snow"
              modules={SelectType.modules}
              formats={SelectType.formats}
              onChange={html => onChangeCubeIntroProps('description.guide', html)}
              value={cubeIntro && cubeIntro.description && cubeIntro.description.guide || ''}
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
                  onChange={(e: any) => setHourAndMinute('hour', e.target.value)}
                />
                <label>h</label>
                <Icon className="clear link" />
              </div>
              <div className="ui h48 input time">
                <input
                  type="text"
                  value={parseInt(String(cubeIntro.learningTime % 60), 10)}
                  onChange={(e: any) => setHourAndMinute('minute', e.target.value)}
                />
                <label>m</label>
                <Icon className="clear link" />
              </div>
            </div>
            <div className="column">
              <label>난이도</label>
              <Select
                placeholder="선택해주세요"
                className="dropdown"
                options={SelectType.difficulty}
                onChange={(e: any, data: any) => onChangeCubeIntroProps('difficultyLevel', data.value)}
                value={cubeIntro && cubeIntro.difficultyLevel || ''}
              />
            </div>
          </div>
        </Form.Field>
        {
          cubeType === 'Community' ?
            <Form.Field>
              <CubeIntroBoardContainer />
            </Form.Field>
            : null
        }
        {/* */}
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
