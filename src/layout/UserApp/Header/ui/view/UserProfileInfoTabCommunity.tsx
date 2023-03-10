import React, { useEffect, useState } from 'react';
import {
  Modal,
  Table,
  Rating,
  Tab,
  Select,
  Icon,
  Image,
} from 'semantic-ui-react';
import { getProfileInfoCommunities } from '../../../service/ProfilePopupService/getProfileInfoCommunities';
import {
  useProfileInfoCommunityModel,
  setProfileInfoCommunityModel,
} from '../../../store/ProfileInfoCommunityStore';
import { useHistory } from 'react-router-dom';
import { PolyglotText, getPolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  memberId: string | undefined;
  setOpen: (state: boolean) => void;
}

function UserProfileInfoTabCommunity(props: Props) {
  const communityData = useProfileInfoCommunityModel();

  useEffect(() => {
    getProfileInfoCommunities(props.memberId);
    return () => {
      setProfileInfoCommunityModel();
    };
  }, [props.memberId]);

  const history = useHistory();

  const onViewDetail = (communityId: string) => {
    //props.setOpen(false);
    //history.push(`/community/${communityId}`);
    window.open(
      `${window.location.origin}/suni-community/community/${communityId}/home`,
      '_blank'
    );
  };
  return (
    <Tab.Pane>
      <div className="list-wrapper">
        <div className="top-line front-dot community-line">
          <span
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                `가입한 커뮤니티:{count}</strong>개`,
                'mypage-유저모달-가입',
                {
                  count: (communityData?.communitiesTotalCount || 0).toString(),
                }
              ),
            }}
          />
        </div>
      </div>
      {communityData && communityData.communities.length > 0 && (
        <div className="table-wrapper">
          <Table>
            <colgroup>
              <col width="390px" />
              <col width="100px" />
              <col />
              <col width="100px" />
            </colgroup>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">
                  <PolyglotText
                    id="mypage-유저모달-커뮤니티명"
                    defaultString="커뮤니티명"
                  />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  <PolyglotText
                    id="mypage-유저모달-관리자"
                    defaultString="관리자"
                  />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  <PolyglotText
                    id="mypage-유저모달-가입인원"
                    defaultString="가입인원"
                  />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  <PolyglotText
                    id="mypage-유저모달-가입일"
                    defaultString="가입일"
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {communityData &&
                communityData?.communities.map((item: any, index: any) => (
                  <Table.Row
                    onDoubleClick={() => onViewDetail(item.communityId)}
                  >
                    <Table.Cell>
                      <span className="l-green">{item.fieldName}</span>
                      <a title={item.name}>{item.name}</a>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {item.managerNickName}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {item.memberCount}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {item.signInTime}
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      )}
      {communityData && communityData.communities.length === 0 && (
        <div className="community_nodata">
          <Icon>
            <Image
              src={`${process.env.PUBLIC_URL}/images/all/no-contents-80-px.svg`}
            />
          </Icon>
          <p>
            <PolyglotText
              id="mypage-유저모달-가입x"
              defaultString="가입한 커뮤니티가 없습니다."
            />
          </p>
        </div>
      )}
    </Tab.Pane>
  );
}

export default UserProfileInfoTabCommunity;
