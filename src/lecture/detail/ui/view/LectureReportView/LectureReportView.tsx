/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { reactConfirm, reactAlert } from '@nara.platform/accent';
import { Form, Icon, Button, List } from 'semantic-ui-react';
import Reportheader from './ReportHeader';
import Editor from './Editor';
import { LectureReport, StudentReport } from '../../../viewModel/LectureReport';
import depot, {
  FileBox,
  ValidationType,
  DepotFileViewModel,
} from '@nara.drama/depot';
import { PatronType } from '@nara.platform/accent';
import { depotHelper } from 'shared';
import {
  getLectureReport,
  setLectureReport,
} from 'lecture/detail/store/LectureReportStore';
import {
  getActiveCourseStructureItem,
  getActiveStructureItem,
} from '../../../utility/lectureStructureHelper';
import { getCourseLectureReport } from 'lecture/detail/service/useLectureReport/utility/getCourseLectureReport';
import { getCubeLectureReport } from 'lecture/detail/service/useLectureReport/utility/getCubeLectureReport';
import { useHistory } from 'react-router-dom';
import {
  getLectureParams,
  useLectureParams,
} from '../../../store/LectureParamsStore';
import {
  clearFindMyCardRelatedStudentsCache,
  submitTask,
} from '../../../api/cardApi';
import { LectureStructureReportItem } from '../../../viewModel/LectureStructure';
import { Area } from 'tracker/model';
import { updateCardLectureStructure } from '../../../service/useLectureStructure/utility/updateCardLectureStructure';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { parsePolyglotString } from '../../../../../shared/viewmodel/PolyglotString';

interface LectureReportViewProps {
  lectureReport: LectureReport;
  setLectureReport: (reportValue: LectureReport) => void;
  setCubeLectureReport: () => any;
}

