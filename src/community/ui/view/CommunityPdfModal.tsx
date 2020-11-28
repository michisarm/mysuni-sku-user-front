import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { Document, Page } from 'react-pdf';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import { patronInfo } from "@nara.platform/dock";
// import down from "../../../../../images/all/icon-down-type-4-24-px.png";
// import ProfileSample2 from "../../../../../images/all/profile-110-px-sample-2.jpg";
// import NotSupported from "../../../../../images/all/btn-download.svg";
// import playerBtn from "../../../../../images/all/btn-player-next.png";

interface Props {
  open: boolean
  setOpen: (state:boolean) => void;
  viewItem: DepotFileViewModel,
}

const CommunityPdfModal:React.FC<Props> = ({open, setOpen, viewItem}) => {


  const [pdfUrl, setPdfUrl] = useState<string>();
  const [file, setFile] = useState<any>();
 
 
  useEffect(() => {

    setPdfUrl('/api/depot/depotFile/flow/download/' + viewItem.id);

    console.log('pdfUrl : ', pdfUrl);
    // setTimeout(() => {
    setFile({
      url: '/api/depot/depotFile/flow/download/' + viewItem.id,
      httpHeaders: {
        audienceId: patronInfo.getPatronId(),
        Authorization: 'Bearer ' + localStorage.getItem('nara.token'),
      },
    });
    // }, 500);
  }, []);

  
  return (
    <>
      {/*<Button onClick={this.show('fullscreen')} basic>보기</Button>*/}
      <Modal
        open={open}
        className="w1000 base"
      >
        <Modal.Header className="dataroom-popup-header">
          <div className="dataroom-popup-left">
            <span>mySUNI 프로그램북_New format_20년 3분기.pdf</span>
          </div>
          <div className="dataroom-popup-right">
            {/*<button className="ui icon button left post list2">
              <img src={down} />
              다운로드
            </button>*/}
            <button className="ui icon button img-icon" onClick={() => setOpen(!open)}>
              <i aria-hidden="true" className="icon clear2 selected link" />
              <span>Close</span>
            </button>
          </div>
        </Modal.Header>
        <Modal.Content className="dataroom-popup-content">
          <div className="documents-viewer">
            <div className="scrolling-80vh">
              <div style={{backgroundColor:"gray", height:"2000px"}}>
                <Document
                  renderMode="canvas"
                  // file="/assets/docs/sample-pdf.pdf"
                  // file="/api/depot/depotFile/flow/download/37-2"
                  file={file}
                  // onLoadSuccess={onDocumentLoadSuccess}
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
                  pageNumber={1}
                  renderAnnotationLayer={false}
                  width={1200}
                />
                </Document>
              </div>
            </div>
            {/* <div className="pdf-not-supported">
              <span className="not-supported-copy">Viewer에서 지원하지 않는 문서입니다.<br />문서를 다운로드하셔야 학습을 이어 하실 수 있습니다.</span>
              <a className="btn-not-supported"><img src={NotSupported} /></a>
            </div>*/}

            {/* <div className="video-overlay">
              <div className="video-overlay-btn">
                <button>
                  <img src="" />
                </button>
              </div>
              <div className="video-overlay-text">
                <p>다음 학습 이어하기</p>
                <h3>[반도체 클라쓰] Keyword로 알아보는 반도체의 품격</h3>
              </div>
            </div> */}

            {/* <div className="pdf-control disable">
              <div className="pagination">
                <a className="pdf-prev">이전</a>
                <span className="num">1/40</span>
                <a className="pdf-next">이후</a>
              </div>
              <a className="pdf-down on"><i aria-hidden="true" className="icon down-white24"/></a>
              <div className="pdf-bar"><span className="pdf-gauge" /></div>
            </div> */}
          </div>
             {/* <div className="pdf-down-drop">
                <a>전략_Intermediate_과정.ppt</a>
                <a>전략_Intermediate_과정.ppt</a>
              </div>*/}
        </Modal.Content>
      </Modal>
    </>
  );
}

export default CommunityPdfModal;
