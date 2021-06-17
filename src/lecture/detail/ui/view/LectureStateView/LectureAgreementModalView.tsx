import React, { useRef } from 'react';
import { Button, Modal, Radio } from 'semantic-ui-react';
import ClassroomModalView from '../../../../category/ui/view/ClassroomModalView';
import {
  useRequsetLectureAgreementModal,
  onCloseLectureAgreementModal,
  onChangeLectureAgreementRadio,
  onConfirmLectureAgreement,
} from '../../../service/LectureAgreementModal/useLectureAgreementModal';
import {
  useLectureAgreementModal,
  initLectureAgreementModal,
} from '../../../store/LectureAgreementModalStore';

interface LectureAgreementModalProps {
  onShowClassroomModal?: () => void;
}

export function LectureAgreementModalView(props: LectureAgreementModalProps) {
  useRequsetLectureAgreementModal();

  const lectureAgreementModal =
    useLectureAgreementModal() || initLectureAgreementModal();

  const { onShowClassroomModal } = props;
  const {
    isOpen,
    organizedName,
    checkedName,
    showWarning,
  } = lectureAgreementModal;

  const ClassroomModalViewRef = useRef<ClassroomModalView>(null);

  return (
    <Modal
      open={isOpen}
      onClose={onCloseLectureAgreementModal}
      className="base w760 popup_info"
    >
      <Modal.Header>
        <strong>외부교육 개인 정보 제공 동의</strong>
        <span>개인정보 제공 동의 여부를 체크해주세요.</span>
      </Modal.Header>
      <Modal.Content>
        <div className="info_inner">
          <p className="info_txt1">
            {organizedName}
            <br /> 교육 수강을 위해 외부 기간에 하기 정보를 제공하는 것에 동의
            하십니까?
          </p>
          <p className="info_txt2">
            ※ 정보 제공 미동의 시 교육 수강이 불가합니다.
          </p>
          <div className="info_table">
            <table>
              <thead>
                <tr>
                  <th>제공 받는 자</th>
                  <th>제공받는 자의 이용 목적</th>
                  <th>제공하는 항목</th>
                  <th>보유 및 이용기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{organizedName}</td>
                  <td>
                    학습자 SSO 접속 <br />
                    학습이수 현황
                  </td>
                  <td>소속, 성명, 이메일</td>
                  <td>
                    퇴사 시 또는 <br />
                    회원가입 탈퇴 시
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="info_chk">
              <Radio
                className="base"
                label="동의"
                name="radioGroup"
                value="agree"
                checked={checkedName === 'agree'}
                onChange={onChangeLectureAgreementRadio}
                defaultChecked
              />
              <Radio
                className="base"
                label="동의하지 않음"
                name="radioGroup"
                value="disagree"
                checked={checkedName === 'disagree'}
                onChange={onChangeLectureAgreementRadio}
              />
            </div>
            <div className={`info_noti ${!showWarning && 'hidden'}`}>
              <i className="ico" /> 개인정보 제공 동의 여부를 체크해주세요.
            </div>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions className="actions3">
        <Button className="b_cancel" onClick={onCloseLectureAgreementModal}>
          취소
        </Button>
        <Button
          className="b_chk"
          onClick={() => {
            onConfirmLectureAgreement(onShowClassroomModal);
          }}
        >
          확인
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