const LectureReportView: React.FC<LectureReportViewProps> =
  function LectureReportView({
    lectureReport,
    // setLectureReport,
    setCubeLectureReport,
  }) {
    const params = useLectureParams();

    const history = useHistory();
    const goToPath = (path?: string) => {
      if (path !== undefined) {
        //const currentHistory = getCurrentHistory();
        //if (currentHistory === undefined) {
        //  return;
        //}
        //currentHistory.push(path);
        history.push(path);
      }
    };

    const onSubmitClick = useCallback(() => {
      const params = getLectureParams();
      if (params === undefined) {
        return;
      }
      const lectureStructureItem = getActiveStructureItem(
        params.pathname
      ) as LectureStructureReportItem;
      const { student } = lectureStructureItem;
      if (student === undefined || student === null) {
        return;
      }

      // jz - ????????? ???????????? ??????????????? ?????????, ????????? ???????????? ???????????????.
      // if (lectureStructureItem?.canSubmit !== true) {
      //   reactAlert({
      //     title: '??????',
      //     message: '?????? ?????? ??? Report ????????? ???????????????.',
      //   });
      //   return;
      // }

      const homeworkFileBoxId =
        getLectureReport()?.studentReport?.homeworkFileBoxId;
      const homeworkContent =
        getLectureReport()?.studentReport?.homeworkContent;

      if (
        (homeworkFileBoxId === '' ||
          homeworkFileBoxId === null ||
          homeworkFileBoxId === undefined) &&
        (homeworkContent === '' ||
          homeworkContent === null ||
          homeworkContent === undefined)
      ) {
        reactAlert({
          title: getPolyglotText('??????', 'Report-Report-??????1'),
          message: getPolyglotText(
            '?????? ?????? ??????????????? ?????????????????????.',
            'Report-Report-?????????'
          ),
        });
        return;
      }

      reactConfirm({
        title: getPolyglotText('?????? ??????', 'Report-Report-????????????'),
        message: getPolyglotText('?????? ???????????????????', 'Report-Report-??????'),
        warning: true,
        onOk: async () => {
          await setCubeLectureReport();
          if (params?.cardId !== undefined) {
            await submitTask(student.id, 'Report');
            clearFindMyCardRelatedStudentsCache();
            await updateCardLectureStructure(params?.cardId);
            //????????????
            if (params.cubeId === undefined) {
              getCourseLectureReport(params);
            } else {
              getCubeLectureReport(params);
            }
          }
          const course = getActiveCourseStructureItem();
          if (
            course?.survey !== undefined &&
            course?.survey.state !== 'Completed'
          ) {
            reactAlert({
              title: getPolyglotText('??????', 'Report-Report-??????2'),
              message: getPolyglotText(
                '?????? ????????? ?????????????????????. ????????? ???????????? ????????? ????????? ???????????? ??? ????????????. Survey ????????? ??????????????????.',
                'Report-Report-????????????'
              ),
              onClose: () => goToPath(course?.survey?.path),
            });
          } else {
            reactAlert({
              title: getPolyglotText('??????', 'Report-Report-??????3'),
              message: getPolyglotText(
                '?????? ????????? ?????????????????????. ????????? ???????????? ????????? ????????? ???????????? ??? ????????????.',
                'Report-Report-????????????'
              ),
            });
          }
        },
      });
    }, [params?.cardId, params?.cubeId]);

    const getFileBoxIdForReference = useCallback((depotId: string) => {
      const lectureReport = getLectureReport();
      const studentReport: StudentReport = lectureReport?.studentReport || {};
      studentReport.homeworkFileBoxId = depotId;
      lectureReport && (lectureReport.studentReport = studentReport);
      setLectureReport(lectureReport);
    }, []);

    const [filesMap, setFilesMap] = useState<Map<string, any>>(
      new Map<string, any>()
    );

    useEffect(() => {
      getFileIds();
    }, [lectureReport]);

    const getFileIds = useCallback(() => {
      const referenceFileBoxId =
        lectureReport && lectureReport.studentReport?.homeworkOperatorFileBoxId;

      Promise.resolve().then(() => {
        if (referenceFileBoxId) findFiles('reference', referenceFileBoxId);
      });
    }, [lectureReport]);

    const findFiles = useCallback((type: string, fileBoxId: string) => {
      depot.getDepotFiles(fileBoxId).then((files) => {
        filesMap.set(type, files);
        const newMap = new Map(filesMap.set(type, files));
        setFilesMap(newMap);
      });
    }, []);

    return (
      <>
        {/* Header */}
        <div className="course-info-header" data-area={Area.CUBE_HEADER}>
          <Reportheader />
        </div>

        <div className="apl-form-wrap support">
          <Form>
            <Form.Field>
              <label>
                <PolyglotText
                  defaultString="?????? ?????????"
                  id="Report-Report-????????????"
                />
              </label>
              <div
                className="ui editor-wrap"
                dangerouslySetInnerHTML={{
                  __html: `${(
                    lectureReport?.reportFileBox?.reportQuestion || ''
                  ).replace(/(\n|\r\n)/g, '<br/>')}`,
                }}
                style={{ width: '100%' }}
              />
            </Form.Field>
            <Form.Field>
              {lectureReport?.reportFileBox?.fileBoxId && (
                <>
                  <div className="download-file">
                    <div className="btn-wrap">
                      <Button
                        icon
                        className="left icon-big-line2"
                        onClick={() =>
                          depot.downloadDepot(
                            lectureReport?.reportFileBox?.fileBoxId || ''
                          )
                        }
                      >
                        <Icon className="download2" />
                        <span>
                          <PolyglotText
                            defaultString="Download File"
                            id="Report-Report-????????????"
                          />
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div className="bottom">
                    <span className="text1">
                      <Icon className="info16" />
                      <span className="blind">
                        <PolyglotText
                          defaultString="information"
                          id="Report-Report-information1"
                        />
                      </span>
                      <PolyglotText
                        defaultString="?????????????????? ????????? Report ????????? Download ????????? ??? ????????????."
                        id="Report-Report-????????????"
                      />
                    </span>
                  </div>
                </>
              )}
              <div className="ui editor-wrap" style={{ width: '100%' }}>
                <Editor reportId={lectureReport?.reportId} />
              </div>
            </Form.Field>
            <Form.Field>
              <label className="necessary">
                <PolyglotText
                  defaultString="????????????"
                  id="Report-Report-????????????"
                />
              </label>
              <div className="report-attach">
                {/* <AttachFileUpload filesMap={filesMap}/> */}
                <div className="lg-attach">
                  <div className="attach-inner">
                    <FileBox
                      id={
                        (params?.cubeId === lectureReport.reportId ||
                          params?.cardId === lectureReport.reportId) && // report ????????? ???????????? ??????
                        lectureReport?.studentReport?.homeworkFileBoxId &&
                        lectureReport?.studentReport?.homeworkFileBoxId !==
                          null &&
                        lectureReport?.studentReport?.homeworkFileBoxId !==
                          'null'
                          ? lectureReport?.studentReport?.homeworkFileBoxId
                          : ''
                      }
                      vaultKey={{
                        keyString: 'sku-depot',
                        patronType: PatronType.Pavilion,
                      }}
                      patronKey={{
                        keyString: 'sku-denizen',
                        patronType: PatronType.Denizen,
                      }}
                      validations={[
                        {
                          type: ValidationType.Duplication,
                          validator: depotHelper.sizeWithDuplicationValidator,
                        },
                      ]}
                      onChange={getFileBoxIdForReference}
                    />
                    <div className="bottom">
                      <span className="text1">
                        <Icon className="info16" />
                        <span className="blind">
                          <PolyglotText
                            defaultString="information"
                            id="Report-Report-information2"
                          />
                        </span>
                        <PolyglotText
                          defaultString="????????? Report??? Upload????????? ?????? ???????????? ?????? ??? ????????? ?????? ???????????????."
                          id="Report-Report-????????????"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Form.Field>
          </Form>
        </div>
        {/* form ????????? div??? ????????? */}
        {lectureReport?.studentReport?.homeworkOperatorComment && (
          <div className="apl-form-wrap support">
            <Form>
              {/* margin-none ????????? ?????? */}
              <Form.Field className="margin-none">
                <label>
                  <PolyglotText
                    defaultString="???????????????"
                    id="Report-Report-????????????"
                  />
                </label>
                <div className="ui editor-wrap">
                  <div className="content-area">
                    <div className="content-inner ql-snow">
                      <div
                        className="ql-editor"
                        dangerouslySetInnerHTML={{
                          __html:
                            lectureReport?.studentReport
                              ?.homeworkOperatorComment || '',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Form.Field>
              {filesMap && (
                <div className="badge-detail">
                  <div className="ov-paragraph download-area">
                    <List bulleted>
                      <List.Item>
                        <div className="detail">
                          <div className="file-down-wrap">
                            {filesMap.get('reference') &&
                              filesMap
                                .get('reference')
                                .map(
                                  (
                                    foundedFile: DepotFileViewModel,
                                    index: number
                                  ) => (
                                    <div className="down">
                                      <a
                                        key={index}
                                        onClick={() =>
                                          depot.downloadDepotFile(
                                            foundedFile.id
                                          )
                                        }
                                      >
                                        <span>{foundedFile.name}</span>
                                      </a>
                                    </div>
                                  )
                                )}
                            {lectureReport?.studentReport
                              ?.homeworkOperatorFileBoxId && (
                              <div className="all-down">
                                <a
                                  onClick={() =>
                                    depot.downloadDepot(
                                      lectureReport?.studentReport
                                        ?.homeworkOperatorFileBoxId || ''
                                    )
                                  }
                                >
                                  <Icon className="icon-down-type4" />
                                  <span>
                                    <PolyglotText
                                      defaultString="?????? ????????????"
                                      id="Report-Report-????????????"
                                    />
                                  </span>
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </List.Item>
                    </List>
                  </div>
                </div>
              )}
            </Form>
          </div>
        )}
        <div className="survey-preview">
          {lectureReport?.state !== 'Completed' && (
            // lectureReport?.state !== 'Progress' &&
            <button className="ui button fix bg" onClick={onSubmitClick}>
              <PolyglotText defaultString="??????" id="Report-Report-????????????" />
            </button>
          )}
        </div>
      </>
    );
  };

export default LectureReportView;
