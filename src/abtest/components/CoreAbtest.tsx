import React, { useRef, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useAbtest from 'abtest/hooks/useAbtest';
import {
  Abtest as AbtestModel,
  ExperimentalGroups,
  AbtestParams,
  DATA_TYPES,
} from 'abtest/model/Abtest';
import { useStateRef, closest } from 'tracker-react/utils';
import { registerAbtestResult, modifyAbtestResult } from 'abtest/api/AbtestApi';

interface Props {
  name: string;
  nonExperimentalGroup: string;
  children: React.ReactNode;
  abtest: AbtestModel;
}

const filterExperimentalGroups = (
  name: string,
  children: React.ReactNode,
  abtest: AbtestModel
) => {
  const experimentalGroups = {} as ExperimentalGroups;
  let added = false;
  React.Children.forEach(children, (element) => {
    if (!React.isValidElement(element)) {
      throw new Error('Abtest children must be ExperimentalGroup components.');
    }
    experimentalGroups[element.props.name] = element;
    if (
      !abtest.isNonExperimentalGroup &&
      element.props.name === abtest.experimentalGroupName
    ) {
      added = true;
    }
  });
  return { experimentalGroups, added };
};

const CoreAbtest: React.FC<Props> = ({
  name,
  nonExperimentalGroup,
  children,
  abtest,
}: Props) => {
  const { experimentalGroups, added } = useMemo(() => {
    return filterExperimentalGroups(name, children, abtest);
  }, [name]);

  const { selectExperimentalGroup } = useAbtest(abtest);
  const { valueRef } = useStateRef<AbtestParams>({});
  const history = useHistory();
  // const [abtestResultId, setAbtestResultId] = useState('');
  const abtestResultRef = useRef('');

  useEffect(() => {
    if (!abtest.isNonExperimentalGroup && added) {
      registerAbtestResult({
        abtestId: abtest.abtestId,
        abtestName: abtest.abtestName,
        experimentalId: abtest.experimentalGroupId,
        experimentalName: abtest.experimentalGroupName,
        abtestTargetId: abtest.abtestTargetId,
        url: window.location.pathname,
      }).then((result) => {
        if (result && result.abtestResultId) {
          abtestResultRef.current = result.abtestResultId;
        }
      });

      // click event
      window.document.addEventListener('click', handleOutboundClick, {
        capture: true,
      });
      return () =>
        window.document.removeEventListener('click', handleOutboundClick, {
          capture: true,
        });
    }
  }, [added]);

  const handleOutboundClick = (event: MouseEvent) => {
    const { target } = event;
    const data: AbtestParams = {};
    // click 시점의 url
    data.referer = window.location.pathname;
    data.refererSearch = window.location.search;

    // abtest data attribute 있을때만 수집!
    const abtestElement =
      'closest' in document.documentElement
        ? (target as Element).closest(DATA_TYPES.ABTEST)
        : closest(target, DATA_TYPES.ABTEST);

    const areaElement =
      'closest' in document.documentElement
        ? (target as Element).closest(DATA_TYPES.AREA)
        : closest(target, DATA_TYPES.AREA);

    if (abtestElement instanceof HTMLElement) {
      data.target = abtestElement;
      data.abtest = abtestElement.dataset.abtest;
      data.area = areaElement.dataset.area;
    }
    valueRef.current = data;
  };

  useEffect(() => {
    return history.listen((location) => {
      if (!abtest.isNonExperimentalGroup && added && abtestResultRef.current) {
        let type = 'EXIT';
        if (valueRef.current.target instanceof HTMLElement) {
          type = 'PASS';
        }
        modifyAbtestResult(abtestResultRef.current, {
          type,
          action: 'CLICK',
          url: location.pathname,
          area: valueRef.current.area,
        }).then((data) => {
          if (data) {
            abtestResultRef.current = '';
          }
        });
      }
    });
  }, [history]);

  return selectExperimentalGroup(experimentalGroups, nonExperimentalGroup);
};

export default CoreAbtest;
