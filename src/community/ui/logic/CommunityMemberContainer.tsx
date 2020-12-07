import React,{useState,useEffect,useCallback} from 'react';
import classNames from "classnames";
import {Icon} from "semantic-ui-react";
import { CommunityMemberView } from '../view/CommunityMemberView/CommunityMemberView';
import { getAllMember, getSearchMember } from 'community/service/useMemberList/useMemberList';
import { useCommunityMember } from 'community/store/CommunityMemberStore';
import { useHistory } from 'react-router-dom';
import CommunityMemberTabmenu from '../view/CommunityMemberView/CommunityMemberTabmenu';
import CommunityMemberHeader from '../view/CommunityMemberView/CommunityMemberHeader';

interface Props {
  currentCommunity: string
}

const CommunityMemberListContainer: React.FC<Props> = function GroupListContainer({currentCommunity}) {
  const memberData = useCommunityMember();
  const [searchValue, setSearchValue] = useState<any>();
  const [activemenu, setActiveMenu] = useState<string>("member");
  const history = useHistory();

  useEffect(() => {

  },[currentCommunity])

  const handleActiveMenu = useCallback((active: string) => {
    
    setActiveMenu(active);
    switch (active) {
      case 'member': history.push(`/community/${currentCommunity}/member`)
        break 
      case 'group': history.push(`/community/${currentCommunity}/member/group`)
        break 
      case 'approve': history.push(`/community/${currentCommunity}/member/approve`)
        break
      default:
    }

  },[activemenu])

  const onSearch = (value:any) => {
    if(value != null) {
      getSearchMember(currentCommunity, encodeURIComponent(searchValue))
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
      <CommunityMemberHeader />
      <CommunityMemberTabmenu activemenu={activemenu} handleActiveMenu={handleActiveMenu} />

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
