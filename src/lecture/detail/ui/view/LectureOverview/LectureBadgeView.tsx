import React from 'react';
import { Icon, Label } from 'semantic-ui-react';
import BadgeView from '../../../../../certification/ui/view/BadgeView';
import LectureBadge from '../../../viewModel/LectureOverview/LectureBadge';
import BadgeSize from '../../../../../certification/ui/model/BadgeSize';
import BadgeStyle from '../../../../../certification/ui/model/BadgeStyle';
import { Area } from 'tracker/model';

interface LectureBadgeViewProps {
  lectureBadge: LectureBadge;
}

const LectureBadgeView: React.FC<LectureBadgeViewProps> = function LectureBadgeView({
  lectureBadge,
}) {
  console.log('???????????', lectureBadge);
  return (
    <>
      <div
        className="badge-detail"
        id="lms-related-badge"
        data-area={Area.CARD_BADGE}
      >
        <div className="ov-paragraph">
          <div className="section-head">
            <div className="title">
              <h3 className="title-style">
                <Label className="onlytext bold size24">
                  <Icon className="lms-badge" />
                  <span>{/*Tag*/}관련 Badge</span>
                </Label>
              </h3>
            </div>
          </div>
          <div className="scrolling lms-badge-list">
            <div className="badge-list-type">
              <ul className="belt">
                {lectureBadge.badges.map(bundle => {
                  const { badge, badgeCategory } = bundle;
                  return (
                    <li>
                      <BadgeView
                        id={badge.id}
                        name={badge.name}
                        level="Level1"
                        iconUrl={badge.iconUrl}
                        categoryId={badgeCategory.id}
                        badgeSize={BadgeSize.Small}
                        badgeStyle={BadgeStyle.List}
                        badgeColor={badgeCategory.themeColor}
                        backgroundImagePath={badgeCategory.backgroundImagePath}
                        topImagePath={badgeCategory.topImagePath}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LectureBadgeView;

const REPRESENT_IMAGE =
  'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMSIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDMxIDIwIj4NCiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8Zz4NCiAgICAgICAgICAgIDxnPg0KICAgICAgICAgICAgICAgIDxnPg0KICAgICAgICAgICAgICAgICAgICA8Zz4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NDkgLTEyMjEpIHRyYW5zbGF0ZSg0MDAgMTU5KSB0cmFuc2xhdGUoMCA0MTMpIHRyYW5zbGF0ZSgwIDU1NCkgdHJhbnNsYXRlKDQ5IDk1KSI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjE5IiB4PSIuNSIgeT0iLjUiIGZpbGw9IiNGRkYiIHN0cm9rZT0iI0ZGNjY0RCIgcng9IjkuNSIvPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0IGZpbGw9IiNGRjY2NEQiIGZvbnQtZmFtaWx5PSJOb3RvU2Fuc0NKS2tyLUJvbGQsIE5vdG8gU2FucyBDSksgS1IiIGZvbnQtc2l6ZT0iMTAiIGZvbnQtd2VpZ2h0PSJib2xkIiBsZXR0ZXItc3BhY2luZz0iLS40Ij4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRzcGFuIHg9IjYuNyIgeT0iMTQiPuuMgO2RnDwvdHNwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZXh0Pg0KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+DQo=';
