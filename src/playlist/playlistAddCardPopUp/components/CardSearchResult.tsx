import React from 'react';
import { Checkbox, Table } from 'semantic-ui-react';
import { onCheckedCard } from '../playlistAddCardPopUp.events';
import {
  useCheckedCardIds,
  usePlaylistCards,
} from '../playlistAddCardPopUp.stores';
import { PlaylistAddCardPopUpPagination } from './PlaylistAddCardPopUpPagination';

export function CardSearchResult() {
  const playlistCards = usePlaylistCards();
  const checkedCardIds = useCheckedCardIds();

  return (
    <div className="table_card">
      <Table>
        <colgroup>
          <col width="60px" />
          <col width="600px" />
          <col width="120px" />
          <col width="160px" />
        </colgroup>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <span className="hidden">선택여부</span>
            </Table.HeaderCell>
            <Table.HeaderCell>과정명</Table.HeaderCell>
            <Table.HeaderCell>생성자</Table.HeaderCell>
            <Table.HeaderCell>등록일자</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {playlistCards.map((card) => (
            <Table.Row>
              <Table.Cell>
                <Checkbox
                  className="base"
                  value={card.cardId}
                  checked={checkedCardIds.includes(card.cardId)}
                  onClick={onCheckedCard}
                />
              </Table.Cell>
              <Table.Cell>
                <p className="ellipsis">{card.cardName}</p>
              </Table.Cell>
              <Table.Cell>{card.creator}</Table.Cell>
              <Table.Cell>{card.registerTime}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <PlaylistAddCardPopUpPagination />
    </div>
  );
}
