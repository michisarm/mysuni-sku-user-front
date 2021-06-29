import { useState } from 'react';
import { Abtest, ExperimentalGroups } from 'abtest/model/Abtest';

const selectExperimentalGroup =
  (currentExperimentalGroup: string, isNonExperimentalGroup: boolean) =>
  (
    experimentalGroups: ExperimentalGroups | any,
    nonExperimentalGroup: string
  ) => {
    if (isNonExperimentalGroup) {
      return experimentalGroups[nonExperimentalGroup]
        ? experimentalGroups[nonExperimentalGroup]
        : null;
    } else {
      return experimentalGroups[currentExperimentalGroup]
        ? experimentalGroups[currentExperimentalGroup]
        : null;
    }
  };

const useAbtest = (abtest: Abtest) => {
  const [activeExperimentalGroup] = useState(abtest.experimentalGroupName);
  return {
    selectExperimentalGroup: selectExperimentalGroup(
      activeExperimentalGroup,
      abtest.isNonExperimentalGroup
    ),
  };
};

export default useAbtest;
