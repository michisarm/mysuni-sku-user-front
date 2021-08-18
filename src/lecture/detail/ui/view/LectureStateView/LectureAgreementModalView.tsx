import React from 'react';
import { Button, Modal, Radio } from 'semantic-ui-react';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
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
  const { isOpen, organizedName, checkedName, showWarning } =
    lectureAgreementModal;

  return (
    <Modal
      open={isOpen}
      onClose={onCloseLectureAgreementModal}
      className="base w760 popup_info"
    >
      <Modal.Header>
        <strong>
          <PolyglotText
            defaultString="외부교육 개인 정보 제공 동의"
            id="lecture-동의-제목"
          />{' '}
        </strong>
        <span>
          <PolyglotText
            defaultString="개인정보 제공 동의 여부를 체크해주세요."
            id="lecture-동의-설명1"
          />{' '}
        </span>
      </Modal.Header>
      <Modal.Content>
        <div className="info_inner">
          <p className="info_txt1">
            {organizedName}
            <br />
            <PolyglotText
              defaultString="교육 수강을 위해 외부 기간에 하기 정보를 제공하는 것에 동의 하십니까?"
              id="lecture-동의-설명2"
            />
          </p>
          <p className="info_txt2">
            <PolyglotText
              defaultString="※ 정보 제공 미동의 시 교육 수강이 불가합니다."
              id="lecture-동의-주의"
            />
          </p>
          <div className="info_table">
            <table>
              <thead>
                <tr>
                  <th>
                    <PolyglotText
                      defaultString="제공 받는 자"
                      id="lecture-동의-항목1"
                    />
                  </th>
                  <th>
                    <PolyglotText
                      defaultString="제공받는 자의 이용 목적"
                      id="lecture-동의-항목2"
                    />
                  </th>
                  <th>
                    <PolyglotText
                      defaultString="제공하는 항목"
                      id="lecture-동의-항목3"
                    />
                  </th>
                  <th>
                    <PolyglotText
                      defaultString="보유 및 이용기간"
                      id="lecture-동의-항목4"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{organizedName}</td>
                  <td
                    dangerouslySetInnerHTML={{
                      __html: getPolyglotText(
                        '학습자 SSO 접속 <br /> 학습이수 현황',
                        'lecture-동의-내용1'
                      ),
                    }}
                  />
                  <td>
                    <PolyglotText
                      defaultString="소속, 성명, 이메일"
                      id="lecture-동의-내용2"
                    />
                  </td>
                  <td
                    dangerouslySetInnerHTML={{
                      __html: getPolyglotText(
                        '퇴사 시 또는 <br /> 회원가입 탈퇴 시',
                        'lecture-동의-내용3'
                      ),
                    }}
                  />
                </tr>
              </tbody>
            </table>
            <div className="info_chk">
              <Radio
                className="base"
                label={getPolyglotText('동의', 'lecture-동의-동의')}
                name="radioGroup"
                value="agree"
                checked={checkedName === 'agree'}
                onChange={onChangeLectureAgreementRadio}
                defaultChecked
              />
              <Radio
                className="base"
                label={getPolyglotText('동의하지 않음', 'lecture-동의-비동의')}
                name="radioGroup"
                value="disagree"
                checked={checkedName === 'disagree'}
                onChange={onChangeLectureAgreementRadio}
              />
            </div>
            <div className={`info_noti ${!showWarning && 'hidden'}`}>
              <i className="ico" />
              <PolyglotText
                defaultString="개인정보 제공 동의 여부를 체크해주세요."
                id="lecture-동의-안내"
              />
            </div>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions className="actions3">
        <Button className="b_cancel" onClick={onCloseLectureAgreementModal}>
          <PolyglotText defaultString="취소" id="lecture-동의-취소" />
        </Button>
        <Button
          className="b_chk"
          onClick={() => {
            onConfirmLectureAgreement(onShowClassroomModal);
          }}
        >
          <PolyglotText defaultString="확인" id="lecture-동의-확인" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
