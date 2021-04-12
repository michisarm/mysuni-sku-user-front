import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { inject } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { ContentLayout } from 'shared';
import NewLearningListContainer from '../logic/NewLearningListContainer';
import LearningListContainer from '../logic/LearningListContainer';
import { SkProfileService } from '../../../profile/stores';
import { RQDLectureService, POPLectureService,NEWLectureService, LRSLectureService, ENRLectureService } from '../../../lecture/stores';

export enum ContentType {
  Required = 'Required',
  New = 'New',
  Popular = 'Popular',
  Recommend = 'Recommend',
  Enrolling = 'Enrolling',
}

export enum ContentTypeText {
  Required = '권장학습 과정',
  New = '신규학습 과정',
  Popular = '인기학습 과정',
  Recommend = '추천학습 과정',
  Enrolling = '수강 신청 과정 모아보기',
}

interface Props extends RouteComponentProps<{ type: string; pageNo: string }> {
  skProfileService?: SkProfileService;
  rqdLectureService?: RQDLectureService;
  newLectureService?: NEWLectureService;
  popLectureService?: POPLectureService;
  lrsLectureService?: LRSLectureService;
  enrLectureService?: ENRLectureService;
}

const NewLearningPage: React.FC<Props> = Props => {
  const { rqdLectureService, newLectureService, popLectureService, lrsLectureService, enrLectureService } = Props;


  const { params } = Props.match;
  const contentType = params.type as ContentType;

  const [title, setTitle] = useState<string | undefined>('');
  const [subTitle, setSubTitle] = useState<string | undefined>('');

  // 페이지 타이틀 설정
  const setPageTitle = (contentType: ContentType) => {
    switch (contentType) {
      case ContentType.Required:
        setTitle(rqdLectureService?.Title);
        break;
      case ContentType.New:
        setTitle(newLectureService?.Title);
        break;
      case ContentType.Popular:
        setTitle(popLectureService?.Title);
        break;
      case ContentType.Recommend:
        setTitle(lrsLectureService?.Title);
        break;
      case ContentType.Enrolling:
        setTitle(enrLectureService?.Title);
        setSubTitle(enrLectureService?.SubTitle);
        break;
      default:
        setTitle('알 수 없는 학습과정입니다.');
        break;
    }
  };

  // Breadcrumb
  const contentTypeText = ContentTypeText[contentType];

  return (
    <ContentLayout breadcrumb={[{ text: `${contentTypeText}` }]}>
      {/* <div className="ma-title">
        <div className="inner">
          <h2>{title}</h2>
          <p className="txt">{subTitle}</p>
        </div>
      </div> */}
      {/* <NewLearningListContainer
        contentType={contentType}
        setPageTitle={setPageTitle}
      /> */}
      <LearningListContainer />
    </ContentLayout>
  );
};

export default inject(mobxHelper.injectFrom(
  'profile.skProfileService',
  'rqdLecture.rqdLectureService',
  'newLecture.newLectureService',
  'popLecture.popLectureService',
  'lrsLecture.lrsLectureService',
  'enrLecture.enrLectureService',
))(withRouter(NewLearningPage));
