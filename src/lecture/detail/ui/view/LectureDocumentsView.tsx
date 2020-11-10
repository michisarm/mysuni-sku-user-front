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
  const file = { url: pdfUrl, httpHeaders: { audienceId: patronInfo.getPatronId(),
    Authorization: 'Bearer '+ localStorage.getItem('nara.token') }};
  return (
    <div className="documents-viewer">
      <Document
        renderMode="svg"
        // file="/assets/docs/sample-pdf.pdf"
        // file="/api/depot/depotFile/flow/download/37-2"
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="pagination">
        <button disabled={pageNumber === 1} type="button" onClick={prev}>‹</button>
        <span>{pageNumber} of {numPages}</span>
        <button disabled={pageNumber >= numPages} type="button" onClick={next}>›</button>
      </div>        
    </div>
  );
};

export default LectureDocumentsView;
