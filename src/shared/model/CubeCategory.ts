import { Category } from "./Category";
import { getChannelName } from "../service/useCollege/useRequestCollege";

export interface CubeCategory extends Category {
  mainCategory: boolean;
}

export const initialCubeCategory = {
  collegeId: '',
  channelId: '',
  mainCategory: false,
}

export const combineCollege = (categories: CubeCategory[]) => {
  const combineCollegeWithChannel: { [key: string]: string[] } = {};
  const collegeIdList: string[] = [];
  
  categories.map(item => {
    if (combineCollegeWithChannel[item.collegeId]) {
      combineCollegeWithChannel[item.collegeId].push(item.channelId);
    }
    if (!combineCollegeWithChannel[item.collegeId]) {
      collegeIdList.push(item.collegeId);
      combineCollegeWithChannel[item.collegeId] = [item.channelId];
    }
  });
  return { combineCollegeWithChannel, collegeIdList };
};

export const renderChannelNames = (
  collegeId: string,
  collegeWithChannel: { [key: string]: string[] },
  seperator?: string,
) => {
  const channelNameList: string[] = [];
  collegeWithChannel[collegeId].map(item =>
    channelNameList.push(getChannelName(item) || '')
  );
  return channelNameList.join(seperator || ', ');
};