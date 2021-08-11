import React from 'react';
import { observer } from 'mobx-react';
import { FileBox2, ValidationType } from '@nara.drama/depot';
import { PatronType } from '@nara.platform/accent';
import { Form, Icon, TextArea } from 'semantic-ui-react';
import { depotHelper } from 'shared';
import { PolyglotText, getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { onClear } from '../aplCreate.events';
import { getFileBoxIdForReference, setChannel } from '../aplCreate.services';
import { AplModel } from 'myTraining/model';
import AplCollegeSelectView from './AplCollegeSelectView';
import AplDateSelectView from './AplDateSelectView';
import AplApprovalSelectView from './AplApprovalSelectView';
import AplCreateCollegeService from '../mobx/AplCreateCollegeService';
import AplTypeSelectView from './AplTypeSelectView';
import AplCreateLearningTimeView from './AplCreateLearningTimeView';

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
  const channelOptions = apl && apl.collegeId && setChannel();

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
      <AplTypeSelectView
        apl={apl}
        typeRef={focusInputRefs.type}
        typeNameRef={focusInputRefs.typeName}
        changeAplProps={changeAplProps}
      />
      <AplCollegeSelectView
        apl={apl}
        collegeOptions={collegeOptions}
        channelOptions={channelOptions}
        collegeRef={focusInputRefs.collegeId}
        channelRef={focusInputRefs.channelId}
        changeAplProps={changeAplProps}
      />
      <AplDateSelectView
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
      <Form.Field>
        <label>
          <PolyglotText id="개학등록-uisf-첨부파일" defaultString="첨부파일" />
        </label>
        <div className="lg-attach">
          <div className="attach-inner">
            <FileBox2
              vaultKey={{
                keyString: 'sku-depot',
                patronType: PatronType.Audience,
              }}
              patronKey={{
                keyString: 'sku-denizen',
                patronType: PatronType.Audience,
              }}
              validations={[
                {
                  type: ValidationType.Duplication,
                  validator: depotHelper.duplicationValidator,
                },
              ]}
              onChange={getFileBoxIdForReference}
            />
            <div className="bottom">
              <span className="text1">
                <Icon className="info16" />
                <span className="blind">information</span>
                <PolyglotText
                  id="개학등록-uisf-부가5"
                  defaultString="DOC,PPT,PDF,EXL 파일을 등록하실 수 있습니다. / 1개 이상의 첨부파일을 등록하실 수 있습니다."
                />
              </span>
            </div>
          </div>
        </div>
      </Form.Field>
      <AplApprovalSelectView apl={apl} approvalShow={approvalShow} />
    </>
  );
}

export default observer(AplCreateFormView);
