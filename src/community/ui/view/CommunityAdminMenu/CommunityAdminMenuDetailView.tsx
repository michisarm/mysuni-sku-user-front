import { MenuItem } from 'community/viewModel/CommunityAdminMenu';
import React,{useState,useCallback,useEffect} from 'react';
import { Radio, Select } from 'semantic-ui-react';

interface MemberList {
  communityId: any
}
interface CommunityAdminMenuDetailViewProps {
  addMenuFlag: boolean
  selectedRow?: MenuItem
  onChangeValue: (data: {}) => void
}


const CommunityAdminMenuDetailView: React.FC<CommunityAdminMenuDetailViewProps> = function CommunityAdminMenuDetailView({
  addMenuFlag,
  selectedRow,
  onChangeValue
}) {
  console.log('selectedRow', selectedRow)
  // const selectOptions02 = [
  //   { key: "category", value: "category", text: "카테고리" },
  //   { key: "normal", value: "normal", text: "일반 게시판" },
  //   { key: "writer", value: "writer", text: "토론 게시판" },
  //   { key: "anony", value: "anony", text: "익명 게시판" },
  //   { key: "notice", value: "notice", text: "공지사항" },
  //   { key: "board", value: "board", text: "자료실" },
  //   { key: "survey", value: "survey", text: "설문조사" },
  //   { key: "link", value: "link", text: "링크" },
  //   { key: "html", value: "html", text: "HTML" },
  // ];

  const menuType = [
    { key: 'CATEGORY', value: 'CATEGORY', text: '카테고리' },
    { key: 'BASIC', value: 'BASIC', text: '일반 게시판' },
    { key: 'DISCUSSION', value: 'DISCUSSION', text: '토론 게시판' },
    { key: 'ANONYMOUS', value: 'ANONYMOUS', text: '익명 게시판' },
    { key: 'NOTICE', value: 'NOTICE', text: '공지사항' },
    { key: 'STORE', value: 'STORE', text: '자료실' },
    { key: 'SURVEY', value: 'SURVEY', text: '설문조사' },
    { key: 'LINK', value: 'LINK', text: '링크' },
    { key: 'HTML', value: 'HTML', text: 'HTML' },
  ];

  const selectOptions03 = [
    { key: "all", value: "all", text: "선택하세요" },
    { key: "subject", value: "subject", text: "제목" },
    { key: "contents", value: "contents", text: "내용" },
    { key: "writer", value: "writer", text: "작성자" },
  ];
  // const memberData = useCommunityMember();
  // const [activePage, setActivePage] = useState<any>(1);
  // const [totalPage, setTotalPage] = useState<number>(1);
  // const {communityId} = useParams<MemberList>();

  // const totalPages = () => {
  //   let totalPage = Math.ceil(memberData!.totalCount / 8)
  //   if (memberData!.totalCount % 8 < 0) {
  //     totalPage++
  //   }
  //   setTotalPage(totalPage)
  // }
  
  // useEffect(() => {
  //   if(memberData === undefined) {
  //     return
  //   }
  //   totalPages();
  // }, [memberData])
  
  // const onPageChange = (data:any) => {
  //   getAllMember(communityId,(data.activePage-1)*8);
  //   setActivePage(data.activePage)
  // }

  function changeSort(_: any, data: any) {
    console.log('selectedRow', selectedRow)
    console.log('data', data)
    if(selectedRow && data) {
      selectedRow.type = data.value
      onChangeValue(selectedRow);
    }
    console.log('selectedRow', selectedRow)
    // const myCommunityIntro = getMyCommunityIntro();
    // if (myCommunityIntro === undefined) {
    //   return;
    // }
    // const communitiesSort = (data.value || 'memberCreatedTime').toString();
    // setMyCommunityIntro({
    //   ...myCommunityIntro,
    //   communitiesSort
    // });
    // requestMyCommunityList();
  }

  return (
    <div className="menu_right_contents">
      <table>
        <colgroup>
          <col width="200px" />
          <col />
        </colgroup>
        <tbody>
          <tr>
  <th>메뉴 유형{selectedRow!.type}</th>
            <td>
              <Select
                placeholder="전체"
                className="ui small-border admin_tab_select"
                value={selectedRow!.type}
                options={menuType}
                onChange={changeSort}
              />
            </td>
          </tr>
          <tr>
            <th>카테고리명</th>
            <td>
              {/* <div className={classNames("ui right-top-count input admin", { focus: this.state.focus, write: this.state.write })} style={{width: '100%'}}>
                <input type="text" placeholder="카테고리명을 입력하세요" className="bg"
                      value={this.state.write}
                      onClick={() => this.setState({ focus: true })} onBlur={() => this.setState({ focus: false})}
                      onChange={(e) => this.setState({ write: e.target.value })}
                />
                <Icon className="clear link" onClick={() => this.setState({ write: '' })} />
                <span className="validation">You can enter up to 100 characters.</span>
              </div> */}
            </td>
          </tr>
          <tr>
            <th>접근 권한</th>
            <td>
              {/* 공개, 비공개 */}
              {/* <BoardWriteRadio /> */}
              <div className="board-write-radio">
                <Radio
                  className="base"
                  label="커뮤니티 멤버"
                  name="radioGroup"
                  value="value01"
                  checked={true}
                  // onChange={this.handleChange}
                />
                <Radio
                  className="base"
                  label="그룹지정"
                  name="radioGroup"
                  value="value02"
                  checked={true}
                  // onChange={this.handleChange}
                />
              </div>
              <Select
                placeholder="전체"
                className="ui small-border admin_tab_select"
                defaultValue={selectOptions03[0].value}
                options={selectOptions03}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <ul>
        <li>ㆍ 해당 메뉴에 접근할 수 있는 범위를 설정할 수 있습니다.</li>
        <li>
          ㆍ 커뮤니티 멤버 : 해당 커뮤니티에 가입된 멤버들이 접근할 수
          있습니다.
        </li>
        <li>
          ㆍ 그룹 지정 : <strong>멤버 관리</strong> 메뉴에서 등록된 그룹만
          접근할 수 있습니다.
        </li>
      </ul>
    </div>
  )
}

export default CommunityAdminMenuDetailView;