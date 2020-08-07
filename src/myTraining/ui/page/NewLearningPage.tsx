import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { inject } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { ContentLayout } from 'shared';
import NewLearningListContainer from '../logic/NewLearningListContainer';
import { SkProfileService } from '../../../profile/stores';
import { RQDLectureService, POPLectureService,NEWLectureService, LRSLectureService } from '../../../lecture/stores';


export enum ContentType {
  New = 'New',
  Popular = 'Popular',
  Recommend = 'Recommend',
  Required = 'Required',
}

export enum ContentTypeText {
  New = '신규학습 과정',
  Popular = '인기학습 과정',
  Required = '권장학습 과정',
  Recommend = '추천학습 과정',
}

enum ContentTypeDesc {
  New = '최근 1개월 내 등록된 전체 학습 과정입니다.',
  Popular = '사용자들의 많이 수강하는 상위 RANK의 전체 학습과정입니다.',
  Recommend = 'LRS에서 제공하는 추천 학습 과정입니다.',
  Required = '',
}

interface Props extends RouteComponentProps<{ type: string; pageNo: string }> {
  skProfileService?: SkProfileService;
  rqdLectureService?: RQDLectureService;
  newLectureService?: NEWLectureService;
  popLectureService?: POPLectureService;
  lrsLectureService?: LRSLectureService;
}

const NewLearningPage: React.FC<Props> = Props => {
  const { skProfileService, rqdLectureService, newLectureService, popLectureService, lrsLectureService } = Props;

  const { params } = Props.match;
  const contentType = params.type as ContentType;
  const { profileMemberName } = skProfileService!;

  const getContentTypeTitle = () => {
    switch (contentType) {
      case ContentType.New:
        return newLectureService?.Title;
      case ContentType.Popular:
        return popLectureService?.Title;
      case ContentType.Recommend:
        return `mySUNI가 ${profileMemberName}님을 위해 추천하는 과정입니다.`;
      case ContentType.Required:
        return rqdLectureService?.Title;
      default:
        return '알 수 없는 학습과정입니다.';
    }
  };

  const getContentTypeDesc = () => {
    return ContentTypeDesc[contentType];
  };

  // 페이지 타이틀
  const contentTypeTitle = getContentTypeTitle();
  const contentTypeDesc = getContentTypeDesc();
  // Breadcrumb
  const contentTypeText = ContentTypeText[contentType];

  return (
    <ContentLayout breadcrumb={[{ text: `${contentTypeText}` }]}>
      <div className="ma-title">
        <div className="inner">
          <h2>{contentTypeTitle}</h2>
          {/*<p>{contentTypeDesc}</p>*/}
        </div>
      </div>

      <NewLearningListContainer contentType={contentType} />
    </ContentLayout>
  );
};

export default inject(mobxHelper.injectFrom(
  'profile.skProfileService',
  'rqdLecture.rqdLectureService',
  'newLecture.newLectureService',
  'popLecture.popLectureService',
  'lrsLecture.lrsLectureService',
))(withRouter(NewLearningPage));
