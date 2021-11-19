import { deleteCookie, mobxHelper, StorageModel } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';
import { LectureService } from 'lecture';
import { BadgeService } from 'lecture/stores';
import { inject, observer } from 'mobx-react';
import myPageRoutePaths from 'myTraining/routePaths';
import { MyTrainingService } from 'myTraining/stores';
import FolderPage from 'note/ui/page/FolderPage';
import NotePage from 'note/ui/page/NotePage';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Image } from 'semantic-ui-react';
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
  const [activeTab, setActiveTab] = useState('badge');

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
        className="mypagev2"
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
            {/* <MyPageContentsContainer
              tabs={getTabs()}
              defaultActiveName={params.tab}
              onChangeTab={onChangeTab}
            /> */}
            <div className="mypage_menu_list">
              {(!isExternalInstructor() && (
                <>
                  <ul>
                    <li>
                      <Image
                        src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-mypage-menu-badge.svg"
                        alt="뱃지"
                      />
                      <Link
                        to={myPageRoutePaths.myPageEarnedBadgeList()}
                        className={
                          params.tab === 'EarnedBadgeList' ? 'active' : ''
                        }
                      >
                        <PolyglotText
                          id="mapg-mifa-mybadge"
                          defaultString="My Badge"
                        />
                      </Link>
                    </li>
                    <li>
                      <Image
                        src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-mypage-menu-stamp.svg"
                        alt="스탬프"
                      />
                      <Link
                        to={myPageRoutePaths.myPageEarnedStampList()}
                        className={
                          params.tab === 'EarnedStampList' ? 'active' : ''
                        }
                      >
                        <PolyglotText
                          id="mapg-mifa-mystamp"
                          defaultString="My Stamp"
                        />
                      </Link>
                    </li>
                    <li>
                      <Image
                        src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-mypage-menu-note.svg"
                        alt="노트"
                      />
                      <Link
                        to={myPageRoutePaths.myPageEarnedNoteList()}
                        className={
                          params.tab === 'EarnedNoteList' ? 'active' : ''
                        }
                      >
                        <PolyglotText
                          id="mapg-mifa-note"
                          defaultString="Note"
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
