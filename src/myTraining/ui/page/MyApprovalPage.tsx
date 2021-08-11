import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { ContentLayout } from 'shared';
import { MyApprovalContentType } from '../model/MyApprovalContentType';
import MyApprovalContentHeader from '../view/MyApprovalContentHeader';
import { MyApprovalRouteParams } from '../../model/MyApprovalRouteParams';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import MyApprovalTabContainer from 'myTraining/myApprovalTab/MyApprovalTabContainer';
import { useRequestMenuAuth } from 'myTraining/service/useRequestMenuAuth';

function MyApprovalPage() {
  useRequestMenuAuth();
  const params = useParams<MyApprovalRouteParams>();

  const myApprovalText = useCallback(() => {
    if (params.tab === MyApprovalContentType.PaidCourse) {
      return getPolyglotText('유료과정', '승인관리-mifa-유료과정bread');
    } else {
      return getPolyglotText('개인학습', '승인관리-mifa-개인학습bread');
    }
  }, [params.tab]);

  return (
    <ContentLayout
      className="MyApprovalPage"
      breadcrumb={[
        { text: getPolyglotText('승인관리', '승인관리-mifa-승인관리bread') },
        { text: myApprovalText() },
      ]}
    >
      <MyApprovalContentHeader />
      <MyApprovalTabContainer />
    </ContentLayout>
  );
}

export default observer(MyApprovalPage);
