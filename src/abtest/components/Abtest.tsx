import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { Abtest as AbtestModel, initAbtest } from 'abtest/model/Abtest';
import AbtestService from 'abtest/present/logic/AbtestService';
import CoreAbtest from './CoreAbtest';

/**
 * <Abtest> Component
 *   props:
 *     name: DB abtest 테이블의 ID
 *     nonExperimentalGroup: 비실험자에게 보여줄 실험군 ID 입력 ( 실험결과는 저장 안됨, 단순 노출 컴포넌트 )
 *
 * <ExperimentalGroup> Component
 *   props:
 *     name: DB experimental_group 테이블의 ID ( optional : 값이 LOADING 일시 abtest 대상자 조회전에 컴포넌트 노출됨 )
 *
 * (예시)
 * <Abtest name="AB-0" nonExperimentalGroup="A">
 *   <ExperimentalGroup name="A">
 *     <Component_A/>
 *   </ExperimentalGroup>
 *   <ExperimentalGroup name="B">
 *     <Component_B/>
 *   </ExperimentalGroup>
 *   <ExperimentalGroup name="LOADING">
 *     <LOADING/>
 *   </ExperimentalGroup>
 * </Abtest>
 */

interface Props {
  name: string; // Abtest ID
  nonExperimentalGroup: string; // 실험대상자가 아닌 그룹에 보여줄 실험군을 선택
  children: React.ReactNode;
  abtestService?: AbtestService;
}

const defaultElement = (children: React.ReactNode, name: string) => {
  let defaultElement = null;
  React.Children.forEach(children, (element) => {
    if (!React.isValidElement(element)) {
      throw new Error('Abtest children must be ExperimentalGroup components.');
    }
    if (element.props.name === name) {
      defaultElement = element;
    }
  });
  return defaultElement;
};

const container = (
  name: string,
  nonExperimentalGroup: string,
  children: React.ReactNode,
  abtest?: AbtestModel
) => {
  if (abtest?.isNonExperimentalGroup) {
    return defaultElement(children, nonExperimentalGroup);
  } else if (abtest) {
    return (
      <CoreAbtest
        name={name}
        nonExperimentalGroup={nonExperimentalGroup}
        abtest={abtest}
      >
        {children}
      </CoreAbtest>
    );
  } else {
    return defaultElement(children, 'LOADING');
  }
};

const Abtest: React.FC<Props> = ({
  name,
  nonExperimentalGroup,
  children,
  abtestService,
}: Props) => {
  const { abtestUserTargets } = abtestService!;
  const [abtest, setAbtest] = useState<AbtestModel>();

  useEffect(() => {
    startFn(name);
  }, [abtestUserTargets]);

  const startFn = async (name: string) => {
    try {
      if (abtestUserTargets && abtestUserTargets.length > 0) {
        const result = await abtestService!.getAbtestUserTarget(name);
        if (result) {
          setAbtest(result);
        }
      }
    } catch {
      container(name, nonExperimentalGroup, children, initAbtest());
    }
  };
  return abtest
    ? container(name, nonExperimentalGroup, children, abtest)
    : container(name, nonExperimentalGroup, children);
};

export default inject(mobxHelper.injectFrom('abtest.abtestService'))(
  observer(Abtest)
);
