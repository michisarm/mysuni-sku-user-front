import React,{useState,useEffect} from 'react';
import classNames from "classnames";
import {Icon} from "semantic-ui-react";
import { getGroup, onSearchGroup } from 'community/service/useGroupList/useGroupList';
import {useCommunityGroup} from 'community/store/CommunityGroupStore';
import { CommunityGroupView } from '../view/CommunityGroupView/CommunityGroupView';

interface Props {
  currentCommunity: string
}

const CommunityGroupListContainer: React.FC<Props> = function GroupListContainer({currentCommunity}) {
  const groupData = useCommunityGroup();
  const [searchValue, setSearchValue] = useState<any>();
  
  const onSearch = (value:any) => {
    if(value !== null) {
      console.log(searchValue)
      onSearchGroup(currentCommunity, searchValue)
      setSearchValue('')
    }
  }

  const onClickSearchInput = () => {
    onSearch(searchValue)
  }

  useEffect(() => {
    // getSearchGroup(currentCommunity, 0)
  },[])
  useEffect(() => {
    getGroup(currentCommunity, 0)
  },[])
  
  return (
    <>
      <div className="table-board-title">
        <div className="list-number">
          총 <strong>{groupData?.totalCount}</strong>개의 그룹
        </div>
        <div className="right-wrap member-search">
          <div className={classNames("ui h38 search input")}>
            <input type="text"
              placeholder="그룹명 입력"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onKeyPress={e=> e.key === 'Enter' && onSearch(searchValue)}
            />
            <Icon className="search link top" onClick={onClickSearchInput}/>
          </div>
        </div>
      </div>
      <CommunityGroupView />
    </>
  );
};

export default CommunityGroupListContainer;
