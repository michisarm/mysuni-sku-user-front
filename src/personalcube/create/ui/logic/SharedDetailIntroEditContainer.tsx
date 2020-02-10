import React from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';

import { Form, Select } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import { timeToHourMinuteFormat } from 'shared/helper/dateTimeHelper';
import { CubeIntroModel } from '../../../cubeintro/model';
import { CubeIntroService } from '../../../cubeintro/stores';
import SelectType from '../../model/SelectOptions';
import ContentsProviderSelectContainer from './ContentsProviderSelectContainer';

interface Props {
  cubeIntro: CubeIntroModel
  cubeIntroService?: CubeIntroService

}

@inject(mobxHelper.injectFrom('personalCube.cubeIntroService'))
@observer
@reactAutobind
class SharedDetailIntroEditContainer extends React.Component<Props> {

  onChangeCubeIntroProps(name: string, value: string | number | {}) {
    //
    const cubeIntroService = this.props.cubeIntroService!;
    cubeIntroService.changeCubeIntroProps(name, value);
  }

  render() {
    const { cubeIntro } = this.props;

    return (
      <>
        <div className="section-tit">
          <span className="text1">교육정보</span>
        </div>
        <Form.Field>
          <label>교육목표</label>
          <div className="ui form">
            <div className="ui right-top-count input">
              <span className="count">
                <span className="now">{cubeIntro && cubeIntro.description && cubeIntro.description.goal && cubeIntro.description.goal.length || 0}</span>/
                <span className="max">500</span>
              </span>
              <textarea
                placeholder="교육 목표를 입력해주세요. (최대 500자 입력 가능)"
                value={cubeIntro && cubeIntro.description && cubeIntro.description.goal || ''}
                onChange={(e: any) => this.onChangeCubeIntroProps('description.goal', e.target.value)}
              />
              <span className="validation">You can enter up to 500 characters.</span>
            </div>
          </div>
        </Form.Field>
        <Form.Field>
          <label>교육대상</label>
          <div className="ui form">
            <div className="ui right-top-count input">
              <span className="count">
                <span className="now">{cubeIntro && cubeIntro.description && cubeIntro.description.applicants && cubeIntro.description.applicants.length || 0}</span>/
                <span className="max">500</span>
              </span>
              <textarea
                placeholder="교육 대상을 입력해주세요. (최대 500자 입력가능)"
                value={cubeIntro && cubeIntro.description && cubeIntro.description.applicants || ''}
                onChange={(e: any) => this.onChangeCubeIntroProps('description.applicants', e.target.value) }
              />
              <span className="validation">You can enter up to 500 characters.</span>
            </div>
          </div>
        </Form.Field>
        <Form.Field>
          <label>교육내용</label>
          <div className="ui editor-wrap">
            <div className="ui editor-wrap">
              <ReactQuill theme="snow"
                modules={SelectType.modules}
                formats={SelectType.formats}
                onChange={html => this.onChangeCubeIntroProps('description.description', html)}
                value={cubeIntro && cubeIntro.description && cubeIntro.description.description || ''}
              />
            </div>
          </div>
        </Form.Field>
        <Form.Field>
          <div className="ui grid create create2">
            <div className="column"><label>이수조건</label></div>
            <div className="column">
              <div className="text1">{cubeIntro && cubeIntro.description && cubeIntro.description.completionTerms}</div>
            </div>
          </div>
        </Form.Field>
        <Form.Field>
          <label>기타안내</label>
          <div className="ui editor-wrap">
            <ReactQuill theme="snow"
              modules={SelectType.modules}
              formats={SelectType.formats}
              onChange={html => this.onChangeCubeIntroProps('description.guide', html)}
              value={cubeIntro && cubeIntro.description && cubeIntro.description.guide || ''}
            />
          </div>
        </Form.Field>
        <Form.Field>
          <div className="ui grid create create2">
            <div className="column"><label>교육시간</label></div>
            <div className="column">
              <div className="text1">
                {timeToHourMinuteFormat(cubeIntro.learningTime)}
                {/* {parseInt(String(cubeIntro.learningTime / 60), 10)}  h {cubeIntro.learningTime % 60} m*/}
              </div>
            </div>
          </div>
        </Form.Field>

        <Form.Field>
          <label>난이도</label>

          <div className="ui grid create">
            <div className="column">
              <Select placeholder="선택해주세요"
                className="dropdown"
                options={SelectType.difficulty}
                value={cubeIntro && cubeIntro.difficultyLevel || ''}
                onChange={(e: any, data: any) => this.onChangeCubeIntroProps('difficultyLevel', data.value)}
              />
            </div>
          </div>
        </Form.Field>

        <Form.Field>
          {/*<label>교육기관 / 출처</label>
          <div className="ui grid create">
            <div className="column">
              <Select placeholder="선택해주세요"
                className="dropdown w100"
                options={selectOptions02}
                defaultValue={selectOptions02[1].value}
              />
            </div>
            <div className="column">
              <div className="ui h48 input">
                <input type="text" name="" placeholder="직접입력 선택 시 활성화 됩니다." value="EBS 중학" />
                <Icon className="clear link" />
              </div>
            </div>
          </div>*/}
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

export default SharedDetailIntroEditContainer;
