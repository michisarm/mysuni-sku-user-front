import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AplDetailRouteParams } from 'myTraining/routeParams';
import depot from '@nara.drama/depot';
import { AplService } from 'myTraining/stores';
import {
  getAplDetailFileMap,
  getAplDetailForm,
  setAplDetailFileMap,
  setAplDetailForm,
} from './aplDetail.stores';

export function useRequestAplDetail() {
  const params = useParams<AplDetailRouteParams>();
  const aplService = AplService.instance;
  const { apl } = aplService;

  useEffect(() => {
    aplService.findApl(params.aplId);
    document.body.classList.add('white');

    return () => {
      aplService.clearApl();
      document.body.classList.remove('white');
    };
  }, [params.aplId]);

  useEffect(() => {
    if (!apl) {
      return;
    }

    if (apl.fileIds) {
      findFiles('reference', apl.fileIds);
    }
    const aplDetailForm = getAplDetailForm();
    if (aplDetailForm !== undefined) {
      setAplDetailForm({
        ...aplDetailForm,
        allowHour: String(apl.requestHour),
        allowMinute: String(apl.requestMinute),
      });
    }
  }, [apl]);
}

const findFiles = async (type: string, fileBoxId: string) => {
  const files = await depot.getDepotFiles(fileBoxId);
  const fileMap = getAplDetailFileMap();
  if (fileMap === undefined) {
    return;
  }
  const newMap = new Map(fileMap.set(type, files));
  setAplDetailFileMap(newMap);
};
