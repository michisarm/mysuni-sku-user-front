import React, { useState, useEffect, useCallback } from 'react';
import LectureWebpage from '../../viewModel/LectureWebpage';
import { onLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import { Document, Page } from 'react-pdf';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import { patronInfo } from '@nara.platform/dock';
import { Field } from 'lecture/shared/ui/view/LectureElementsView';
import { conforms, forEach } from 'lodash';
import { object } from '@storybook/addon-knobs';

// http://localhost:3000/lecture/cineroom/ne1-m2-c2/college/CLG0001c/cube/CUBE-2ls/lecture-card/LECTURE-CARD-29d

// 파일 다운로드
//const downloadDepotFile = (depotFileId: string) => {};
//depot.downloadDepotFile(depotFileId);

//상단 Select 박스 선택시 호출
//setPdfUrl('/api/depot/depotFile/flow/download/'+ depotFileId);

const LectureDocumentsView: React.FC<LectureWebpage> = function LectureDocumentsView({
  title,
  description,
  image,
  url,
  fileBoxId,
}) {
  const API_URL: string = '/api/depot/depotFile/flow/download/';

  const [files, setFiles] = useState<DepotFileViewModel[]>();
  const [pdfUrl, setPdfUrl] = useState<string[]>([]);
  const [pdf, setPdf] = useState<any>();
  const [file, setFile] = useState<any>();

  const [openToggle, setOpenToggle] = useState<boolean>(false);
  const [courseName, setCourseName] = useState<any>([]);
  const [courseIdx, setCourseIdx] = useState<number>(0);
  const [fileCheck, setFileCheck] = useState<string>('');
  const [fileDiv, setFileDiv] = useState<any>();

  const nameList: string[] = [''];

  // '/api/depot/depotFile/flow/download/' + filesArr[0].id

  const getFiles = useCallback(() => {
    depot.getDepotFiles(fileBoxId).then(filesArr => {
      // id 여러개 일때
      if (filesArr) {
        if (Array.isArray(filesArr)) {
          setFiles(filesArr);
          setCourseName(filesArr);
          console.log('n개 filesArr', filesArr);
          if (filesArr) {
            for (let i = 0; i < filesArr.length; ++i) {
              pdfUrl[i] = `${API_URL}${filesArr[i].id}`;
            }
          }
        }

        // id 1개 일때
        else {
          setFiles([filesArr]);
          setCourseName(filesArr);
          setPdfUrl(['/api/depot/depotFile/flow/download/' + filesArr.id]);
          console.log('1개 filesArr', filesArr);
        }
      }
    });
  }, [fileBoxId]);

  for (let i = 0; i < courseName.length; ++i) {
    nameList[i] = courseName[i].name;
    // console.log('nameList', nameList[i]);
  }

  useEffect(() => {
    if (fileBoxId && fileBoxId.length) {
      getFiles();
    }
  }, [fileBoxId]);

  const [numPages, setNumPages] = useState(0); // 총 페이지
  const [pageNumber, setPageNumber] = useState(1); // 현재 페이지
  const [bar, setBar] = useState<number>(4.7);

  const onDocumentLoadSuccess = (pdf: any) => {
    setNumPages(pdf.numPages);
  };

  const prev = () => {
    const value = (100 / numPages) * pageNumber;
    console.log('Pre value', value);

    if (pageNumber > 1) {
      if (pageNumber === 1) {
        setBar(4.7);
        setPageNumber(1);
      } else {
        setBar(value);
      }
      setPageNumber(pageNumber - 1);
    }
  };

  const next = () => {
    const value = (100 / numPages) * pageNumber + 1;
    console.log('Next value', value);

    if (pageNumber < numPages) {
      if (pageNumber >= numPages - 1) {
        setBar(100);
      } else {
        setBar(value);
      }
      setPageNumber(pageNumber + 1);
    }
  };

  useEffect(() => {
    onLectureMedia(lectureMedia => {
      // console.log('-----file contents...');
      // console.log(lectureMedia);
    }, 'LectureDocumentsView');
  });

  //TODO : 여러 파일 업로드 가능하여 해당 목록 처리에 대한 퍼블리싱 이후 목록 처리 예정, PDF 변환 후 원본/PDF 다운로드 제공
  //TODO : TOKEN pram 처리 필요함
  useEffect(() => {
    setTimeout(() => {
      setFile({
        url: pdfUrl[courseIdx],
        httpHeaders: {
          audienceId: patronInfo.getPatronId(),
          Authorization: 'Bearer ' + localStorage.getItem('nara.token'),
        },
      });
      // if (courseName[courseIdx].name.match('.pdf')) {
      //   console.log('true!!', courseName[courseIdx].name);
      // }
    }, 500);
  }, [courseIdx]);

  const indexClick = (idx: number) => {
    setCourseIdx(idx);
    setOpenToggle(!openToggle);
    setFileCheck(courseName[idx]);

    setFileDiv(nameList[courseIdx]);

    // files?.map(item => {
    //   if(nameList[courseIdx] === )
    //   console.log('item', item.name);
    // });
  };

  const downloadFile = () => {
    depot.downloadDepotFile(files![courseIdx].id);
  };

  return (
    <>
      <div className="documents-viewer">
        <div className="pdf-header">
          <i className="list24 icon" />
          <span className="pdf-header-title">
            <strong>{courseName.length}</strong> 개의 교육 자료가 있습니다.
          </span>
          <div
            className={
              !openToggle ? 'pdf-header-select off' : 'pdf-header-select on'
            }
            style={{ zIndex: 33 }}
          >
            <a
              className="pdf-select-text"
              onClick={() => setOpenToggle(!openToggle)}
            >
              {nameList[courseIdx]}
              <i className="icon drop32-down" />
              <i className="icon drop32-up" />
            </a>
            <div className="pdf-header-drop">
              {nameList.map((name: any, idx: number) => {
                return (
                  <a
                    onClick={() => indexClick(idx)}
                    key={`${courseName} + ${1 + idx}`}
                  >
                    {name}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        {!nameList[courseIdx].match(/.pdf/g) ? (
          <div className="pdf-not-supported">
            <span className="not-supported-copy">
              Viewer에서 지원하지 않는 문서입니다.
              <br />
              문서를 다운로드하셔야 학습을 이어 하실 수 있습니다.
            </span>
            <a className="btn-not-supported" onClick={downloadFile}>
              <img
                src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDkiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMDkgMzIiPg0KICAgIDxkZWZzPg0KICAgICAgICA8ZmlsdGVyIGlkPSJibmRpd2JyeHJhIj4NCiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VHcmFwaGljIiB2YWx1ZXM9IjAgMCAwIDAgMC40MjM1MjkgMCAwIDAgMCAwLjQ3MDU4OCAwIDAgMCAwIDAuNTYwNzg0IDAgMCAwIDEuMDAwMDAwIDAiLz4NCiAgICAgICAgPC9maWx0ZXI+DQogICAgPC9kZWZzPg0KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+DQogICAgICAgIDxnPg0KICAgICAgICAgICAgPGc+DQogICAgICAgICAgICAgICAgPGc+DQogICAgICAgICAgICAgICAgICAgIDxnPg0KICAgICAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgyMSAtNzEwKSB0cmFuc2xhdGUoNDAwIDE1OSkgdHJhbnNsYXRlKDAgMTY4KSB0cmFuc2xhdGUoMzIyIDMxOSkgdHJhbnNsYXRlKDk5LjUgNjQpIj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD0iMTA4IiBoZWlnaHQ9IjMyIiBmaWxsPSIjRkZGIiByeD0iNCIvPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxnIGZpbHRlcj0idXJsKCNibmRpd2JyeHJhKSI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxnPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD0iIzIyMiIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNNiAxNHY0aDEzdi00aDJ2Nkg0di02aDJ6bTcuNS0xMHY3LjYybDIuNTM2LTIuNTM0TDE3LjQ1IDEwLjVsLTMuOTUgMy45NDh2LjAxM2gtLjAxM2wtLjk4Ny45ODktLjk4OS0uOTg5SDExLjV2LS4wMTFMNy41NSAxMC41bDEuNDE0LTEuNDE0IDIuNTM2IDIuNTM2VjRoMnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyIDQpIi8+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHQgZmlsbD0iIzZDNzg4RiIgZm9udC1mYW1pbHk9Ik5vdG9TYW5zQ0pLa3ItQm9sZCwgTm90byBTYW5zIENKSyBLUiIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHNwYW4geD0iNDAiIHk9IjIyIj7ri6TsmrTroZzrk5w8L3RzcGFuPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGV4dD4NCiAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg0K"
                alt=""
              />
            </a>
          </div>
        ) : (
          <>
            <Document
              renderMode="svg"
              // file="/assets/docs/sample-pdf.pdf"
              // file="/api/depot/depotFile/flow/download/37-2"
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page
                pageNumber={pageNumber}
                renderAnnotationLayer={false}
                width={1200}
                height={800}
              />
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
          </>
        )}

        <div
          className={
            !nameList[courseIdx].match(/.pdf/g)
              ? 'pdf-control disable'
              : 'pdf-control'
          }
        >
          <div className="pagination">
            <a className="pdf-prev" onClick={prev}>
              이전
            </a>
            <span className="num">
              {pageNumber}/{numPages}
            </span>

            <a className="pdf-next" onClick={next}>
              이후
            </a>
          </div>
          <a className="pdf-down on" onClick={downloadFile}>
            <i aria-hidden="true" className="icon down-white24" />
          </a>
          <div className="pdf-bar">
            <span
              className="pdf-gauge"
              style={{ width: `${bar.toString()}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LectureDocumentsView;
