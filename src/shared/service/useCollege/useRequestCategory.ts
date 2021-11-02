import { useEffect } from 'react';
import _ from 'lodash';
import { CollegeLectureCountService } from 'lecture/stores';
import { CollegeService } from 'college/stores';
import { findAvailableColleges } from 'college/api/collegeApi';
import { SkProfileService } from 'profile/stores';
import { findChannelAndCardCount } from 'lecture/detail/api/cardApi';
import { ChannelAndCardCountRom } from '../../../lecture/detail/model/ChannelAndCardCountRom';
import { CollegeLectureCountRdo } from '../../../lecture/model';

export function useRequestCategory() {
  useEffect(() => {
    requestCategory();
  }, []);
}

export async function requestCategory() {
  const { setCategoryColleges } = CollegeLectureCountService.instance;
  CollegeService.instance.findCollegeBanners();
  const availableColleges = await findAvailableColleges();
  if (availableColleges === undefined) {
    return;
  }
  const { skProfile } = SkProfileService.instance;
  const channelAndCardCounts = await findChannelAndCardCount(
    skProfile.language || 'Korean'
  );
  if (channelAndCardCounts === undefined) {
    setCategoryColleges(availableColleges);
    return;
  }

  const targetCollegeIds = channelAndCardCounts.map((c) => c.collegeId);
  const targetChannelIds = channelAndCardCounts
    .flatMap((c) => c.channelCounts)
    .map((c) => c.id);

  const targetChannelCountMap: Map<string, number> = new Map<string, number>();

  channelAndCardCounts.forEach((c: ChannelAndCardCountRom) => {
    c.channelCounts.forEach((channelCount) => {
      targetChannelCountMap.set(channelCount.id, channelCount.count);
    });
  });

  const nextCategoryColleges = availableColleges
    .map((college) => new CollegeLectureCountRdo(college))
    .filter((college) => _.includes(targetCollegeIds, college.id))
    .map((college) => {
      const nextChannels = college.channels.filter((channel) =>
        _.includes(targetChannelIds, channel.id)
      );

      nextChannels.forEach((nextChannel) => {
        nextChannel.count = targetChannelCountMap.get(nextChannel.id) || 0;
      });

      return {
        ...college,
        channels: nextChannels,
      };
    });
  if (nextCategoryColleges !== undefined) {
    setCategoryColleges(nextCategoryColleges);
  }
}
