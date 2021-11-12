import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import { initLectureCardPisAgreementModal } from '../../../viewModel/LectureCardPisAgreementModal';
import {
  onCloseLectureCardPisAgreementModal,
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
  } = lectureCardPisAgreementModal;

  const onDocumentLoadSuccess = (pdf: any) => {
    setNumPages(pdf.numPages);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onCloseLectureCardPisAgreementModal}
      className="base w760 popup_info"
    >
      <Modal.Header>
        <strong>{pisAgreementTitle}</strong>
      </Modal.Header>
      <Modal.Content>
        <div className="info_inner">
          <p className="info_txt1">
            <PolyglotText
              defaultString="아래 내용을 확인 후 동의 여부를 체크해주세요. 미동의 시 교육 수강이 제한됩니다."
              id="lecture-pisAgreement-info"
            />
          </p>
        </div>
        <div className="documents-viewer">
          <div className="scrolling-80vh">
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
                  // pageNumber={pageNumber}
                  pageNumber={1}
                  renderAnnotationLayer={false}
                  width={974.5}
                />
              </Document>
            </div>
          </div>
          <div className="pdf-control">
            <div className="pagination">
              <a className="pdf-prev" onClick={() => {}}>
                prev
              </a>
              <span className="num">
                {pageNumber}/{numPages}
              </span>
              <a className="pdf-next" onClick={() => {}}>
                next
              </a>
            </div>
            {/*<div className="pdf-bar"><span className="pdf-gauge" style={{ width: `${bar.toString()}%` }} /></div>*/}
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions className="actions3">
        <Button
          className="b_cancel"
          onClick={onCloseLectureCardPisAgreementModal}
        >
          <PolyglotText defaultString="취소" id="lecture-동의-취소" />
        </Button>
        <Button
          className="b_chk"
          onClick={() => {
            // onConfirmLectureAgreement(onShowClassroomModal);
          }}
        >
          <PolyglotText defaultString="확인" id="lecture-동의-확인" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
