import { useEffect } from "react";
import { findContentsProviders } from "../../personalcube/present/apiclient/cubeApi";
import { setContentsProviders, getContentsProviders } from "../../store/ContentsProviderStore";

export function useRequestContentsProviders() {

  useEffect(() => {
    requestContentsProviders();
  }, []);

  const requestContentsProviders = async () => {
    const contentsProviders = await findContentsProviders();
    setContentsProviders(contentsProviders);
  };
}

export function getContentsProviderName(contentsProviderId: string) {
  const contentsProviders = getContentsProviders();

  if (contentsProviders === undefined) {
    return '';
  }

  const foundContentsProvider = contentsProviders.find(contentsProvider => contentsProvider.contentsProvider.id === contentsProviderId);
  return foundContentsProvider?.contentsProvider.name || '';
}