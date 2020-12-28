
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

interface AdminMemberViewProps {
  communityId: string;
  managerAuth: boolean;
  managerId: string;
  communityMembers: CommunityMemberList;
  searchBox:SearchBox;
}

const AdminMemberView: React.FC<AdminMemberViewProps> = function AdminMemberView({
  communityId,
  managerAuth,
  managerId,
  communityMembers,
  searchBox
}) {

  const selectOptions = [
    { key: "all", value: "", text: "전체" },
    { key: "companyName", value: "companyName", text: "소속사" },
    { key: "teamName", value: "teamName", text: "소속 조직(팀)" },
    { key: "name", value: "name", text: "성명" },
    { key: "nickname", value: "nickname", text: "닉네임" },
    { key: "email", value: "email", text: "E-mail" },
  ];

  const limitOptions = [
    { text: '20개씩 보기', value: '20' },
    { text: '50개씩 보기', value: '50' },
    { text: '100개씩 보기', value: '100' },
  ];  

  // const [focus, setFocus] = useState<boolean>(false);
  // const [write, setWrite] = useState<string>('');
  const [selectedList, setSelectedList] = useState<((string | undefined)[])>([]);
  const [selectAll, setSelectAll] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(20);
  const [searchText, setSearchText] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('');
  
  // const approveData = useCommunityMemberApprove();
  const AllData = communityMembers && communityMembers.results.map(item => item.memberId)

  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const deleteMemberList = useCallback(() => {

    if(selectedList && selectedList.find(item => item === managerId)){
      reactAlert({ title: '알림', message: '관리자는 삭제할수 없습니다.' });
      return;      
    }

    if(selectedList && selectedList.length === 0){
      reactAlert({ title: '알림', message: '멤버를 선택해 주세요.' });
      return;
    }

    reactConfirm({
      title: '알림',
      message: '선택한 멤버를 삭제하시겠습니까?',
      onOk: async () => {
        await deleteMembers(communityId, selectedList);
        setSelectedList([]);
      },
    });
  }, [communityId, selectedList,searchBox]);

  const approveMemberList = useCallback(() => {

    if(selectedList && selectedList.length === 0){
      reactAlert({ title: '알림', message: '멤버를 선택해 주세요' });
      return;
    }

    reactConfirm({
      title: '알림',
      message: '선택한 멤버를 승인하시겠습니까?',
      onOk: async () => {
        await updateMembers(communityId, selectedList);
        setSelectedList([]);
        getMembers(communityId);
      },
    });
  }, [communityId, selectedList,searchBox]);
  



  const totalPages = useCallback(() => {    
    let totalPage = Math.ceil(communityMembers!.totalCount / limit)
    if (communityMembers!.totalCount % limit < 0) {
      totalPage++
    }
    setTotalPage(totalPage)
  }, [communityMembers, limit])
  
  useEffect(() => {
    if(communityMembers === undefined) {
      return
    }
    totalPages();
  }, [communityMembers])

  useEffect(() => {
    if(selectedList === undefined) {
      return
    }
    setSearchBox({
      ...searchBox,
      communityId,
      groupMemberIdList: selectedList||[]
    });       

  }, [selectedList])

  useEffect(() => {
    setSearchBox({
      ...searchBox,
      companyName: '',
      teamName: '',
      name: '',
      email: '',
      nickname:'',
    }); 
    if(searchType === 'companyName'){
      setSearchBox({
        ...searchBox,
        companyName: searchText||'',
      });   
    }else if(searchType === 'teamName'){
      setSearchBox({
        ...searchBox,
        teamName: searchText,
      });   
    }else if(searchType === 'name'){
      setSearchBox({
        ...searchBox,
        name: searchText||'',
      });   
    }else if(searchType === 'email'){
      setSearchBox({
        ...searchBox,
        email: searchText||'',
      });   
    }else if(searchType === 'nickname'){
      setSearchBox({
        ...searchBox,
        nickname: searchText||'',
      });         
    }
  }, [searchType,searchText])  

  useEffect(() => {
    setSearchBox({
      ...searchBox,
      limit: limit || 20,
      offset: 0,
    });    
    handleSubmitClick(); 
  }, [limit])    
  
  const onPageChange = useCallback((data:any) => {
    setSearchBox({
      ...searchBox,
      offset: (data.activePage - 1) * limit,
    });        
    getMembers(communityId);
    setActivePage(data.activePage);
  }, [communityId,searchBox,limit]);

  const handleSubmitClick = useCallback(async (limit?:number) => {
    getMembers(communityId);
    setActivePage(1);
  }, [communityId,searchBox,limit]);


  const checkAll = useCallback(() => {
    if(selectAll) {
      setSelectedList(AllData && AllData);
      setSelectAll(!selectAll);
    } else {
      setSelectedList([]);
      setSelectAll(!selectAll);
    }
  },[selectAll, communityMembers])
  
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


  return (
    <>
    {!searchBox.groupId? (
      <table className="ui admin_table_top">
        <colgroup>
          <col width="100px" />
          <col />
        </colgroup>
        <tbody>
          
            <tr>
              <th>가입일자</th>
              <td>
                <div className="preview">
                  <Calendar searchBox={searchBox} />              
                </div>
              </td>
            </tr>
          
          <tr>
            <th>검색어</th>
            <td>
              <Select
                placeholder="전체"
                className="ui small-border admin_tab_select"
                defaultValue={selectOptions[0].value}
                options={selectOptions}
                onChange={(e: any,data:any) =>setSearchType(data.value)}
                // setSearchType
              />
              <div
                className={classNames("ui input admin_text_input")}
              >
                <input
                  type="text"
                  placeholder="검색어를 입력해주세요."
                  value={searchText}
                  disabled={searchType === ''}       
                  onChange={(e: any) =>setSearchText(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSubmitClick()}
                />
                <button className="ui button admin_text_button" onClick={() => handleSubmitClick()}>검색</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      ):(
        <table className="ui admin_table_search sub">
          <colgroup>
            <col width="100px" />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th>검색어</th>
              <td>
              <Select
                placeholder="전체"
                className="ui small-border admin_tab_select"
                defaultValue={selectOptions[0].value}
                options={selectOptions}
                onChange={(e: any,data:any) =>setSearchType(data.value)}
              />
                <div
                  className={classNames("ui input admin_text_input add")}
                >
                  <input
                    type="text"
                    placeholder="검색어를 입력해주세요."
                    value={searchText}
                    disabled={searchType === ''}        
                    onChange={(e: any) =>setSearchText(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSubmitClick()}
                  />
                  <button className="ui button admin_text_button" onClick={() => handleSubmitClick()}>검색</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <div className="table-board-title">
        <div className="table_list_string">
        ㆍ전체 <strong>{communityMembers.totalCount}명</strong>멤버
        </div>
        <div className="right-wrap">
        <Select
          className="ui small-border admin_table_select"
          defaultValue={limitOptions[0].value}
          options={limitOptions}
          onChange={(e: any, data: any) => setLimit(data.value)}
        />
        
        {!searchBox.groupId && (<button className="ui button admin_table_button" onClick={e=>deleteMemberList()} >멤버 삭제</button>)}
        
        {!searchBox.approved && (<button className="ui button admin_table_button" onClick={e=>approveMemberList()} >가입 승인</button>)}
        
        
        
        </div>
      </div>
      {communityMembers && communityMembers?.results.length > 0?(
        <table className="ui admin_table">
          <thead>
            <tr>
              <th>
                <Checkbox
                  className="base"
                  label=""
                  name="radioGroup"
                  checked={
                    selectedList &&
                    selectedList.length > 0 &&
                    selectedList.length === communityMembers.results.length
                  }
                  value={selectAll?"Yes":"No"}
                  onChange={(e: any, data: any) => checkAll()}
                />
                
              </th>
              <th>No</th>
              <th>소속사</th>
              <th>소속 조직(팀)</th>
              <th>성명</th>
              <th>닉네임</th>
              <th>E-mail</th>
              <th>가입일</th>
            </tr>
          </thead>
          <tbody>
          {
            communityMembers?.results.map((item, index) => (
              <tr key={index}>
                <td>
                  <Checkbox
                    className="base"
                    label=""
                    name="radioGroup"
                    value={item.memberId}
                    checked={selectedList && selectedList.includes(item.memberId)} 
                    onChange={(e:any) => checkOne(item.memberId)}                
                  />
                </td>
                <td>{communityMembers?.totalCount - index - (activePage - 1) * limit}</td>
                <td>{item.companyName}</td>
                <td>{item.teamName}</td>
                <td>{item.name}</td>
                <td>{item.nickname}</td>
                <td>{item.email}</td>
                <td>{item.createdTime && moment(item.createdTime).format('YYYY.MM.DD')}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      ):(
        <div className="no-cont-wrap">
          <Icon className="no-contents80" />
          <span className="blind">콘텐츠 없음</span>
          <div className="text">{searchBox.approved?'커뮤니티 멤버가 없습니다.':'가입 대기가 없습니다.'}</div>
        </div> 
      )}     
      {
        communityMembers && communityMembers.totalCount >= 20 ? (
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

export default AdminMemberView;
