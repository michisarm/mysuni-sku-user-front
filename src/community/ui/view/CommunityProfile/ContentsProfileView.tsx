import React, { useCallback } from "react";
import { Segment, } from "semantic-ui-react";
import {CommunityProfileItem} from "community/viewModel/CommunityProfile";
import ContentsProfileEditView from "./ContentsProfileEditView";
import { reactAlert, reactConfirm } from "@nara.platform/accent";
import { saveCommunityProfile } from "community/service/useCommunityProfile/utility/saveCommunityProfile";


interface ContentsProfileViewProps {
  profileItem: CommunityProfileItem;
}

const ContentsProfileView: React.FC<ContentsProfileViewProps> = function ContentsProfileView({
  profileItem
}) {

  const handleSave = useCallback(() => {
    // 닉네임 필수
    if (profileItem.nickname === '') {
      reactAlert({
        title: '알림',
        message:
          '닉네임을 입력해주세요.',
      });
      return; 
    }

    reactConfirm({
      title: '알림',
      message:
        '저장하시겠습니까?',
      onOk: () => saveCommunityProfile(),
    });
  },[profileItem]);

  return (
    <>
      <Segment className="full">
        <div className="course-detail-center community-containter">
          <div className="community-main-contants">
          <table className="ui fixed table vertical celled">
            <tbody>
            <tr>
              <th scope="row" className="three wide">이름</th>
              <td>{profileItem.name}</td>
            </tr>
            <tr>
              <th scope="row">관계사</th>
              <td>{profileItem.company.name}</td>
            </tr>
            <tr>
              <th scope="row">닉네임</th>
              <td>{profileItem.editing && (<ContentsProfileEditView keyId="nickname" value={profileItem.nickname}/>) || profileItem.nickname}</td>
            </tr>
            <tr>
              <th scope="row">취미</th>
              <td>{profileItem.editing && (<ContentsProfileEditView keyId="hobby" value={profileItem.hobby}/>) || profileItem.hobby}</td>
            </tr>
            </tbody>
          </table>
          </div>
          {profileItem.editing && (
            <div className="buttons">
              <button type="button" className="ui button fix bg" onClick={handleSave}>완료</button>
            </div>
          )}
        </div>
      </Segment>
    </>
  );
}

export default ContentsProfileView;
