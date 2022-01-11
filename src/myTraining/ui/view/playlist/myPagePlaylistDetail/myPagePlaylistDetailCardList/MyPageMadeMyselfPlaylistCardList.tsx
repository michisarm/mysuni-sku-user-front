import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell } from 'semantic-ui-react';
import Image from 'shared/components/Image';
import { timeToHourMinutePaddingFormat } from 'shared/helper/dateTimeHelper';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { PlaylistCardTable } from '../MyPagePlaylistDetail.services';

function MyPageMadeMyselfPlaylistCardList(props: PlaylistCardTable) {
  const cards = props.playlistCard;
  return (
    <div className="playlist-detail-wrap">
      <Table className="playlist-mylist-list">
        <colgroup>
          <col width="100px" />
          <col width="*" />
          <col width="100px" />
          <col width="120px" />
          <col width="70px" />
        </colgroup>
        <TableBody>
          {cards.map((card, i) => {
            const {
              cardTitle,
              phaseCount,
              stepCount,
              learningTime,
              cardThumbnailImage,
            } = card;
            const time = timeToHourMinutePaddingFormat(learningTime);

            return (
              <Table.Row key={i}>
                <TableCell>
                  <Link to="#" className="list-thumb-wrap">
                    <Image src={cardThumbnailImage} alt="학습카드썸네일" />
                  </Link>
                </TableCell>
                <TableCell className="title">
                  <Link to="#">
                    <span className="ellipsis">{cardTitle}</span>
                  </Link>
                </TableCell>
                <TableCell>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: getPolyglotText(
                        `{phaseCount}개`,
                        'mypage-playlist-카드강의개수',
                        {
                          phaseCount: phaseCount.toString(),
                        }
                      ),
                    }}
                  />
                </TableCell>
                <TableCell>{time}</TableCell>
                <TableCell className="state-course-holder">
                  <div className={`label-state-cube l-step${stepCount}`}>
                    <span>cube 완료상태</span>
                  </div>
                </TableCell>
              </Table.Row>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default MyPageMadeMyselfPlaylistCardList;
