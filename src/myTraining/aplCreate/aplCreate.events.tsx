import React from 'react';
import routePaths from 'myTraining/routePaths';
import { getCurrentHistory } from 'shared/store/HistoryStore';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import { AplService } from 'myTraining/stores';
import AplCreateFocusService from './mobx/AplCreateFocusService';
import {
  confirmBlank,
  confirmList,
  confirmSave,
  confirmSaveCheck,
} from './aplCreateModal/aplCreateModal.events';
import { AplModel } from 'myTraining/model';
import { AplState } from 'myTraining/model/AplState';
import { ApprovalMemberModel } from 'approval/member/model/ApprovalMemberModel';
import { CollegeService } from 'college/stores';

export async function handleSave(mode: string) {
  const { apl } = AplService.instance;
  const aplObject = AplModel.isBlank(apl);
  let aplMessageList = (
    <>
      <p className="center">
        {aplObject}
        <PolyglotText
          id="개학등록-승인요청-필수입력"
          defaultString="은(는) 필수 입력 항목입니다."
        />
      </p>
      <p className="center">
        <PolyglotText
          id="개학등록-승인요청-승인요청"
          defaultString="해당 정보를 입력하신 후 승인 요청 해주세요."
        />
      </p>
    </>
  );
  const { aplCreateFocus, setAplCreateFocus } = AplCreateFocusService.instance;
  setAplCreateFocus({
    ...aplCreateFocus,
    objStr: aplObject,
    focusYn: 'Y',
  });

  if (aplObject !== 'success') {
    confirmBlank(aplMessageList);
    return;
  }

  if (apl.period.endDateLong < apl.period.startDateLong) {
    aplMessageList = (
      <>
        <p className="center">
          {' '}
          <PolyglotText
            id="개학등록-승인요청-교육일자"
            defaultString="교육 종료일자는 시작일과 같거나 이후여야 합니다."
          />
        </p>
      </>
    );
    confirmSaveCheck(aplMessageList);
    const {
      aplCreateFocus,
      setAplCreateFocus,
    } = AplCreateFocusService.instance;
    setAplCreateFocus({
      ...aplCreateFocus,
      objStr: '교육종료일자',
      focusYn: 'Y',
    });

    return;
  }

  if (aplObject === 'success') {
    const {
      aplCreateFocus,
      setAplCreateFocus,
    } = AplCreateFocusService.instance;
    setAplCreateFocus({
      ...aplCreateFocus,
      objStr: '',
      focusYn: 'N',
    });
    //message = '입력된 내용으로 '+title+' 승인요청 하시겠습니까?';
    aplMessageList = (
      <>
        <p className="center">
          {' '}
          <PolyglotText
            id="개학등록-승인요청-상세1"
            defaultString="입력된 내용으로 개인학습 정보를 승인 요청하시겠습니까?"
          />
        </p>
        <p className="center">
          {' '}
          <PolyglotText
            id="개학등록-승인요청-상세2"
            defaultString="승인 요청 후에는 개인학습 정보를 변경하실 수 없습니다."
          />
        </p>
      </>
    );
    confirmSave(aplMessageList, mode);
  }

  AplService.instance.changeAplProps('state', AplState.OpenApproval);
}

export function handleCancel(mode?: string) {
  const aplMessageList = (
    <>
      <p className="center">
        <PolyglotText
          id="개학등록-승인요청-정보등록"
          defaultString="개인학습 정보 등록을 취소하시겠습니까?"
        />
      </p>
      <p className="center">
        <PolyglotText
          id="개학등록-승인요청-취소안내"
          defaultString="취소 시 입력했던 정보는 저장되지 않습니다."
        />
      </p>
    </>
  );
  confirmList(aplMessageList);
  const { aplCreateFocus, setAplCreateFocus } = AplCreateFocusService.instance;
  setAplCreateFocus({
    ...aplCreateFocus,
    objStr: '',
    focusYn: 'N',
  });
}

export function routeToList() {
  const currentHistory = getCurrentHistory();
  currentHistory?.push(routePaths.myPageLearningTab('PersonalCompleted'));
}

export function onChangeAplTimePropsValid(
  name: string,
  value: string | number
) {
  if (typeof value !== 'number') {
    value = value.replace(/[^0-9]/g, '');
    if (value === '') value = 0;
  } else {
    value = Number(String(value).replace(/[^0-9]/g, ''));
  }
  if (value === '') value = 0;

  const invalidHour = Number(value) >= 100 || Number(value) < 0;
  const invalidMin = Number(value) > 59 || Number(value) < 0;

  if (name === 'requestHour') {
    if (invalidHour) {
      return;
    }
  }

  if (name === 'requestMinute') {
    if (invalidMin) {
      return;
    }
  }

  if (Number(String(value)) < 0) value = 0;

  AplService.instance.changeAplProps(name, value);
}

export function onChangeAplPropsValid(name: string, value: string) {
  const invalid = value.length > 100;
  const invalidContent = value.length > 1000;
  if (name === 'title' || name === 'typeName' || name === 'institute') {
    if (invalid) {
      return;
    }
  }

  if (name === 'content') {
    if (invalidContent) {
      return;
    }
  }

  AplService.instance.changeAplProps(name, value);
}

export function onResetFocusControl() {
  const { aplCreateFocus, setAplCreateFocus } = AplCreateFocusService.instance;
  setAplCreateFocus({
    ...aplCreateFocus,
    focusControlName: '',
  });
}

export function onClickManagerListOk(approvalMember: ApprovalMemberModel) {
  const aplService = AplService.instance;
  aplService.changeAplProps('approvalUserIdentity.id', approvalMember.id);
  aplService.changeAplProps('approvalUserIdentity.email', approvalMember.email);
  aplService.changeAplProps('approvalUserIdentity.name', approvalMember.name);
  aplService.changeAplProps(
    'approvalUserIdentity.companyName',
    approvalMember.companyName
  );
  aplService.changeAplProps(
    'approvalUserIdentity.departmentName',
    approvalMember.departmentName
  );
}

export function onClear(name: string) {
  if (name === 'requestHour' || name === 'requestMinute') {
    onChangeAplTimePropsValid(name, 0);
  } else {
    AplService.instance.changeAplProps(name, '');
  }
}

export function selectCollege(name: string, collegeId: string) {
  const aplService = AplService.instance;
  const collegeService = CollegeService.instance;
  if (collegeService && collegeId !== 'Select') {
    collegeService
      .findMainCollege(collegeId)
      .then(() => aplService.changeAplProps(name, collegeId))
      .then(() => {
        aplService.changeAplProps('channelId', 'Select');
      });
  } else if (collegeService && collegeId === 'Select') {
    aplService.changeAplProps(name, collegeId);
  }
}
