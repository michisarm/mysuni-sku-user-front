import React, { useEffect, useState } from 'react';
import {
  Modal,
  Table,
  Rating,
  Tab,
  Select,
  Comment,
  Accordion,
  Button,
  Icon,
  Image,
} from 'semantic-ui-react';
import {
  useProfileInfoPostModel,
  setProfileInfoPostModel,
} from '../../../store/ProfileInfoPostStore';
import { getProfileInfoPost } from '../../../service/ProfilePopupService/getProfileInfoPost';
import UserProfileInfoTabFeedItem from './UserProfileInfoTabFeedItem';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  memberId: string | undefined;
  setOpen: (state: boolean) => void;
}

function UserProfileInfoTabFeed(props: Props) {
  const feedData = useProfileInfoPostModel();

  useEffect(() => {
    getProfileInfoPost(props.memberId);
    return () => {
      setProfileInfoPostModel();
    };
  }, [props.memberId]);

  useEffect(() => {
    console.log('feedData', feedData);
  }, [feedData]);

  return (
    <Tab.Pane>
      {
        feedData && feedData.posts.length > 0 && (
          <div className="list-wrapper community-main-contants">
            <div className="sub-info-box">
              <div className="feed-list-area feed-wrapper">
                {feedData?.posts.map((item: any, index: any) => (
                  <UserProfileInfoTabFeedItem
                    item={item}
                    index={index}
                    setOpen={props.setOpen}
                  />
                ))}
              </div>
            </div>
          </div>
        )
        //  : (
        //   <div className="community_nodata feed-area">
        //     <Icon>
        //       <Image src={`${process.env.PUBLIC_URL}/images/all/no-contents-80-px.svg`} />
        //     </Icon>
        //     <p>작성한 Feed가 없습니다.</p>
        //   </div>
        // )
      }
      {feedData && feedData.posts.length === 0 && (
        <div className="community_nodata feed-area">
          <Icon>
            <Image
              src={`${process.env.PUBLIC_URL}/images/all/no-contents-80-px.svg`}
            />
          </Icon>
          <p>
            <PolyglotText
              id="mypage-유저모달-nofeed"
              defaultString="작성한 Feed가 없습니다."
            />
          </p>
        </div>
      )}
    </Tab.Pane>
  );
}

export default UserProfileInfoTabFeed;
