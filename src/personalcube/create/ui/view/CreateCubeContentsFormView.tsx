import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { Form, Select, Icon, DropdownProps } from 'semantic-ui-react';
import classNames from 'classnames';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import ContentsProviderContainer from '../logic/ContentsProviderContainer';
import ReactQuill from 'react-quill';
import SelectOptions from '../../model/SelectOptions';
import { timeToHourMinute } from '../../../../shared/helper/dateTimeHelper';


interface CreateCubeContentsFormViewProps {
  createCubeService?: CreateCubeService;
}

function CreateCubeContentsFormView({
  createCubeService,
}: CreateCubeContentsFormViewProps) {
  const [errorFieldName, setErrorFieldName] = useState<string>('');

  const { cubeSdo } = createCubeService!;
  const { hour, minute } = timeToHourMinute(cubeSdo.learningTime || 0);

  const onChangeGoal = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()

    if(e.target.value.length > 500) {
      setErrorFieldName('goal');
    } else {
      setErrorFieldName('');
      CreateCubeService.instance.changeCubeSdoProps('description.goal', e.target.value);
    }
  };

  const onChangeApplicants = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    if(e.target.value.length > 500) {
      setErrorFieldName('applicants');
    } else {
      setErrorFieldName('');
      CreateCubeService.instance.changeCubeSdoProps('description.applicants', e.target.value);
    }
  };

  const onChangeDescripiton = (content: string) => {
    CreateCubeService.instance.changeCubeSdoProps('description.description', content);
  };

  const onChangeCompletionTerms = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    if(e.target.value.length > 1000) {
      setErrorFieldName('completionTerms');
    } else {
      setErrorFieldName('');
      CreateCubeService.instance.changeCubeSdoProps('description.completionTerms', e.target.value);
    }
  };

  const onChangeGuide = (content: string) => {
    CreateCubeService.instance.changeCubeSdoProps('description.guide', content);
  };

  const onChangeDifficultyLevel = (e: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) =>{
    e.preventDefault();
    CreateCubeService.instance.changeCubeSdoProps('difficultyLevel', String(data.value));
  };

  const onChangeLearningHour = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const nextHour = parseInt(e.target.value) || 0;
    
    if(nextHour > 40) {
      return;
    }

    if(nextHour === 40 && minute > 0) {
      CreateCubeService.instance.changeCubeSdoProps('learningTime', 40 * 60);
      return;
    }

    CreateCubeService.instance.changeCubeSdoProps('learningTime', nextHour * 60 + minute);
  };

  const onChangeLearningMinute = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const nextMinute = parseInt(e.target.value) || 0;
    
    if(nextMinute >= 60) {
      return;
    }

    if(hour >= 40) {
      CreateCubeService.instance.changeCubeSdoProps('learningTime', 40 * 60);
      return;
    }

    CreateCubeService.instance.changeCubeSdoProps('learningTime', hour * 60 + nextMinute);
  };


  return (
    <>
      <Form.Field>
        <label className="necessary">교육목표</label>
        <div className="ui form">
          <div className={classNames('ui right-top-count input', { error: errorFieldName === 'goal' })}>
            <span className="count">
              <span className="now">
                {cubeSdo.description?.goal.length || 0}
              </span>/
              <span className="max">500</span>
            </span>
            <textarea placeholder="교육 목표를 입력해주세요. (최대 500자 입력 가능)"
              value={cubeSdo.description?.goal}
              onChange={onChangeGoal}
            />
            <span className="validation">You can enter up to 500 characters.</span>
          </div>
        </div>
      </Form.Field>
      <Form.Field>
        <label className="necessary">교육대상</label>
        <div className={classNames('ui right-top-count input', { error: errorFieldName === 'applicants' })}>
          <span className="count">
            <span className="now">{cubeSdo.description?.applicants.length || 0}</span>/
            <span className="max">500</span>
          </span>
          <textarea placeholder="교육 대상을 입력해주세요. (최대 500자 입력가능)"
            value={cubeSdo.description?.applicants}
            onChange={onChangeApplicants}
          />
          <span className="validation">You can enter up to 500 characters.</span>
        </div>
      </Form.Field>
      <Form.Field>
        <label className="necessary">교육내용</label>
        <div className="ui editor-wrap">
          <ReactQuill
            theme="snow"
            modules={SelectOptions.modules}
            formats={SelectOptions.formats}
            value={cubeSdo.description?.description}
            onChange={onChangeDescripiton}
          />
        </div>
      </Form.Field>
      <Form.Field>
        <label>이수조건</label>
        <div className={classNames('ui right-top-count input', { error: errorFieldName === 'completionTerms' })}>
          <span className="count">
            <span className="now">{cubeSdo.description?.completionTerms.length || 0}
            </span>/
            <span className="max">1000</span>
          </span>
          <textarea
            placeholder="이수조건을 입력해주세요."
            value={cubeSdo.description?.completionTerms}
            onChange={onChangeCompletionTerms}
          />
          <span className="validation">You can enter up to 1000 characters.</span>
        </div>
      </Form.Field>
      <Form.Field>
        <label>기타안내</label>
        <div className="ui editor-wrap">
          <ReactQuill
            theme="snow"
            modules={SelectOptions.modules}
            formats={SelectOptions.formats}
            value={cubeSdo.description?.guide}
            onChange={onChangeGuide}
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
                value={hour}
                onChange={onChangeLearningHour}
              />
              <label>h</label>
              <Icon className="clear link" />
            </div>
            <div className="ui h48 input time">
              <input
                type="text"
                value={minute}
                onChange={onChangeLearningMinute}
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
              value={cubeSdo.difficultyLevel}
              options={SelectOptions.difficulty}
              onChange={onChangeDifficultyLevel}
            />
          </div>
        </div>
      </Form.Field>
      <Form.Field>
        <ContentsProviderContainer />
      </Form.Field>
    </>
  );
}

const CreateCubeContentsFormViewDefault = inject(mobxHelper.injectFrom(
  'personalCube.createCubeService',
))(observer(CreateCubeContentsFormView));

export default CreateCubeContentsFormViewDefault;