
import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import AplService from 'myTraining/present/logic/AplService';
import { ContentLayout } from 'shared';
import AplDetailContainer from '../logic/AplDetailContainer';
import MyApprovalContentHeader from '../view/MyApprovalContentHeader';
import { useParams } from 'react-router-dom';
import { mobxHelper } from '@nara.platform/accent';


interface Props {
  aplService?: AplService;
}

interface RouteParams {
  aplId: string;
}

function AplDetailPageV2(props: Props) {
  const { aplService } = props;
  const { apl } = aplService!;
  const { aplId } = useParams<RouteParams>();

  /* effects */
  useEffect(() => {
    aplService!.findApl(aplId);
    document.body.classList.add('white');

    return () => {
      aplService!.clearApl();
      document.body.classList.remove('white');
    };
  }, []);


  /* render */
  return (
    <ContentLayout
      breadcrumb={[
        { text: '승인관리' },
        { text: '개인학습' }
      ]}
    >
      <MyApprovalContentHeader model={apl} />
      <AplDetailContainer model={apl} />
    </ContentLayout>
  );
}

export default inject(mobxHelper.injectFrom(
  'myTraining.aplService'
))(observer(AplDetailPageV2));