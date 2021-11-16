import { useEffect } from 'react';
import _, { find } from 'lodash';
import { CollegeLectureCountService } from 'lecture/stores';
import { CollegeService } from 'college/stores';
import { findAvailableColleges } from 'college/api/collegeApi';
import { SkProfileService } from 'profile/stores';
import { findChannelAndCardCount } from 'lecture/detail/api/cardApi';
import { ChannelAndCardCountRom } from '../../../lecture/detail/model/ChannelAndCardCountRom';
import { CollegeLectureCountRdo } from '../../../lecture/model';
import { getChannelName } from './useRequestCollege';

export function useRequestCategory() {
  useEffect(() => {
    requestCategory();
  }, []);
}

export async function requestCategory() {
  const { setCategoryColleges } = CollegeLectureCountService.instance;
  const collegeService = CollegeService.instance;
  await collegeService.findCollegeBanners();
  const availableColleges = await findAvailableColleges();
  if (availableColleges === undefined) {
    return;
  }
  const { skProfile } = SkProfileService.instance;
  const channelAndCardCounts = await findChannelAndCardCount(
    skProfile.language || 'Korean'
  );

  if (channelAndCardCounts === undefined) {
    setCategoryColleges(
      availableColleges.map((college) => {
        return CollegeLectureCountRdo.asCollegeLectureCountRdo(college);
      })
    );
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
      const nextChannels = college.channelIds
        .filter((id) => _.includes(targetChannelIds, id))
        .map((id) => ({
          id,
          count: targetChannelCountMap.get(id) || 0,
          name: getChannelName(id),
        }));

      return {
        ...college,
        channels: nextChannels,
      };
    });
  if (nextCategoryColleges !== undefined) {
    setCategoryColleges(
      nextCategoryColleges.map((college) => {
        return CollegeLectureCountRdo.asCollegeLectureCountRdo(college);
      })
    );
  }
}
