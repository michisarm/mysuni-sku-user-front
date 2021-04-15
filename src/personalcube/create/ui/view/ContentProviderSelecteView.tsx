import React, { useState } from 'react';
import { Grid, Select, Icon } from 'semantic-ui-react';
import classNames from 'classnames';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { getContentsProviderStore } from '../../../store/ContentsProviderStore';


function ContentProviderSelecteView() {
  const [focus, setFocus] = useState<boolean>(false);
  const [write, setWrite] = useState<string>('');

  const cubeSdo = CreateCubeService.instance.cubeSdo;

  const getSelectOptions = () => {
    const contentProviders = getContentsProviderStore();

    console.log('contentProviders :: ', contentProviders);

    if(contentProviders === undefined) {
      return;
    }

    const selectOptions: any = [];
    
    selectOptions.push({
      key: '',
      text: '선택해주세요',
      value: '',
    });
    contentProviders.map((contentsProvider) => {
      selectOptions.push(
        {
          key: contentsProvider.contentsProvider.id,
          text: contentsProvider.contentsProvider.name,
          value: contentsProvider.contentsProvider.id,
        });
    });
    return selectOptions;
  };

  const onChangeOrganizerId = (e: any, data: any) => {
    CreateCubeService.instance.changeCubeSdoProps('organizerId', data.value);
  };

  return (
    <>
      <label className="necessary">교육기관 / 출처</label>
      <Grid className="create">
        <Grid.Column>
          <Select
            placeholder="선택해주세요"
            className="w100"
            options = {getSelectOptions()}
            onChange={onChangeOrganizerId}
            value={cubeSdo.organizerId}
          />
        </Grid.Column>
        { cubeSdo.organizerId && cubeSdo.organizerId === '기타' ?
          <Grid.Column>
            <div className={classNames('ui right-top-count input', { focus, write })}>
              <input type="text"
                placeholder="선택사항이 없는 경우, 교육기관/출처 를 입력해주세요."
                value={cubeSdo.otherOrganizerName || ''}
                onClick={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={(e: any) => {
                  setWrite(e.target.value);
                  CreateCubeService.instance.changeCubeSdoProps('otherOrganizerName', e.target.value);
                }}
              />
              <Icon className="clear link"
                onClick={() => {
                  setWrite('');
                  CreateCubeService.instance.changeCubeSdoProps('otherOrganizerName', '');
                }}
              />
            </div>
          </Grid.Column>
          : null
        }
      </Grid>
    </>
  );
}

export default ContentProviderSelecteView;