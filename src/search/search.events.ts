import { reactAlert } from '@nara.platform/accent';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCollgeName } from 'shared/service/useCollege/useRequestCollege';
import { getCurrentHistory } from 'shared/store/HistoryStore';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { filterCard, findCard, findExpert, findPreCard } from './api/searchApi';
import {
  Options,
  SearchCard,
  SearchCardCategory,
  SearchParam,
} from './search.models';
import {
  getCard,
  getFilterCondition,
  getQueryOptions,
  InitialConditions,
  setCard,
  setCollegeOptions,
  setCubeTypeOptions,
  setDisplayCard,
  setExpert,
  setFilterCondition,
  setOrganizerOptions,
} from './search.services';

export function getQueryId(): string {
  // 기존 로직
  const queryId: string = window.location.search.slice(
    window.location.search.indexOf('=') + 1,
    window.location.search.length
  );
  if (queryId.endsWith('%')) {
    let decodedQueryId = queryId;
    while (decodedQueryId.endsWith('%')) {
      decodedQueryId = decodedQueryId.substring(0, decodedQueryId.length - 1);
    }
    if (decodedQueryId.includes('%%')) {
      while (decodedQueryId.includes('%%')) {
        decodedQueryId = decodedQueryId.replace(/%%/, '%25%');
      }
      return decodeURI(decodedQueryId);
    }
    return decodeURI(decodedQueryId);
  }
  if (queryId.includes('%%')) {
    let decodedQueryId = queryId;
    while (decodedQueryId.includes('%%')) {
      decodedQueryId = decodedQueryId.replace(/%%/, '%25%');
    }
    return decodeURI(decodedQueryId);
  }
  return decodeURI(queryId);
}

// 필터
export function filterClearAll() {
  setFilterCondition(InitialConditions);
}

