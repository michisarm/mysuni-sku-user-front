import React,{useState, useEffect, useCallback} from 'react';
import { Comment, Checkbox } from "semantic-ui-react";
import AvartarImage from '../../../style/media/img-profile-80-px.png';
import AllSelect from '../../../style/media/icon-addinfo-24-px.png';
import Approve from '../../../style/media/icon-approval-24-px.png';
import { getApproveMember, updateMembers } from 'community/service/useMemberList/useMemberList';
import { useCommunityMemberApprove } from 'community/store/CommunityMemberApproveStore';
import { Pagination } from 'semantic-ui-react';
import CommunityMemberTabmenu from '../view/CommunityMemberView/CommunityMemberTabmenu';
import { useHistory } from 'react-router-dom';
import CommunityMemberHeader from '../view/CommunityMemberView/CommunityMemberHeader';

interface Props {
  currentCommunity:string
}

const CommunityMemberApproveContainer:React.FC<Props> = ({currentCommunity}) => {
  const [selectedList, setSelectedList] = useState<(any)>();
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const approveData = useCommunityMemberApprove();
  const AllData = approveData && approveData.results.map(item => item.memberId)

  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  
  const [activemenu, setActiveMenu] = useState<string>("approve");
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

  useEffect(() => {
    getApproveMember(currentCommunity)
    checkAll();
  },[currentCommunity])

  const totalPages = () => {
    let totalPage = Math.ceil(approveData!.totalCount / 8)
    if (approveData!.totalCount % 8 < 0) {
      totalPage++
    }
    setTotalPage(totalPage)
  }
  
  useEffect(() => {
    if(approveData === undefined) {
      return
    }
    totalPages();
    
  }, [approveData])
  
  const onPageChange = (data:any) => {
    getApproveMember(currentCommunity, (data.activePage - 1) * 8)
    setActivePage(data.activePage)
  }

  const checkAll = useCallback(() => {
    setSelectAll(!selectAll)
    if(selectAll) {
      setSelectedList(AllData && AllData);
      setSelectAll(!selectAll)
    } else {
      setSelectedList([]);
      setSelectAll(!selectAll);
    }
  },[selectAll])
  
  const checkOne = (groupMemberId:string) => {
    const copiedSelectedList: (string | undefined)[] = [...selectedList];
    const index = copiedSelectedList.indexOf(groupMemberId);

    if (index >= 0) {
      const newSelectedList = copiedSelectedList
        .slice(0, index)
        .concat(copiedSelectedList.slice(index + 1));
      setSelectedList(newSelectedList);
    } else {
      copiedSelectedList.push(groupMemberId);
      setSelectedList(copiedSelectedList);
    }
  }

  const updateUser = useCallback(() => {
    updateMembers(currentCommunity, selectedList);
    setTimeout(() => {
      history.go(0);
    }, 500)
  }, [currentCommunity, selectedList])

  return (
    <>
      <CommunityMemberHeader />
      <CommunityMemberTabmenu activemenu={activemenu} handleActiveMenu={handleActiveMenu} />

      <div className="table-board-title">
        <div className="list-number">
          총 <strong>{approveData && approveData.totalCount}</strong>명
        </div>
        <div className="right-wrap board-down-title-right">
          <button className="ui icon button left post delete" onClick={checkAll}>
            <img src={AllSelect} />
            {selectAll ? "전체해체" : "전체선택"}
          </button>
          <button className="ui icon button left post list2 complete" onClick={updateUser}>
            <img src={Approve} />
            가입승인
          </button>
        </div>
      </div>
      <div className="mycommunity-card-list">
      {
        approveData?.results.map((item, index) => (
          <div className="member-card approval" key={index}>
            <Comment>
              <Checkbox 
                style={{marginTop:"2rem",marginRight:"1rem",verticalAlign:"top"}}
                checked={selectedList && selectedList.includes(item.memberId)} 
                onChange={(e:any) => checkOne(item.memberId)}
              />
              <Comment.Avatar src={item.profileImg != null && item.profileImg != "" && item.profileImg != undefined ? `/files/community/${item.profileImg}` : `${AvartarImage}`} />
              <Comment.Content>
                <Comment.Author as="a"><h3>{item.nickname || item.name}</h3>
                </Comment.Author>
              </Comment.Content>
            </Comment>
          </div>
        ))
      }
      </div>
      {
        approveData && approveData.totalCount >= 8 ? (
          <div className="lms-paging-holder">
            <Pagination
              activePage={activePage}
              totalPages={totalPage}
              firstItem={null}
              lastItem={null}
              onPageChange={(e, data) => onPageChange(data)}
            />
          </div>
        ) : (
          null
        )
      } 
    </>
  )
}

export default CommunityMemberApproveContainer