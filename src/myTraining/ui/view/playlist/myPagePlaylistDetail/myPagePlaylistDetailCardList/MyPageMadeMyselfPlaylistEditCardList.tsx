import { srcParser } from 'community/ui/components/Image';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Icon,
  Image,
  Table,
  TableBody,
  TableCell,
} from 'semantic-ui-react';
import {
  checkCardContent,
  downCardContent,
  upCardContent,
} from './MyPagePlaylistDetailCardList.event';
import {
  CardCheckedItem,
  useCheckedCardList,
} from './MyPagePlaylistDetailCardList.service';

function MyPageMadeMyselfPlaylistEditCardList() {
  const cardList = useCheckedCardList() || [];
  return (
    <div className="playlist-detail-wrap">
      <Table className="playlist-mylist-list">
        <colgroup>
          <col width="70px" />
          <col width="80px" />
          <col width="*" />
          <col width="120px" />
        </colgroup>
        <TableBody>
          {cardList.map((card, index) => (
            <EditCardList {...card} key={index} contentIndex={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

interface CheckedCardListViewProps extends CardCheckedItem {
  contentIndex: number;
}

export function EditCardList(props: CheckedCardListViewProps) {
  const { cardTitle, cardThumNail, contentIndex, checked } = props;

  return (
    <Table.Row>
      <Table.Cell>
        <Checkbox
          onClick={() => checkCardContent(contentIndex)}
          checked={checked}
        >
          <span className="blind">선택</span>
        </Checkbox>
      </Table.Cell>
      <TableCell>
        <Link to="#" className="list-thumb-wrap">
          <Image src={srcParser(cardThumNail)} alt="학습카드썸네일" />
        </Link>
      </TableCell>
      <TableCell className="title">
        <Link to="#">
          <span className="ellipsis2">{cardTitle}</span>
        </Link>
      </TableCell>
      <TableCell>
        <Button
          className="btn-control btn-up"
          onClick={() => upCardContent(contentIndex)}
        >
          <Icon className="chevron up" />
        </Button>
        <Button
          className="btn-control btn-down"
          onClick={() => downCardContent(contentIndex)}
        >
          <Icon className="chevron down" />
        </Button>
      </TableCell>
    </Table.Row>
  );
}

export default MyPageMadeMyselfPlaylistEditCardList;
