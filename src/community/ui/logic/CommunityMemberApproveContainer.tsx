import React,{useState, useEffect, useCallback} from 'react';
import { Comment, Checkbox } from "semantic-ui-react";
import AvartarImage from '../../../style/media/profile-110-06.png';
import AllSelect from '../../../style/media/icon-addinfo-24-px.png';
import Approve from '../../../style/media/icon-approval-24-px.png';
import { getApproveMember, updateMembers } from 'community/service/useMemberList/useMemberList';
import { useCommunityMemberApprove } from 'community/store/CommunityMemberApproveStore';

interface Props {
  currentCommunity:string
}

const CommunityMemberApproveContainer:React.FC<Props> = ({currentCommunity}) => {
  const [selectedList, setSelectedList] = useState<(any)[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const approveData = useCommunityMemberApprove();
  const allSelected = approveData?.results.map(item => item.memberId).toString()

  useEffect(() => {
    getApproveMember(currentCommunity)
  },[currentCommunity])

  const checkAll = useCallback(() => {
    setSelectAll(!selectAll)
    if(selectAll) {
      setSelectedList([allSelected]);
      setSelectAll(!selectAll)
    } else {
      setSelectedList([]);
      setSelectAll(!selectAll);
    }
  },[selectAll])

  console.log(selectedList)

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
  }, [currentCommunity, selectedList])

  return (
    <>
      <div className="table-board-title">
        <div className="list-number">
          {/* 총 <strong>{approved && approved.results.length}</strong>명 */}
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
              <Comment.Avatar src={AvartarImage} />
              <Comment.Content>
                <Comment.Author as="a"><h3>{item.name}</h3>
                </Comment.Author>
              </Comment.Content>
            </Comment>
          </div>
        ))
      }
      </div>
    </>
  )
}

export default CommunityMemberApproveContainer