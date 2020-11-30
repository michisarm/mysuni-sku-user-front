import React, { useCallback, useEffect, useState, useRef } from "react";
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
  pdfName:string
}

const CommunityPdfModal:React.FC<Props> = ({open, setOpen, viewItem, pdfName}) => {

  const [pdfUrl, setPdfUrl] = useState<string>();
  const [file, setFile] = useState<any>();
  const [pageWidth, setPageWidth] = useState<number>(0);
  const [numPages, setNumPages] = useState(0); // 총 페이지
  const [bar, setBar] = useState<number>(4.7);
  const [pageNumber, setPageNumber] = useState<number>(1); //현재 페이지
  const headerWidth:any = useRef();

  const updateHeaderWidth = () => {
    if (headerWidth && headerWidth.current && headerWidth.current.clientWidth) {
      setPageWidth(headerWidth.current?.clientWidth!);
    }
  };

  const onDocumentLoadSuccess = (pdf: any) => {
    setNumPages(pdf.numPages);
  };

  useEffect(() => {
    setNumPages(1)
  }, [])

  const prev = () => {
    const value = (100 / numPages) * pageNumber;
    if (pageNumber > 1) {
      if (pageNumber === 1) {
        setBar(4.7);
      } else {
        setBar(value);
      }
      setPageNumber(pageNumber - 1);
    }
  };

  const next = () => {
    const value = (100 / numPages) * pageNumber + 1;
    if (pageNumber < numPages) {
      if (pageNumber >= numPages - 1) {
        setBar(100);
      } else {
        setBar(value);
      }
      setPageNumber(pageNumber + 1);
    }
  };

  // const downloadFile = () => {
  //   depot.downloadDepotFile(file;
  // };

  useEffect(() => {
    setPdfUrl('/api/depot/depotFile/flow/download/' + pdfName);
    setFile({
      url: '/api/depot/depotFile/flow/download/' + pdfName,
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
            <span>{viewItem.id}</span>
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
          <div className="documents-viewer" ref={headerWidth}>
            <div className="scrolling-80vh">
              <div style={{backgroundColor:"rgba(0,0,0,0.7)"}}>
                <Document
                  renderMode="canvas"
                  // file="/assets/docs/sample-pdf.pdf"
                  // file="/api/depot/depotFile/flow/download/37-2"
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
                <div style={{margin:"0 auto"}}>
                  <Page
                    pageNumber={pageNumber}
                    renderAnnotationLayer={false}
                    width={pageWidth}
                  />
                </div>
                </Document>
              </div>
            </div>
            {/* <div className="pdf-not-supported">
              <span className="not-supported-copy">Viewer에서 지원하지 않는 문서입니다.<br />문서를 다운로드하셔야 학습을 이어 하실 수 있습니다.</span>
              <a className="btn-not-supported"><img src={NotSupported} /></a>
            </div>*/}

            <div className="pdf-control">
              <div className="pagination">
                <a className="pdf-prev" onClick={prev}>이전</a>
                <span className="num">
                  {pageNumber}/{numPages}
                </span>
                <a className="pdf-next" onClick={next}>이후</a>
              </div>
              <a className="pdf-down on"><i aria-hidden="true" className="icon down-white24"/></a>
              <div className="pdf-bar"><span className="pdf-gauge" style={{ width: `${bar.toString()}%` }} /></div>
            </div>
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