interface Props {
  isOnFilter?: boolean;
  searchValue: string;
  closeOnFilter?: () => void;
}
export function settingSearchFilter({
  isOnFilter,
  searchValue,
  closeOnFilter,
}: Props) {
  setCard([]);
  setDisplayCard([]);
  const decodedSearchValue = searchValue
    .replace(/'/g, ' ')
    .replace(/&/g, ' ')
    .replace(/%/g, ' ');
  if (decodedSearchValue === '') {
    return;
  }
  if (decodedSearchValue.replace(/ /g, '').length < 2) {
    reactAlert({
      title: getPolyglotText('검색', '통검-필레팝얼-검색2'),
      message: getPolyglotText(
        '두 글자 이상 입력 후 검색하셔야 합니다.',
        '통검-필레팝얼-두글자2'
      ),
    });
    return;
  }
  findPreCard(decodedSearchValue).then((searchResult) => {
    if (searchResult === undefined) {
      setCollegeOptions([]);
      setOrganizerOptions([]);
      setCubeTypeOptions([]);
      return;
    }
    const displayCard: SearchCard[] = [];
    searchResult.result.rows
      .map((c) => c.fields)
      .forEach((c) => {
        const queries = decodedSearchValue
          .split(' ')
          .filter((c) => c.trim() !== '');
        if (c.name !== undefined && c.name !== null) {
          if (
            queries.some(
              (query) =>
                query !== undefined &&
                query !== null &&
                c.name.toLowerCase().includes(query.toLowerCase())
            )
          ) {
            displayCard.push(c);
          }
        }
      });
    searchResult.result.rows
      .map((c) => c.fields)
      .forEach((c) => {
        if (!displayCard.some((d) => d.id === c.id)) {
          displayCard.push(c);
        }
      });
    setCard(displayCard);
    setDisplayCard([...displayCard]);
    const collegeOptions: Options[] = searchResult.result.rows.reduce<
      Options[]
    >((r, c) => {
      try {
        const {
          fields: { categories },
        } = c;
        const category = (JSON.parse(categories) as SearchCardCategory[]).find(
          (d) => d.mainCategory === 1
        );
        if (category !== undefined) {
          const a = r.find((d) => d.key === category.collegeId);
          if (a !== undefined) {
            a.count = (a.count || 0) + 1;
            a.text = `${a.value}(${a.count})`;
          } else {
            r.push({
              key: category.collegeId,
              value: getCollgeName(category.collegeId),
              text: `${getCollgeName(category.collegeId)}(1)`,
              count: 1,
            });
          }
        }
      } catch {
        //
      }

      return r;
    }, []);
    setCollegeOptions(collegeOptions);

    const organizerOptions: Options[] = searchResult.result.rows.reduce<
      Options[]
    >((r, c) => {
      try {
        const {
          fields: { cube_organizer_names },
        } = c;
        (JSON.parse(cube_organizer_names) as string[]).forEach((organizer) => {
          const a = r.find((d) => d.key === organizer);
          if (a !== undefined) {
            a.count = (a.count || 0) + 1;
            a.text = `${a.value}(${a.count})`;
          } else {
            r.push({
              key: organizer,
              value: organizer,
              text: `${organizer}(1)`,
              count: 1,
            });
          }
        });
      } catch {
        //
      }

      return r;
    }, []);
    setOrganizerOptions(organizerOptions);

    const cubeTypeOptions: Options[] = searchResult.result.rows.reduce<
      Options[]
    >((r, c) => {
      try {
        const {
          fields: { cube_types },
        } = c;
        (JSON.parse(cube_types) as string[])
          .reduce<string[]>((r, c) => {
            if (!r.includes(c)) {
              r.push(c);
            }
            return r;
          }, [])
          .forEach((cube) => {
            const a = r.find((d) => d.key === cube);
            if (a !== undefined) {
              a.count = (a.count || 0) + 1;
              a.text = `${a.value}(${a.count})`;
            } else {
              r.push({
                key: cube,
                value: cube,
                text: `${cube}(1)`,
                count: 1,
              });
            }
          });
      } catch {
        //
      }

      return r;
    }, []);
    setCubeTypeOptions(cubeTypeOptions);
    search(decodedSearchValue);
  });

  findCard(decodedSearchValue).then((searchResult) => {
    if (searchResult === undefined) {
      setCollegeOptions([]);
      setOrganizerOptions([]);
      setCubeTypeOptions([]);
      return;
    }
    const displayCard: SearchCard[] = [];
    searchResult.result.rows
      .map((c) => c.fields)
      .forEach((c) => {
        const queries = decodedSearchValue
          .split(' ')
          .filter((c) => c.trim() !== '');
        if (c.name !== undefined && c.name !== null) {
          if (
            queries.some(
              (query) =>
                query !== undefined &&
                query !== null &&
                c.name.toLowerCase().includes(query.toLowerCase())
            )
          ) {
            displayCard.push(c);
          }
        }
      });
    searchResult.result.rows
      .map((c) => c.fields)
      .forEach((c) => {
        if (!displayCard.some((d) => d.id === c.id)) {
          displayCard.push(c);
        }
      });
    setCard(displayCard);
    setDisplayCard([...displayCard]);
    const collegeOptions: Options[] = searchResult.result.rows.reduce<
      Options[]
    >((r, c) => {
      try {
        const {
          fields: { categories },
        } = c;
        const category = (JSON.parse(categories) as SearchCardCategory[]).find(
          (d) => d.mainCategory === 1
        );
        if (category !== undefined) {
          const a = r.find((d) => d.key === category.collegeId);
          if (a !== undefined) {
            a.count = (a.count || 0) + 1;
            a.text = `${a.value}(${a.count})`;
          } else {
            r.push({
              key: category.collegeId,
              value: getCollgeName(category.collegeId),
              text: `${getCollgeName(category.collegeId)}(1)`,
              count: 1,
            });
          }
        }
      } catch {
        //
      }

      return r;
    }, []);
    setCollegeOptions(collegeOptions);

    const organizerOptions: Options[] = searchResult.result.rows.reduce<
      Options[]
    >((r, c) => {
      try {
        const {
          fields: { cube_organizer_names },
        } = c;
        (JSON.parse(cube_organizer_names) as string[]).forEach((organizer) => {
          const a = r.find((d) => d.key === organizer);
          if (a !== undefined) {
            a.count = (a.count || 0) + 1;
            a.text = `${a.value}(${a.count})`;
          } else {
            r.push({
              key: organizer,
              value: organizer,
              text: `${organizer}(1)`,
              count: 1,
            });
          }
        });
      } catch {
        //
      }

      return r;
    }, []);
    setOrganizerOptions(organizerOptions);

    const cubeTypeOptions: Options[] = searchResult.result.rows.reduce<
      Options[]
    >((r, c) => {
      try {
        const {
          fields: { cube_types },
        } = c;
        (JSON.parse(cube_types) as string[])
          .reduce<string[]>((r, c) => {
            if (!r.includes(c)) {
              r.push(c);
            }
            return r;
          }, [])
          .forEach((cube) => {
            const a = r.find((d) => d.key === cube);
            if (a !== undefined) {
              a.count = (a.count || 0) + 1;
              a.text = `${a.value}(${a.count})`;
            } else {
              r.push({
                key: cube,
                value: cube,
                text: `${cube}(1)`,
                count: 1,
              });
            }
          });
      } catch {
        //
      }

      return r;
    }, []);
    setCubeTypeOptions(cubeTypeOptions);
    search(decodedSearchValue);
  });

  return () => {
    setFilterCondition({ ...InitialConditions });
    //setQueryOptions(getEmptyQueryOptions());
    //setTags([]);
    setCollegeOptions([]);
    setOrganizerOptions([]);
    setCubeTypeOptions([]);
    setCard();
    setExpert();
  };
}

// 필터 선택 값 만들기
export function toggle_all_college_name_query(value: string) {
  const filterCondition = getFilterCondition();
  const queryOptions = getQueryOptions();
  //const tags = getTags();
  if (filterCondition === undefined || queryOptions === undefined) {
    return;
  }
  const exist = filterCondition.all_college_name_query.some((c) => c === value);

  if (exist) {
    setFilterCondition({
      ...filterCondition,
      all_college_name_query: filterCondition.all_college_name_query.filter(
        (c) => c !== value
      ),
    });
  } else {
    setFilterCondition({
      ...filterCondition,
      all_college_name_query: [
        ...filterCondition.all_college_name_query,
        value,
      ],
    });
  }
}

export function toggle_difficulty_level_json_query(value: string) {
  const filterCondition = getFilterCondition();
  const queryOptions = getQueryOptions();
  if (filterCondition === undefined || queryOptions === undefined) {
    return;
  }
  const exist = filterCondition.difficulty_level_json_query.some(
    (c) => c === value
  );

  if (exist) {
    setFilterCondition({
      ...filterCondition,
      difficulty_level_json_query:
        filterCondition.difficulty_level_json_query.filter((c) => c !== value),
    });
  } else {
    setFilterCondition({
      ...filterCondition,
      difficulty_level_json_query: [
        ...filterCondition.difficulty_level_json_query,
        value,
      ],
    });
    const removeMe = () => {
      const mFilterCondition = getFilterCondition();
      if (mFilterCondition === undefined) {
        return;
      }
      setFilterCondition({
        ...mFilterCondition,
        difficulty_level_json_query:
          mFilterCondition.difficulty_level_json_query.filter(
            (e) => e !== value
          ),
      });
    };
  }
}

export function toggle_cube_type_query(value: string) {
  const filterCondition = getFilterCondition();
  const queryOptions = getQueryOptions();
  if (filterCondition === undefined || queryOptions === undefined) {
    return;
  }
  const exist = filterCondition.cube_type_query.some((c) => c === value);

  if (exist) {
    setFilterCondition({
      ...filterCondition,
      cube_type_query: filterCondition.cube_type_query.filter(
        (c) => c !== value
      ),
    });
  } else {
    setFilterCondition({
      ...filterCondition,
      cube_type_query: [...filterCondition.cube_type_query, value],
    });
    const removeMe = () => {
      const mFilterCondition = getFilterCondition();
      if (mFilterCondition === undefined) {
        return;
      }
      setFilterCondition({
        ...mFilterCondition,
        cube_type_query: mFilterCondition.cube_type_query.filter(
          (e) => e !== value
        ),
      });
    };
  }
}

export function toggle_learning_time_query(text: string, value: string) {
  const filterCondition = getFilterCondition();
  const queryOptions = getQueryOptions();
  if (filterCondition === undefined || queryOptions === undefined) {
    return;
  }
  const exist = filterCondition.learning_time_query.some((c) => c === value);

  if (exist) {
    setFilterCondition({
      ...filterCondition,
      learning_time_query: filterCondition.learning_time_query.filter(
        (c) => c !== value
      ),
    });
  } else {
    setFilterCondition({
      ...filterCondition,
      learning_time_query: [...filterCondition.learning_time_query, value],
    });
    const removeMe = () => {
      const mFilterCondition = getFilterCondition();
      if (mFilterCondition === undefined) {
        return;
      }
      setFilterCondition({
        ...mFilterCondition,
        learning_time_query: mFilterCondition.learning_time_query.filter(
          (e) => e !== value
        ),
      });
    };
  }
}
//  // 필터 선택 값 만들기
//  // 필터

export async function search(searchValue: string, searchType?: string) {
  const decodedSearchValue = searchValue
    .replace(/'/g, ' ')
    .replace(/&/g, ' ')
    .replace(/%/g, ' ');
  if (decodedSearchValue === '') {
    return;
  }
  if (decodedSearchValue.replace(/ /g, '').length < 2) {
    reactAlert({
      title: getPolyglotText('검색', '통검-필레팝얼-검색'),
      message: getPolyglotText(
        '두 글자 이상 입력 후 검색하셔야 합니다.',
        '통검-필레팝얼-두글자'
      ),
    });
    return;
  }

  setDisplayCard(await filterCard(getCard()));
  //closeOnFilter && closeOnFilter();
  await findExpert(decodedSearchValue).then((response) => {
    if (response && response.result && response.result.rows) {
      setExpert(response.result.rows.map((c) => c.fields));
    } else {
      setExpert();
    }
  });

  const history = getCurrentHistory();
  if (searchType === undefined) {
    history?.push(`/search?query=${decodedSearchValue}`);
  } else {
    history?.push(`/search/${searchType}?query=${decodedSearchValue}`);
  }
}
