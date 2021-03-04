import React, { useState, useEffect, useCallback } from 'react';
import { Comment, Checkbox } from 'semantic-ui-react';
import AvartarImage from '../../../style/media/img-profile-80-px.png';
import AllSelect from '../../../style/media/icon-addinfo-24-px.png';
import Approve from '../../../style/media/icon-approval-24-px.png';
import {
  getApproveMember,
  updateMembers,
  rejectMembers,
} from 'community/service/useMemberList/useMemberList';
import { reactAlert, reactConfirm } from '@nara.platform/accent';
import { useCommunityMemberApprove } from 'community/store/CommunityMemberApproveStore';
import CommunityMemberCompanionModal from './CommunityMemberCompanionModal';
import { Pagination } from 'semantic-ui-react';
import CommunityMemberTabmenu from '../view/CommunityMemberView/CommunityMemberTabmenu';
import { useHistory } from 'react-router-dom';
import CommunityMemberHeader from '../view/CommunityMemberView/CommunityMemberHeader';
import { value } from 'numeral';

interface Props {
  currentCommunity: string;
}

const CommunityMemberApproveContainer: React.FC<Props> = ({
  currentCommunity,
}) => {
  const [selectedList, setSelectedList] = useState<any>();
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const approveData = useCommunityMemberApprove();
  const AllData = approveData && approveData.results.map(item => item.memberId);

  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const [activemenu, setActiveMenu] = useState<string>('approve');
  const history = useHistory();
  const [remark, setRemark] = useState<string>('');

  const handleActiveMenu = useCallback(
    (active: string) => {
      setActiveMenu(active);
      switch (active) {
        case 'member':
          history.push(`/community/${currentCommunity}/member`);
          break;
        case 'group':
          history.push(`/community/${currentCommunity}/member/group`);
          break;
        case 'approve':
          history.push(`/community/${currentCommunity}/member/approve`);
          break;
        default:
      }
    },
    [activemenu]
  );

  useEffect(() => {
    getApproveMember(currentCommunity);
    checkAll();
  }, [currentCommunity]);

  const totalPages = () => {
    let totalPage = Math.ceil(approveData!.totalCount / 8);
    if (approveData!.totalCount % 8 < 0) {
      totalPage++;
    }
    setTotalPage(totalPage);
  };

  useEffect(() => {
    if (approveData === undefined) {
      return;
    }
    totalPages();
  }, [approveData]);

  const onPageChange = (data: any) => {
    getApproveMember(currentCommunity, (data.activePage - 1) * 8);
    setActivePage(data.activePage);
  };

  const checkAll = useCallback(() => {
    setSelectAll(!selectAll);
    if (selectAll) {
      setSelectedList(AllData && AllData);
      setSelectAll(!selectAll);
    } else {
      setSelectedList([]);
      setSelectAll(!selectAll);
    }
  }, [selectAll]);

  const checkOne = (groupMemberId: string) => {
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
  };
  const [openModal, setModalWin] = React.useState<{
    companionModalWin: boolean;
  }>({
    companionModalWin: false,
  });
  const handleClose = () => {
    setModalWin({
      companionModalWin: false,
    });
  };

  function handleAlertCompanionWin() {
    if (selectedList.length === 0) {
      reactAlert({ title: '알림', message: '가입 반려할 멤버를 선택하세요!' });
    } else {
      setModalWin({
        companionModalWin: true,
      });
    }
  }

  const handleOk = () => {
    rejectUser();
  };

  function onChangeCommunityCompanionProps(name: string, value: string) {
    //console.log(value);
    setRemark(value);

    // console.log(remark, 'test123');
  }
  const updateUser = useCallback(() => {
    if (selectedList.length === 0) {
      reactAlert({ title: '알림', message: '가입 승인할 멤버를 선택하세요!' });
    } else {
      reactConfirm({
        title: '알림',
        message: '선택한 가입자를 가입 승인 하시겠습니까?',
        onOk: () => {
          updateMembers(currentCommunity, selectedList);
          getApproveMember(currentCommunity, (activePage - 1) * 8);
        },
      });
    }
  }, [currentCommunity, activePage, selectedList]);

  const rejectUser = useCallback(() => {
    reactConfirm({
      title: '확인',
      message:
        '선택한 학습자를 가입 반려 처리하시겠습니까?  입력된 반려 사유는 E-mail과 알림을 통해 전달되며, 등록된 내용은 수정하실 수 없습니다.',
      onOk: () => {
        rejectMembers(currentCommunity, selectedList, remark);
        getApproveMember(currentCommunity, (activePage - 1) * 8);
      },
    });
    setModalWin({
      companionModalWin: false,
    });
  }, [currentCommunity, activePage, selectedList, remark]);
  return (
    <>
      <CommunityMemberHeader />
      <CommunityMemberTabmenu
        activemenu={activemenu}
        handleActiveMenu={handleActiveMenu}
      />

      <div className="table-board-title">
        <div className="list-number">
          총 <strong>{approveData && approveData.totalCount}</strong>명
        </div>
        <div className="right-wrap board-down-title-right">
          <button
            className="ui icon button left post delete"
            onClick={checkAll}
          >
            <img src={AllSelect} />
            {selectAll ? '전체해제' : '전체선택'}
          </button>
          <button
            className="ui icon button left post list2 complete"
            onClick={updateUser}
          >
            <img src={Approve} />
            가입승인
          </button>
          <button
            className="ui icon button left post list2 complete"
            onClick={handleAlertCompanionWin}
          >
            <img src={Approve} />
            가입반려
          </button>
          <CommunityMemberCompanionModal
            open={openModal.companionModalWin}
            handleClose={handleClose}
            onChangeCommunityCompanionProps={onChangeCommunityCompanionProps}
            handleOk={handleOk}
          />
        </div>
      </div>
      <div className="mycommunity-card-list">
        {approveData?.results.map((item, index) => (
          <div className="member-card approval" key={index}>
            <Comment>
              <Checkbox
                style={{
                  marginTop: '2rem',
                  marginRight: '1rem',
                  verticalAlign: 'top',
                }}
                checked={selectedList && selectedList.includes(item.memberId)}
                onChange={(e: any) => checkOne(item.memberId)}
              />
              <Comment.Avatar
                src={
                  item.profileImg === null ||
                  item.profileImg === '' ||
                  item.profileImg === undefined
                    ? `${AvartarImage}`
                    : `/files/community/${item.profileImg}`
                }
              />
              <Comment.Content>
                <Comment.Author as="a">
                  <span className="lms-nick">{item.nickname || item.name}</span>
                </Comment.Author>
              </Comment.Content>
            </Comment>
          </div>
        ))}
      </div>
      {approveData && approveData.totalCount >= 8 ? (
        <div className="lms-paging-holder">
          <Pagination
            activePage={activePage}
            totalPages={totalPage}
            firstItem={null}
            lastItem={null}
            onPageChange={(e, data) => onPageChange(data)}
          />
        </div>
      ) : null}
    </>
  );
};

export default CommunityMemberApproveContainer;
