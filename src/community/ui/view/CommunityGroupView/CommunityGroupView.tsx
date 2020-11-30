import React,{useState,useEffect} from 'react';
import {CommunityGroupMemberListView} from '../CommunityGroupMemberView/CommunityGroupMemberListView';
import { useCommunityGroup } from 'community/store/CommunityGroupStore';
import { getGroup } from 'community/service/useGroupList/useGroupList';
import { useParams } from 'react-router-dom';
import { getGroupMember } from 'community/service/useGroupList/useGroupList';
import AdminIcon from '../../../../style/media/icon-community-manager.png';
import { useRef } from 'react';

function ItemBox({groupList} : {groupList:any}) {
  const [cardopen, setCardOpen] = useState<any>(false);
  const groupItem = useRef<any>()


  // 열기버튼을 누른 그룹박스 감지
  // 한번에 하나의 그룹멤버만 볼 수 있도록 임시설정, BODY영역 클릭시 닫기
  const handleClickOutside = (event:any) => {
    if (groupItem.current && !groupItem.current.contains(event.target)){
      setCardOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => document.addEventListener("click", handleClickOutside, true)
  }, [])

  // 열기버튼을 눌렀을 때 해당 그룹의 멤버리스트 API 호출
  const handleGetMember = (communityId:string, groupId:string) => {
    setCardOpen(!cardopen)
    if(!cardopen){
      getGroupMember(communityId, groupId)
    }
  }

  return (
    <div className="mycommunity-card-list" style={{marginBottom:"20px"}} ref={groupItem}>
      <div className="card-group">
        <div className="card-group-list">
          <h3>{groupList.groupId}</h3>
          <div className="card-group-span">
            <img src={AdminIcon} className="community-manager" />
            <span>{groupList.name}</span>
            <span>멤버</span>
            <span style={{display:"inline-block", marginLeft:"2px"}}>{groupList.memberCount >= 0 ? groupList.memberCount : "0명"}</span>
            <button onClick={() => handleGetMember(groupList.communityId, groupList.groupId)} type="button" title="열기닫기" className={cardopen ? "community-btn-open" : "community-btn-close"}><span>열기닫기</span></button>
          </div>
        </div>
      </div>
      <div className="card-group-body" style={cardopen ? {display:"block"} : {display:"none"}}>
        <p>{groupList.introduce}</p>
        <CommunityGroupMemberListView />
      </div>
    </div>
  )
}

export const CommunityGroupView = () => {
  const groupData = useCommunityGroup();
  console.log(groupData)
  return (
    <>
      {groupData && groupData.results.map((item, index) => <ItemBox groupList={item} key={index} />)}
      <div className="paging mb0">
        <div className="lms-paging-holder">
          <a className="lms-prev">이전10개</a>
          <a className="lms-num lms-on">1</a>
          <a className="lms-num">2</a>
          <a className="lms-num">3</a>
          <a className="lms-num">4</a>
          <a className="lms-num">5</a>
          <a className="lms-num">6</a>
          <a className="lms-num">7</a>
          <a className="lms-num">8</a>
          <a className="lms-num">9</a>
          <a className="lms-num">10</a>
          <a className="lms-next">이후10개</a>
        </div>
      </div>
    </>
  )
}