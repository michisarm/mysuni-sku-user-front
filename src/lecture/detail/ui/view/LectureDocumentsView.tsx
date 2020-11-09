import React, { useState, useEffect } from 'react';
import LectureWebpage from '../../viewModel/LectureWebpage';
import { onLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import { Document, Page } from 'react-pdf';
import depot, { DepotFileViewModel } from '@nara.drama/depot';

// http://localhost:3000/lecture/cineroom/ne1-m2-c2/college/CLG0001c/cube/CUBE-2ls/lecture-card/LECTURE-CARD-29d
// http://localhost:3000/lecture/cineroom/ne1-m2-c2/college/CLG00001/cube/CUBE-2nt/lecture-card/LECTURE-CARD-36q
const LectureDocumentsView: React.FC<LectureWebpage> = function LectureDocumentsView({
  title,
  description,
  image,
  url,
  fileBoxId,
}) {
  const [files, setFiles] = useState<DepotFileViewModel[]>();
  const [pdfUrl, setPdfUrl] = useState<string>("/api/depot/depotFile/flow/download/6t-1");
  
  console.log('fileBoxId',fileBoxId);

  useEffect(() => {
    if (fileBoxId && fileBoxId.length) {
      depot.getDepotFiles(fileBoxId).then(filesArr => {
        if (filesArr) {
          if (Array.isArray(filesArr)) setFiles(filesArr);
          else setFiles([filesArr]);
          
          if(files){
            setPdfUrl(pdfUrl+'6t-1');
            console.log('pdfUrl',pdfUrl);
          }
        }       
        console.log('files',files && files[0].id);
      }
      );
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
  const file = { url: pdfUrl, httpHeaders: { audienceId: 'r47a-r@ne1-m2-c2',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRpdGlvbmFsSW5mb3JtYXRpb24iOnsiY29tcGFueUNvZGUiOiJTS0NDIiwiZW1wbG95ZWVJZCI6IlNLQ0MwOCJ9LCJsb2dpbklkIjoiU0tDQy5TS0NDMDhAc2suY29tIiwidXNlcl9uYW1lIjoiU0tDQy5TS0NDMDhAc2suY29tIiwiZGlzcGxheU5hbWUiOiLqsJXsmqkqKiIsInNjb3BlIjpbImNsaWVudCJdLCJ3b3Jrc3BhY2VzIjp7InN0YXRpb25Xb3Jrc3BhY2VzIjpudWxsLCJzcXVhcmVXb3Jrc3BhY2VzIjpudWxsLCJwYXZpbGlvbldvcmtzcGFjZXMiOm51bGwsImNpbmVyb29tV29ya3NwYWNlcyI6W3siaWQiOiJuZTEtbTItYzIiLCJuYW1lIjoiU0sgVW5pdmVyc2l0eSIsInRlbmFudElkIjoicjQ3YS1yQG5lMS1tMi1jMiIsInJvbGVzIjpbIlVzZXIiXX0seyJpZCI6Im5lMS1tMi1jMTciLCJuYW1lIjoiU0so7KO8KUMmQyIsInRlbmFudElkIjoicjQ3YS1yQG5lMS1tMi1jMTciLCJyb2xlcyI6WyJVc2VyIl19XSwic3R1ZGlvV29ya3NwYWNlIjpudWxsfSwiZXhwIjoxNjA1MTU2MjQ3LCJhdXRob3JpdGllcyI6WyJVc2VyIl0sImp0aSI6ImZjZjg1ODFjLTM3NmItNGFjZS1hZmRhLWU4NzU2MzJhY2MxZCIsImNsaWVudF9pZCI6Im5hcmEifQ.HPgWKbCjtlQngAigwWDqBzbBM6EA5b4eh1BXAVkntuc' }};

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

//   <>
//   <div
//     className="video-container"
//     style={{
//       height: 684,
//       backgroundColor: '#a8a8a8',
//       marginBottom: 40,
//     }}
//   />
//   {url !== '' && url !== null && (
//     <div className="lms-open-graph">
//       <img src={image ? image : DefaultImg} className="lms-open-image" />
//       <div className="lms-open-con">
//         <div className="lms-open-title">{title}</div>
//         <div className="lms-open-copy">{description}</div>
//         <a href={url} className="lms-open-link" type="_blank">
//           {url}
//         </a>
//       </div>
//     </div>
//   )}
// </>
};

export default LectureDocumentsView;
