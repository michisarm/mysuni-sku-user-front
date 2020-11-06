import { SearchType } from 'community/ui/logic/CommunityPostListContainer';
import React, { useCallback } from 'react';
import { Button, Icon, Select } from 'semantic-ui-react';

interface CommunityPostListViewProps{
  onChangeSearchType: (name: string, value: SearchType) => void;
  onChangeSearchText: (name: string) => void;
  onOk: () => void;
  searchText: string;
}

const CommunityPostListSearchBox: React.FC<CommunityPostListViewProps> = function CommunityPostListSearchBox({
  onChangeSearchType,
  onChangeSearchText,
  onOk,
  searchText,
}) {

  const searchOptions = [{'text': '전체', 'value': 'all'},{'text': '제목', 'value': 'title'}, {'text': '내용', 'value': 'content'}, {'text': '작성자', 'value': 'writer'}]
  const test = 'all'
  // const onHandleClickRow = useCallback(
  //   // // param => {
  //   // //   handleClickRow(param);
  //   // // },
  //   // []
  // );
  const handleSearchTextChange = (e: any) => {
    console.log('e',e)
    console.log(e.target.value)
    onChangeSearchText(e.target.value)
  }

  const handleSearchTypeChange = (e: any, value: SearchType) => {
    console.log('e',e)
    console.log('value', value)
    onChangeSearchType(e, value)
  }
  
  return (
    <>
    <span>111{test}222</span>
      <div className="paging-search">
          <Select placeholder="분류를 선택해주세요"
            className="s160 small-border"
            options={searchOptions}
            value={test}
            onChange={(e: any, data: any) => handleSearchTypeChange('search', data.value)}
          />
        <div className="ui h38 search input">
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            value={searchText}
            onChange={handleSearchTextChange}
          />
          <Icon className="search link" onClick={() => onOk()} />
        </div>
      </div>
    </>
  );
}

export default CommunityPostListSearchBox;
