import { useState, useCallback, useEffect } from 'react';
import { autorun } from 'mobx';
import _ from 'lodash';
import { Moment } from 'moment';
import Group from '../model/Group';
import { GroupQueryModel } from '../model/GroupQueryModel';
import GroupStore from '../store/GroupStore';
import { findAllGroupByQuery } from '../api/GroupApi';
import ElementList from '../../model/ElementList';
import { GroupElementList } from '../model/GroupElementList';


export default interface GroupTemp {
  id?: number;
}

export function useGroupList(): [
  ElementList<Group>,
  (name: string, value: string | number | Moment | undefined) => void,
  () => void,
  GroupQueryModel,
  () => void,
] {
  const groupStore = GroupStore.instance;

  const [valule, setValue] = useState<ElementList<Group>>(
    groupStore.groupList
  );

  const [query, setQuery] = useState<GroupQueryModel>(
    groupStore.selectedGroupQuery
  );

  useEffect(() => {
    searchQuery();
    return autorun(() => {
      setValue({ ...groupStore.groupList });
      setQuery({ ...groupStore.selectedGroupQuery });
    });
  }, [groupStore]);

  const clearGroupQuery = useCallback(() => {
    groupStore.clearGroupQuery();
  }, []);

  const requestFindAllGroupByQuery = useCallback(
    (groupQueryModel: GroupQueryModel) => {
      findAllGroupByQuery(GroupQueryModel.asGroupRdo(groupQueryModel)).then(
        (response) => {
          const next = GroupElementList<Group>(response);
          //sharedService.setState({ pageIndex: (page - 1) * 20 });
          next.limit = groupQueryModel.limit;
          next.offset = groupQueryModel.offset;
          groupStore.setGroupList(next);
        }
      );
    },
    []
  );

  const changeGroupQueryProps = useCallback(
    (name: string, value: string | Moment | number | undefined) => {
      if (value === '전체') value = '';

      groupStore.setGroupQuery(groupStore.selectedGroupQuery, name, value);

      if (name === 'limit') {
        changeGroupQueryProps('pageIndex', 0);
        changeGroupQueryProps('page', 0);
        changeGroupQueryProps('offset', 0);
        searchQuery();
      }
    },
    []
  );

  const searchQuery = useCallback(() => {
    groupStore.clearGroupCdo();
    requestFindAllGroupByQuery(groupStore.selectedGroupQuery);
  }, []);

  return [
    valule,
    changeGroupQueryProps,
    searchQuery,
    query,
    clearGroupQuery,
  ];
}
