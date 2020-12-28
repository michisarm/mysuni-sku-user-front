
import { reactConfirm, reactAlert } from '@nara.platform/accent';
import React, { useCallback, useState, useEffect } from 'react';
import { Checkbox, Select, Pagination, Icon, Modal, Button } from 'semantic-ui-react';
import classNames from 'classnames';
import moment from 'moment';
import {  setSearchBox } from 'community/store/SearchBoxStore';
import { SearchBox } from 'community/model/SearchBox';
import { CommunityGroupMemberList } from 'community/model/CommunityMemberGroup';
import { useHistory } from 'react-router-dom';
import { setAdminGroupCreateItem } from 'community/store/AdminGroupCreateStore';
import AdminGroupCreate from 'community/viewModel/AdminGroupCreate';
import { addGroup, updateGroup, getAdminGroup, deleteGroup, existsByGroupName } from 'community/service/useGroupList/useGroupList';
import { deleteGroupMembers, getAllGroupMemberByQuery, updateGroupMemberAdmin, createGroupMembers } from 'community/service/useGroupMemberList/useGroupMember';
import AdminMemberPage from 'community/ui/page/AdminMemberPage';

interface AdminGroupCreateViewProps {
  communityId: string;
  managerAuth: boolean;
  managerId: string;
  searchBox:SearchBox;
  adminGroupCreateItem:AdminGroupCreate;
  groupId?:string;
  communityGroupMembers?:CommunityGroupMemberList;
}

