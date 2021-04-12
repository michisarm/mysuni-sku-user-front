import { autorun } from 'mobx';
import { useEffect } from 'react';
import { SkProfileService } from '../../../profile/stores';
import { setCheckableChannelsStore } from '../../store/CheckableChannelsStore';
import { CheckableChannel } from '../../viewmodel/CheckableChannel';

function getValueFromMobx() {
  const next: CheckableChannel[] = SkProfileService.instance.studySummaryFavoriteChannels.map(
    c => {
      return {
        id: c.id,
        name: c.name,
        checked: false,
      };
    }
  );
  setCheckableChannelsStore(next);
}

export function useRequestCheckableChannels() {
  useEffect(() => {
    return autorun(() => {
      getValueFromMobx();
    });
  }, []);

  useEffect(() => {
    SkProfileService.instance.findSkProfile().then(() => {
      getValueFromMobx();
    });
    return setCheckableChannelsStore;
  }, []);
}
