import { find } from 'lodash';
import React, { useMemo } from 'react';
import { Accordion } from 'semantic-ui-react';
import { onClickDepartment } from '../playlistRecommendPopUp.events';
import {
  ChartItem,
  Panel,
  useOrganizationChartTree,
} from '../playlistRecommendPopUp.store';

function getPanel(chartList: ChartItem[], code: string = '') {
  if (chartList !== undefined) {
    const panels: Panel[] = chartList
      .filter((chart) => chart.parentCode === code)
      .map((chart) => {
        const iconName = (chart.hasChildren && 'folder-exist') || 'folder-none';
        return {
          title: {
            content: <div className="department-name">{chart.name}</div>,
            icon: iconName,
            departmentId: chart.id,
            departmentCode: chart.code,
            departmentName: chart.name,
          },
          content: {
            content: (
              <div className="indent">
                <Accordion.Accordion
                  className="tree-chart"
                  panels={getPanel(chartList, chart.code)}
                  onTitleClick={onClickDepartment}
                  defaultActiveIndex={chart.defaultIndex}
                />
              </div>
            ),
          },
        };
      });

    return panels as Panel[];
  }

  return [] as Panel[];
}

interface OrganizationChartTree {
  isDisabled: boolean;
}

export function OrganizationChartTree({ isDisabled }: OrganizationChartTree) {
  const organizationChart = useOrganizationChartTree();
  const panels = useMemo(
    () => getPanel(organizationChart),
    [organizationChart]
  );

  const defaultIndex = useMemo(() => {
    const root = find(organizationChart, { parentCode: '' });

    if (root !== undefined) {
      return root.defaultIndex;
    }

    return 0;
  }, [organizationChart]);

  const activeIndex = useMemo(() => (isDisabled ? undefined : 0), [isDisabled]);

  return (
    <div className="sh-left-org-wrap">
      <div className={`sh-left-org ${isDisabled ? 'is-disabled' : ''}`}>
        <Accordion
          activeIndex={activeIndex}
          defaultActiveIndex={defaultIndex}
          panels={panels}
          className="tree-chart"
          onTitleClick={onClickDepartment}
        />
      </div>
    </div>
  );
}
