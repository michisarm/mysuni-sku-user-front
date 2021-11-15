import React from 'react';
import { Tab, Icon } from 'semantic-ui-react';
import { useUserFeedList } from '../userProfileInfo.services';
import { Image } from '../../components/Image';
import { UserProfileInfoTabFeedItem } from './UserProfileInfoTabFeedItem';

interface Props {
  memberId: string | undefined;
  setOpen: (state: boolean) => void;
}

export function UserProfileInfoTabFeed(props: Props) {
  const feedData = useUserFeedList();

  return (
    <>
      <Tab.Pane>
        {
          feedData && feedData.results.length > 0 && (
            <div className="list-wrapper community-main-contants">
              <div className="sub-info-box">
                <div className="feed-list-area feed-wrapper">
                  {feedData?.results.map((item: any, index: any) => (
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
        {feedData && feedData.results.length === 0 && (
          <div className="community_nodata feed-area">
            <Icon>
              <Image src="/suni-community/images/all/no-contents-80-px.svg" />
            </Icon>
            <p>작성한 Feed가 없습니다.</p>
          </div>
        )}
      </Tab.Pane>
    </>
  );
}
