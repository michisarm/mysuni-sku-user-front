import React, { useCallback, useEffect } from 'react';
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
import { useScrollMove } from '../../../../myTraining/useScrollMove';
import { UserCubeRdo } from '../../../personalcube/model/UserCubeRdo';
import { getPolyglotText } from '../../../../shared/ui/logic/PolyglotText';

const PAGE_SIZE = 8;

function CreateCubeListContainer() {
  const history = useHistory();
  const params = useParams<CreateCubeListParams>();
  const currentPageNo = parseInt(params.pageNo);
  const { scrollOnceMove } = useScrollMove();
  const { createCubes, createCubeCount, selectedCubeState } =
    CreateCubeService.instance;

  useEffect(() => {
    const userCubeRdo: UserCubeRdo = {
      offset: 0,
      limit: currentPageNo * PAGE_SIZE,
      state: selectedCubeState,
    };

    requestCreateCubeList(userCubeRdo);

    return () => {
      CreateCubeService.instance.clearCreateCubes();
    };
  }, [selectedCubeState]);

  const requestCreateCubeList = useCallback(
    async (userCubeRdo: UserCubeRdo) => {
      await CreateCubeService.instance.findCreateCubes(userCubeRdo);
      scrollOnceMove();
    },
    [scrollOnceMove]
  );

  const onClickSeeMore = useCallback(() => {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Create');
    }, 1000);

    const offset = currentPageNo * PAGE_SIZE;

    const userCubeRdo: UserCubeRdo = {
      offset,
      limit: PAGE_SIZE,
      state: selectedCubeState,
    };

    requestCreateCubeList(userCubeRdo);

    history.replace(routePaths.currentPage(currentPageNo + 1));
  }, [currentPageNo, selectedCubeState]);

  const onChangeSearchSelect = useCallback((e: any, data: any) => {
    e.preventDefault();

    const nextCubeState = data.value;
    CreateCubeService.instance.setSelectedCubeState(nextCubeState);

    history.replace(routePaths.currentPage(1));
  }, []);

  const createListViewVisible = createCubes && createCubes.length > 0;
  const seeMoreButtonVisible = createCubeCount > createCubes.length;

  return (
    <>
      <CreateListPanelTopLineView
        totalCount={createCubeCount}
        searchSelectOptions={SelectType.userStatus}
        onChange={onChangeSearchSelect}
        searchState={selectedCubeState}
      />
      {createListViewVisible && (
        <CreateListView
          createCubes={createCubes}
          totalCount={createCubeCount}
        />
      )}
      {!createListViewVisible && (
        <NoSuchContentPanel
          message={getPolyglotText(
            '?????? ????????? ????????? ????????????.',
            'Create-MainList-????????????'
          )}
          link={{
            text: getPolyglotText(
              'Create ????????????',
              'Create-MainList-????????????'
            ),
            path: routePaths.createNew(),
          }}
        />
      )}
      {seeMoreButtonVisible && <SeeMoreButton onClick={onClickSeeMore} />}
    </>
  );
}

const CreateCubeListContainerDefault = observer(CreateCubeListContainer);

export default CreateCubeListContainerDefault;
