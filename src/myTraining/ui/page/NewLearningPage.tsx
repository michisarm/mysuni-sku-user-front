
import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {inject} from 'mobx-react';
import {mobxHelper} from '@nara.platform/accent';
import {ContentLayout} from 'shared';
import NewLearningListContainer from '../logic/NewLearningListContainer';
import {SkProfileService} from '../../../profile/stores';

export enum ContentType {
  New = 'New',
  Popular = 'Popular',
  Recommend = 'Recommend',
  Required = 'Required'
}

export enum ContentTypeText {
  New = '신규학습 과정',
  Popular = '인기학습 과정',
  Required = '권장학습 과정',
  Recommend = '추천학습 과정',
}

// enum ContentTypeName {
//   New = 'mySUNI ${month}월 ${week}주 신규 학습 과정',
//   Popular = '학습자들의 평가가 좋은 인기 과정입니다.',
//   Recommend = 'mySUNI가 ${profileMemberName}님을 위해 추천하는 과정입니다.',
// }

enum ContentTypeDesc {
  New = '최근 1개월 내 등록된 전체 학습 과정입니다.',
  Popular = '사용자들의 많이 수강하는 상위 RANK의 전체 학습과정입니다.',
  Recommend = 'LRS에서 제공하는 추천 학습 과정입니다.',
  Required = '',
}

interface Props extends RouteComponentProps<{ type: string, pageNo: string }> {
  skProfileService?: SkProfileService,
}

const NewLearningPage : React.FC<Props> = (Props) => {

  const { skProfileService } = Props;

  const { params } = Props.match;
  const contentType = params.type as ContentType;
  const { profileMemberName } = skProfileService!;

  const today = new Date();
  const month = today.getMonth() + 1;
  const week = Math.ceil((today.getDate() + 6 - today.getDay())/7);

  const getContentTypeTitle = () => {
    switch (contentType) {
      case ContentType.New:
        return `mySUNI ${month}월 ${week}주 신규 학습 과정`;
      case ContentType.Popular:
        return '학습자들의 평가가 좋은 인기 과정입니다.';
      case ContentType.Recommend:
        return `mySUNI가 ${profileMemberName}님을 위해 추천하는 과정입니다.`;
      case ContentType.Required:
        return 'SK 구성원이라면 꼭 들어야 하는 필수 권장 학습 과정!';
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
    <ContentLayout
      breadcrumb={[
        { text: `${contentTypeText}`},
      ]}
    >

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
))(withRouter(NewLearningPage));
