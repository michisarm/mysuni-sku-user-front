import React, { useState, useEffect,useCallback } from 'react';
import LectureWebpage from '../../viewModel/LectureWebpage';
import { onLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import { Document, Page } from 'react-pdf';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import { patronInfo } from '@nara.platform/dock';

// http://localhost:3000/lecture/cineroom/ne1-m2-c2/college/CLG0001c/cube/CUBE-2ls/lecture-card/LECTURE-CARD-29d
const LectureDocumentsView: React.FC<LectureWebpage> = function LectureDocumentsView({
  title,
  description,
  image,
  url,
  fileBoxId,
}) {
  const [files, setFiles] = useState<DepotFileViewModel[]>();
  const [pdfUrl, setPdfUrl] = useState<string>();
  const [pdf, setPdf] = useState<any>();
  const [file, setFile] = useState<any>();
  
  
  // console.log('localStorage', localStorage);
  // console.log('localStorage', localStorage.getItem('nara.token'));
  // console.log('localStorage', localStorage.getItem('nara.workspace'));
  // console.log('patronInfo.getPatronId', patronInfo.getPatronId());

  console.log('fileBoxId',fileBoxId);

  const getFiles = useCallback(() => {

      depot.getDepotFiles(fileBoxId).then(filesArr => {
        if (filesArr) {
          if (Array.isArray(filesArr)){ 
            setFiles(filesArr);
            setPdfUrl('/api/depot/depotFile/flow/download/'+filesArr[0].id);
          }
          else {
            setFiles([filesArr]);
            setPdfUrl('/api/depot/depotFile/flow/download/'+filesArr.id);
          }
          console.log('filesArr',filesArr);
        }
      }
    );
  }, [fileBoxId]);

  useEffect(() => {
    if (fileBoxId && fileBoxId.length) {
      getFiles();
    }
  }, [fileBoxId]);

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = (pdf:any) => {
    setNumPages(pdf.numPages);
  }

  const prev = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  const next = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  }

  useEffect(()=>{    
    onLectureMedia(lectureMedia=>{
      console.log('-----file contents...');
      console.log(lectureMedia);
    }, 'LectureDocumentsView');
  });


  //TODO : 여러 파일 업로드 가능하여 해당 목록 처리에 대한 퍼블리싱 이후 목록 처리 예정, PDF 변환 후 원본/PDF 다운로드 제공
  //TODO : TOKEN pram 처리 필요함  
  useEffect(() => {
  setFile({ url: pdfUrl, httpHeaders: { audienceId: patronInfo.getPatronId(),
    Authorization: 'Bearer '+ localStorage.getItem('nara.token') }});
  }, [pdfUrl]);
  return (
    // <div className="documents-viewer">
    //   <Document
    //     renderMode="svg"
    //     // file="/assets/docs/sample-pdf.pdf"
    //     // file="/api/depot/depotFile/flow/download/37-2"
    //     file={file}
    //     onLoadSuccess={onDocumentLoadSuccess}
    //   >
    //     <Page pageNumber={pageNumber} />
    //   </Document>
    //   <div className="pagination">
    //     <button disabled={pageNumber === 1} type="button" onClick={prev}>‹</button>
    //     <span>{pageNumber} of {numPages}</span>
    //     <button disabled={pageNumber >= numPages} type="button" onClick={next}>›</button>
    //   </div>        
    // </div>
    <>
      <div className="documents-viewer">
        <div className="pdf-header">
          <i className="list24 icon" />
          <span className="pdf-header-title"><strong>2</strong> 개의 교육 자료가 있습니다.</span>
          <div className="pdf-header-select on">
            <a className="pdf-select-text">
              전략 Intermediate 과정
              <i className="icon drop32-down" />
              <i className="icon drop32-up" />
            </a>
            <div className="pdf-header-drop">
              <a>전략 Intermediate 과정</a>
              <a>전략과 SV</a>
            </div>
          </div>
        </div>


        {/* <div style={{minHeight: "400px"}} /> */}
        <Document 
          renderMode="svg"
          // file="/assets/docs/sample-pdf.pdf"
          // file="/api/depot/depotFile/flow/download/37-2"
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} renderAnnotationLayer={false} />
        </Document>        

        <div className="video-overlay">
          <div className="video-overlay-btn">
            <button>
              <img src="" />
            </button>
          </div>
          <div className="video-overlay-text">
            <p>다음 학습 이어하기</p>
            <h3>[반도체 클라쓰] Keyword로 알아보는 반도체의 품격</h3>
          </div>
        </div>

        <div className="pdf-control">
          <div className="pagination">
            <a className="pdf-prev" onClick={prev}>이전</a>
            <span className="num">{pageNumber}/{numPages}</span>
            <a className="pdf-next" onClick={next}>이후</a>
          </div>
          <a className="pdf-down on"><i aria-hidden="true" className="icon down-white24" /></a>
          <div className="pdf-down-drop">
            <a>전략_Intermediate_과정.ppt</a>
            <a>전략_Intermediate_과정.ppt</a>
          </div>
          <div className="pdf-bar"><span className="pdf-gauge" /></div>
        </div>
      </div>
    </>
  );
};

export default LectureDocumentsView;
