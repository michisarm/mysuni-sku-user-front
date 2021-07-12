import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Form, Select, DropdownProps } from 'semantic-ui-react';
import classNames from 'classnames';
import ReactQuill from 'react-quill';
import SelectOptions from '../../model/SelectOptions';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { timeToHourMinuteFormat } from '../../../../shared/helper/dateTimeHelper';
import ContentsProviderContainer from '../logic/ContentsProviderContainer';
import { getPolyglotText, PolyglotText } from '../../../../shared/ui/logic/PolyglotText';


function CreateCubeEditView() {
  const [errorFieldName, setErrorFieldName] = useState<string>('');
  const { createCubeDetail, cubeSdo } = CreateCubeService.instance;

  const onChangeGoal = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

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

  const onChangeGuide = (content: string) => {
    CreateCubeService.instance.changeCubeSdoProps('description.guide', content);
  };

  const onChangeDifficultyLevel = (e: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) =>{
    e.preventDefault();
    const nextDifficultyLevel = String(data.value);
    CreateCubeService.instance.changeCubeSdoProps('difficultyLevel', nextDifficultyLevel);
  };

  return (
    <>
      <div className="section-tit">
        <span className="text1"><PolyglotText defaultString="교육정보" id="Create-DetailContentsEdit-교육정보" /></span>
      </div>
      <Form.Field>
        <label><PolyglotText defaultString="교육목표" id="Create-DetailContentsEdit-교육목표" /></label>
        <div className="ui form">
          <div className={classNames('ui right-top-count input', {error: errorFieldName === 'goal'})}>
            <span className="count">
              <span className="now">{cubeSdo.description?.goal.length || 0}</span>/
              <span className="max"><PolyglotText defaultString="500" id="Create-DetailContentsEdit-교육목표Max500" />500</span>
            </span>
            <textarea
              placeholder={getPolyglotText('교육 목표를 입력해주세요. (최대 500자 입력 가능)', 'Create-DetailContentsEdit-교육목표Sub')}
              value={cubeSdo.description?.goal}
              onChange={onChangeGoal}
            />
            <span className="validation"><PolyglotText defaultString="You can enter up to 500 characters." id="Create-DetailContentsEdit-교육목표Max500Alert" /></span>
          </div>
        </div>
      </Form.Field>
      <Form.Field>
        <label><PolyglotText defaultString="교육대상" id="Create-DetailContentsEdit-교육대상" /></label>
        <div className="ui form">
          <div className={classNames('ui right-top-count input', {error: errorFieldName === 'applicants'})}>
            <span className="count">
              <span className="now">{cubeSdo.description?.applicants.length || 0}</span>/
              <span className="max"><PolyglotText defaultString="500" id="Create-DetailContentsEdit-교육대상Max500" /></span>
            </span>
            <textarea
              placeholder={getPolyglotText('교육 대상을 입력해주세요. (최대 500자 입력가능)', 'Create-DetailContentsEdit-교육대상Sub')}
              value={cubeSdo.description?.applicants}
              onChange={onChangeApplicants}
            />
            <span className="validation"><PolyglotText defaultString="You can enter up to 500 characters." id="Create-DetailContentsEdit-교육대상Max500Alert" /></span>
          </div>
        </div>
      </Form.Field>
      <Form.Field>
        <label><PolyglotText defaultString="교육내용" id="Create-DetailContentsEdit-교육내용" /></label>
        <div className="ui editor-wrap">
          <div className="ui editor-wrap">
            <ReactQuill theme="snow"
              modules={SelectOptions.modules}
              formats={SelectOptions.formats}
              onChange={onChangeDescripiton}
              value={cubeSdo.description?.description}
            />
          </div>
        </div>
      </Form.Field>
      <Form.Field>
        <div className="ui grid create create2">
          <div className="column"><label><PolyglotText defaultString="이수조건" id="Create-DetailContentsEdit-이수조건" /></label></div>
          <div className="column">
            <div className="text1">{cubeSdo.description?.completionTerms}</div>
          </div>
        </div>
      </Form.Field>
      <Form.Field>
        <label><PolyglotText defaultString="기타안내" id="Create-DetailContentsEdit-기타안내" /></label>
        <div className="ui editor-wrap">
          <ReactQuill theme="snow"
            modules={SelectOptions.modules}
            formats={SelectOptions.formats}
            onChange={onChangeGuide}
            value={cubeSdo.description?.guide}
          />
        </div>
      </Form.Field>
      <Form.Field>
        <div className="ui grid create create2">
          <div className="column"><label><PolyglotText defaultString="교육시간" id="Create-DetailContentsEdit-교육시간" /></label></div>
          <div className="column">
            <div className="text1">
              {timeToHourMinuteFormat(createCubeDetail?.cube.learningTime || 0)}
            </div>
          </div>
        </div>
      </Form.Field>
      <Form.Field>
        <label><PolyglotText defaultString="난이도" id="Create-DetailContentsEdit-난이도" /></label>
        <div className="ui grid create">
          <div className="column">
            <Select placeholder={getPolyglotText('선택해주세요', 'Create-DetailContentsEdit-Difficulty')}
              className="dropdown"
              options={SelectOptions.difficulty}
              value={cubeSdo.difficultyLevel || ''}
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

const CreateCubeListViewDefault = observer(CreateCubeEditView);

export default CreateCubeListViewDefault;
