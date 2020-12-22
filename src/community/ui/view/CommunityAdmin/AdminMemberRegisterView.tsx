
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

interface AdminMemberRegisterViewProps {
  communityId: string;
  managerAuth: boolean;
  managerId: string;
  communityMembers: CommunityMemberList;
  searchBox:SearchBox;
}

const AdminMemberRegisterView: React.FC<AdminMemberRegisterViewProps> = function AdminMemberView({
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
      reactAlert({ title: '알림', message: '멤버를 선택해 주세요' });
      return;
    }

    reactConfirm({
      title: '알림',
      message: '선택한 멤버를 삭제하시겠습니까?',
      onOk: async () => {
        await deleteMembers(communityId, selectedList);
        // getMembers(communityId);
        //TODO 로직 변경 필요
        setTimeout(() => {
          getMembers(communityId);
        }, 500)
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
        // await removeMembers(communityId, selectedList);
        await updateMembers(communityId, selectedList);
        // getMembers(communityId);
        //TODO 로직 변경 필요
        setTimeout(() => {
          getMembers(communityId);
        }, 500)
        setSelectedList([]);
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
    //TODO : 로직 개선 필요함
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
    });    
    handleSubmitClick(); 
  }, [limit])    
  
  const onPageChange = useCallback((data:any) => {
    getMembers(communityId);
    setActivePage(data.activePage);
  }, [communityId,searchBox]);

  const handleSubmitClick = useCallback(async (limit?:number) => {
    getMembers(communityId);
    setActivePage(1);
  }, [communityId,searchBox,limit]);


  const checkAll = useCallback(() => {
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
      <table className="ui admin_table_top margin">
        <colgroup>
          <col width="200px" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th>멤버 일괄 등록 양식</th>
            <td className="margin">
              <button className="ui button admin_text_button02">양식 다운로드</button>
            </td>
          </tr>
          <tr>
            <th>멤버 일괄 등록</th>
            <td>
              <div className="preview admin">
                <div className="ui input file2">
                  <label htmlFor="hidden-new-file2" className="ui button admin_text_button">
                  엑셀 파일 선택
                  </label>
                  <input type="file" id="hidden-new-file2" />
                </div>
              </div>
              <span className="regi_span">※ 엑셀 파일 내 E-mail 이 제대로 입력되어 있는지 확인해주세요.</span>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="ui admin_table_result">
        <colgroup>
          <col width="200px" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th>업로드 결과</th>
            <td>
              <div className="upload_result">
                전체 <span>99</span>명
              </div>
              <div className="upload_result">
                멤버 등록 처리 대상 <span>96</span>명
              </div>
            </td>
            <td className="admin_result_right">
              <span>※ 멤버 일괄 등록 완료 버튼을 눌러주세요.</span>
              <button className="ui button admin_table_button">멤버 일괄 등록 완료</button>
            </td>
          </tr>
        </tbody>
      </table>      
      {/* <TableTitle /> */}
      <div className="table-board-title">
        <div className="table_list_string">
         ㆍ전체 <strong>96명</strong>멤버
        </div>
        <div className="right-wrap">
          <Select
            className="ui small-border admin_table_select"
            defaultValue={selectOptions[0].value}
            options={selectOptions}
          />
        </div>
      </div>      
            <table className="ui admin_table">
              <colgroup>
                <col width="70px"/>
                <col width="70px"/>
                <col />
                <col />
                <col />
                <col width="200px"/>
                <col />
                <col />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th>
                    <Checkbox
                      className="base"
                      label=""
                      name="radioGroup"
                      value=""
                    />
                  </th>
                  <th>No</th>
                  <th>소속사</th>
                  <th>소속 조직(팀)</th>
                  <th>성명</th>
                  <th>닉네임</th>
                  <th>E-mail</th>
                  <th>등록 성공 여부</th>
                  <th>오류 상세</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Checkbox
                      className="base"
                      label=""
                      name="radioGroup"
                      value=""
                    />
                  </td>
                  <td>99</td>
                  <td>SK주식회사 C&#38;C</td>
                  <td>공용계정조직</td>
                  <td>김써니</td>
                  <td>nickname</td>
                  <td>suni20@sk.com</td>
                  <td>Y</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>
                    <Checkbox
                      className="base"
                      label=""
                      name="radioGroup"
                      value=""
                    />
                  </td>
                  <td>99</td>
                  <td>SK주식회사 C&#38;C</td>
                  <td>공용계정조직</td>
                  <td>김써니</td>
                  <td>nickname</td>
                  <td>suni20@sk.com</td>
                  <td>Y</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>
                    <Checkbox
                      className="base"
                      label=""
                      name="radioGroup"
                      value=""
                    />
                  </td>
                  <td>99</td>
                  <td>SK주식회사 C&#38;C</td>
                  <td>공용계정조직</td>
                  <td>김써니</td>
                  <td>nickname</td>
                  <td>suni20@sk.com</td>
                  <td className="admin_red">N</td>
                  <td>메일주소 오류</td>
                </tr>
                <tr>
                  <td>
                    <Checkbox
                      className="base"
                      label=""
                      name="radioGroup"
                      value=""
                    />
                  </td>
                  <td>99</td>
                  <td>SK주식회사 C&#38;C</td>
                  <td>공용계정조직</td>
                  <td>김써니</td>
                  <td>nickname</td>
                  <td>suni20@sk.com</td>
                  <td className="admin_red">N</td>
                  <td>메일주소 오류</td>
                </tr>
                <tr>
                  <td>
                    <Checkbox
                      className="base"
                      label=""
                      name="radioGroup"
                      value=""
                    />
                  </td>
                  <td>99</td>
                  <td>SK주식회사 C&#38;C</td>
                  <td>공용계정조직</td>
                  <td>김써니</td>
                  <td>nickname</td>
                  <td>suni20@sk.com</td>
                  <td>Y</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>
                    <Checkbox
                      className="base"
                      label=""
                      name="radioGroup"
                      value=""
                    />
                  </td>
                  <td>99</td>
                  <td>SK주식회사 C&#38;C</td>
                  <td>공용계정조직</td>
                  <td>김써니</td>
                  <td>nickname</td>
                  <td>suni20@sk.com</td>
                  <td>Y</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
            {/* <Paging />     */}
            <div className="lms-paging-holder">
              <a className="lms-prev">이전10개</a>
              <a className="lms-num lms-on">1</a>
              <a className="lms-num">2</a>
              <a className="lms-num">3</a>
              <a className="lms-num">4</a>
              <a className="lms-num">5</a>
              <a className="lms-next">이후10개</a>
            </div>            
    </>
  );
};

export default AdminMemberRegisterView;
