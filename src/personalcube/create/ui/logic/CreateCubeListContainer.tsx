import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { NoSuchContentPanel } from 'shared';
import { SeeMoreButton } from 'lecture/shared';
import routePaths from '../../../routePaths';
import SelectType from '../../model/SelectOptions';
import CreateListPanelTopLineView from '../view/CreateListPanelTopLineView';
import CreateListView from '../view/CreateListView';
import ReactGA from 'react-ga';
import { CreateCubeListParams } from '../../model/CreateCubeListParams';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { useRequestCreateCubeList } from '../../service/useRequestCreateCubeList';

function CreateCubeListContainer() {
  const history = useHistory();
  const params = useParams<CreateCubeListParams>();
  const currentPageNo = parseInt(params.pageNo);
  const { createCubes, createCubeCount, selectedCubeState } = CreateCubeService.instance;

  useRequestCreateCubeList(selectedCubeState, currentPageNo);

  const onClickSeeMore = useCallback(() => {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Create');
    }, 1000);

    history.replace(routePaths.currentPage(currentPageNo + 1));
  }, [currentPageNo]);

  const onChangeSearchSelect = useCallback((e: any, data: any) => {
    e.preventDefault();
  
    const nextCubeState = data.value;
    CreateCubeService.instance.setSelectedCubeState(nextCubeState);
    history.replace(routePaths.currentPage(1));
  }, []);

  const createListViewVisible =createCubes && createCubes.length > 0;
  const seeMoreButtonVisible = createCubeCount > createCubes.length;

  return (
    <>
      <CreateListPanelTopLineView
        totalCount={createCubeCount}
        searchSelectOptions={SelectType.userStatus}
        onChange={onChangeSearchSelect}
        searchState={selectedCubeState}
      />
      {
        createListViewVisible && (
          <CreateListView
            createCubes={createCubes}
            totalCount={createCubeCount}
          />
        )
      }
      {
        !createListViewVisible && (
          <NoSuchContentPanel
            message="아직 생성한 학습이 없습니다."
            link={{ text: 'Create 바로가기', path: routePaths.createNew() }}
          />
        )
      }
      {
        seeMoreButtonVisible && (
          <SeeMoreButton onClick={onClickSeeMore} />
        )
      }
    </>
  );
}


const CreateCubeListContainerDefault = observer(CreateCubeListContainer);

export default CreateCubeListContainerDefault;

