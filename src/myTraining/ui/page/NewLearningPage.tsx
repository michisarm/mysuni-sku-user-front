import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ContentLayout } from 'shared';
import { find } from 'lodash';
import LRSListContainer from '../logic/LRSListContainer';
import LearningListContainer from '../logic/LearningListContainer';
import { findAvailableCardBundles } from '../../../lecture/shared/api/arrangeApi';

export enum ContentType {
  Recommend = 'Recommend',
  Enrolling = 'Enrolling',
}

interface Params {
  type: string;
  pageNo: string;
}

function NewLearningPage() {
  const [breadcrumbTItle, setBreadcrumbTItle] = useState<string>('');
  const { type } = useParams<Params>();
  console.log(useParams());
  const contentType = type as ContentType;

  const getDisplayName = async () => {
    const cardBundles = await findAvailableCardBundles();
    const cardBundle = find(cardBundles, { id: type });

    if (cardBundle) {
      setBreadcrumbTItle(cardBundle.displayText);
    }
  };

  useEffect(() => {
    getDisplayName();
  }, []);

  const getBreadcrumb = () => {
    switch (contentType) {
      case ContentType.Recommend:
        return '추천학습 과정';
      case ContentType.Enrolling:
        return '수강 신청 과정 모아보기';
      default:
        return breadcrumbTItle;
    }
  };

  const renderLearningList = () => {
    switch (contentType) {
      case ContentType.Recommend:
        return <LRSListContainer />;
      case ContentType.Enrolling:
        return <LearningListContainer />;
      default:
        return <LearningListContainer />;
    }
  };

  return (
    <ContentLayout breadcrumb={[{ text: getBreadcrumb() }]}>
      {renderLearningList()}
    </ContentLayout>
  );
}

export default NewLearningPage;
