import { SkProfileService } from 'profile/stores';
import { getAxios } from 'shared/api/Axios';
import { AxiosReturn } from 'shared/api/AxiosReturn';

interface Resource {
  id: string;
  content: string;
}

let i18nResoruces: Resource[] = [];

function fillI18nResoruces(i18nResourcesKey: string) {
  const i18nResorucesString = localStorage.getItem(i18nResourcesKey);
  if (i18nResorucesString !== null) {
    const nextI18nResources: Resource[] = JSON.parse(i18nResorucesString);
    if (Array.isArray(nextI18nResources)) {
      i18nResoruces = nextI18nResources;
    }
  }
}

export function findI18nResource(id: string) {
  return i18nResoruces.find((c) => c.id === id)?.content || '';
}

const base_url = '/api/arrange/i18nResources';

function requestI18nResourceTime() {
  const axios = getAxios();
  const url = `${base_url}/lastModifiedTime`;
  return axios
    .get<number>(url)
    .then(AxiosReturn)
    .catch(() => undefined);
}

function requestI18nResources(language: string) {
  const axios = getAxios();
  const url = `${base_url}/language?language=${language}`;
  return axios
    .get<Resource[]>(url)
    .then(AxiosReturn)
    .catch(() => undefined);
}

export async function initializeI18nResource() {
  await SkProfileService.instance.findSkProfile();
  const i18nResourcesKey = `i18nResources_${SkProfileService.instance.skProfile.language}`;
  fillI18nResoruces(i18nResourcesKey);
  let i18nResourceTime = parseInt(
    localStorage.getItem('i18nResourceTime') || ''
  );
  if (isNaN(i18nResourceTime)) {
    i18nResourceTime = 0;
  }
  let needRequestI18nResources = false;
  const nextI18nResourceTime = await requestI18nResourceTime();
  if (i18nResoruces.length === 0) {
    needRequestI18nResources = true;
  } else if (
    nextI18nResourceTime !== undefined &&
    i18nResourceTime < nextI18nResourceTime
  ) {
    needRequestI18nResources = true;
  }

  if (!needRequestI18nResources) {
    return;
  }

  const nextI18nResoruces = await requestI18nResources(
    SkProfileService.instance.skProfile.language
  );

  if (nextI18nResoruces !== undefined) {
    localStorage.removeItem('i18nResources_Korean');
    localStorage.removeItem('i18nResources_English');
    localStorage.removeItem('i18nResources_Chinese');

    localStorage.setItem(i18nResourcesKey, JSON.stringify(nextI18nResoruces));
    localStorage.setItem(
      'i18nResourceTime',
      (nextI18nResourceTime || 0).toString()
    );
    fillI18nResoruces(i18nResourcesKey);
  }
}
