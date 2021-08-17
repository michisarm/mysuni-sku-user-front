import { requestRecentlyStudyChannel } from 'lecture/recommend/service/getRecentlyStudyChannel';
import { useRecentlyStudyChannelItem } from 'lecture/recommend/store/recommendStore';
import { requestPopularCourse } from 'main/sub/PersonalBoard/service/getPopularCourse';
import { usePopularCourseItem } from 'main/sub/PersonalBoard/store/PersonalBoardStore';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  companyCode: string;
}

function ChannelsHeaderInfoContainer(props: Props) {
  const { companyCode } = props;

  const [popularChannel, setPopularChannel] = useState<any[]>();

  const ChannelItem = useRecentlyStudyChannelItem();
  const CourseItem = usePopularCourseItem();

  useEffect(() => {
    requestRecentlyStudyChannel();
    requestPopularCourse(companyCode, 7);
  }, []);

  useEffect(() => {
    const CourseItemArr: any[] = [];
    const lastArr: any[] = [];
    if (CourseItem && CourseItem.length !== 0) {
      CourseItem.map((item) => {
        CourseItemArr.push(item.channelName);
      });
      CourseItemArr.forEach((element) => {
        if (!lastArr.includes(element)) {
          lastArr.push(element);
        }
      });
      setPopularChannel([...lastArr]);
    }
  }, [ChannelItem, CourseItem]);

  return (
    <>
      {/* {ChannelItem && ChannelItem[1] && popularChannel && (
        <div className="recommend-info">
          <div className="personal-channel-list">
            <h3>
              <PolyglotText
                id="Recommend-ChannelsHeader-학습중채널"
                defaultString="최근 학습중인 채널"
              />
            </h3>
            {ChannelItem[0] && (
              <span className="toggle toggle4" aria-pressed="false">
                {ChannelItem[0]}
              </span>
            )}
            {ChannelItem[1] && (
              <span className="toggle toggle4" aria-pressed="false">
                {ChannelItem[1]}
              </span>
            )}
            {ChannelItem[2] && (
              <span className="toggle toggle4" aria-pressed="false">
                {ChannelItem[2]}
              </span>
            )}
          </div>
          <div className="personal-channel-list">
            <h3>
              <PolyglotText
                id="Recommend-ChannelsHeader-인기채널"
                defaultString="우리 회사 인기 채널"
              />
            </h3>
            {popularChannel[0] && (
              <span className="toggle toggle4" aria-pressed="false">
                {popularChannel[0]}
              </span>
            )}
            {popularChannel[1] && (
              <span className="toggle toggle4" aria-pressed="false">
                {popularChannel[1]}
              </span>
            )}
            {popularChannel[2] && (
              <span className="toggle toggle4" aria-pressed="false">
                {popularChannel[2]}
              </span>
            )}
          </div>
        </div>
      )} */}

      {/* <BadgeLearningTimeView/><br/>
    <LearningTimeDetailView/><br/>
    <CollegeTopChartView
      myLearningSummary={myLearningSummary}
      collegeInfo={collegeInfo}
    /><br/>
    <MyCompanyPopularCourseView onTabClick={handlePopularCourseDate}/> */}
    </>
  );
}

// export default PersonalBoardContainer;

export default ChannelsHeaderInfoContainer;
