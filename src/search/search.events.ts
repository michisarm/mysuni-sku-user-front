import { reactAlert } from '@nara.platform/accent';
import { getDefaultLang } from 'lecture/model/LangSupport';
import { useRef } from 'react';
import { getCollgeName } from 'shared/service/useCollege/useRequestCollege';
import { getCurrentHistory } from 'shared/store/HistoryStore';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import {
  filterCard,
  findBadges,
  findCard,
  findCommunities,
  findExpert,
  findPreCard,
} from './api/searchApi';
import { Options, SearchCard, SearchCardCategory } from './search.models';
import {
  getCard,
  getAllowedCard,
  getExpertOri,
  getFilterCondition,
  getQueryOptions,
  getSearchBadgeOriList,
  getSearchCommunityOriList,
  getSearchInSearchInfo,
  InitialConditions,
  setCard,
  setCollegeOptions,
  setCubeTypeOptions,
  setDisplayCard,
  setAllowedCard,
  setExpert,
  setExpertOri,
  setFilterCondition,
  setOrganizerOptions,
  setSearchBadgeList,
  setSearchBadgeOriList,
  setSearchCommunityList,
  setSearchCommunityOriList,
  getPreRef,
  setPreRef,
} from './search.services';

export function getQueryId(): string {
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

export function searchCardFilterData(decodedSearchValue: string) {
  setCard([]); // search에서 넘어온 원본 검색 data
  setAllowedCard([]); // 권한을 거친 data(필터를 선택하지 않은 data)
  setDisplayCard([]); // 화면에 노출할 data(필터를 선택하고 결과내재검색한 data)
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
                parsePolyglotString(
                  JSON.parse(c.name),
                  getDefaultLang(c.langSupport)
                )
                  .toLowerCase()
                  .includes(query.toLowerCase())
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
    setAllowedCard(displayCard);
    setDisplayCard([...displayCard]);
  });

  findCard(decodedSearchValue, getPreRef() || '').then(async (searchResult) => {
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
                parsePolyglotString(
                  JSON.parse(c.name),
                  getDefaultLang(c.langSupport)
                )
                  .toLowerCase()
                  .includes(query.toLowerCase())
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
    setAllowedCard(displayCard);
    setDisplayCard([...displayCard]);

    const cards = await filterCard(getCard());
    setAllowedCard(cards);
    setDisplayCard(cards);
  });
}

