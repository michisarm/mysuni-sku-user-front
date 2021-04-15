import { useEffect } from "react";
import { findContentProviders } from "../../personalcube/present/apiclient/cubeApi";
import { setContentsProviderStore } from "../../store/ContentsProviderStore";

export function useRequestContentProvider() {

  useEffect(() => {
    requestContentProvider();
  }, []);

  const requestContentProvider = async () => {
    const contentsProviders = await findContentProviders();
    setContentsProviderStore(contentsProviders);
  };
}