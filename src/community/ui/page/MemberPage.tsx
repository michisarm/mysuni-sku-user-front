import React,{ useRef, useState, useCallback } from 'react';
import { Segment } from "semantic-ui-react";
import LnbMenu from '../view/CommunityMember/components/LnbMenu';
import MemberTabmenu from '../view/CommunityMember/components/MemberTabmenu';
import MemberHeaderTitle from '../view/CommunityMember/components/MemberTableHeader';
import MemberGroupPage from './MemberGroupPage';
import MemberApprovePage from './MemberApprovePage';
import MemberCard from '../view/CommunityMember/components/MemberCard';
import { useMemberList } from '../../service/useMemberList/useMemberList';
import CommunityMember from '../view/CommunityMember/index';
import GroupListContainer from '../../group/logic/GroupListContainer';



const COMPONENT: any = {
  member: <CommunityMember/>,
  groups: <GroupListContainer />,
  approve: <MemberApprovePage/>
};

function MemberPage() {
  const contextRef = useRef<any>();
  const [activemenu, setActiveMenu] = useState<string>("member")
  const [member, approved, getAllMember ] = useMemberList();

  const handleActiveMenu = useCallback((active: string, get:string) => {
    setActiveMenu(active);
    getAllMember(get);
  },[activemenu, member])

  return (
    <div ref={contextRef}>
      <Segment className="full">
        <div className="course-detail-center community-containter">
          <LnbMenu />
          <div className="community-home-contants">
            {/* Header */}
            <div className="course-info-header">
              <div className="survey-header border-none margin-none pt0">
                <div className="survey-header-left">
                  Member
                </div>
              </div>
            </div>

            {/* Tab */}
            <MemberTabmenu activemenu={activemenu} handleActiveMenu={handleActiveMenu}/>

            {/* 테이블 제목, 검색 */}
            <MemberHeaderTitle activemenu={activemenu}/>

            {/* 카드영역 컴포넌트 */}
            {COMPONENT[activemenu]}

            {/* 페이징 */}
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
          </div>
        </div>
      </Segment>
    </div>
  )
}

export default MemberPage