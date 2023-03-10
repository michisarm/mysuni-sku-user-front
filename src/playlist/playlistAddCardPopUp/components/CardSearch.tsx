import React, { useCallback, useMemo, useState } from 'react';
import { Button, Select, Table } from 'semantic-ui-react';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
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

  const onEnterSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSearchCard();
      }
    },
    [onSearchCard]
  );

  return (
    <div className="search_box box2">
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.Cell>
              <div className="option_box">
                <Select
                  placeholder={getPolyglotText(
                    '전체',
                    'mypage-playlist-전체리스트'
                  )}
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
                  placeholder={getPolyglotText(
                    '전체',
                    'mypage-playlist-전체리스트'
                  )}
                  options={channelOption}
                  value={selectedChannelId}
                  onChange={onSelectChannel}
                />
              </div>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              <PolyglotText defaultString="과정명" id="mypage-note-과정명" />
            </Table.HeaderCell>
            <Table.Cell colSpan="3">
              <div className={`ui input note_input ${isFocus ? 'focus' : ''}`}>
                <input
                  type="text"
                  placeholder={getPolyglotText(
                    '검색어를 입력해주세요.',
                    'mypage-note-검색어입력'
                  )}
                  value={searchWord}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={onChangeSearchWord}
                  onKeyUp={onEnterSearch}
                />
                <Button className="note_btn" onClick={onSearchCard}>
                  <PolyglotText defaultString="검색" id="통검-필레팝얼-검색" />
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
