import React, { useCallback, useMemo, useState } from 'react';
import { Button, Select, Table } from 'semantic-ui-react';
import { getChannelOption } from '../helper/getChannelOption';
import { getCollegeOption } from '../helper/getCollegeOption';
import {
  onChangeSearchWord,
  onSearchCard,
  onSelectChannel,
  onSelectCollege,
} from '../playlistAddCardPopUp.events';
import {
  usePlaylistColleges,
  useSearchWord,
  useSelectedChannelId,
  useSelectedCollegeId,
} from '../playlistAddCardPopUp.stores';

export function CardSearch() {
  const colleges = usePlaylistColleges();
  const selectedCollegeId = useSelectedCollegeId();
  const selectedChannelId = useSelectedChannelId();
  const searchWord = useSearchWord();
  const [isFocus, setIsFocus] = useState(false);

  const collegeOption = useMemo(() => getCollegeOption(colleges), [colleges]);

  const channelOption = useMemo(
    () => getChannelOption(selectedCollegeId),
    [selectedCollegeId]
  );

  const onFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsFocus(false);
  }, []);

  return (
    <div className="search_box">
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell>College</Table.HeaderCell>
            <Table.Cell>
              <div className="option_box">
                <Select
                  placeholder="전체"
                  options={collegeOption}
                  value={selectedCollegeId}
                  onChange={onSelectCollege}
                />
              </div>
            </Table.Cell>
            <Table.HeaderCell>Channel</Table.HeaderCell>
            <Table.Cell>
              <div className="option_box">
                <Select
                  placeholder="전체"
                  options={channelOption}
                  value={selectedChannelId}
                  onChange={onSelectChannel}
                />
              </div>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>과정명</Table.HeaderCell>
            <Table.Cell colSpan={3}>
              <div
                className={`ui input note_input", ${isFocus ? 'focus' : ''}`}
              >
                <input
                  type="text"
                  placeholder="검색어를 입력해주세요"
                  value={searchWord}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={onChangeSearchWord}
                />
                <Button className="note_btn" onClick={onSearchCard}>
                  검색
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
