import React, { useEffect } from 'react';
import { ContentLayout } from 'shared';
import AplDetailContainer from './AplDetailContainer';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { useParams } from 'react-router-dom';
import {
  AplDetailRouteParams,
  setAplDetailRouteParams,
} from 'myTraining/routeParams';

function AplDetailPage() {
  const params = useParams<AplDetailRouteParams>();
  useEffect(() => {
    setAplDetailRouteParams(params);
  }, []);

  return (
    <ContentLayout breadcrumb={breadcrumb}>
      <AplDetailContainer />
    </ContentLayout>
  );
}

export default AplDetailPage;

const breadcrumb = [
  { text: getPolyglotText('승인관리', '승인관리-mifa-승인관리') },
  { text: getPolyglotText('개인학습', '승인관리-mifa-개인학습') },
];
