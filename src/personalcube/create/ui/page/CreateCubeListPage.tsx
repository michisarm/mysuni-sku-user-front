import React from 'react';
import { ContentLayout, Tab, TabItemModel } from '../../../../shared';
import CreateProfileContainer from '../logic/CreateProfileContainer';
import { useParams, useHistory } from 'react-router-dom';
import { CreateListPageParams } from '../../model/CreateListPageParams';
import CreateCubeListContainer from '../logic/CreateCubeListContainer';
import cubePaths from '../../../routePaths';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';


interface CreateCubeListPageProps {
  createCubeService?: CreateCubeService;
}

function CreateCubeListPage({
  createCubeService,
}: CreateCubeListPageProps) {
  const history = useHistory();
  const { tab } = useParams<CreateListPageParams>();

  const { createCubeCount } = createCubeService!;

    const getTabs = () => {
      return [
        {
          name: 'Create',
          item: (
            <>
              Create
              <span className="count">
                {createCubeCount > 0 ? `+${createCubeCount}` : createCubeCount}
              </span>
            </>
          ),
          render: () => (
            <CreateCubeListContainer />
          ),
        }
      ] as TabItemModel[];
    }

  const onChangeTab = (tab: TabItemModel): string => {
    history.push(cubePaths.createTab(tab.name));
    return cubePaths.createTab(tab.name);
  }

  return (
    <>
      <ContentLayout
        className="create"
        breadcrumb={[{ text: 'Create' }, { text: `${tab}` }]}
      >
        <CreateProfileContainer />
        <Tab
          allMounted // true 이면 map 돌려서 tab 세팅
          tabs={getTabs()}
          defaultActiveName={tab}
          onChangeTab={onChangeTab}
        />
      </ContentLayout>
    </>
  );
}

export default inject(mobxHelper.injectFrom(
  'personalCube.createCubeService',
))(observer(CreateCubeListPage));