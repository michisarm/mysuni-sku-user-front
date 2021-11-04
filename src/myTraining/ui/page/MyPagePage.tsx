import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper, deleteCookie } from '@nara.platform/accent';
import { MyTrainingService } from 'myTraining/stores';
import { BadgeService } from 'lecture/stores';
import myTrainingRoutePaths from 'myTraining/routePaths';
import { ContentLayout, TabItemModel } from 'shared';
import Tab from 'shared/components/Tab';
import MyPageBadgeListContainer from '../../../certification/ui/logic/MyPageBadgeListContainer';
import { MyPageRouteParams } from '../../model/MyPageRouteParams';
import MyPageHeaderContainer from '../logic/MyPageHeaderContainer';
import MyPageProfileCardContainer from '../logic/MyPageProfileCardContainer';
import {
  MyPageContentType,
  MyPageContentTypeName,
} from '../model/MyPageContentType';
import MyStampListContainer from '../logic/MyStampListContainer';
import { CollegeService } from '../../../college/stores';
import NotePage from 'note/ui/page/NotePage';
import FolderPage from 'note/ui/page/FolderPage';
import { useNoteCount } from '../../../note/store/NoteCountStore';
import { requestNoteCount } from '../../../note/service/useNote/requestNote';
import { Image, Label, Icon, Button, List, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import myPageRoutePaths from 'myTraining/routePaths';
import MyPageProfileUpdateContainer from '../logic/MyPageProfileUpdateContainer';
import { isExternalInstructor } from '../../../shared/helper/findUserRole';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';

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
    // requestNoteCount();
    if (colleges && colleges.length > 0) {
      return;
    }

    collegeService!.findAllColleges();
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
    history.push(myTrainingRoutePaths.myPageTab(tab.name));
    return myTrainingRoutePaths.myPageTab(tab.name);
  }, []);

  const onLogout = useCallback(() => {
    localStorage.clear();
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
        <div className="mypage_lnb">
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
                        src={`${process.env.PUBLIC_URL}/images/all/icon-mypage-menu-badge.svg`}
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
                        src={`${process.env.PUBLIC_URL}/images/all/icon-mypage-menu-stamp.svg`}
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
                        src={`${process.env.PUBLIC_URL}/images/all/icon-mypage-menu-note.svg`}
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
