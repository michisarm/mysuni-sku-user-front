/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import { patronInfo } from '@nara.platform/dock';
import { getPublicUrl } from 'shared/helper/envHelper';
import { useHistory } from 'react-router-dom';
import LearningState from 'lecture/detail/model/LearningState';
import LectureParams from '../../viewModel/LectureParams';
import { useNextContent } from '../../service/useNextContent';
import { LectureStructureCubeItem } from '../../viewModel/LectureStructure';
import { findCubeDetailCache } from '../../api/cubeApi';
import { reactAlert } from '@nara.platform/accent';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';
import { completeLearning } from 'lecture/detail/service/useLectureState/utility/cubeStateActions';
import { getLectureState } from 'lecture/detail/store/LectureStateStore';

const playerBtn = `${getPublicUrl()}/images/all/btn-player-next.png`;
interface LectureDocumentsViewProps {
  fileBoxId: string;
  learningState: LearningState | undefined;
  params: LectureParams | undefined;
}

const LectureDocumentsView: React.FC<LectureDocumentsViewProps> = function LectureDocumentsView({
  fileBoxId,
  learningState,
  params,
}) {
  const [files, setFiles] = useState<DepotFileViewModel[]>();
  const [pdfUrl, setPdfUrl] = useState<string[]>([]);
  const [file, setFile] = useState<any>();

  const [openToggle, setOpenToggle] = useState<boolean>(false);
  const [courseName, setCourseName] = useState<any>([]);
  const [courseIdx, setCourseIdx] = useState<number>(0);
  const [pageWidth, setPageWidth] = useState<number>(0);
  const [numPages, setNumPages] = useState(0); // 총 페이지
  const [pageNumber, setPageNumber] = useState(1); // 현재 페이지
  const [bar, setBar] = useState<number>(4.7);
  const nextContent = useNextContent();

  const headerWidth: any = useRef();
  const nameList: string[] = [''];

  useEffect(() => {
    if (params?.cubeId === undefined) {
      return;
    }

    if (learningState !== 'Passed') {
      findCubeDetailCache(params?.cubeId).then((c) => {
        if (c !== undefined) {
          const { cube } = c;
          if (
            cube.hasTest ||
            (cube.reportName !== null && cube.reportName !== undefined)
          ) {
            reactAlert({
              title: '',
              message: getPolyglotText(
                `Test / Report가 포함된 과정입니다. <p>응시 후 결과에 따라 이수 처리 여부가 결정되니<p> 반드시 응시하시기 바랍니다.`,
                'Collage-Documents-응시안내'
              ),
            });
          } else {
            reactAlert({
              title: '',
              message: getPolyglotText(
                `Document 컨텐츠는 우측 상단 '학습완료' 버튼을 클릭하시고 문서를 다운로드 받아야 학습이 완료됩니다. 학습 창에서 글씨가 깨져보이거나 누락되는 경우 다운로드 시 정상적으로 확인 가능합니다.`,
                'Collage-Documents-다운로드'
              ),
            });
          }
        }
      });
    }
  }, [params?.cardId, params?.cubeId]);

  // '/api/depot/depotFile/flow/download/' + filesArr[0].id

  const getFiles = useCallback(() => {
    depot.getDepotFiles(fileBoxId).then((filesArr) => {
      setPdfUrl([]);
      // id 여러개 일때
      if (filesArr) {
        if (Array.isArray(filesArr)) {
          setFiles(filesArr);
          setCourseName(filesArr);
          for (let i = 0; i < filesArr.length; ++i) {
            setPdfUrl((oldArray) => [
              ...oldArray,
              '/api/depot/depotFile/flow/download/' + filesArr[i].id,
            ]);
          }
        }
        // id 1개 일때
        else {
          setFiles([filesArr]);
          setCourseName(filesArr);
          setPdfUrl(['/api/depot/depotFile/flow/download/' + filesArr.id]);
        }
      }
    });
  }, [fileBoxId, pdfUrl, params?.cubeId]);

  for (let i = 0; i < courseName.length; ++i) {
    nameList[i] = courseName[i].name;
  }

  const updateHeaderWidth = useCallback(() => {
    if (headerWidth && headerWidth.current && headerWidth.current.clientWidth) {
      setPageWidth(headerWidth.current?.clientWidth!);
    }
  }, []);

  useEffect(() => {
    return () => {
      setPdfUrl([]);
      setFiles([]);
      setFile('');
    };
  }, [params?.cubeId]);

  useEffect(() => {
    updateHeaderWidth();
    window.addEventListener('resize', updateHeaderWidth);
    return () => window.removeEventListener('resize', updateHeaderWidth);
  }, [params?.cubeId]);

  useEffect(() => {
    if (fileBoxId && fileBoxId.length) {
      getFiles();
    }
  }, [fileBoxId]);

  const onDocumentLoadSuccess = useCallback((pdf: any) => {
    setNumPages(pdf.numPages);
  }, []);

  const prev = useCallback(() => {
    const value = (100 / numPages) * pageNumber;

    if (pageNumber > 1) {
      if (pageNumber === 1) {
        setBar(4.7);
      } else {
        setBar(value);
      }
      setPageNumber(pageNumber - 1);
    }
  }, [numPages, pageNumber]);

  const next = useCallback(() => {
    const value = (100 / numPages) * pageNumber + 1;

    if (pageNumber < numPages) {
      if (pageNumber >= numPages - 1) {
        setBar(100);
      } else {
        setBar(value);
      }
      setPageNumber(pageNumber + 1);
    }

    if (pageNumber === numPages - 1 && pdfUrl[0] === file.url) {
      const lectureState = getLectureState();

      if (
        lectureState?.student === undefined ||
        lectureState?.student?.learningState !== 'Passed'
      ) {
        completeLearning();
      }
    }
  }, [numPages, pageNumber]);

  useEffect(() => {
    return () => {
      setPageNumber(1);
    };
  }, [fileBoxId, pdfUrl, params?.cubeId]);

  useEffect(() => {
    setFile({
      url: pdfUrl[courseIdx],
      httpHeaders: {
        audienceId: patronInfo.getPatronId(),
        Authorization: 'Bearer ' + localStorage.getItem('nara.token'),
      },
    });
  }, [pdfUrl, courseIdx, params?.cubeId]);

  const indexClick = (idx: number) => {
    setCourseIdx(idx);
    setOpenToggle(!openToggle);
  };

  const downloadFile = () => {
    depot.downloadDepotFile(files![courseIdx].id);
    const action = document.getElementById('ACTION');
    if (action !== null) {
      action.click();
    }
  };

  const history = useHistory();

  const nextContents = useCallback((path: string) => {
    history.push(path);
  }, []);

  return (
    <>
      <div className="documents-viewer" ref={headerWidth}>
        <div className="pdf-header">
          <i className="list24 icon" />
          <span
            className="pdf-header-title"
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                '<strong>{count}</strong>개의 교육 자료가 있습니다.',
                'Collage-Documents-교육자료',
                { count: courseName.length }
              ),
            }}
          />
          <div
            className={
              !openToggle ? 'pdf-header-select off' : 'pdf-header-select on'
            }
            style={{ zIndex: 1 }}
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
            <span
              className="not-supported-copy"
              dangerouslySetInnerHTML={{
                __html: getPolyglotText(
                  `Viewer에서 지원하지 않는 문서입니다.<br />문서를 다운로드하셔야 학습을 이어 하실 수 있습니다.`,
                  'Collage-Documents-문서오류'
                ),
              }}
            />
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
                    <PolyglotText
                      defaultString="PDF 파일을 읽어 올 수 없습니다."
                      id="Collage-Documents-PDF오류"
                    />
                  </div>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                renderAnnotationLayer={false}
                width={pageWidth}
              />
            </Document>

            {pageNumber === numPages &&
              learningState === 'Passed' &&
              nextContent !== undefined && (
                <div className="video-overlay">
                  <div className="video-overlay-btn">
                    <button onClick={() => nextContents(nextContent.path)}>
                      <img src={playerBtn} />
                    </button>
                  </div>
                  <div className="video-overlay-text">
                    <p>
                      <PolyglotText
                        defaultString="다음 학습 이어하기"
                        id="Collage-Documents-이어하기"
                      />
                    </p>
                    <h3>{(nextContent as LectureStructureCubeItem).name}</h3>
                  </div>
                </div>
              )}
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
              <PolyglotText defaultString="이전" id="Collage-Documents-이전" />
            </a>
            <span className="num">
              {pageNumber}/{numPages}
            </span>

            <a className="pdf-next" onClick={next}>
              <PolyglotText defaultString="이후" id="Collage-Documents-이후" />
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
