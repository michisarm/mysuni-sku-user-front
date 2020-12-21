
import { reactConfirm, reactAlert } from '@nara.platform/accent';
import React, { useCallback, useState, useEffect } from 'react';
import { Checkbox, Select, Pagination } from 'semantic-ui-react';
import { removeMembers } from 'community/api/MemberApi';
import classNames from 'classnames';
import {  getMembers} from 'community/service/useMemberList/useMemberList';
import { CommunityMemberList } from 'community/model/CommunityMember';
import moment from 'moment';
import DatePicker from "react-datepicker";
import Calendar from './Calendar';
import { getSearchBox } from 'community/store/SearchBoxStore';

interface AdminMemberViewProps {
  communityId: string;
  managerAuth: boolean;
  managerId: string;
  communityMembers: CommunityMemberList;
}

const AdminMemberView: React.FC<AdminMemberViewProps> = function AdminMemberView({
  communityId,
  managerAuth,
  managerId,
  communityMembers
}) {

  const selectOptions = [
    { key: "all", value: "all", text: "전체" },
    { key: "subject", value: "subject", text: "제목" },
    { key: "contents", value: "contents", text: "내용" },
    { key: "writer", value: "writer", text: "작성자" },
  ];

  const limitOptions = [
    { text: '20개씩 보기', value: '20' },
    { text: '50개씩 보기', value: '50' },
    { text: '100개씩 보기', value: '100' },
  ];  

  const [focus, setFocus] = useState<boolean>(false);
  const [write, setWrite] = useState<string>('');
  const [selectedList, setSelectedList] = useState<((string | undefined)[])>([]);
  const [selectAll, setSelectAll] = useState<boolean>(true);


  // const approveData = useCommunityMemberApprove();
  const AllData = communityMembers && communityMembers.results.map(item => item.memberId)

  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);


  const handleSubmitClick = useCallback(() => {

    if(selectedList && selectedList.map((item, index) => {return item === managerId}).length > 0){
      reactAlert({ title: '알림', message: '관리자는 삭제할수 없습니다.' });
      return;      
    }

    if(selectedList && selectedList.length === 0){
      reactAlert({ title: '알림', message: '멤버를 선택해 주세요' });
      return;
    }

    reactConfirm({
      title: '알림',
      message: '선택한 멤버를 삭제하시겠습니까?',
      onOk: async () => {
        await removeMembers(communityId, selectedList);
        getMembers(communityId);
        setSelectedList([]);
      },
    });
  }, [communityId, selectedList]);


  const totalPages = () => {
    let totalPage = Math.ceil(communityMembers!.totalCount / 20)
    if (communityMembers!.totalCount % 20 < 0) {
      totalPage++
    }
    setTotalPage(totalPage)
  }
  
  useEffect(() => {
    if(communityMembers === undefined) {
      return
    }
    totalPages();
    
  }, [communityMembers])
  
  const onPageChange = (data:any) => {
    getMembers(communityId, getSearchBox())
    setActivePage(data.activePage)
  }

  const checkAll = useCallback(() => {
    // console.log('selectAll : ', selectAll);
    setSelectAll(!selectAll);
    if(selectAll) {
      setSelectedList(AllData && AllData);
      setSelectAll(!selectAll);
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


  return (
    <>
      <table className="ui admin_table_top">
        <colgroup>
          <col width="200px" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th>가입일자</th>
            <td>
              <div className="preview">
                <Calendar />              
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
              />
              <div
                className={classNames("ui input admin_text_input")}
              >
                <input
                  type="text"
                  placeholder="검색어를 입력해주세요."
                  value={write}
                  onClick={() => setFocus(true)}
                  // onBlur={() => setFocus(false)}
                  onChange={(e) => setWrite(e.target.value)}
                />
                <button className="ui button admin_text_button" >검색</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="table-board-title">
        <div className="table_list_string">
        ㆍ전체 <strong>{communityMembers.totalCount}명</strong>멤버
        </div>
        <div className="right-wrap">
        <Select
          className="ui small-border admin_table_select"
          defaultValue={limitOptions[0].value}
          options={limitOptions}
          // onChange={(e: any, data: any) =>
          //   changeMemberQueryProps('limit', data.value)
          // }          
        />
        <button className="ui button admin_table_button" onClick={e=>handleSubmitClick()} >멤버 삭제</button>
        </div>
      </div>
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
          <tr>
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
            <td>{communityMembers?.totalCount - index - (activePage - 1) * 20}</td>
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
