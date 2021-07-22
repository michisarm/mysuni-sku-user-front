import React, { useCallback, useState } from 'react';
import LectureDescription from '../../../viewModel/LectureOverview/LectureDescription';
import LectureFile from '../../../viewModel/LectureOverview/LectureFile';
import LectureSubcategory from '../../../viewModel/LectureOverview/LectureSubcategory';
import LectureTags from '../../../viewModel/LectureOverview/LectureTags';
import LectureDescriptionView from './LectureDescriptionView';
import LectureFileView from './LectureFileView';
import LectureSubcategoryView from './LectureCubeSubcategoryView';
import LectureTagsView from './LectureTagsView';
import { Icon, Label, List } from 'semantic-ui-react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

// http://ma.mysuni.sk.com/api/depot/depotFile/multiple?depotIds=%255B%252250%2522%255D

function isEmpty(text?: string) {
  return text === undefined || text === null || text === '';
}

interface LectureCubeInfoViewProps {
  lectureDescription: LectureDescription;
}

const LectureCubeInfoView: React.FC<LectureCubeInfoViewProps> = function LectureCubeInfoView({
  lectureDescription,
}) {
  if (
    isEmpty(lectureDescription.goal) &&
    isEmpty(lectureDescription.applicants) &&
    isEmpty(lectureDescription.organizer) &&
    isEmpty(lectureDescription.completionTerms) &&
    isEmpty(lectureDescription.guide)
  ) {
    return null;
  }
  return (
    <>
      {(!isEmpty(lectureDescription.goal) ||
        !isEmpty(lectureDescription.applicants) ||
        !isEmpty(lectureDescription.organizer)) && (
        <div className="ov-paragraph">
          <List>
            {!isEmpty(lectureDescription.goal) && (
              <List.Item>
                <div className="title">
                  <h3 className="title-style">
                    <Label className="onlytext bold size24">
                      <Icon className="goal" />
                      <span>{/* Goal */}<PolyglotText defaultString="학습목표" id="cube-Contents-학습목표" /></span>
                    </Label>
                  </h3>
                </div>
                <div className="detail">{lectureDescription.goal}</div>
              </List.Item>
            )}
            {!isEmpty(lectureDescription.applicants) && (
              <List.Item>
                <div className="title">
                  <h3 className="title-style">
                    <Label className="onlytext bold size24">
                      <Icon className="target" />
                      <span>{/* Target */}<PolyglotText defaultString="대상" id="cube-Contents-대상" /></span>
                    </Label>
                  </h3>
                </div>
                <div className="detail">{lectureDescription.applicants}</div>
              </List.Item>
            )}
            {!isEmpty(lectureDescription.organizer) && (
              <List.Item>
                <div className="title">
                  <h3 className="title-style">
                    <Label className="onlytext bold size24">
                      <Icon className="host" />
                      <span>{/* Host */}<PolyglotText defaultString="교육기관 출처" id="cube-Contents-교육기관 출처" /></span>
                    </Label>
                  </h3>
                </div>
                <div className="detail">{lectureDescription.organizer}</div>
              </List.Item>
            )}
          </List>
        </div>
      )}
      {(!isEmpty(lectureDescription.completionTerms) ||
        !isEmpty(lectureDescription.guide)) && (
        <div className="ov-paragraph info-box2">
          <List bulleted>
            {!isEmpty(lectureDescription.completionTerms) && (
              <List.Item>
                <div className="title">{/*Requirements*/}<PolyglotText defaultString="이수조건" id="cube-Contents-이수조건" /></div>
                <div className="detail completion-terms">
                  {lectureDescription.completionTerms}
                </div>
              </List.Item>
            )}
            {!isEmpty(lectureDescription.guide) && (
              <List.Item>
                <div className="title">{/*Other Guides*/}<PolyglotText defaultString="기타안내" id="cube-Contents-기타안내" /></div>
                <div className="overview ql-snow">
                  <div
                    className="detail ql-editor"
                    dangerouslySetInnerHTML={{
                      __html: lectureDescription.guide!,
                    }}
                  />
                </div>
              </List.Item>
            )}
          </List>
        </div>
      )}
    </>
  );
};

export default LectureCubeInfoView;
