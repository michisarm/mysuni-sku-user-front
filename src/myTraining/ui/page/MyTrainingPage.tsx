import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { ContentLayout } from 'shared';
import MyTrainingHeaderContainer from '../logic/MyTrainingHeaderContainer';
import { useRequestAllMyTrainingCount } from '../../service/useRequestAllMyTrainingCount';
import { MyTrainingRouteParams } from '../../model/MyTrainingRouteParams';
import { useRequestCollege } from '../../../shared/service/useCollege/useRequestCollege';
import { MyLearningContentTypeName } from '../model/MyLearningContentType';
import { CollegeService } from '../../../college/stores';
import { useRequestMenuAuth } from '../../service/useRequestMenuAuth';
import { getPolyglotText } from '../../../shared/ui/logic/PolyglotText';
import MyTrainingTabContainer from 'myTraining/myTrainingTab/MyTrainingTabContainer';
import { useClearFilterBox } from 'myTraining/myTraining.services';

function MyTrainingPage() {
  useRequestCollege();
  useRequestMenuAuth();
  useRequestAllMyTrainingCount();
  useClearFilterBox();
  useEffect(() => {
    CollegeService.instance.findAllColleges();
  }, []);

  const params = useParams<MyTrainingRouteParams>();
  return (
    <ContentLayout
      className="mylearning"
      breadcrumb={[
        { text: getPolyglotText('Learning', 'learning-brc-dth2') },
        { text: MyLearningContentTypeName[params.tab] },
      ]}
    >
      <MyTrainingHeaderContainer />
      <MyTrainingTabContainer />
    </ContentLayout>
  );
}

export default observer(MyTrainingPage);
