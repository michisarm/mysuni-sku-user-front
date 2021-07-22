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
import {
  useProfileInfoBadgesModel,
  setProfileInfoBadgesModel,
} from '../../../store/ProfileInfoBadgeStore';
import { getProfileInfoBadge } from '../../../service/ProfilePopupService/getProfileInfoBadge';
import { useHistory } from 'react-router-dom';
import BadgeRoutePaths from '../../../../../certification/routePaths';
import moment from 'moment';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  memberId: string | undefined;
  setOpen: (state: boolean) => void;
}

function UserProfileInfoTabBadge(props: Props) {
  const history = useHistory();

  const selectOptions = [];
  const currentDate = new Date();
  const [startDate, setStartDate] = useState<string>(
    moment(currentDate.getFullYear() + '-01-01 00:00:01').format('x')
  );
  const [endDate, setEndDate] = useState<string>(
    moment(currentDate.getFullYear() + '-12-31 23:59:59').format('x')
  );

  for (let i = currentDate.getFullYear(); i >= 2020; i--) {
    selectOptions.push({
      key: i,
      value: i,
      text: i + getPolyglotText('년', 'mypage-유저모달-년'),
    });
  }

  const badgeData = useProfileInfoBadgesModel();
  useEffect(() => {
    getProfileInfoBadge(props.memberId, startDate, endDate);
    return () => {
      setProfileInfoBadgesModel(undefined);
    };
  }, [props.memberId, startDate, endDate]);

  const getStarStyle = (level: string) => {
    switch (level) {
      case 'Level1':
        return '1';
      case 'Level2':
        return '2';
      case 'Level3':
        return '3';
    }
    return 1;
  };

  const onViewDetail = (id: string) => {
    props.setOpen(false);
    history.push(BadgeRoutePaths.badgeDetailPage(id));
  };

  const onChange = (year: string) => {
    setStartDate(moment(year + '-01-01 00:00:01').format('x'));
    setEndDate(moment(year + '-12-31 23:59:59').format('x'));
  };

  return (
    <Tab.Pane>
      <div className="list-wrapper">
        <div className="top-line">
          <div className="select-area">
            <Select
              placeholder={getPolyglotText('선택', 'mypage-유저모달-선택')}
              className="ui small-border dropdown m0"
              defaultValue={selectOptions[0].value}
              options={selectOptions}
              onChange={(e: any, data: any) => onChange(data.value)}
            />
          </div>
          <span>
            <PolyglotText
              id="mypage-유저모달-획득"
              defaultString="획득한 Badge"
            />
            : <strong>{badgeData?.badgesTotalCount}</strong>
            <PolyglotText id="mypage-유저모달-개2" defaultString="개" />
          </span>
        </div>
      </div>
      {badgeData && badgeData?.badges.length !== 0 && (
        <div className="table-wrapper">
          <Table>
            <colgroup>
              <col width="506px" />
              <col width="84px" />
              <col />
            </colgroup>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">
                  <PolyglotText
                    id="mypage-유저모달-badge"
                    defaultString="Badge명"
                  />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  <PolyglotText
                    id="mypage-유저모달-Level"
                    defaultString="Level"
                  />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  <PolyglotText
                    id="mypage-유저모달-획득일"
                    defaultString="획득일"
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {badgeData?.badges.map((item: any, index: any) => (
                <Table.Row onDoubleClick={() => onViewDetail(item.id)}>
                  <Table.Cell>
                    <span
                      className="t-navy"
                      style={{
                        color: item.badgeCategory.themeColor,
                        borderColor: item.badgeCategory.themeColor,
                      }}
                    >
                      {item.badgeCategory.name}
                    </span>
                    <a title={item.name}>{item.name}</a>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Rating
                      defaultRating={getStarStyle(item.level)}
                      maxRating={3}
                      disabled
                      className="fixed-rating"
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {moment(item.badgeCategory.time).format('YYYY.MM.DD')}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
      {badgeData && badgeData?.badges.length === 0 && (
        <div className="community_nodata">
          <Icon>
            <Image
              src={`${process.env.PUBLIC_URL}/images/all/no-contents-80-px.svg`}
            />
          </Icon>
          <p>
            <PolyglotText
              id="mypage-유저모달-선택연도"
              defaultString="선택한 연도에"
            />
            <br />
            <PolyglotText
              id="mypage-유저모달-badgex"
              defaultString="획득한 Badge가 없습니다."
            />
          </p>
        </div>
      )}
    </Tab.Pane>
  );
}

export default UserProfileInfoTabBadge;
