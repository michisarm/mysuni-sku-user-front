import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { ContentLayout } from 'shared';
import MyTrainingHeaderContainer from '../logic/MyTrainingHeaderContainer';
import { useRequestAllMyTrainingCount } from '../../service/useRequestAllMyTrainingCount';
import { learningContentTypeName } from '../model/MyLearningContentType';
import { CollegeService } from '../../../college/stores';
import { useRequestMenuAuth } from '../../service/useRequestMenuAuth';
import { getPolyglotText } from '../../../shared/ui/logic/PolyglotText';
import MyTrainingTabContainer from 'myTraining/myTrainingTab/MyTrainingTabContainer';
import { useClearFilterBox } from 'myTraining/myTraining.services';
import {
  MyTrainingRouteParams,
  setMyTrainingRouteParams,
} from 'myTraining/routeParams';

function MyTrainingPage() {
  const params = useParams<MyTrainingRouteParams>();
  useRequestMenuAuth();
  useRequestAllMyTrainingCount();
  useClearFilterBox();
  useEffect(() => {
    setMyTrainingRouteParams(params);
    CollegeService.instance.findAllColleges();
  }, []);

  return (
    <ContentLayout
      className="mylearning"
      breadcrumb={[
        { text: getPolyglotText('Learning', 'learning-brc-dth2') },
        { text: learningContentTypeName(params.tab) },
      ]}
    >
      <MyTrainingHeaderContainer />
      <MyTrainingTabContainer />
    </ContentLayout>
  );
}

export default observer(MyTrainingPage);
