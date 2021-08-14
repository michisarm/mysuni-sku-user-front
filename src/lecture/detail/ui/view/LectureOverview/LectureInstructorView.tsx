import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Label } from 'semantic-ui-react';
import LectureInstructor from '../../../viewModel/LectureOverview/LectureInstructor';
import LectureApi from 'layout/UserApp/present/apiclient/LectureApi';
import Image from '../../../../../shared/components/Image';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from 'lecture/model/LangSupport';

interface LectureInstructorViewProps {
  lectureInstructor: LectureInstructor;
}
/*eslint-disable*/
function Represent() {
  return <img src={REPRESENT_IMAGE} className="p-label" />;
}

const LectureInstructorView: React.FunctionComponent<LectureInstructorViewProps> =
  function LectureInstructorView({ lectureInstructor }) {
    return (
      <>
        <div className="section-head">
          <div className="title">
            <h3 className="title-style">
              <Label className="onlytext bold size24">
                <Icon className="host" />
                <span>
                  {/*Tag*/}
                  <PolyglotText
                    defaultString="강사정보"
                    id="Course-Contents-강사정보"
                  />
                </span>
              </Label>
            </h3>
          </div>
        </div>
        <div className="scrolling course-profile">
          {lectureInstructor &&
            lectureInstructor.instructors &&
            lectureInstructor.instructors.map(
              (
                { instructorId, representative, instructorWithIdentity },
                index
              ) => (
                <Link
                  className="ui profile tool-tip"
                  to={`/expert/instructor/${instructorId}/Introduce`}
                >
                  {representative && <Represent />}
                  <div className="pic s80">
                    {instructorWithIdentity?.instructor?.photoFilePath && (
                      <Image
                        alt="프로필사진"
                        className="ui image"
                        src={instructorWithIdentity?.instructor.photoFilePath}
                      />
                    )}
                  </div>
                  <i>
                    <span className="tip-name">
                      {parsePolyglotString(
                        instructorWithIdentity?.instructor?.name,
                        getDefaultLang(
                          instructorWithIdentity?.instructor?.langSupports
                        )
                      )}
                    </span>
                    <a className="tip-id">
                      {instructorWithIdentity?.instructor?.internal
                        ? parsePolyglotString(
                            instructorWithIdentity.userIdentity?.departmentName,
                            getDefaultLang(
                              instructorWithIdentity?.instructor.langSupports
                            )
                          )
                        : parsePolyglotString(
                            instructorWithIdentity?.instructor?.organization,
                            getDefaultLang(
                              instructorWithIdentity?.instructor?.langSupports
                            )
                          )}
                    </a>
                  </i>
                </Link>
              )
            )}
        </div>
      </>
    );
  };

export default LectureInstructorView;

const REPRESENT_IMAGE =
  'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMSIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDMxIDIwIj4NCiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8Zz4NCiAgICAgICAgICAgIDxnPg0KICAgICAgICAgICAgICAgIDxnPg0KICAgICAgICAgICAgICAgICAgICA8Zz4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NDkgLTEyMjEpIHRyYW5zbGF0ZSg0MDAgMTU5KSB0cmFuc2xhdGUoMCA0MTMpIHRyYW5zbGF0ZSgwIDU1NCkgdHJhbnNsYXRlKDQ5IDk1KSI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjE5IiB4PSIuNSIgeT0iLjUiIGZpbGw9IiNGRkYiIHN0cm9rZT0iI0ZGNjY0RCIgcng9IjkuNSIvPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0IGZpbGw9IiNGRjY2NEQiIGZvbnQtZmFtaWx5PSJOb3RvU2Fuc0NKS2tyLUJvbGQsIE5vdG8gU2FucyBDSksgS1IiIGZvbnQtc2l6ZT0iMTAiIGZvbnQtd2VpZ2h0PSJib2xkIiBsZXR0ZXItc3BhY2luZz0iLS40Ij4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRzcGFuIHg9IjYuNyIgeT0iMTQiPuuMgO2RnDwvdHNwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZXh0Pg0KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+DQo=';
