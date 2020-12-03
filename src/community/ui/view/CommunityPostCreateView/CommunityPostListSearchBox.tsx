import { SearchType } from 'community/ui/logic/CommunityPostListContainer';
import React, { useCallback } from 'react';
import { Button, Icon, Select } from 'semantic-ui-react';

interface CommunityPostListViewProps{
  onChangeSearchType: (name: string, value: SearchType) => void;
  onChangeSearchText: (name: string) => void;
  onSearch: () => void;
  searchText: string;
  searchType: string;
}

const CommunityPostListSearchBox: React.FC<CommunityPostListViewProps> = function CommunityPostListSearchBox({
  onChangeSearchType,
  onChangeSearchText,
  onSearch,
  searchText,
  searchType
}) {

  const searchOptions = [{'text': '전체', 'value': 'all'},{'text': '제목', 'value': 'title'}, {'text': '내용', 'value': 'content'}, {'text': '작성자', 'value': 'nickname'}]
  // const onHandleClickRow = useCallback(
  //   // // param => {
  //   // //   handleClickRow(param);
  //   // // },
  //   // []
  // );
  const handleSearchTextChange = (e: any) => {
    onChangeSearchText(e.target.value)
  }

  const handleSearchTypeChange = (e: any, value: SearchType) => {
    onChangeSearchType(e, value)
  }
  
  return (
    <>
      <div className="paging-search">
          <Select placeholder="분류를 선택해주세요"
            className="s160 small-border"
            options={searchOptions}
            value={searchType}
            onChange={(e: any, data: any) => handleSearchTypeChange('search', data.value)}
          />
        <div className="ui h38 search input">
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            value={searchText}
            onChange={handleSearchTextChange}
            onKeyPress={e => e.key === 'Enter' && onSearch()}
          />
          <Icon className="search link" onClick={() => onSearch()} />
        </div>
      </div>
    </>
  );
}

export default CommunityPostListSearchBox;
