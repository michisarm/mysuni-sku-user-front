import { useEffect } from 'react';
import { AplService } from 'myTraining/stores';
import { useParams } from 'react-router-dom';
import { MyTrainingRouteParams } from 'myTraining/routeParams';
import { setIsLoading } from 'shared/store/IsLoadingStore';
import { setResultEmpty } from 'myTraining/myTraining.stores';
import { useScrollMove } from 'myTraining/useScrollMove';

const PAGE_SIZE = 20;

export function useRequestAplList() {
  const params = useParams<MyTrainingRouteParams>();
  const { scrollOnceMove } = useScrollMove();

  useEffect(() => {
    if (params.pageNo === '1') {
      requestAplList();
      return;
    }
    const currentPageNo = parseInt(params.pageNo);
    const limit = currentPageNo * PAGE_SIZE;
    requestAplListWithPage(0, limit);
    scrollOnceMove();
    return () => {
      AplService.instance.clearAplQueryProps();
      AplService.instance.clearApls();
    };
  }, []);
}

export async function requestAplList() {
  setIsLoading(true);
  const offsetApl = await AplService.instance.findAllAplsByQuery();
  const isEmpty = offsetApl.results.length === 0 ? true : false;
  setResultEmpty(isEmpty);
  setIsLoading(false);
}

export async function requestAplListWithPage(offset: number, limit: number) {
  setIsLoading(true);
  await AplService.instance.findAllAplsWithPage({ offset, limit });
  setIsLoading(false);
}
