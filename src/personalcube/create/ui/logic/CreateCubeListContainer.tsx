import React, { useEffect, useCallback } from 'react';
import { mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { NoSuchContentPanel } from 'shared';
import { SeeMoreButton } from 'lecture/shared';
import routePaths from '../../../routePaths';
import SelectType from '../../model/SelectOptions';
import CreateListPanelTopLineView from '../view/CreateListPanelTopLineView';
import CreateListView from '../view/CreateListView';
import ReactGA from 'react-ga';
import { useScrollMove } from 'myTraining/useScrollMove';
import { UserCubeRdo } from '../../../personalcube/model/UserCubeRdo';
import { CreateListPageParams } from '../../model/CreateListPageParams';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { getCurrentHistory } from '../../../../shared/store/HistoryStore';

const PAGE_SIZE = 8;


interface CreateCubeistContainerProps {
  createCubeService?: CreateCubeService;
}

function CreateCubeListContainer({
  createCubeService,
}: CreateCubeistContainerProps) {

  const history = useHistory();
  const params = useParams<CreateListPageParams>();
  const { scrollOnceMove } = useScrollMove();

  useEffect(() => {
    const currentPageNo = parseInt(params.pageNo);
    const offset = (currentPageNo - 1) * PAGE_SIZE;

    if(params.pageNo === '1') {
      CreateCubeService.instance.clearCreateCubes();
    }

    const userCubeRdo: UserCubeRdo = {
      offset,
      limit: PAGE_SIZE,
      state: selectedCubeState,
    };

    requestCreateCubes(userCubeRdo);
  }, [params.pageNo]);

  const requestCreateCubes = useCallback(
    async (userCubeRdo: UserCubeRdo) => {
      await CreateCubeService.instance.findCreateCubes(userCubeRdo);
      scrollOnceMove();
    },
    [scrollOnceMove],
  );

  const onClickSeeMore = () => {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Create');
    }, 1000);

    const currentPageNo = parseInt(params.pageNo);
    history.replace(routePaths.currentPage(currentPageNo + 1));
  };

  const onChangeSearchSelect = (e: any, data: any) => {
    e.preventDefault();
  
    const cubeState = data.value;
    CreateCubeService.instance.setSelectedCubeState(cubeState);

    const userCubeRdo: UserCubeRdo = {
      offset: 0,
      limit: PAGE_SIZE,
      state: cubeState,
    }

    CreateCubeService.instance!.clearCreateCubes();
    CreateCubeService.instance!.findCreateCubes(userCubeRdo);

    const history =getCurrentHistory();

    history?.replace(routePaths.currentPage(1));
  }

  if(createCubeService === undefined) {
    return null;
  }


  const { createCubes, createCubeCount, selectedCubeState } = createCubeService;

  


  const createListViewVisible =createCubes &&
  createCubes.length > 0;


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
        !(createListViewVisible)&& (
          <NoSuchContentPanel
            message="아직 생성한 학습이 없습니다."
            link={{ text: 'Create 바로가기', path: routePaths.createNew() }}
          />
        )
      }
      {createCubeCount > createCubes.length && (
        <SeeMoreButton onClick={onClickSeeMore} />
      )}
    </>
  );
}

const CreateCubeListContainerDefault = inject(mobxHelper.injectFrom(
  'personalCube.createCubeService',
))(observer(CreateCubeListContainer));


export default CreateCubeListContainerDefault;

