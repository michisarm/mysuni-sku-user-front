
import { reactConfirm, reactAlert } from '@nara.platform/accent';
import React, { useCallback, useState, useEffect } from 'react';
import { Checkbox, Select, Pagination, Icon } from 'semantic-ui-react';
import { removeMembers } from 'community/api/MemberApi';
import classNames from 'classnames';
import { getMembers, updateMembers ,deleteMembers } from 'community/service/useMemberList/useMemberList';
import { CommunityMemberList } from 'community/model/CommunityMember';
import moment from 'moment';
import Calendar from './Calendar';
import { getSearchBox, useSearchBox, setSearchBox } from 'community/store/SearchBoxStore';
import { SearchBox } from 'community/model/SearchBox';
import { CommunityGroup } from 'community/model/CommunityMemberGroup';
import { useHistory } from 'react-router-dom';
import { getgroups } from 'process';
import { getAdminGroups } from 'community/service/useGroupList/useGroupList';

interface AdminGroupViewProps {
  communityId: string;
  managerAuth: boolean;
  managerId: string;
  communityGroups: CommunityGroup;
  searchBox:SearchBox;
}

const AdminGroupViewView: React.FC<AdminGroupViewProps> = function AdminMemberView({
  communityId,
  managerAuth,
  managerId,
  communityGroups,
  searchBox
}) {

  const limitOptions = [
    { text: '20개씩 보기', value: '20' },
    { text: '50개씩 보기', value: '50' },
    { text: '100개씩 보기', value: '100' },
  ]; 
  const [limit, setLimit] = useState<number>(20);
  const [searchText, setSearchText] = useState<string>('');
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const history = useHistory();

  const routeToGroupCreate = useCallback(() => {
    history.push(`/community/admin/${communityId}/memberManagement/group/create`);
  }, [communityId]);

  const routeToGroupDetail = useCallback((groupId:string) => {
    history.push(`/community/admin/${communityId}/memberManagement/group/Detail/${groupId}`);
  }, [communityId]);

  const totalPages = useCallback(() => {    
    let totalPage = Math.ceil(communityGroups!.totalCount / limit)
    if (communityGroups!.totalCount % limit < 0) {
      totalPage++
    }
    setTotalPage(totalPage)
  }, [communityGroups, limit])
  
  useEffect(() => {
    if(communityGroups === undefined) {
      return
    }
    totalPages();
  }, [communityGroups])


  useEffect(() => {
    //TODO : 로직 개선 필요함
    if(searchText && searchText !== ''){
      setSearchBox({
        ...searchBox,
        companyName:'',
        teamName: '',
        name: searchText||'',
        email: '',
      });   
    }else{
      setSearchBox({
        ...searchBox,
        companyName:'',
        teamName: '',
        name: '',
        email: '',
      });       
    }
  }, [searchText])  

  useEffect(() => {
    setSearchBox({
      ...searchBox,
      limit: limit || 20,
    });    
    handleSubmitClick(); 
  }, [limit])    
  
  const onPageChange = useCallback((data:any) => {
    getAdminGroups(communityId);
    setActivePage(data.activePage);
  }, [communityId,searchBox]);

  const handleSubmitClick = useCallback(async (limit?:number) => {
    getAdminGroups(communityId);
    setActivePage(1);
  }, [communityId,searchBox,limit]);

  return (
    <>
      <table className="ui admin_table_search">
        <colgroup>
          <col width="200px" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th>검색어</th>
            <td>
              <div
                className={classNames("ui input admin_search_input")}
              >
                <input
                  type="text"
                  placeholder="그룹명을 입력해주세요."
                  value={searchText}
                  onChange={(e: any) =>setSearchText(e.target.value)}
                />
                <button className="ui button admin_text_button" onClick={() => handleSubmitClick()}>검색</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="table-board-title">
        <div className="table_list_string">
        ㆍ전체 <strong>{communityGroups.totalCount}명</strong>그룹등록
        </div>
        <div className="right-wrap">
        <Select
          className="ui small-border admin_table_select"
          defaultValue={limitOptions[0].value}
          options={limitOptions}
          onChange={(e: any, data: any) => setLimit(data.value)}
        />
        <button className="ui button admin_table_button" onClick={e=>routeToGroupCreate()} >Create</button>
        </div>
      </div>
      {communityGroups && communityGroups?.results.length > 0?(
        <table className="ui admin_table">
          <thead>
            <tr>
              <th>No</th>
              <th>그룹명</th>
              <th>멤버수</th>
            </tr>
          </thead>
          <tbody>
          {
            communityGroups?.results.map((item, index) => (
              <tr key={index} onClick={() => routeToGroupDetail(item.groupId)}>
                <td>{communityGroups?.totalCount - index - (activePage - 1) * limit}</td>
                <td>{item.name}</td>
                <td>{item.memberCount}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      ):(
        <div className="no-cont-wrap">
          <Icon className="no-contents80" />
          <span className="blind">콘텐츠 없음</span>
          <div className="text">그룹이 없습니다.</div>
        </div>
      )}     
      {
        communityGroups && communityGroups.totalCount >= 20 ? (
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
  );
};

export default AdminGroupViewView;
