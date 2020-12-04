import React,{useState,useEffect,useCallback} from 'react';
import classNames from "classnames";
import {Icon} from "semantic-ui-react";
import { getGroup, onSearchGroup } from 'community/service/useGroupList/useGroupList';
import {useCommunityGroup} from 'community/store/CommunityGroupStore';
import { CommunityGroupView } from '../view/CommunityGroupView/CommunityGroupView';
import { useHistory } from 'react-router-dom';
import CommunityMemberTabmenu from '../view/CommunityMemberView/CommunityMemberTabmenu';
import CommunityMemberHeader from '../view/CommunityMemberView/CommunityMemberHeader';

interface Props {
  currentCommunity: string
}

const CommunityGroupListContainer: React.FC<Props> = function GroupListContainer({currentCommunity}) {
  const groupData = useCommunityGroup();
  const [searchValue, setSearchValue] = useState<any>();
  const [activemenu, setActiveMenu] = useState<string>("group");
  const history = useHistory();

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
    if(value !== null) {
      onSearchGroup(currentCommunity, encodeURIComponent(searchValue))
      setSearchValue('')
    }
  }

  const onClickSearchInput = () => {
    onSearch(searchValue)
  }

  useEffect(() => {
    getGroup(currentCommunity, 0)
  },[])
  
  return (
    <>
      <CommunityMemberHeader />
      <CommunityMemberTabmenu activemenu={activemenu} handleActiveMenu={handleActiveMenu} />

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
