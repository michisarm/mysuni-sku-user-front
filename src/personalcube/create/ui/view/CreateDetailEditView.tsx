import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Select, DropdownProps } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import SelectOptions from '../../model/SelectOptions';
import { mobxHelper } from '@nara.platform/accent';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { CreateCubeDetail } from '../../model/CreateCubeDetail';
import { timeToHourMinuteFormat } from '../../../../shared/helper/dateTimeHelper';
import ContentsProviderSelectContainer from '../logic/ContentsProviderSelectContainer';


interface CreateDetailEditViewProps {
  createCubeDetail: CreateCubeDetail,
  createCubeService?: CreateCubeService;
}


function CreateDetailEditView({
  createCubeDetail,
  createCubeService,
}: CreateDetailEditViewProps) {

  const { cube } = createCubeDetail;
  const { cubeSdo } = createCubeService!;

  const onChangeGoal = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    CreateCubeService.instance.changeCubeSdoProps('description.goal', e.target.value);

  };

  const onChangeApplicants = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    CreateCubeService.instance.changeCubeSdoProps('description.applicants', e.target.value);
  };

  const onChangeDescripiton = (content: string) => {
    CreateCubeService.instance.changeCubeSdoProps('description.description', content);
  };

  const onChangeGuide = (content: string) => {
    CreateCubeService.instance.changeCubeSdoProps('description.guide', content);
  };

  const onChangeDifficultyLevel = (e: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) =>{ 
    CreateCubeService.instance.changeCubeSdoProps('difficultyLevel', String(data.value));
  };

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
              <span className="now">{cubeSdo.description && cubeSdo.description.goal.length || 0}</span>/
              <span className="max">500</span>
            </span>
            <textarea
              placeholder="교육 목표를 입력해주세요. (최대 500자 입력 가능)"
              value={cubeSdo.description && cubeSdo.description.goal}
              onChange={onChangeGoal}
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
              <span className="now">{cubeSdo.description && cubeSdo.description.applicants.length || 0}</span>/
              <span className="max">500</span>
            </span>
            <textarea
              placeholder="교육 대상을 입력해주세요. (최대 500자 입력가능)"
              value={cubeSdo.description && cubeSdo.description.applicants}
              onChange={onChangeApplicants}
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
              modules={SelectOptions.modules}
              formats={SelectOptions.formats}
              onChange={onChangeDescripiton}
              value={cubeSdo.description && cubeSdo.description.description}
            />
          </div>
        </div>
      </Form.Field>
      <Form.Field>
        <div className="ui grid create create2">
          <div className="column"><label>이수조건</label></div>
          <div className="column">
            <div className="text1">{cubeSdo.description && cubeSdo.description.completionTerms}</div>
          </div>
        </div>
      </Form.Field>
      <Form.Field>
        <label>기타안내</label>
        <div className="ui editor-wrap">
          <ReactQuill theme="snow"
            modules={SelectOptions.modules}
            formats={SelectOptions.formats}
            onChange={onChangeGuide}
            value={cubeSdo.description && cubeSdo.description.guide}
          />
        </div>
      </Form.Field>
      <Form.Field>
        <div className="ui grid create create2">
          <div className="column"><label>교육시간</label></div>
          <div className="column">
            <div className="text1">
              {timeToHourMinuteFormat(cube.learningTime)}
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
              options={SelectOptions.difficulty}
              value={cubeSdo.difficultyLevel || ''}
              onChange={onChangeDifficultyLevel}
            />
          </div>
        </div>
      </Form.Field>
      <Form.Field>
        <ContentsProviderSelectContainer
          targetProps="operation.organizer"
          type="cubeInfo"
          defaultValue="hello"
            // cubeContents && cubeContents.operator && cubeIntro.operation.organizer && cubeIntro.operation.organizer.id
            // && JSON.stringify({ id: cubeIntro.operation.organizer.id, name: cubeIntro.operation.organizer.name })
        />
      </Form.Field>
    </>
  );
}

export default inject(mobxHelper.injectFrom(
  'personalCube.createCubeService',
))(observer(CreateDetailEditView));