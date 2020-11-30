import React,{useState,useEffect} from 'react';
import classNames from "classnames";
import {Icon} from "semantic-ui-react";
import { CommunityMemberView } from '../view/CommunityMemberView/CommunityMemberView';
import { getAllMember, getSearchMember } from 'community/service/useMemberList/useMemberList';
import { useCommunityMember } from 'community/store/CommunityMemberStore';

interface Props {
  currentCommunity: string
}

const CommunityMemberListContainer: React.FC<Props> = function GroupListContainer({currentCommunity}) {
  const memberData = useCommunityMember();
  const [searchValue, setSearchValue] = useState<any>();
  
  const onSearch = (value:any) => {
    if(value != null) {
      getSearchMember(currentCommunity, decodeURI(value))
      setSearchValue('')
    }
  }

  const onClickSearchInput = () => {
    onSearch(searchValue)
  }

  useEffect(() => {
    getAllMember(currentCommunity, 0)
  },[])
  
  return (
    <>
      <div className="table-board-title">
        <div className="list-number">
          총 <strong>{memberData?.totalCount}</strong>명
        </div>
        <div className="right-wrap member-search">
          <div className={classNames("ui h38 search input")}>
            <input type="text"
              placeholder="닉네임 입력"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onKeyPress={e=> e.key === 'Enter' && onSearch(searchValue)}
            />
            <Icon className="search link top" onClick={onClickSearchInput}/>
          </div>
        </div>
      </div>
      <CommunityMemberView />
    </>
  );
};

export default CommunityMemberListContainer;
