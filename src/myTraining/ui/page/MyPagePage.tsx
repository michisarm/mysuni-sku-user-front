import { deleteCookie, mobxHelper, StorageModel } from '@nara.platform/accent';
import { LectureService } from 'lecture';
import { BadgeService } from 'lecture/stores';
import { inject, observer } from 'mobx-react';
import myPageRoutePaths from 'myTraining/routePaths';
import { MyTrainingService } from 'myTraining/stores';
import FolderPage from 'note/ui/page/FolderPage';
import NotePage from 'note/ui/page/NotePage';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { ContentLayout, TabItemModel } from 'shared';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import MyPageBadgeListContainer from '../../../certification/ui/logic/MyPageBadgeListContainer';
import { CollegeService } from '../../../college/stores';
import { requestNoteCount } from '../../../note/service/useNote/requestNote';
import { useNoteCount } from '../../../note/store/NoteCountStore';
import { isExternalInstructor } from '../../../shared/helper/findUserRole';
import { MyPageRouteParams } from '../../model/MyPageRouteParams';
import MyPageProfileCardContainer from '../logic/MyPageProfileCardContainer';
import MyPageProfileUpdateContainer from '../logic/MyPageProfileUpdateContainer';
import MyStampListContainer from '../logic/MyStampListContainer';
import {
  MyPageContentType,
  MyPageContentTypeName,
} from '../model/MyPageContentType';
import { Area } from 'tracker/model';
import MyPagePlaylistPage from './MyPagePlaylistPage';
import MyPagePlaylistDetailPage from '../view/playlist/myPagePlaylistDetail/MyPagePlaylistDetailPage';
import MyPageMyLearningSummaryContainer from '../../../main/sub/MyLearningSummary/MyPageMyLearningSummaryContainer';

interface MyPagePageProps {
  myTrainingService?: MyTrainingService;
  badgeService?: BadgeService;
  collegeService?: CollegeService;
}

