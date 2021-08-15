import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Label } from 'semantic-ui-react';
import LecturePrecourse from '../../../viewModel/LectureOverview/LecturePrecourse';
import LectureParams, { toPath } from '../../../viewModel/LectureParams';
import { Area } from 'tracker/model';
import { PolyglotText } from '../../../../../shared/ui/logic/PolyglotText';
import {
  parsePolyglotString,
  PolyglotString,
} from 'shared/viewmodel/PolyglotString';

interface CourseViewProps {
  required: boolean;
  name: PolyglotString;
  prerequisiteCardId: string;
}

interface LecturePrecourseViewProps {
  lecturePrecourse: LecturePrecourse;
}

const CourseView: React.FC<CourseViewProps> = function CourseView({
  required,
  name,
  prerequisiteCardId,
}) {
  const params: LectureParams = {
    cardId: prerequisiteCardId,
    viewType: 'view',
    pathname: '',
  };
  const to = toPath(params);
  return (
    <>
      <div className="course-box">
        <div className="bar">
          <div className="tit">
            <span className="ellipsis">
              {required && (
                <span className="course-span-box red-box">
                  <PolyglotText
                    defaultString="필수"
                    id="Course-CourseView-선수필수"
                  />
                </span>
              )}
              {!required && (
                <span className="course-span-box gray-box">
                  <PolyglotText
                    defaultString="선택"
                    id="Course-CourseView-선수선택"
                  />
                </span>
              )}

              <span className="under">{parsePolyglotString(name)}</span>
            </span>
          </div>
          <div className="right-area">
            <Link to={to} className="right btn-blue">
              <span>
                <PolyglotText
                  defaultString="바로가기"
                  id="Course-CourseView-선수바로"
                />
              </span>
              <Icon className="arrow-g-16" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const LecturePrecourseView: React.FC<LecturePrecourseViewProps> =
  function LecturePrecourseView({ lecturePrecourse }) {
    return (
      <div className="ov-paragraph course-area" data-area={Area.CARD_PRECOURSE}>
        <div className="section-head">
          <div className="title-style">
            <Label className="onlytext bold size24">
              <Icon className="before" />
              <span>
                <PolyglotText
                  defaultString="선수과정"
                  id="Course-CourseView-선수과정"
                />
              </span>
            </Label>
          </div>
        </div>
        <div className="course-cont pre-course">
          {lecturePrecourse.prerequisiteCards.map(
            ({ prerequisiteCardId, required, prerequisiteCardName }) => (
              <CourseView
                key={prerequisiteCardId}
                prerequisiteCardId={prerequisiteCardId}
                required={required}
                name={prerequisiteCardName}
              />
            )
          )}
        </div>
      </div>
    );
  };

export default LecturePrecourseView;