export function settingSearchFilter(searchValue: string) {
  const decodedSearchValue = searchValue
    .replace(/'/g, ' ')
    .replace(/&/g, ' ')
    .replace(/%/g, ' ');
  if (decodedSearchValue === '') {
    return;
  }

  const searchResult = getAllowedCard();
  if (searchResult === undefined) {
    setCollegeOptions([]);
    setOrganizerOptions([]);
    setCubeTypeOptions([]);
    return;
  }
  const collegeOptions: Options[] = searchResult.reduce<Options[]>((r, c) => {
    try {
      const categories = c.categories;
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

  const organizerOptions: Options[] = searchResult.reduce<Options[]>((r, c) => {
    try {
      const cube_organizer_names = c.cube_organizer_names;
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

  const cubeTypeOptions: Options[] = searchResult.reduce<Options[]>((r, c) => {
    try {
      const cube_types = c.cube_types;
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

  const searchInSearchInfo = getSearchInSearchInfo();
  if (searchInSearchInfo?.checkSearchInSearch) {
    searchInSearchData(decodedSearchValue);
  } else {
    const queryId = getQueryId();
    if (queryId === decodedSearchValue) {
      // 동일한 검색어로 검색할경우 SearchContentsPage에서 감지하지 못하므로 여기서 조회
      searchData(decodedSearchValue);
    } else {
      const history = getCurrentHistory();
      if (searchType === undefined) {
        history?.push(`/search?query=${decodedSearchValue}`); // SearchContentsPage에서 searchData()를 조회
      } else {
        history?.push(`/search/${searchType}?query=${decodedSearchValue}`); // SearchContentsPage에서 searchData()를 조회
      }
    }
  }
}

export async function searchData(searchValue: string, searchType?: string) {
  const decodedSearchValue = searchValue
    .replace(/'/g, ' ')
    .replace(/&/g, ' ')
    .replace(/%/g, ' ');

  if (decodedSearchValue === '') {
    return;
  }

  filterClearAll();

  searchCardFilterData(decodedSearchValue);
  setPreRef(searchValue);

  await findExpert(decodedSearchValue).then((response) => {
    if (response && response.result && response.result.rows) {
      const experts = response.result.rows.map((c) => c.fields);
      setExpert(experts);
      setExpertOri(experts);
    } else {
      setExpert();
      setExpertOri();
    }
  });

  setSearchBadgeList([]);
  setSearchCommunityList([]);
  await findBadges(searchValue).then((response) => {
    if (response) {
      setSearchBadgeList(response.results);
      setSearchBadgeOriList(response.results);
    }
  });
  await findCommunities(searchValue).then((response) => {
    if (response) {
      setSearchCommunityList(response.results);
      setSearchCommunityOriList(response.results);
    }
  });
}

export async function searchInSearchData(
  searchValue: string,
  searchType?: string
) {
  const decodedSearchValue = searchValue
    .replace(/'/g, ' ')
    .replace(/&/g, ' ')
    .replace(/%/g, ' ');

  const cards = getAllowedCard();
  const newCards = cards?.filter(
    (ele) =>
      ele.name.indexOf(decodedSearchValue) > -1 ||
      ele.simple_description.indexOf(decodedSearchValue) > -1
  );
  setCard(cards);
  setAllowedCard(newCards);
  setDisplayCard(newCards);
  const experts = getExpertOri();
  const newExperts = experts?.filter(
    (ele) =>
      ele.name.indexOf(decodedSearchValue) > -1 ||
      ele.position.indexOf(decodedSearchValue) > -1
  );
  setExpert(newExperts);
  const badges = getSearchBadgeOriList();
  const newBadges = badges?.filter(
    (ele) =>
      JSON.stringify(ele.name).indexOf(decodedSearchValue) > -1 ||
      JSON.stringify(ele.description).indexOf(decodedSearchValue) > -1
  );
  setSearchBadgeList(newBadges);
  const communities = getSearchCommunityOriList();
  const newCommunities = communities?.filter(
    (ele) =>
      JSON.stringify(ele.name).indexOf(decodedSearchValue) > -1 ||
      JSON.stringify(ele.description).indexOf(decodedSearchValue) > -1
  );
  setSearchCommunityList(newCommunities);
}
export async function filterClickSearch() {
  const cards = await filterCard(getAllowedCard());
  setDisplayCard(cards);
}

export function getTitleHtmlSearchKeyword(title: string) {
  if (title === null || title === undefined) {
    return '';
  }

  let htmlTitle = title;

  let keyword = getQueryId();
  const searchInSearchInfo = getSearchInSearchInfo();
  if (searchInSearchInfo?.checkSearchInSearch) {
    keyword = searchInSearchInfo.searchValue;
  } else {
    htmlTitle = htmlTitle
      .replace(new RegExp('<b>', 'gi'), '<strong class="search_keyword">')
      .replace(new RegExp('</b>', 'gi'), '</strong>');
  }

  if (keyword.indexOf(' ') > -1) {
    const keywords = keyword.split(' ');
    keywords.map((item) => {
      htmlTitle = htmlTitle.replace(
        new RegExp(item, 'gi'),
        `<strong class="search_keyword">${item}</strong>`
      );
    });
  }

  htmlTitle = htmlTitle.replace(
    new RegExp(keyword, 'gi'),
    `<strong class="search_keyword">${keyword}</strong>`
  );

  return htmlTitle;
}

export function getTagsHtml(tags: string) {
  if (tags === null || tags === undefined) {
    return '';
  }

  const regEx = new RegExp(',', 'gi');
  const htmlTags = '<span>' + tags.replace(regEx, `,</span><span>`) + '</span>';

  return htmlTags;
}
