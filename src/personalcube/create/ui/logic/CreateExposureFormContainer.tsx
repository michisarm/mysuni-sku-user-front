import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import {
  Checkbox,
  Form,
} from 'semantic-ui-react';
import CreateInput from '../shared/CreateInput';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { getCineroomStore, useCineroomStore } from '../../../../shared/store/CineroomStore';


interface CreateExposureFormContainerProps {
  createCubeService?: CreateCubeService;
}


function CreateExposureFormContainer({
  createCubeService,
}: CreateExposureFormContainerProps) {
  const [cineroomAllChecked, setCineroomAllChecked] = useState<boolean>(false);  
  const { cubeSdo, companyCineroomId } = createCubeService!;

  const cineroomList = useCineroomStore();

  useEffect(() => {
    if(companyCineroomId) {
      setCineroomAllChecked(false);
    }
  }, []);

  const onCheckAllCineroom = (e: any, data: any) => {
    e.preventDefault();
    
    if(data.checked) {
      const cineroomList = getCineroomStore();

      if(cineroomList) {
        const cineroomIds = cineroomList.map(cineroom => cineroom.id);
        createCubeService!.changeCubeSdoProps('sharingCineroomIds', cineroomIds);
      }
    } else {
      createCubeService!.changeCubeSdoProps('sharingCineroomIds', []);
    }

    setCineroomAllChecked(data.checked);
  };

  const onCheckCineroom = (e: any, data: any) => {
    e.preventDefault();
    
    const { sharingCineroomIds } = cubeSdo;

    if(data.checked) {
      createCubeService!.changeCubeSdoProps('sharingCineroomIds', [...sharingCineroomIds, data.value]);
    } else {
      const nextCineroomIds = sharingCineroomIds.filter(cineroomid => cineroomid !== data.value);
      createCubeService!.changeCubeSdoProps('sharingCineroomIds', nextCineroomIds);
    }
  };

  const onChangeTags = (e: any, data: any) => {
    e.preventDefault();
    createCubeService!.changeCubeSdoProps('tags', data.value);
  };

  const hasTargetCineroomId = companyCineroomId ? true : false;

  return (
    <>
      <hr className="dividing" />
      <div className="section-tit">
        <span className="text1">노출 정보</span>
      </div>
      <Form.Field>
        <label className="necessary">관계사 공개 범위 설정</label>
        <div className="round-wrap">
          {!hasTargetCineroomId && (
            <div className="filter">
              <Checkbox
                className="black"
                label="전체"
                checked={cineroomAllChecked}
                onChange={onCheckAllCineroom}
              />
            </div>
          )}
          <div className="h112">
            <ul>
              {
                cineroomList &&
                cineroomList.length > 0 &&
                cineroomList.map((cineroom, index) => (
                <li key={index}>
                  <Checkbox
                    key={index}
                    className="base"
                    label={cineroom.name}
                    value={cineroom.id}
                    disabled={hasTargetCineroomId}
                    checked={cubeSdo.sharingCineroomIds.some(cineroomId => cineroomId === cineroom.id)}
                    onChange={onCheckCineroom}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Form.Field>
      <Form.Field>
        <CreateInput
          label="Tag 정보"
          placeholder="Tag와 Tag는 쉼표(“,”)로 구분합니다."
          asList
          value={cubeSdo.tags}
          onChange={onChangeTags}
        />
      </Form.Field>
    </>
  );
}


export default inject(mobxHelper.injectFrom(
  'personalCube.createCubeService',
))(observer(CreateExposureFormContainer));