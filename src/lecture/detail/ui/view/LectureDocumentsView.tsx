import React, { useState, useEffect } from 'react';
import LectureWebpage from '../../viewModel/LectureWebpage';
import { onLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import { Document, Page } from 'react-pdf';

// http://localhost:3000/lecture/cineroom/ne1-m2-c2/college/CLG0001c/cube/CUBE-2ls/lecture-card/LECTURE-CARD-29d
const LectureDocumentsView: React.FC<LectureWebpage> = function LectureDocumentsView({
  title,
  description,
  image,
  url,
  fileBoxId,
}) {
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

  return (
    <div className="documents-viewer">
      <Document
        renderMode="svg"
        file="/assets/docs/sample-pdf.pdf"
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
