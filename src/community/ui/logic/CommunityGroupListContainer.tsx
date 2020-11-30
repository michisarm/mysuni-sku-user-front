import React,{useState,useEffect} from 'react';
import classNames from "classnames";
import {Icon} from "semantic-ui-react";
import { getGroup, getGroupMember } from 'community/service/useGroupList/useGroupList';
import {useCommunityGroup} from 'community/store/CommunityGroupStore';
import { CommunityGroupView } from '../view/CommunityGroupView/CommunityGroupView';

interface Props {
  currentCommunity: string
}

const CommunityGroupListContainer: React.FC<Props> = function GroupListContainer({currentCommunity}) {
  const groupData = useCommunityGroup();

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
              placeholder="닉네임 입력"
              // value={write}
              // onClick={() => setFocus(true)}
              // onBlur={() => setFocus(false)}
              // onChange={(e) => setWrite(e.target.value)}
            />
            <Icon className="search link top"/>
          </div>
        </div>
      </div>
      <CommunityGroupView />
    </>
  );
};

export default CommunityGroupListContainer;
