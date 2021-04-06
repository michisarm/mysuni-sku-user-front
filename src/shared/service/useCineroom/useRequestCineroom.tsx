import { useEffect } from 'react';
import { axiosApi as axios } from '@nara.platform/accent';
import { CineroomModel } from '../../model/CineroomModel';
import { getCineroomStore, setCineroomStore } from '../../store/CineroomStore';
import { find } from 'lodash';

const baseUrl = '/api/station/cinerooms/identities';

function findCineroomList() {
  return axios
    .get<CineroomModel[]>(baseUrl, { params: { pavilionId: 'ne1-m2' } })
    .then(response => response.data)
    .catch(error => console.log(error));
}

async function requestCineroom() {
  const cineroomList = await findCineroomList();
  if (cineroomList) {
    setCineroomStore(cineroomList);
  }
}

export function useRequestCineroom() {
  useEffect(() => {
    requestCineroom();
  }, []);
}

export function getCineroomName(cineroomId: string) {
  const cineroomList = getCineroomStore();
  const filterCineroomName = find(cineroomList, { id: cineroomId });

  return filterCineroomName?.name;
}
