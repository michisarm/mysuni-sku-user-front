import { srcParser } from 'community/ui/components/Image';
import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Table, TableBody, TableCell } from 'semantic-ui-react';
import { timeToHourMinutePaddingFormat } from 'shared/helper/dateTimeHelper';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { PlaylistCardTable } from '../MyPagePlaylistDetail.services';

function MyPageOthersPlaylistCardList(props: PlaylistCardTable) {
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
          {cards.map((card) => {
            const {
              cardTitle,
              phaseCount,
              stepCount,
              learningTime,
              cardThumbnailImage,
              cardId,
            } = card;
            const time = timeToHourMinutePaddingFormat(learningTime);

            return (
              <Table.Row>
                <TableCell>
                  <Link
                    to={`/lecture/card/${cardId}/view`}
                    className="list-thumb-wrap"
                  >
                    <Image
                      src={srcParser(cardThumbnailImage)}
                      alt="학습카드썸네일"
                    />
                  </Link>
                </TableCell>
                <TableCell className="title">
                  <Link to={`/lecture/card/${cardId}/view`}>
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

export default MyPageOthersPlaylistCardList;
