import { reactConfirm, reactAlert } from '@nara.platform/accent';
import React, { useCallback, useState, useEffect } from 'react';
import { Checkbox, Select, Pagination, Icon, Button } from 'semantic-ui-react';
import { removeMembers } from 'community/api/MemberApi';
import classNames from 'classnames';
import {
  getMembers,
  updateMembers,
  deleteMembers,
  registerMembersTempComplete,
} from 'community/service/useMemberList/useMemberList';
import { CommunityMemberList } from 'community/model/CommunityMember';
import moment from 'moment';
import Calendar from './Calendar';
import {
  getSearchBox,
  useSearchBox,
  setSearchBox,
} from 'community/store/SearchBoxStore';
import { SearchBox } from 'community/model/SearchBox';
import XLSX, { WorkBook } from 'xlsx';
import { MemberTempExcelModel } from 'community/model/MemberTempExcelModel';
import { MemberTempCdoModel } from 'community/model/MemberTempCdoModel';
import { MemberTempModel } from 'community/model/MemberTempModel';

// TODO: 페이징 처리 진행시 주석 해제하여 진행
interface AdminMemberRegisterViewProps {
  communityId: string;
  managerAuth: boolean;
  managerId: string;
}

const AdminMemberRegisterView: React.FC<AdminMemberRegisterViewProps> =
  function AdminMemberView({ communityId, managerAuth, managerId }) {
    const fileInputRef = React.createRef<HTMLInputElement>();

    const limitOptions = [
      { text: '20개씩 보기', value: '20' },
      { text: '50개씩 보기', value: '50' },
      { text: '100개씩 보기', value: '100' },
    ];

    // const [focus, setFocus] = useState<boolean>(false);
    // const [write, setWrite] = useState<string>('');
    const [limit, setLimit] = useState<number>(20);
    const [searchType, setSearchType] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
    const [isProcessed, setIsProcessed] = useState<boolean>(false);
    const [excelDataRowCount, setExcelDataRowCount] = useState<number>(0);
    const [procTargetTotalListCount, setProcTargetTotalListCount] =
      useState<number>(0);
    const [memberTempCboList, setMemberTempCboList] = useState<
      MemberTempCdoModel[]
    >([]);
    const [memberTempModelList, setMemberTempModelList] = useState<
      MemberTempModel[]
    >([]);
    // const AllData = communityMembers && communityMembers.results.map(item => item.memberId)

    const [activePage, setActivePage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);

    // const totalPages = useCallback(() => {
    //   let totalPage = Math.ceil(communityMembers!.totalCount / limit)
    //   if (communityMembers!.totalCount % limit < 0) {
    //     totalPage++
    //   }
    //   setTotalPage(totalPage)
    // }, [communityMembers, limit])

    // useEffect(() => {
    //   if(communityMembers === undefined) {
    //     return
    //   }
    //   totalPages();
    // }, [communityMembers])

    // useEffect(() => {
    //   setSearchBox({
    //     ...searchBox,
    //     limit: limit || 20,
    //   });
    //   handleSubmitClick();
    // }, [limit])

    // const onPageChange = useCallback((data:any) => {
    //   getMembers(communityId);
    //   setActivePage(data.activePage);
    // }, [communityId,searchBox]);

    // const handleSubmitClick = useCallback(async (limit?:number) => {
    //   getMembers(communityId);
    //   setActivePage(1);
    // }, [communityId,searchBox,limit]);

    const uploadFile = useCallback((file: File) => {
      const fileReader = new FileReader();

      fileReader.onload = (e: any) => {
        //엑셀 파일 불러오기시 기존 데이터 처리 표기 부분 초기화(그리드 포함)
        // clearDisplay();
        //   //전체 엑셀 건수 표기 초기화
        setExcelDataRowCount(0);
        setProcTargetTotalListCount(0);
        setMemberTempCboList([]);
        setMemberTempModelList([]);

        let binary: string = '';
        const data = new Uint8Array(e.target.result);

        const length = data.byteLength;
        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(data[i]);
        }
        const workbook: WorkBook = XLSX.read(binary, { type: 'binary' });

        let memberTempExcelList: MemberTempExcelModel[] = [];

        workbook.SheetNames.forEach((item: any) => {
          const jsonArray = XLSX.utils.sheet_to_json<MemberTempExcelModel>(
            workbook.Sheets[item]
          );

          if (jsonArray.length === 0) {
            return;
          }

          memberTempExcelList = jsonArray;
        });

        const dataList: MemberTempCdoModel[] = [];

        // let memberTemp1: memberTempModel[] = [];
        if (memberTempExcelList && memberTempExcelList.length > 0) {
          setExcelDataRowCount(memberTempExcelList.length);

          memberTempExcelList.map((excelDataRow: MemberTempExcelModel) => {
            const email: string = excelDataRow.Email;

            //멤버등록이면서 이메일, 강좌명, 멤버등록시간이 존재해야만, 처리대상에 포함.(이메일 형식이 맞는것)
            if (email && email.length > 0) {
              const convertedRowData = MemberTempExcelModel.asCdo(excelDataRow);

              dataList.push(convertedRowData);
            }
          });

          if (dataList.length > 0) {
            // memberTempProcService!.setMemberTempUdoList(dataList);
            setMemberTempCboList(dataList);
            setProcTargetTotalListCount(dataList.length);
          }
        }
      };

      if (file && file instanceof File) {
        //선택한 엑셀 파일 표기
        setFileName(file.name);

        //멤버등록 처리전... 표기
        setIsProcessed(false);

        fileReader.readAsArrayBuffer(file);
      }
    }, []);

    const registerMemberTempComplete = useCallback(() => {
      const udos: MemberTempCdoModel[] = memberTempCboList;

      if (udos && udos.length > 0) {
        registerMembersTempComplete(communityId, udos).then((res) => {
          //멤버등록 처리 후 멤버등록 건수 보여주기
          setMemberTempModelList(res);
          setIsProcessed(true);
          reactAlert({
            title: '완료 안내',
            message: 'Member 일괄 등록이 완료되었습니다.',
          });
        });
      } else {
        reactAlert({
          title: '안내',
          message: 'Member 일괄 등록 엑셀 파일을 선택하세요.',
        });
        return true;
      }
    }, [memberTempCboList]);

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
                <Button
                  content="양식 다운로드"
                  className="ui button admin_text_button02"
                  href={`${process.env.PUBLIC_URL}/upload_member_sample.xlsx`}
                />
              </td>
            </tr>
            <tr>
              <th>멤버 일괄 등록</th>
              <td>
                <div className="preview admin">
                  <div className="ui input file2">
                    <label
                      htmlFor="hidden-new-file2"
                      className="ui button admin_text_button"
                    >
                      {fileName || '엑셀 파일 선택'}
                    </label>
                    <input
                      type="file"
                      id="hidden-new-file2"
                      ref={fileInputRef}
                      accept=".xlsx, .xls"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        e.target.files && uploadFile(e.target.files[0])
                      }
                    />
                  </div>
                </div>
                <span className="regi_span">
                  ※ 엑셀 파일 내 E-mail 이 제대로 입력되어 있는지 확인해주세요.
                </span>
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
                  전체 <span>{excelDataRowCount}</span>명
                </div>
                <div className="upload_result">
                  멤버 등록 처리 대상 <span>{procTargetTotalListCount}</span>명
                </div>
              </td>
              <td className="admin_result_right">
                <span>※ 멤버 일괄 등록 완료 버튼을 눌러주세요.</span>
                <button
                  className="ui button admin_table_button"
                  onClick={() => {
                    registerMemberTempComplete();
                  }}
                >
                  멤버 일괄 등록 완료
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        {/* <TableTitle /> */}
        {/* <div className="table-board-title">
        <div className="table_list_string">
         ㆍ전체 <strong>96명</strong>멤버
        </div>
        <div className="right-wrap">
          <Select
            className="ui small-border admin_table_select"
            defaultValue={limitOptions[0].value}
            options={limitOptions}
          />
        </div>
      </div>       */}
        {memberTempModelList && memberTempModelList.length > 0 ? (
          <table className="ui admin_table">
            <colgroup>
              {/* <col width="70px"/> */}
              <col width="70px" />
              <col />
              <col />
              <col />
              <col width="200px" />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                {/* <th>
                      <Checkbox
                        className="base"
                        label=""
                        name="radioGroup"
                        value=""
                      />
                    </th> */}
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
              {memberTempModelList &&
                memberTempModelList.length &&
                memberTempModelList.map((model, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{model.team}</td>
                      <td>{model.company}</td>
                      <td>{model.name}</td>
                      <td>{model.nickName}</td>
                      <td>{model.email}</td>
                      <td>{model.result}</td>
                      <td>{model.detail}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <div className="no-cont-wrap">
            <Icon className="no-contents80" />
            <span className="blind">콘텐츠 없음</span>
            <div className="text">등록된 멤버가 없습니다.</div>
          </div>
        )}
        {/* <Paging />     */}
        {/* <div className="lms-paging-holder">
              <a className="lms-prev">이전10개</a>
              <a className="lms-num lms-on">1</a>
              <a className="lms-num">2</a>
              <a className="lms-num">3</a>
              <a className="lms-num">4</a>
              <a className="lms-num">5</a>
              <a className="lms-next">이후10개</a>
            </div>             */}
      </>
    );
  };

export default AdminMemberRegisterView;
