import React from 'react';
import { observer } from 'mobx-react';
import { Form, Icon, TextArea } from 'semantic-ui-react';
import { PolyglotText, getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { onClear } from '../aplCreate.events';
import { getChannelOptions } from './aplCreateForm.services';
import { AplModel } from 'myTraining/model';
import AplCreateCollegeView from './AplCreateCollegeView';
import AplCreateDateView from './AplCreateDateView';
import AplCreateApproverView from './AplCreateApproverView';
import AplCreateCollegeService from '../mobx/AplCreateCollegeService';
import AplCreateTypeView from './AplCreateTypeView';
import AplCreateLearningTimeView from './AplCreateLearningTimeView';
import AplCreateFileView from './AplCreateFileView';
import { onChangeFile } from './aplCreateForm.events';

interface AplCreateFormViewProps {
  apl: AplModel;
  focusInputRefs: any;
  approvalShow: boolean;
  changeAplProps: (
    name: string,
    value: string | {} | string[] | undefined
  ) => void;
  onChangeAplPropsValid: (name: string, value: string) => void;
  onChangeAplTimePropsValid: (name: string, value: string | number) => void;
}

function AplCreateFormView({
  apl,
  focusInputRefs,
  approvalShow,
  changeAplProps,
  onChangeAplPropsValid,
  onChangeAplTimePropsValid,
}: AplCreateFormViewProps) {
  const titleCount = (apl && apl.title && apl.title.length) || 0;
  const instituteCount = (apl && apl.institute && apl.institute.length) || 0;
  const contentCount = (apl && apl.content && apl.content.length) || 0;
  const { collegeOptions } = AplCreateCollegeService.instance;
  const channelOptions = apl && apl.collegeId && getChannelOptions();

  console.log(collegeOptions);

  return (
    <>
      <Form.Field>
        <label className="necessary">
          <PolyglotText id="개학등록-uisf-교육명" defaultString="교육명" />
        </label>
        <div
          className={
            titleCount === 0
              ? 'ui right-top-count input'
              : titleCount >= 100
              ? 'ui right-top-count write input error'
              : 'ui right-top-count write input'
          }
        >
          <span className="count">
            <span className="now">{titleCount}</span>/
            <span className="max">100</span>
          </span>
          <input
            id="title"
            type="text"
            placeholder={getPolyglotText(
              '교육명을 입력해주세요.',
              '개학등록-uisf-기본tt'
            )}
            value={(apl && apl.title) || ''}
            onChange={(e: any) => {
              onChangeAplPropsValid('title', e.target.value);
            }}
            ref={focusInputRefs.title}
          />
          <Icon
            aria-hidden="true"
            className="clear link"
            onClick={() => onClear('title')}
          />
          <span className="validation">
            <PolyglotText
              id="개학등록-uisf-교육명100"
              defaultString="최대 100자까지 입력 가능합니다."
            />
          </span>
        </div>
      </Form.Field>
      <AplCreateTypeView
        apl={apl}
        typeRef={focusInputRefs.type}
        typeNameRef={focusInputRefs.typeName}
        changeAplProps={changeAplProps}
      />
      <AplCreateCollegeView
        apl={apl}
        collegeOptions={collegeOptions}
        channelOptions={channelOptions}
        collegeRef={focusInputRefs.collegeId}
        channelRef={focusInputRefs.channelId}
        changeAplProps={changeAplProps}
      />
      <AplCreateDateView
        apl={apl}
        startDateRef={focusInputRefs.startDate}
        endDateRef={focusInputRefs.endDate}
        changeAplProps={changeAplProps}
      />
      <Form.Field>
        <label className="necessary">
          <PolyglotText id="개학등록-uisf-교육기관" defaultString="교육기관" />
        </label>
        <div
          className={
            instituteCount === 0
              ? 'ui right-top-count input'
              : instituteCount >= 100
              ? 'ui right-top-count write input error'
              : 'ui right-top-count write input'
          }
        >
          <span className="count">
            <span className="now">{instituteCount}</span>/
            <span className="max">100</span>
          </span>
          <input
            id="institute"
            type="text"
            placeholder={getPolyglotText(
              '교육을 수료한 기관명을 입력해주세요.',
              '개학등록-uisf-기관입력'
            )}
            value={(apl && apl.institute) || ''}
            onChange={(e: any) =>
              onChangeAplPropsValid('institute', e.target.value)
            }
            ref={focusInputRefs.institute}
          />
          <Icon
            aria-hidden="true"
            className="clear link"
            onClick={() => onClear('institute')}
          />
          <span className="validation">
            <PolyglotText
              id="개학등록-uisf-백자입력"
              defaultString="최대 100자까지 입력 가능합니다."
            />
          </span>
        </div>
      </Form.Field>
      <AplCreateLearningTimeView
        apl={apl}
        requestHourRef={focusInputRefs.requestHour}
        requestMinuteRef={focusInputRefs.requestMinute}
        onChangeAplTimePropsValid={onChangeAplTimePropsValid}
      />
      <Form.Field>
        <label className="necessary">
          <PolyglotText id="개학등록-uisf-교육내용" defaultString="교육내용" />
        </label>
        <div className="ui form">
          <div
            className={
              contentCount >= 1000
                ? 'ui right-top-count write input error'
                : 'ui right-top-count write input'
            }
          >
            <span className="count">
              <span className="now">{contentCount}</span>/
              <span className="max">1000</span>
            </span>
            <TextArea
              id="content"
              type="text"
              placeholder={getPolyglotText(
                '교육내용을 1,000자 이내로 입력해주세요.',
                '개학등록-uisf-기본내용'
              )}
              value={(apl && apl.content) || ''}
              onChange={(e: any) =>
                onChangeAplPropsValid('content', e.target.value)
              }
              ref={focusInputRefs.content}
            />
            <span className="validation">
              <PolyglotText
                id="개학등록-uisf-천자입력"
                defaultString="최대 1000자 까지 입력 가능합니다."
              />
            </span>
          </div>
        </div>
      </Form.Field>
      <AplCreateFileView onChangeFile={onChangeFile} />
      <AplCreateApproverView apl={apl} approvalShow={approvalShow} />
    </>
  );
}

export default observer(AplCreateFormView);
