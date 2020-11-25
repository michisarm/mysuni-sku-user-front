import React, { useState, useEffect, useCallback, useRef } from 'react';
import LectureWebpage from '../../viewModel/LectureWebpage';
import { onLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import { Document, Page } from 'react-pdf';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import { patronInfo } from '@nara.platform/dock';
import { Field } from 'lecture/shared/ui/view/LectureElementsView';
import { conforms, forEach } from 'lodash';
import { object } from '@storybook/addon-knobs';
import DefaultImg from '../../../../style/media/default-thumbnail.png';
import { getPublicUrl } from 'shared/helper/envHelper';
import { useHistory, useLocation } from 'react-router-dom';
import { getLectureStructure } from 'lecture/detail/store/LectureStructureStore';
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';
import LearningState from 'lecture/detail/model/LearningState';
import { setLectureConfirmProgress } from 'lecture/detail/store/LectureConfirmProgressStore';
import { LectureStructureCourseItem } from 'lecture/detail/viewModel/LectureStructure';
import { useLectureState } from '../../service/useLectureState/useLectureState';
import { reactAlert } from '@nara.platform/accent';
import {
  getLectureState,
  setLectureState,
} from '../../store/LectureStateStore';

const playerBtn = `${getPublicUrl()}/images/all/btn-player-next.png`;

// http://localhost:3000/lecture/cineroom/ne1-m2-c2/college/CLG0001c/cube/CUBE-2ls/lecture-card/LECTURE-CARD-29d

// 파일 다운로드
//const downloadDepotFile = (depotFileId: string) => {};
//depot.downloadDepotFile(depotFileId);

//상단 Select 박스 선택시 호출
//setPdfUrl('/api/depot/depotFile/flow/download/'+ depotFileId);
interface LectureDocumentsViewProps {
  fileBoxId: string;
  hookAction: () => void;
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  learningState: LearningState | undefined;
  params: LectureRouterParams | undefined;
}

// 차후 진행 내역
// 파일 형식 pdf = 페이지 끝까지 확인
// 파일 형식 !pdf = 다운로드

//FIXME SSO 로그인된 상태가 아니면 동작 안 함.
// const LectureVideoView: React.FC<LectureVideoViewProps> = function LectureVideoView({params,hookAction}) {

const LectureDocumentsView: React.FC<LectureDocumentsViewProps> = function LectureDocumentsView({
  fileBoxId,
  url,
  title,
  description,
  image,
  hookAction,
  learningState,
  params,
}) {
  const API_URL: string = '/api/depot/depotFile/flow/download/';

  const [files, setFiles] = useState<DepotFileViewModel[]>();
  const [pdfUrl, setPdfUrl] = useState<string[]>([]);
  const [file, setFile] = useState<any>();

  const [openToggle, setOpenToggle] = useState<boolean>(false);
  const [courseName, setCourseName] = useState<any>([]);
  const [courseIdx, setCourseIdx] = useState<number>(0);
  const [pageWidth, setPageWidth] = useState<number>(0);
  const [progressAlert, setProgressAlert] = useState<boolean>(false);

  const { pathname } = useLocation();

  useEffect(() => {
    const mLectureState = getLectureState();
    if (
      mLectureState?.type === 'Documents' &&
      mLectureState?.learningState === 'Progress' &&
      !progressAlert
    ) {
      setProgressAlert(true);
      /*
      reactAlert({
        title: '',
        message: `Document 유형의 과정은 우측 상단 '학습완료' 버튼을 클릭하시고 문서를 다운로드 받아야 학습이 완료됩니다.
        <br> 단, Test나 Report가 포함된 과정의 경우, Test/Report의 결과에 따라 자동으로 이수될 예정입니다.`,
      });
      */
    }
    return () => {
      setLectureState();
    };
  }, [pathname]);

  useEffect(() => {
    setProgressAlert(false);
  }, [pathname]);

  const headerWidth: any = useRef();

  const nameList: string[] = [''];

  // '/api/depot/depotFile/flow/download/' + filesArr[0].id

  const getFiles = useCallback(() => {
    depot.getDepotFiles(fileBoxId).then(filesArr => {
      setPdfUrl([]);
      // id 여러개 일때
      if (filesArr) {
        if (Array.isArray(filesArr)) {
          setFiles(filesArr);
          setCourseName(filesArr);
          for (let i = 0; i < filesArr.length; ++i) {
            setPdfUrl(oldArray => [
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
  }, [fileBoxId, pdfUrl, params]);

  for (let i = 0; i < courseName.length; ++i) {
    nameList[i] = courseName[i].name;
  }

  const updateHeaderWidth = () => {
    if (headerWidth && headerWidth.current && headerWidth.current.clientWidth) {
      setPageWidth(headerWidth.current?.clientWidth!);
    }
  };

  useEffect(() => {
    return () => {
      setPdfUrl([]);
      setFiles([]);
      setFile('');
    };
  }, []);

  useEffect(() => {
    updateHeaderWidth();
    window.addEventListener('resize', updateHeaderWidth);
  }, []);

  useEffect(() => {
    if (fileBoxId && fileBoxId.length) {
      getFiles();
    }
  }, [fileBoxId]);

  const [numPages, setNumPages] = useState(0); // 총 페이지
  const [pageNumber, setPageNumber] = useState(1); // 현재 페이지
  const [bar, setBar] = useState<number>(4.7);
  const [nextContentsPath, setNextContentsPath] = useState<string>();
  const [nextContentsName, setNextContentsName] = useState<string>();

  const onDocumentLoadSuccess = (pdf: any) => {
    setNumPages(pdf.numPages);
  };

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

  useEffect(() => {
    return () => {
      setPageNumber(1);
    };
  }, [fileBoxId, pdfUrl, params]);

  useEffect(() => {
    // setTimeout(() => {
    setFile({
      url: pdfUrl[courseIdx],
      httpHeaders: {
        audienceId: patronInfo.getPatronId(),
        Authorization: 'Bearer ' + localStorage.getItem('nara.token'),
      },
    });
    // }, 500);
  }, [pdfUrl, courseIdx, params]);

  const indexClick = (idx: number) => {
    setCourseIdx(idx);
    setOpenToggle(!openToggle);
    // setFileCheck(courseName[idx]);
    // setFileDiv(nameList[courseIdx]);
  };

  const downloadFile = () => {
    depot.downloadDepotFile(files![courseIdx].id);
    hookAction();
  };

  const history = useHistory();

  const nextContents = useCallback((path: string) => {
    history.push(path);
  }, []);

  useEffect(() => {
    const lectureStructure = getLectureStructure();
    if (lectureStructure) {
      if (lectureStructure.course?.type == 'COURSE') {
        //일반 코스 로직

        lectureStructure.items.map(item => {
          if (item.type === 'CUBE') {
            if (lectureStructure.cubes) {
              const currentCube = lectureStructure.cubes.find(
                cube => cube.cubeId == params?.contentId
              );

              if (currentCube) {
                const nextCubeOrder = currentCube.order + 1;

                const nextCube = lectureStructure.cubes.find(
                  cube => cube.order == nextCubeOrder
                );
                if (nextCube) {
                  setNextContentsPath(nextCube.path);
                  setNextContentsName(nextCube.name);
                }

                //토론하기 항목이 있는 경우
                const nextDiscussion = lectureStructure.discussions.find(
                  discussion => discussion.order == nextCubeOrder
                );
                if (nextDiscussion) {
                  setNextContentsPath(nextDiscussion.path);
                  setNextContentsName('[토론하기]'.concat(nextDiscussion.name));
                }
              }
            }
          }
          return null;
        });
      } else if (lectureStructure.course?.type == 'PROGRAM') {
        lectureStructure.items.map(item => {
          if (item.type === 'COURSE') {
            const course = item as LectureStructureCourseItem;
            if (course.cubes) {
              const currentCube = course.cubes.find(
                cube => cube.cubeId == params?.contentId
              );

              if (currentCube) {
                const nextCubeOrder = currentCube.order + 1;

                const nextCube = course.cubes.find(
                  cube => cube.order == nextCubeOrder
                );
                if (nextCube) {
                  setNextContentsPath(nextCube.path);
                  setNextContentsName(nextCube.name);
                }

                //토론하기 항목이 있는 경우
                const nextDiscussion = course.discussions?.find(
                  discussion => discussion.order == nextCubeOrder
                );

                if (nextDiscussion) {
                  setNextContentsPath(nextDiscussion.path);
                  setNextContentsName('[토론하기]'.concat(nextDiscussion.name));
                }
              }
            }
          }
          if (item.type === 'CUBE') {
            if (lectureStructure.cubes) {
              const currentCube = lectureStructure.cubes.find(
                cube => cube.cubeId == params?.contentId
              );

              if (currentCube) {
                const nextCubeOrder = currentCube.order + 1;

                const nextCube = lectureStructure.cubes.find(
                  cube => cube.order == nextCubeOrder
                );
                if (nextCube) {
                  setNextContentsPath(nextCube.path);
                  setNextContentsName(nextCube.name);
                }

                //토론하기 항목이 있는 경우
                const nextDiscussion = lectureStructure.discussions.find(
                  discussion => discussion.order == nextCubeOrder
                );
                if (nextDiscussion) {
                  setNextContentsPath(nextDiscussion.path);
                  setNextContentsName('[토론하기]'.concat(nextDiscussion.name));
                }
              }
            }
          }
          return null;
        });
      }
    }
  }, [getLectureStructure()]);

  return (
    <>
      <div className="documents-viewer" ref={headerWidth}>
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
              <Page
                pageNumber={pageNumber}
                renderAnnotationLayer={false}
                width={pageWidth}
              />
            </Document>

            {pageNumber === numPages &&
              learningState === 'Passed' &&
              nextContentsPath && (
                <div className="video-overlay">
                  <div className="video-overlay-btn">
                    <button onClick={() => nextContents(nextContentsPath)}>
                      <img src={playerBtn} />
                    </button>
                  </div>
                  <div className="video-overlay-text">
                    <p>다음 학습 이어하기</p>
                    <h3>{nextContentsName}</h3>
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

      {/* {url !== '' && url !== undefined && (
        <div className="lms-open-graph">
          <img src={image ? image : DefaultImg} className="lms-open-image" />

          <div className="lms-open-con">
            <div className="lms-open-title">{title}</div>

            <div className="lms-open-copy">{description}</div>

            <a href={url} className="lms-open-link" type="_blank">
              {url}
            </a>
          </div>
        </div>
      )} */}
    </>
  );
};

export default LectureDocumentsView;
