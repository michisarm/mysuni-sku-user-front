import React,{useState,useEffect} from 'react';
import {CommunityGroupMemberListView} from '../CommunityGroupMemberView/CommunityGroupMemberListView';
import { useCommunityGroup } from 'community/store/CommunityGroupStore';
import { getGroup } from 'community/service/useGroupList/useGroupList';
import { getGroupMember } from 'community/service/useGroupList/useGroupList';
import AdminIcon from '../../../../style/media/icon-community-manager.png';
import { Pagination } from 'semantic-ui-react';
import { useRef } from 'react';
import { setCommunityGroupMember } from 'community/store/CommunityGroupMemberStore';
import { useParams } from 'react-router-dom';



function ItemBox({groupList, activePage} : {groupList:any,activePage:number}) {
  const [cardopen, setCardOpen] = useState<any>(false);
  const groupItem = useRef<any>();

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
    if(!cardopen) {
      getGroupMember(communityId, groupId, 0)
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


interface Params {
  communityId: string
  groupId: string
}

export const CommunityGroupView = () => {
  const {communityId} = useParams<Params>();
  const groupData = useCommunityGroup();
  const [activePage, setActivePage] = useState<any>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const totalPages = () => {
    let totalPage = Math.ceil(groupData!.totalCount / 8)
    if (groupData!.totalCount % 8 < 0) {
      totalPage++
    }
    setTotalPage(totalPage)
  }
  
  useEffect(() => {
    if(groupData === undefined) {
      return
    }
    totalPages();
    console.log(activePage)
  }, [groupData])
    
  const onPageChange = (event:any, data:any) => {
    // console.log(event.currentTarget.className);
    // event.stopPropagation();
    // console.log(event.currentTarget.className);
    getGroup(communityId, (data.activePage - 1) * 8)
    setActivePage(data.activePage)
  }

  return (
    <>
      {groupData && groupData.results.map((item, index) => <ItemBox groupList={item} key={index} activePage={activePage} />)}
      {
        groupData && groupData.totalCount >= 8 ? (
          <div className="lms-paging-holder">
            <Pagination
              activePage={activePage}
              totalPages={totalPage}
              firstItem={null}
              lastItem={null}
              onPageChange={(e, data) => onPageChange(e,data)}
            />
          </div>
        ) : (
          null
        )
      } 
    </>
  )
}