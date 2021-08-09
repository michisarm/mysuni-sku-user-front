import React, { useState, useCallback } from 'react';
import { Grid, Select, Icon, DropdownProps } from 'semantic-ui-react';
import classNames from 'classnames';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { useContentsProviders } from '../../../store/ContentsProviderStore';
import { getSelectOptions } from '../../../personalcube/model/ContentsProvider';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';


interface ContentsProviderSelectViewProps {
  createCubeService?: CreateCubeService;
}

function ContentsProviderSelecteView({
  createCubeService,
}: ContentsProviderSelectViewProps) {
  const [focus, setFocus] = useState<boolean>(false);
  const [write, setWrite] = useState<string>('');

  const contentsProviders = useContentsProviders();
  const { cubeSdo } = createCubeService!;

  const onChangeOrganizerId = useCallback((e: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    e.preventDefault();

    const nextOrganizerId = String(data.value);
    CreateCubeService.instance.changeCubeSdoProps('organizerId', nextOrganizerId);
  }, []);

  const onChangeOtherOrganizerName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setWrite(e.target.value);
    CreateCubeService.instance.changeCubeSdoProps('otherOrganizerName', e.target.value);
  }, []);

  const onClearCOtherOrganizerName = useCallback(() => {
    setWrite('');
    CreateCubeService.instance.changeCubeSdoProps('otherOrganizerName', '');
  }, []);

  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);  

  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  return (
    <>
      <label className="necessary">교육기관 / 출처</label>
      <Grid className="create">
        <Grid.Column>
          {/* 김민준 - 목록 */}
          <Select
            placeholder="선택해주세요"
            className="w100"
            options = {getSelectOptions(contentsProviders || [])}
            onChange={onChangeOrganizerId}
            value={cubeSdo.organizerId}
          />
        </Grid.Column>
        {
          cubeSdo.organizerId === 'PVD00018' && (
            <Grid.Column>
              <div className={classNames('ui right-top-count input', { focus, write })}>
                <input type="text"
                  placeholder="선택사항이 없는 경우, 교육기관/출처 를 입력해주세요."
                  value={cubeSdo.otherOrganizerName || ''}
                  onClick={onFocus}
                  onBlur={onBlur}
                  onChange={onChangeOtherOrganizerName}
                />
                <Icon className="clear link"
                  onClick={onClearCOtherOrganizerName}
                />
              </div>
            </Grid.Column>
          )
        }
      </Grid>
    </>
  );
}

const ContentsProviderSelecteViewDefault = inject(mobxHelper.injectFrom(
  'personalCube.createCubeService',
))(observer(ContentsProviderSelecteView));

export default ContentsProviderSelecteViewDefault;