const AdminGroupCreateView: React.FC<AdminGroupCreateViewProps> = function AdminMemberView({
  communityId,
  managerAuth,
  managerId,
  searchBox,
  adminGroupCreateItem,
  groupId,
  communityGroupMembers
}) {
  const selectOptions = [
    { key: "all", value: "", text: "전체" },
    { key: "companyName", value: "companyName", text: "소속사" },
    { key: "teamName", value: "teamName", text: "소속 조직(팀)" },
    { key: "name", value: "name", text: "성명" },
    { key: "email", value: "email", text: "E-mail" },
  ];
  
  const limitOptions = [
    { text: '20개씩 보기', value: '20' },
    { text: '50개씩 보기', value: '50' },
    { text: '100개씩 보기', value: '100' },
  ];  
  
  const [selectedList, setSelectedList] = useState<((string | undefined)[])>([]);
  const [selectAll, setSelectAll] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(20);
  const [searchText, setSearchText] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('');
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [selectedManagerName, setSelectedManagerName] = useState<string>('');
  const [selectedManagerId, setSelectedManagerId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [introduce, setIntroduce] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  

  const AllData = communityGroupMembers && communityGroupMembers.results.map(item => item.memberId)

  const history = useHistory();

  const routeToGroupList = useCallback(() => {
    history.push(`/community/admin/${communityId}/memberManagement/group`);
  }, [communityId]);

  const saveGroupInformation = useCallback(async () => {
    if(!name || name.length === 0 ){
      reactAlert({ title: '필수 정보 입력 안내', message: '‘그룹명’은 필수 항목입니다.<br />해당 정보를 입력하신 후 저장해주세요.' });
      return true;      
    }else if(!introduce || introduce.length === 0 ){
      reactAlert({ title: '필수 정보 입력 안내', message: '‘그룹 설명’은 필수 항목입니다.<br />해당 정보를 입력하신 후 저장해주세요.' });
      return true;      
    } 

    setAdminGroupCreateItem({
      ...adminGroupCreateItem,
      communityId: communityId||'',
      groupId:groupId||'',
      managerId:managerId||'',
      name,
      introduce,
    });   

    if(!groupId){
      const existsByGroupNameCheck = await existsByGroupName(communityId, name);
      if (existsByGroupNameCheck) {
        reactAlert({ title: '그룹명 중복 안내', message: '그룹명이 중복되었습니다.' });          
        return true;
      }       

      await addGroup();
      reactAlert({ title: '완료 안내', message: '그룹 등록 처리가 완료되었습니다.' });
    }else{
      await updateGroup();
      reactAlert({ title: '완료 안내', message: '그룹 수정 처리가 완료되었습니다.' });
    }
    
    routeToGroupList();
    
  }, [adminGroupCreateItem, communityId, groupId, name, introduce]);

  const removeGroup = useCallback(async () => {

    setAdminGroupCreateItem({
      ...adminGroupCreateItem,
      communityId: communityId||'',
      groupId:groupId||'',
    });   

    reactConfirm({
      title: '알림',
      message: '그룹을 삭제하시겠습니까?',
      onOk: async () => {
        await deleteGroup();
        setSelectedList([]);
        routeToGroupList();
      },
    });

  }, [adminGroupCreateItem, communityId,groupId]);

  const removeMemberGroup = useCallback(async () => {

    if(selectedList && selectedList.length === 0){
      reactAlert({ title: '알림', message: '멤버를 선택해 주세요' });
      return;
    }
    
    const checkManager = selectedList && selectedList.find(item=>item === adminGroupCreateItem.managerId);

    if(checkManager && checkManager.length > 0){
      reactAlert({ title: '알림', message: '그룹장은 삭제 할 수 없습니다.' });
      return;
    }

    reactConfirm({
      title: '알림',
      message: '선택한 멤버를 그룹에서 삭제하시겠습니까?',
      onOk: async () => {
        groupId && await deleteGroupMembers(communityId, groupId, selectedList);
        setSelectedList([]);
        getAdminGroup();
        getAllGroupMemberByQuery();        
        // routeToGroupList();
      },
    });

  }, [communityId, groupId, selectedList, adminGroupCreateItem, communityGroupMembers]);

  const approveAdmin = useCallback(async () => {

    if (selectedList.length == 1) {

      groupId && await updateGroupMemberAdmin(
        communityId,
        groupId,
        selectedList[0] || ''
      );

      //그룹장 변경시 group 정보 저장 처리
      setAdminGroupCreateItem({
        ...adminGroupCreateItem,
        communityId: communityId||'',
        groupId:groupId||'',
        managerId:selectedList[0]||'',
      });
      await updateGroup();

      setSelectedList([]);
      getAdminGroup();
      getAllGroupMemberByQuery();
      reactAlert({ title: '알림', message: '그룹장 지정 되었습니다.' });
    } else if (selectedList && selectedList.length == 0) {
      reactAlert({ title: '알림', message: '그룹장으로 지정할 멤버를 선택해주세요.' });
    } else {
      reactAlert({ title: '알림', message: '그룹장은 1명만 지정할 수 있습니다.' });
    }

  }, [communityId, groupId, selectedList,managerId]);

  const totalPages = useCallback(() => {    
    let totalPage = Math.ceil(communityGroupMembers!.totalCount / limit)
    if (communityGroupMembers!.totalCount % limit < 0) {
      totalPage++
    }
    setTotalPage(totalPage)
  }, [communityGroupMembers, limit])
  
  useEffect(() => {
    if(communityGroupMembers === undefined) {
      return
    }
    totalPages();
  }, [communityGroupMembers])


  useEffect(() => {
    if(adminGroupCreateItem === undefined) {
      return
    }
    setName(adminGroupCreateItem.name||'');
    setIntroduce(adminGroupCreateItem.introduce||'');
  }, [adminGroupCreateItem])

  useEffect(() => {
    if(!groupId){
      adminGroupCreateItem={};
      return;
    }
    setSearchBox({
      ...searchBox,
      startDate : moment().startOf('day').subtract(1, 'y').toDate().getTime(),
      endDate : moment().endOf('day').toDate().getTime(),
      groupId,
    });       
    // return ()=>adminGroupCreateItem={};
    return () => {
      adminGroupCreateItem={};
      groupId='';
    };    
    
  }, [adminGroupCreateItem, groupId])  
  

  useEffect(() => {
    //TODO : 차후 로직 개선 고민
    if(searchType === 'companyName'){
      setSearchBox({
        ...searchBox,
        companyName: searchText||'',
        teamName: '',
        name: '',
        email: '',
      });   
    }else if(searchType === 'teamName'){
      setSearchBox({
        ...searchBox,
        companyName:'',
        teamName: searchText,
        name: '',
        email: '',
      });   
    }else if(searchType === 'name'){
      setSearchBox({
        ...searchBox,
        companyName:'',
        teamName: '',
        name: searchText||'',
        email: '',
      });   
    }else if(searchType === 'email'){
      setSearchBox({
        ...searchBox,
        companyName:'',
        teamName: '',
        name: '',
        email: searchText||'',
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
    getAdminGroup();
    getAllGroupMemberByQuery();
    setActivePage(data.activePage);
  }, [limit]);

  const handleSubmitClick = useCallback(() => {
    getAdminGroup();
    getAllGroupMemberByQuery();
    setActivePage(1);
  }, []);

  const checkAll = useCallback(() => {
    if(selectAll) {
      setSelectedList(AllData && AllData||[]);
      setSelectAll(!selectAll);
    } else {
      setSelectedList([]);
      setSelectAll(!selectAll);      
    }
  },[selectAll, communityGroupMembers])
  
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

  //그룹 멤버 추가 modal save
  const saveGroupMemberList = useCallback(async () => {
    if(searchBox.groupMemberIdList && searchBox.groupMemberIdList.length > 0){
      await createGroupMembers();
      reactAlert({ title: '알림', message: '멤버가 추가 되었습니다.' });
    }else{
      reactAlert({ title: '알림', message: '멤버를 선택해 주세요.' });
      return true;      
    }   
    setSearchBox({
      ...searchBox,
      groupMemberIdList: [],
    });        
    getAllGroupMemberByQuery();
    setActivePage(1);
    setOpen(false);
  },[selectAll, communityGroupMembers,searchBox])  

  return (
    <>
    <p className="admin_title_p">그룹 정보</p>
      <table className="ui admin_table_top">
        <colgroup>
          <col width="200px" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th>그룹명<span>*</span></th>
            <td>
              <div className={classNames("ui input admin_group_input")} >
                <input
                  type="text"
                  placeholder="그룹명을 입력해주세요."
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                />        
              </div>
            </td>
          </tr>
          <tr>
            <th>그룹 설명<span>*</span></th>
            <td>
              <div className={classNames("ui input admin_group_input")} >
                <input
                  type="text"
                  placeholder="그룹설명을 입력해주세요."
                  value={introduce}
                  onChange={(e: any) => setIntroduce(e.target.value)}
                />  
              </div>                   
            </td>
          </tr>
          {groupId &&(
            <tr>
              <th>그룹장<span>*</span></th>
              <td>
                <div className={classNames("ui input admin_group_input")} >
                  <input
                    type="text"
                    placeholder="그룹장을 선택해주세요."
                    // value={selectedManagerName}
                    disabled={true}
                    value={adminGroupCreateItem.managerName}
                  />  
                </div>                   
              </td>
            </tr>  
          )}        
        </tbody>
      </table>

      {groupId && (
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
                  <Select
                    placeholder="전체"
                    className="ui small-border admin_tab_select"
                    defaultValue={selectOptions[0].value}
                    options={selectOptions}
                    onChange={(e: any,data:any) =>setSearchType(data.value)}
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
          <div className="table-board-title">
            <div className="table_list_string">
            ㆍ전체 <strong>{communityGroupMembers && communityGroupMembers.totalCount}</strong>그룹멤버
            </div>
            <div className="right-wrap">
              <Select
                className="ui small-border admin_table_select"
                defaultValue={limitOptions[0].value}
                options={limitOptions}
                onChange={(e: any, data: any) => setLimit(data.value)}
              />
              <button className="ui button admin_table_button" onClick={()=>approveAdmin()}>그룹장 지정</button>
              <button className="ui button admin_table_button" onClick={()=>setOpen(true)}>그룹 멤버 추가</button>

              {/*TODO : modal 기능 분리 필요 */}
              <Modal
                size="large"
                open={open}
                className="base w1000"
              >
                <Modal.Header>
                  <span>그룹 멤버 추가</span>
                  <button className="admin_popup_close" onClick={()=>setOpen(false)}>
                    <img src={`${process.env.PUBLIC_URL}/images/all/icon-close-player-28-px.png`} />
                  </button>
                </Modal.Header>
                <Modal.Content className="admin_popup_add">
                  {/* <AdminMemberPage {...communityId} /> */}
                  {AdminMemberPage(communityId, true)}
                </Modal.Content>
                <Modal.Actions className="actions">
                  <Button className="w190 pop x" onClick={()=>setOpen(false)}>
                    닫기
                  </Button>
                  <Button className="w190 pop p" onClick={()=>saveGroupMemberList()}>
                    추가
                  </Button>
                </Modal.Actions>
              </Modal>
              <button className="ui button admin_table_button02" onClick={()=>removeMemberGroup()}>그룹 멤버 삭제</button>
            </div>
          </div>
          
          {communityGroupMembers && communityGroupMembers?.results.length > 0?(      
          <>
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
                        selectedList.length === communityGroupMembers.results.length
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
                </tr>
              </thead>
              <tbody>
              {
                communityGroupMembers?.results.map((item, index) => (              
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
                  <td>{communityGroupMembers?.totalCount - index - (activePage - 1) * limit}</td>
                  <td>{item.companyName}</td>
                  <td>{item.teamName}</td>
                  <td>{item.name}</td>
                  <td>{item.nickname}</td>
                  <td>{item.email}</td>
                </tr>
                )
              )}
              </tbody>
            </table>
          </>
          ):(
            <div className="no-cont-wrap">
              <Icon className="no-contents80" />
              <span className="blind">콘텐츠 없음</span>
              <div className="text">그룹멤버가 없습니다.</div>
            </div>
          )}     
          {
            communityGroupMembers && communityGroupMembers.totalCount >= 20 ? (
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
      )}          
      <div className="admin_bottom_button">
      {groupId && (<button className="ui button admin_table_button02 left" onClick={()=>removeGroup()}>그룹 삭제</button>)}
        <button className="ui button admin_table_button02" onClick={()=>routeToGroupList()}>목록</button>
        <button className="ui button admin_table_button" onClick={()=>saveGroupInformation()}>저장</button>
      </div>  
    </>
  );
};

export default AdminGroupCreateView;
