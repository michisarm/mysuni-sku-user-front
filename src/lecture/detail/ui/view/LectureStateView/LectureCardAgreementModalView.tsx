import React from 'react';
import { Button, Modal, Radio } from 'semantic-ui-react';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { initLectureCardPisAgreementModal } from '../../../viewModel/LectureCardPisAgreementModal';
import {
  nextPage,
  onChangeLectureCardPisAgreementRadio,
  onCloseLectureCardPisAgreementModal,
  onConfirmLectureCardPisAgreement,
  prevPage,
  setNumPages,
  useRequestLectureCardPisAgreementModal,
} from '../../../service/LectureCardAgreementModal/useLectureAgreemenetModal';
import { useLectureCardPisAgreementModal } from '../../../store/LectureCardPisAgreementStore';
import { Document, Page } from 'react-pdf';

interface LectureCardAgreementModalProps {
  cardId: string;
}

export function LectureCardAgreementModalView({
  cardId,
}: LectureCardAgreementModalProps) {
  useRequestLectureCardPisAgreementModal(cardId);

  const lectureCardPisAgreementModal =
    useLectureCardPisAgreementModal() || initLectureCardPisAgreementModal();
  const {
    isOpen,
    pisAgreementTitle,
    file,
    numPages,
    pageNumber,
    checkedName,
    showWarning,
  } = lectureCardPisAgreementModal;

  const onDocumentLoadSuccess = (pdf: any) => {
    setNumPages(pdf.numPages);
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => onCloseLectureCardPisAgreementModal(cardId)}
      className="base w760 popup_info"
    >
      <Modal.Header>
        <strong>{pisAgreementTitle}</strong>
      </Modal.Header>
      <Modal.Content>
        <div className="info_inner" style={{ paddingTop: '10px' }}>
          <span
            className="info_txt1"
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                `아래 내용을 확인 후 동의 여부를 체크해주세요. 미동의 시 교육 수강이 제한됩니다.`,
                'lecture-pisAgreement-info'
              ),
            }}
          />
          <div
            className="documents-viewer"
            style={{ border: '1px solid #37383c', marginTop: '20px' }}
          >
            <div style={{ maxHeight: '55vh' }} className="scrolling-80vh">
              <div style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <Document
                  renderMode="canvas"
                  file={file}
                  onLoadSuccess={onDocumentLoadSuccess}
                  error={
                    <div
                      style={{
                        position: 'relative',
                        height: '200px',
                        verticalAlign: 'middle',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '40%',
                          fontWeight: 'bold',
                        }}
                      >
                        PDF 파일을 읽어 올 수 없습니다.
                      </div>
                    </div>
                  }
                >
                  <Page
                    pageNumber={pageNumber}
                    renderAnnotationLayer={false}
                    width={690}
                  />
                </Document>
              </div>
            </div>
            <div className="pdf-control" style={{ height: '55px' }}>
              <div className="pagination">
                <a className="pdf-prev" onClick={prevPage}>
                  prev
                </a>
                <span className="num">
                  {pageNumber}/{numPages}
                </span>
                <a className="pdf-next" onClick={nextPage}>
                  next
                </a>
              </div>
            </div>
          </div>

          <div className="info_chk" style={{ paddingTop: '1.625rem' }}>
            <Radio
              className="base"
              label={getPolyglotText('동의', 'lecture-동의-동의')}
              name="radioGroup"
              value="agree"
              checked={checkedName === 'agree'}
              onChange={onChangeLectureCardPisAgreementRadio}
              defaultChecked
            />
            <Radio
              className="base"
              label={getPolyglotText('동의하지 않음', 'lecture-동의-비동의')}
              name="radioGroup"
              value="disagree"
              checked={checkedName === 'disagree'}
              onChange={onChangeLectureCardPisAgreementRadio}
            />
          </div>
          <div className={`info_noti ${!showWarning && 'hidden'}`}>
            <i className="ico" />
            <PolyglotText
              defaultString="동의 여부를 체크해주세요."
              id="lecture-pisAgreement-agreeInfoText"
            />
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions className="actions3">
        <Button
          className="b_cancel"
          onClick={() => onCloseLectureCardPisAgreementModal(cardId)}
        >
          <PolyglotText defaultString="취소" id="lecture-동의-취소" />
        </Button>
        <Button
          className="b_chk"
          onClick={() => {
            onConfirmLectureCardPisAgreement(cardId);
          }}
        >
          <PolyglotText defaultString="확인" id="lecture-동의-확인" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