function MyPagePage({
  myTrainingService,
  badgeService,
  collegeService,
}: MyPagePageProps) {
  const history = useHistory();
  const noteCount = useNoteCount() || 0;
  const params = useParams<MyPageRouteParams>();

  const [photoImageBase64, setPhotoImageBase64] = useState('');
  const [bgImageBase64, setBgImageBase64] = useState('');

  const { myStampCount } = myTrainingService!;
  const {
    allBadgeCount: { issuedCount },
  } = badgeService!;
  const { colleges } = collegeService!;

  useEffect(() => {
    requestNoteCount();
    if (colleges && colleges.length > 0) {
      return;
    }

    collegeService!.findAllColleges();

    LectureService.instance.countMyStamp();
  }, []);

  const getTabs = (): TabItemModel[] => {
    return [
      {
        name: MyPageContentType.EarnedBadgeList,
        item: getTabItem(MyPageContentType.EarnedBadgeList, issuedCount),
        // render: () => <MyBadgeListContainer />
      },
      {
        name: MyPageContentType.EarnedStampList,
        item: getTabItem(MyPageContentType.EarnedStampList, myStampCount),
        // render: () => <MyStampListContainer />
      },
      {
        name: MyPageContentType.EarnedNoteList,
        item: getTabItem(MyPageContentType.EarnedNoteList, noteCount),
        // render: () => (params.pageNo === '1' ? <NotePage noteCount={noteCount} /> : <FolderPage noteCount={noteCount} />)
      },
    ] as TabItemModel[];
  };

  const getTabItem = (contentType: MyPageContentType, count: number) => {
    return (
      <>
        {MyPageContentTypeName[contentType]}
        <span className="count">+{(count > 0 && count) || 0}</span>
      </>
    );
  };

  const onChangeTab = useCallback((tab: TabItemModel): string => {
    history.push(myPageRoutePaths.myPageTab(tab.name));
    return myPageRoutePaths.myPageTab(tab.name);
  }, []);

  const onLogout = useCallback(() => {
    const searchRecents =
      JSON.parse(localStorage.getItem('nara.searchRecents') || '[]') || [];
    localStorage.clear();
    new StorageModel('localStorage', 'searchRecents').save(searchRecents);
    sessionStorage.clear();
    deleteCookie('nara.isLogin');
    window.location.href = `${window.location.protocol}//${window.location.host}/api/checkpoint/sso/logout`;
  }, []);

  const clickTabHandler = useCallback((id: string) => {
    // setActiveTab(id);
    if (id === 'profile') {
      history.push(myPageRoutePaths.myPageProfile());
    } else {
      history.push(myPageRoutePaths.myPageEarnedBadgeList());
    }
  }, []);

  const onChangeImageFile = useCallback((type: string, base64: string) => {
    // setActiveTab(id);
    if (type === 'photoImageFile') {
      setPhotoImageBase64(base64);
    }
    if (type === 'bgImageFile') {
      setBgImageBase64(base64);
    }
  }, []);

  const obj = {
    profile: (
      <MyPageProfileUpdateContainer
        clickTabHandler={clickTabHandler}
        onChangeImageFile={onChangeImageFile}
      />
    ),
    badge: <MyPageBadgeListContainer />,
    stamp: <MyStampListContainer />,
    note: <NotePage noteCount={noteCount} />,
    folder: <FolderPage noteCount={noteCount} />,
  };

  return (
    <>
      <ContentLayout
        className="mypagev3"
        breadcrumb={[
          { text: getPolyglotText('My Page', 'mapg-mifa-dth2') },
          { text: MyPageContentTypeName[params.tab] },
        ]}
      >
        {/* <MyPageHeaderContainer /> */}
        <div className="mypage_lnb" data-area={Area.MYPAGE_INFO}>
          <div className="inner">
            <MyPageProfileCardContainer
              clickTabHandler={clickTabHandler}
              photoImageBase64={photoImageBase64}
              bgImageBase64={bgImageBase64}
            />
            <div className="mypage_menu_list">
              {(!isExternalInstructor() && (
                <>
                  <ul className="menu_list">
                    <li>
                      <Link
                        to={myPageRoutePaths.myPageMyLearningSummary()}
                        className={
                          params.tab === 'MyLearningSummary' ? 'active' : ''
                        }
                      >
                        <Icon className="IconStatus" />
                        <PolyglotText
                          id="mapg-mifa-summary"
                          defaultString="나의 학습 현황"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={myPageRoutePaths.myPageEarnedBadgeList()}
                        className={
                          params.tab === 'EarnedBadgeList' ? 'active' : ''
                        }
                      >
                        <Icon className="IconBadge" />
                        <PolyglotText
                          id="mapg-mifa-mybadge"
                          defaultString="My Badge"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={myPageRoutePaths.myPageEarnedStampList()}
                        className={
                          params.tab === 'EarnedStampList' ? 'active' : ''
                        }
                      >
                        <Icon className="IconStamp" />
                        <PolyglotText
                          id="mapg-mifa-mystamp"
                          defaultString="My Stamp"
                        />
                      </Link>
                    </li>
                  </ul>
                  <ul className="menu_list">
                    <li>
                      <Link
                        to={myPageRoutePaths.myPageEarnedNoteList()}
                        className={
                          params.tab === 'EarnedNoteList' ? 'active' : ''
                        }
                      >
                        <Icon className="IconNote" />
                        <PolyglotText
                          id="mapg-mifa-note"
                          defaultString="Note"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={myPageRoutePaths.myPagePlaylist()}
                        className={`page-bttn ${
                          params.tab === 'Playlist' ? 'active' : ''
                        }`}
                      >
                        <Icon className="IconPlay" />
                        Playlist
                      </Link>
                    </li>
                  </ul>
                  <ul className="menu_list">
                    <li>
                      <Link
                        to={myPageRoutePaths.myPageProfile()}
                        className={`page-bttn ${
                          params.tab === 'MyProfile' ? 'active' : ''
                        }`}
                      >
                        <Icon className="IconProfile" />
                        <PolyglotText
                          defaultString="프로필 설정"
                          id="mypage-프로필카드-프로필설정"
                        />
                      </Link>
                    </li>
                  </ul>
                  <div className="logout-area">
                    <Button onClick={onLogout}>
                      <PolyglotText
                        id="mapg-mifa-logout"
                        defaultString="Logout"
                      />
                    </Button>
                  </div>
                </>
              )) || (
                <div className="logout-area" style={{ marginTop: '0px' }}>
                  <Button onClick={onLogout}>
                    <PolyglotText
                      id="mapg-mifa-logout2"
                      defaultString="Logout"
                    />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {params.tab === 'MyLearningSummary' && (
          <MyPageMyLearningSummaryContainer />
        )}
        {params.tab === 'EarnedBadgeList' && <MyPageBadgeListContainer />}
        {params.tab === 'EarnedStampList' && <MyStampListContainer />}
        {params.tab === 'EarnedNoteList' && params.pageNo === '1' && (
          <NotePage noteCount={noteCount} />
        )}

        {params.tab === 'EarnedNoteList' && params.pageNo === '2' && (
          <FolderPage noteCount={noteCount} />
        )}

        {params.tab === 'MyProfile' && (
          // obj.profile
          <MyPageProfileUpdateContainer
            clickTabHandler={clickTabHandler}
            onChangeImageFile={onChangeImageFile}
          />
        )}
        {params.tab === 'Playlist' && params.playlistId === undefined && (
          <MyPagePlaylistPage />
        )}
        {params.playlistId && <MyPagePlaylistDetailPage />}
      </ContentLayout>
    </>
  );
}

export default inject(
  mobxHelper.injectFrom(
    'myTraining.myTrainingService',
    'badge.badgeService',
    'college.collegeService'
  )
)(observer(MyPagePage));
