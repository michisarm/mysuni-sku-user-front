import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Form, Select, DropdownProps } from 'semantic-ui-react';
import classNames from 'classnames';
import ReactQuill from 'react-quill';
import SelectOptions from '../../model/SelectOptions';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { timeToHourMinuteFormat } from '../../../../shared/helper/dateTimeHelper';
import ContentsProviderContainer from '../logic/ContentsProviderContainer';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

function CreateCubeEditView() {
  const [errorFieldName, setErrorFieldName] = useState<string>('');
  const { createCubeDetail, cubeSdo } = CreateCubeService.instance;

  const onChangeGoal = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    if (e.target.value.length > 500) {
      setErrorFieldName('goal');
    } else {
      const polyglotString = { en: null, ko: e.target.value, zh: null };
      setErrorFieldName('');
      CreateCubeService.instance.changeCubeSdoProps(
        'description.goal',
        polyglotString
      );
    }
  };

  const onChangeApplicants = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    if (e.target.value.length > 500) {
      setErrorFieldName('applicants');
    } else {
      setErrorFieldName('');
      const polyglotString = { en: null, ko: e.target.value, zh: null };
      CreateCubeService.instance.changeCubeSdoProps(
        'description.applicants',
        polyglotString
      );
    }
  };

  const onChangeDescripiton = (content: string) => {
    const polyglotString = { en: null, ko: content, zh: null };
    CreateCubeService.instance.changeCubeSdoProps(
      'description.description',
      polyglotString
    );
  };

  const onChangeGuide = (content: string) => {
    const polyglotString = { en: null, ko: content, zh: null };
    CreateCubeService.instance.changeCubeSdoProps(
      'description.guide',
      polyglotString
    );
  };

  const onChangeDifficultyLevel = (
    e: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    e.preventDefault();
    const nextDifficultyLevel = String(data.value);
    CreateCubeService.instance.changeCubeSdoProps(
      'difficultyLevel',
      nextDifficultyLevel
    );
  };

  return (
    <>
      <div className="section-tit">
        <span className="text1">
          <PolyglotText
            defaultString="????????????"
            id="Create-DetailContentsEdit-????????????"
          />
        </span>
      </div>
      <Form.Field>
        <label>
          <PolyglotText
            defaultString="????????????"
            id="Create-DetailContentsEdit-????????????"
          />
        </label>
        <div className="ui form">
          <div
            className={classNames('ui right-top-count input', {
              error: errorFieldName === 'goal',
            })}
          >
            <span className="count">
              <span className="now">
                {parsePolyglotString(cubeSdo.description?.goal).length || 0}
              </span>
              /
              <span className="max">
                <PolyglotText
                  defaultString="500"
                  id="Create-DetailContentsEdit-????????????Max500"
                />
              </span>
            </span>
            <textarea
              placeholder={getPolyglotText(
                '?????? ????????? ??????????????????. (?????? 500??? ?????? ??????)',
                'Create-DetailContentsEdit-????????????Sub'
              )}
              value={parsePolyglotString(cubeSdo.description?.goal)}
              onChange={onChangeGoal}
            />
            <span className="validation">
              <PolyglotText
                defaultString="You can enter up to 500 characters."
                id="Create-DetailContentsEdit-????????????Max500Alert"
              />
            </span>
          </div>
        </div>
      </Form.Field>
      <Form.Field>
        <label>
          <PolyglotText
            defaultString="????????????"
            id="Create-DetailContentsEdit-????????????"
          />
        </label>
        <div className="ui form">
          <div
            className={classNames('ui right-top-count input', {
              error: errorFieldName === 'applicants',
            })}
          >
            <span className="count">
              <span className="now">
                {parsePolyglotString(cubeSdo.description?.applicants).length ||
                  0}
              </span>
              /
              <span className="max">
                <PolyglotText
                  defaultString="500"
                  id="Create-DetailContentsEdit-????????????Max500"
                />
              </span>
            </span>
            <textarea
              placeholder={getPolyglotText(
                '?????? ????????? ??????????????????. (?????? 500??? ????????????)',
                'Create-DetailContentsEdit-????????????Sub'
              )}
              value={parsePolyglotString(cubeSdo.description?.applicants)}
              onChange={onChangeApplicants}
            />
            <span className="validation">
              <PolyglotText
                defaultString="You can enter up to 500 characters."
                id="Create-DetailContentsEdit-????????????Max500Alert"
              />
            </span>
          </div>
        </div>
      </Form.Field>
      <Form.Field>
        <label>
          <PolyglotText
            defaultString="????????????"
            id="Create-DetailContentsEdit-????????????"
          />
        </label>
        <div className="ui editor-wrap">
          <div className="ui editor-wrap">
            <ReactQuill
              theme="snow"
              modules={SelectOptions.modules}
              formats={SelectOptions.formats}
              onChange={onChangeDescripiton}
              value={parsePolyglotString(cubeSdo.description?.description)}
            />
          </div>
        </div>
      </Form.Field>
      <Form.Field>
        <div className="ui grid create create2">
          <div className="column">
            <label>
              <PolyglotText
                defaultString="????????????"
                id="Create-DetailContentsEdit-????????????"
              />
            </label>
          </div>
          <div className="column">
            <div className="text1">
              {parsePolyglotString(cubeSdo.description?.completionTerms)}
            </div>
          </div>
        </div>
      </Form.Field>
      <Form.Field>
        <label>
          <PolyglotText
            defaultString="????????????"
            id="Create-DetailContentsEdit-????????????"
          />
        </label>
        <div className="ui editor-wrap">
          <ReactQuill
            theme="snow"
            modules={SelectOptions.modules}
            formats={SelectOptions.formats}
            onChange={onChangeGuide}
            value={parsePolyglotString(cubeSdo.description?.guide)}
          />
        </div>
      </Form.Field>
      <Form.Field>
        <div className="ui grid create create2">
          <div className="column">
            <label>
              <PolyglotText
                defaultString="????????????"
                id="Create-DetailContentsEdit-????????????"
              />
            </label>
          </div>
          <div className="column">
            <div className="text1">
              {timeToHourMinuteFormat(createCubeDetail?.cube.learningTime || 0)}
            </div>
          </div>
        </div>
      </Form.Field>
      <Form.Field>
        <label>
          <PolyglotText
            defaultString="?????????"
            id="Create-DetailContentsEdit-?????????"
          />
        </label>
        <div className="ui grid create">
          <div className="column">
            <Select
              placeholder={getPolyglotText(
                '??????????????????',
                'Create-DetailContentsEdit-Difficulty'
              )}
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
