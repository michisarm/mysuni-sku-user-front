import React from 'react';
import { observer } from 'mobx-react';
import { ContentLayout, Tab, TabItemModel } from '../../../../shared';
import CreateProfileContainer from '../logic/CreateProfileContainer';
import { useParams, useHistory } from 'react-router-dom';
import { CreateCubeListParams } from '../../model/CreateCubeListParams';
import CreateCubeListContainer from '../logic/CreateCubeListContainer';
import cubePaths from '../../../routePaths';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';


function CreateCubeListPage() {
  const history = useHistory();
  const { tab } = useParams<CreateCubeListParams>();

  const { createCubeCount } = CreateCubeService.instance;

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


const CreateCubeListDefault = observer(CreateCubeListPage);

export default CreateCubeListDefault;