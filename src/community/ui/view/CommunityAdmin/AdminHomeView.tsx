import React, { useState, useCallback, useRef, ChangeEvent } from 'react';
import { reactAlert, reactConfirm } from '@nara.platform/accent';

// sementic-ui
import { Segment, Select, Form, Icon } from 'semantic-ui-react';
import classNames from 'classnames';
import HtmlEditor from './HtmlEditor';
 
import { values } from 'mobx';
import { useRouteMatch } from 'react-router-dom';
import CommunityHome from 'community/viewModel/CommunityHome';
import { saveCommunityHome } from 'community/service/useCommunityHome/saveCommunityHome';
import { CommunityHomeCreateItem } from 'community/viewModel/CommunityHomeCreate';
import Editor from './Editor';
import { setCommunityHomeCreateItem, getCommunityHomeCreateItem } from 'community/store/CommunityHomeCreateStore';
import { upload } from 'community/api/FileApi';


interface AdminHomeViewProps {
  communityId: string;
  communityHome: CommunityHomeCreateItem;
}

const AdminHomeView: React.FC<AdminHomeViewProps> = function AdminHomeView({
  communityId,
  communityHome
}) {
  // const { params } = useRouteMatch<AdminHomeViewProps>();
 
  // 기본 / HTML 유형 
  const [changeSelectType, setChangeSelectType] = useState<string>(communityHome.type);
  // 환영 메세지 텍스트
  const [text, setText] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectOptions = [
    { key: 'BASIC', value: 'BASIC', text: '기본' },
    { key: 'HTML', text: 'HTML', value: 'HTML' },
  ];


  const setProfileImgId = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      upload(e)?.then(response => {
        if (communityHome === undefined) {
          return;
        }
        const nextProfileItem = { ...communityHome, thumbnailId : response };
        setCommunityHomeCreateItem(nextProfileItem);
      }),
    []
  );

  // 저장 api 호출
  const onSave = useCallback(async () => {
    console.log('click', communityId);

    if(communityHome.type === 'BASIC' && (communityHome.introduce && communityHome.introduce.length <= 0)) {
      reactAlert({
        title: '',
        message: '환영 메세지를 입력해 주세요',
      });
    }

    // console.log('communityHome.id : ' , communityHome.id);
    await saveCommunityHome(communityId, communityHome.id);

    // 정상 일때
    reactAlert({
      title: '완료 안내',
      message: '저장 되었습니다',
    });
    
  },[communityId, communityHome])

  // 미리보기 팝업 (admin과 같은 화면증상, 확인필요)
  const previewPop = useCallback(() => {
    // window.open('https://mysuni.sk.com/suni-main/community/' + params.communityId + '/preview', '_blank');
  // },[params])
  },[])

  return (
    <>
      {/* 검색창 */}
      <table className="ui admin_table_top none">
        <colgroup>
          <col width="200px" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th>
              유형<span id="type">*</span>
            </th>
            <td>
              <Select
                placeholder="전체"
                className="ui small-border admin_tab_select"
                defaultValue={communityHome.type}
                onChange={(e:any, data: any) => setCommunityHomeCreateItem({ ...communityHome, type:data.value })}
                options={selectOptions}
              />
            </td>
          </tr>
          { communityHome.type === "BASIC" ?
          <>
            <tr>
              <th>
                대표 이미지<span>*</span>
              </th>
              <td className="admin_img">
                <div className="preview admin">
                  <div className="ui input file2">
                    <label
                      htmlFor="hidden-new-file2"
                      className="ui button admin_text_button"
                    >
                      이미지 첨부
                    </label>
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept=".jpg,.jpeg,.png,.gif"                      
                      id="hidden-new-file2" 
                      onChange={setProfileImgId}
                    />
                  </div>
                </div>
                <span className="regi_span">
                  ※ 이미지 최적 사이즈는 가로 850px 입니다. (jpg, jpeg, png, gif
                  확장자만 첨부 가능)
                </span>
                {communityHome.thumbnailId && (
                  <p style={{ background: 'white' }}>
                    <img
                      src={
                        (communityHome.thumbnailId&&
                          '/files/community/' + communityHome.thumbnailId )
                      }
                      alt="배경이미지"
                    />
                  </p>    
                )}            
              </td>
            </tr>
            <tr>
              <th>
                환영 메세지<span>*</span>
              </th>
              <td>
                <div
                  className={classNames('ui right-top-count input admin', {
                    // focus: this.state.focus,
                    // write: this.state.write,
                  })}
                  style={{ width: '100%' }}
                >
                  <input
                    type="text"
                    placeholder="커뮤니티 환영 메시지를 입력해주세요."
                    value={communityHome.introduce}
                    onChange={e => setCommunityHomeCreateItem({ ...communityHome, introduce : e.target.value })}
                  />
                  <Icon
                    className="clear link"
                  // onClick={() => this.setState({ write: '' })}
                  />
                  <span className="validation">
                    You can enter up to 100 characters.
                  </span>
                </div>
              </td>
            </tr>
          </>
            : <div style={{padding: '0 0 2rem 0'}}/>
          }
        </tbody>
      </table>
      {communityHome.type === 'HTML' && 
      // <HtmlEditor />}
        <Editor contents={communityHome.html||''} />
      }

      <div className="admin_bottom_button line none">
        <button className="ui button admin_table_button02 left" onClick={previewPop}>
          미리보기
        </button>
        <button className="ui button admin_table_button" onClick={onSave}>저장</button>
      </div>
    </>
  );
};

export default AdminHomeView;
