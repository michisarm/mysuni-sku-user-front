/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ContentLayout } from 'shared';
import { find } from 'lodash';
import LRSListContainer from '../logic/LRSListContainer';
import LearningListContainer from '../logic/LearningListContainer';
import { findAvailableCardBundles } from '../../../lecture/shared/api/arrangeApi';
import { Area } from 'tracker/model';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

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
  const [cardType, setCardType] = useState<String>('');
  const [dataArea, setDataArea] = useState<Area | undefined>(undefined);
  const { type } = useParams<Params>();
  const contentType = type as ContentType;

  const getDisplayName = async () => {
    const cardBundles = await findAvailableCardBundles();
    const cardBundle = find(cardBundles, { id: type });

    if (cardBundle) {
      setBreadcrumbTItle(parsePolyglotString(cardBundle.displayText));
      setCardType(cardBundle.type);
    }
  };

  useEffect(() => {
    getDisplayName();
  }, []);

  const getBreadcrumb = () => {
    switch (contentType) {
      case ContentType.Recommend:
        return getPolyglotText(
          '추천학습 과정',
          '신규학습-신규목록-추천학습과정'
        );
      case ContentType.Enrolling:
        return getPolyglotText(
          '수강 신청 과정 모아보기',
          '신규학습-신규목록-모아보기'
        );
      default:
        return breadcrumbTItle;
    }
  };

  useEffect(() => {
    let area = null;
    switch (contentType) {
      case ContentType.Recommend:
        area = window.location.search.includes('LearningPatternBased') ? Area.NEWLEARNING_RECOMMEND : Area.NEWLEARNING_PATTERN;
        break;
      case ContentType.Enrolling:
        area = Area.NEWLEARNING_ENROLLING;
        break;
      default:
        switch (cardType) {
          case 'Normal':
            area = Area.NEWLEARNING_NORMAL;
            break;
          case 'Popular':
            area = Area.NEWLEARNING_POPULAR;
            break;
          case 'New':
            area = Area.NEWLEARNING_NEW;
            break;
          case 'Recommended':
            area = Area.NEWLEARNING_RECOMMEND;
            break;
        }
        break;
    }
    if (area) {
      setDataArea(area);
    }
  }, [contentType, cardType]);

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
    <ContentLayout breadcrumb={[{ text: getBreadcrumb() }]} dataArea={dataArea}>
      {renderLearningList()}
    </ContentLayout>
  );
}

export default NewLearningPage;
