import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Form, Select, Icon, DropdownProps } from 'semantic-ui-react';
import classNames from 'classnames';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import ContentsProviderContainer from '../logic/ContentsProviderContainer';
import ReactQuill from 'react-quill';
import SelectOptions from '../../model/SelectOptions';
import { timeToHourMinute } from '../../../../shared/helper/dateTimeHelper';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

function CreateCubeContentsFormView() {
  const [errorFieldName, setErrorFieldName] = useState<string>('');

  const { cubeSdo } = CreateCubeService.instance;
  const { hour, minute } = timeToHourMinute(cubeSdo.learningTime || 0);

  const onChangeGoal = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    if (e.target.value.length > 500) {
      setErrorFieldName('goal');
    } else {
      setErrorFieldName('');
      const polyglotString = { en: null, ko: e.target.value, zh: null };
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

  const onChangeCompletionTerms = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    if (e.target.value.length > 1000) {
      setErrorFieldName('completionTerms');
    } else {
      setErrorFieldName('');
      const polyglotString = { en: null, ko: e.target.value, zh: null };
      CreateCubeService.instance.changeCubeSdoProps(
        'description.completionTerms',
        polyglotString
      );
    }
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

  const onChangeLearningHour = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const nextHour = parseInt(e.target.value) || 0;

    if (nextHour > 40) {
      return;
    }

    if (nextHour === 40 && minute > 0) {
      CreateCubeService.instance.changeCubeSdoProps('learningTime', 40 * 60);
      return;
    }

    CreateCubeService.instance.changeCubeSdoProps(
      'learningTime',
      nextHour * 60 + minute
    );
  };

  const onChangeLearningMinute = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const nextMinute = parseInt(e.target.value) || 0;

    if (nextMinute >= 60) {
      return;
    }

    if (hour >= 40) {
      CreateCubeService.instance.changeCubeSdoProps('learningTime', 40 * 60);
      return;
    }

    CreateCubeService.instance.changeCubeSdoProps(
      'learningTime',
      hour * 60 + nextMinute
    );
  };

  return (
    <>
      <Form.Field>
        <label className="necessary">
          <PolyglotText defaultString="????????????" id="Create-NM-????????????" />
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
                  id="Create-NM-????????????Max500"
                />
              </span>
            </span>
            <textarea
              placeholder={getPolyglotText(
                '?????? ????????? ??????????????????. (?????? 500??? ?????? ??????)',
                'Create-NM-????????????Sub'
              )}
              value={parsePolyglotString(cubeSdo.description?.goal)}
              onChange={onChangeGoal}
            />
            <span className="validation">
              <PolyglotText
                defaultString="You can enter up to 500 characters."
                id="Create-NM-????????????Max500Alert"
              />
            </span>
          </div>
        </div>
      </Form.Field>
      <Form.Field>
        <label className="necessary">
          <PolyglotText defaultString="????????????" id="Create-NM-????????????" />
        </label>
        <div
          className={classNames('ui right-top-count input', {
            error: errorFieldName === 'applicants',
          })}
        >
          <span className="count">
            <span className="now">
              {parsePolyglotString(cubeSdo.description?.applicants).length || 0}
            </span>
            /
            <span className="max">
              <PolyglotText defaultString="500" id="Create-NM-????????????Max500" />
            </span>
          </span>
          <textarea
            placeholder={getPolyglotText(
              '?????? ????????? ??????????????????. (?????? 500??? ????????????)',
              'Create-NM-????????????Sub'
            )}
            value={parsePolyglotString(cubeSdo.description?.applicants)}
            onChange={onChangeApplicants}
          />
          <span className="validation">
            <PolyglotText
              defaultString="You can enter up to 500 characters."
              id="Create-NM-????????????Max500"
            />
          </span>
        </div>
      </Form.Field>
      <Form.Field>
        <label className="necessary">
          <PolyglotText defaultString="????????????" id="Create-NM-????????????" />
        </label>
        <div className="ui editor-wrap">
          <ReactQuill
            theme="snow"
            modules={SelectOptions.modules}
            formats={SelectOptions.formats}
            value={parsePolyglotString(cubeSdo.description?.description)}
            onChange={onChangeDescripiton}
          />
        </div>
      </Form.Field>
      <Form.Field>
        <label>
          <PolyglotText defaultString="????????????" id="Create-NM-????????????" />
        </label>
        <div
          className={classNames('ui right-top-count input', {
            error: errorFieldName === 'completionTerms',
          })}
        >
          <span className="count">
            <span className="now">
              {parsePolyglotString(cubeSdo.description?.completionTerms)
                .length || 0}
            </span>
            /
            <span className="max">
              <PolyglotText
                defaultString="1000"
                id="Create-NM-????????????Max1000"
              />
            </span>
          </span>
          <textarea
            placeholder={getPolyglotText(
              '??????????????? ??????????????????.',
              'Create-NM-????????????Sub'
            )}
            value={parsePolyglotString(cubeSdo.description?.completionTerms)}
            onChange={onChangeCompletionTerms}
          />
          <span className="validation">
            <PolyglotText
              defaultString="You can enter up to 1000 characters."
              id="Create-NM-????????????Max1000Alert"
            />
          </span>
        </div>
      </Form.Field>
      <Form.Field>
        <label>
          <PolyglotText defaultString="????????????" id="Create-NM-????????????" />
        </label>
        <div className="ui editor-wrap">
          <ReactQuill
            theme="snow"
            modules={SelectOptions.modules}
            formats={SelectOptions.formats}
            value={parsePolyglotString(cubeSdo.description?.guide)}
            onChange={onChangeGuide}
          />
        </div>
      </Form.Field>
      <Form.Field>
        <div className="ui grid create">
          <div className="column">
            <label className="necessary">
              <PolyglotText defaultString="????????????" id="Create-NM-????????????" />
            </label>
            <div className="ui h48 input time">
              <input type="text" value={hour} onChange={onChangeLearningHour} />
              <label>
                <PolyglotText defaultString="h" id="Create-NM-????????????h" />
              </label>
              <Icon className="clear link" />
            </div>
            <div className="ui h48 input time">
              <input
                type="text"
                value={minute}
                onChange={onChangeLearningMinute}
              />
              <label>
                <PolyglotText defaultString="m" id="Create-NM-????????????m" />
              </label>
              <Icon className="clear link" />
            </div>
          </div>
          <div className="column">
            <label>
              <PolyglotText defaultString="?????????" id="Create-NM-?????????" />
            </label>
            <Select
              className="dropdown"
              placeholder={getPolyglotText('??????????????????', 'Create-NM-default')}
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

const CreateCubeContentsFormViewDefault = observer(CreateCubeContentsFormView);

export default CreateCubeContentsFormViewDefault;
