import { reactAlert, StorageModel, getCookie } from '@nara.platform/accent';
import { getDefaultLang } from 'lecture/model/LangSupport';
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
  findNaverOpenApiErrata,
  findPreCard,
  findRelatedKeywordByKeyword,
  searchRankinsCache,
  searchSuggest,
} from './api/searchApi';
import {
  CheckboxOptions,
  Options,
  SearchCard,
  SearchCardCategory,
} from './search.models';
import {
  getCard,
  getAllowedCard,
  getExpertOri,
  getFilterCondition,
  getQueryOptions,
  getSearchBadgeOriList,
  getSearchCommunityOriList,
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
  getCollegeOptions,
  getCubeTypeOptions,
  setSearchRecentList,
  setSearchRelatedList,
  setSearchPopular1MList,
  setSearchPopular6MList,
  setSearchPopular1YList,
  getMenuAuth,
} from './search.services';
import { debounceSearchActionTrack } from 'tracker/present/logic/ActionTrackService';
import { ActionTrackParam } from 'tracker/model/ActionTrackModel';
import { ActionType, Action, Area } from 'tracker/model/ActionType';
import SearchService from './service/SearchService';

export function initSearchData() {
  filterClearAll();
  setCollegeOptions([]);
  setOrganizerOptions([]);
  setCubeTypeOptions([]);
  setCard([]);
  setAllowedCard([]);
  setDisplayCard([]);
  setExpert();
  setExpertOri();
  setSearchBadgeList([]);
  setSearchCommunityList([]);
  setSearchRelatedList([]);
}

export function getQueryId(value?: string): string {
  const queryId: string =
    value?.trim() ||
    window.location.search.slice(
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

// ??????
export function filterClearAll() {
  setFilterCondition(InitialConditions);
  setExpert(getExpertOri());
  setSearchBadgeList(getSearchBadgeOriList());
  setSearchCommunityList(getSearchCommunityOriList());
}

export function searchCardFilterData(decodedSearchValue: string) {
  setCard([]); // search?????? ????????? ?????? ?????? data
  setAllowedCard([]); // ????????? ?????? data(????????? ???????????? ?????? data)
  setDisplayCard([]); // ????????? ????????? data(????????? ???????????? ????????????????????? data)
  let isCompleted = false;
  findPreCard(decodedSearchValue).then((searchResult) => {
    if (isCompleted) {
      // console.log('findCard is done');
      return;
    }
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
                  getDefaultLang(JSON.parse(c.lang_supports))
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
    isCompleted = true;
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
                  getDefaultLang(JSON.parse(c.lang_supports))
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
    //.replace(/&/g, ' ')
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

// ?????? ?????? ??? ?????????
export function toggle_all_college_name_query(value: string) {
  const filterCondition = getFilterCondition();
  const queryOptions = getQueryOptions();
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
export function toggle_all_all_college_name_query() {
  const filterCondition = getFilterCondition();
  const queryOptions = getQueryOptions();
  const collegeOptions = getCollegeOptions();
  if (
    filterCondition === undefined ||
    queryOptions === undefined ||
    collegeOptions === undefined
  ) {
    return;
  }

  const all_all_college_name_condition =
    filterCondition.all_college_name_query.length === collegeOptions.length;

  if (all_all_college_name_condition) {
    setFilterCondition({
      ...filterCondition,
      all_college_name_query: [],
    });
  } else {
    setFilterCondition({
      ...filterCondition,
      all_college_name_query: collegeOptions.map(({ value }) => value),
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
export function toggle_all_difficulty_level_query() {
  const filterCondition = getFilterCondition();
  const queryOptions = getQueryOptions();
  if (filterCondition === undefined || queryOptions === undefined) {
    return;
  }
  const all_difficulty_level_condition =
    filterCondition.difficulty_level_json_query.length ===
    CheckboxOptions.difficulty_level_json_query.length;

  if (all_difficulty_level_condition) {
    setFilterCondition({
      ...filterCondition,
      difficulty_level_json_query: [],
    });
  } else {
    setFilterCondition({
      ...filterCondition,
      difficulty_level_json_query:
        CheckboxOptions.difficulty_level_json_query.map(({ value }) => value),
    });
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
export function toggle_all_cube_type_query() {
  const filterCondition = getFilterCondition();
  const queryOptions = getQueryOptions();
  const cubeTypeOptions = getCubeTypeOptions();
  if (
    filterCondition === undefined ||
    queryOptions === undefined ||
    cubeTypeOptions === undefined
  ) {
    return;
  }
  const all_cube_type_condition =
    filterCondition.cube_type_query.length === cubeTypeOptions.length;

  if (all_cube_type_condition) {
    setFilterCondition({
      ...filterCondition,
      cube_type_query: [],
    });
  } else {
    setFilterCondition({
      ...filterCondition,
      cube_type_query: cubeTypeOptions.map(({ value }) => value),
    });
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
export function toggle_all_learning_time_query() {
  const filterCondition = getFilterCondition();
  const queryOptions = getQueryOptions();
  if (filterCondition === undefined || queryOptions === undefined) {
    return;
  }
  const all_learning_time_condition =
    filterCondition.learning_time_query.length ===
    CheckboxOptions.learning_time_query.length;

  if (all_learning_time_condition) {
    setFilterCondition({
      ...filterCondition,
      learning_time_query: [],
    });
  } else {
    setFilterCondition({
      ...filterCondition,
      learning_time_query: CheckboxOptions.learning_time_query.map(
        ({ value }) => value
      ),
    });
  }
}

export function toggle_support_lang_json_query(value: string) {
  const filterCondition = getFilterCondition();
  const queryOptions = getQueryOptions();
  if (filterCondition === undefined || queryOptions === undefined) {
    return;
  }
  const exist = filterCondition.support_lang_json_query.some(
    (c) => c === value
  );

  if (exist) {
    setFilterCondition({
      ...filterCondition,
      support_lang_json_query: filterCondition.support_lang_json_query.filter(
        (c) => c !== value
      ),
    });
  } else {
    setFilterCondition({
      ...filterCondition,
      support_lang_json_query: [
        ...filterCondition.support_lang_json_query,
        value,
      ],
    });
  }
}
//  // ?????? ?????? ??? ?????????
//  // ??????

export async function search(
  searchValue: string,
  searchType?: string,
  withOriginal?: boolean
) {
  const decodedSearchValue = searchValue
    .replace(/'/g, ' ')
    //.replace(/&/g, ' ')
    .replace(/%/g, ' ');
  if (decodedSearchValue.replace(/ /g, '').length < 2) {
    reactAlert({
      title: getPolyglotText('??????', '??????-????????????-??????'),
      message: getPolyglotText(
        '??? ?????? ?????? ?????? ??? ??????????????? ?????????.',
        '??????-????????????-?????????'
      ),
    });
    return;
  }

  const searchInSearchInfo = SearchService.instance.searchInfo;
  if (searchInSearchInfo?.inAgain) {
    await searchInSearchData(decodedSearchValue);
  } else {
    const queryId = getQueryId();
    if (queryId === decodedSearchValue) {
      // ????????? ???????????? ??????????????? SearchContentsPage?????? ???????????? ???????????? ????????? ??????
      if (withOriginal) {
        await searchData(decodedSearchValue);
      } else {
        await searchDataWithErrata(decodedSearchValue);
      }
    } else {
      const history = getCurrentHistory();
      if (searchType === undefined) {
        history?.push(`/search?query=${decodedSearchValue}`); // SearchContentsPage?????? searchData()??? ??????
      } else {
        history?.push(`/search/${searchType}?query=${decodedSearchValue}`); // SearchContentsPage?????? searchData()??? ??????
      }
    }
  }

  // search track
  debounceSearchActionTrack({
    email:
      (window.sessionStorage.getItem('email') as string) ||
      (window.localStorage.getItem('nara.email') as string) ||
      getCookie('tryingLoginId'),
    path: window.location.pathname,
    search: window.location.search,
    area: Area.SEARCH,
    actionType: ActionType.GENERAL,
    action: Action.SEARCH,
    actionName:
      (searchInSearchInfo?.inAgain
        ? '?????????::' + searchInSearchInfo.recentSearchValue + '::'
        : '??????::') + decodedSearchValue,
  } as ActionTrackParam);
}

export async function searchDataWithErrata(
  searchValue: string,
  searchType?: string
) {
  //
  const errataValue = await findNaverOpenApiErrata(searchValue);

  if (errataValue?.errata) {
    SearchService.instance.setSearchInfoValue(
      'errataValue',
      errataValue.errata
    );
    // SearchService.instance.setSearchInfoValue('searchValue', searchValue);
  } else {
    SearchService.instance.setSearchInfoValue('errataValue', '');
  }

  await searchData(
    (errataValue && errataValue.errata) || searchValue,
    searchType
  );
}

export async function searchData(searchValue: string, searchType?: string) {
  const decodedSearchValue = searchValue
    .replace(/'/g, ' ')
    //.replace(/&/g, ' ')
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
  findBadges(searchValue).then((response) => {
    if (response) {
      setSearchBadgeList(response.results);
      setSearchBadgeOriList(response.results);
    }
  });

  if (
    getMenuAuth()?.some(
      (pagemElement) =>
        pagemElement.position === 'TopMenu' && pagemElement.type === 'Community'
    )
  ) {
    findCommunities(searchValue).then((response) => {
      if (response) {
        setSearchCommunityList(response.results);
        setSearchCommunityOriList(response.results);
      }
    });
  }

  // ???????????????
  requestSearchRecentList(searchValue);

  // ???????????????
  const suggestions: string[] = [];
  // console.log('----Suggestion Search----');
  // console.log(searchValue);
  findRelatedKeywordByKeyword(searchValue)
    .then((c) => {
      if (c !== undefined) {
        c.forEach((d) => suggestions.push(d));
      }
    })
    .finally(() =>
      searchSuggest(searchValue)
        .then((response) => {
          if (response && response.error === undefined) {
            response.forEach((s2: string) => {
              suggestions.push(s2);
            });
            if (suggestions.length > 10) {
              suggestions.length = 10;
            }
          }
        })
        .finally(() => {
          setSearchRelatedList(suggestions);
        })
    );
}

export function requestSearchRecentList(searchValue?: string) {
  // ???????????????
  const searchRecents =
    JSON.parse(localStorage.getItem('nara.searchRecents') || '[]') || [];
  if (searchValue !== undefined) {
    searchRecents.unshift(searchValue);
  }
  const newSearchRecents = searchRecents.filter(
    (element: string, index: number) => {
      return searchRecents.indexOf(element) === index;
    }
  );
  if (newSearchRecents.length > 5) {
    newSearchRecents.length = 5;
  }
  new StorageModel('localStorage', 'searchRecents').save(newSearchRecents);
  //localStorage.setItem('searchRecents', newSearchRecents);
  setSearchRecentList(newSearchRecents);
}

export async function searchInSearchData(
  searchValue: string,
  searchType?: string
) {
  const decodedSearchValue = searchValue
    .replace(/'/g, ' ')
    //.replace(/&/g, ' ')
    .replace(/%/g, ' ');

  const cards = getAllowedCard();

  const newCards = cards?.filter(
    (ele) =>
      parsePolyglotString(
        JSON.parse(ele.name),
        getDefaultLang(JSON.parse(ele.lang_supports))
      ).indexOf(decodedSearchValue) > -1 ||
      parsePolyglotString(
        JSON.parse(ele.simple_description),
        getDefaultLang(JSON.parse(ele.lang_supports))
      ).indexOf(decodedSearchValue) > -1
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
    (ele) => JSON.stringify(ele.name).indexOf(decodedSearchValue) > -1
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
  const filterCondition = getFilterCondition();
  if (
    JSON.stringify(filterCondition || '') === JSON.stringify(InitialConditions)
  ) {
    setExpert(getExpertOri());
    setSearchBadgeList(getSearchBadgeOriList());
    setSearchCommunityList(getSearchCommunityOriList());
  } else {
    setExpert([]);
    setSearchBadgeList([]);
    setSearchCommunityList([]);
  }
}

export function getTitleHtmlSearchKeyword(title: string) {
  if (title === null || title === undefined) {
    return '';
  }

  let htmlTitle = title;

  const searchInSearchInfo = SearchService.instance.searchInfo;
  let keyword = getQueryId(
    searchInSearchInfo.errataValue || searchInSearchInfo.searchValue
  );
  if (searchInSearchInfo?.inAgain) {
    keyword = searchInSearchInfo.searchValue;
  } else {
    htmlTitle = htmlTitle
      .replace(new RegExp('<b>', 'gi'), '<strong class="search_keyword">')
      .replace(new RegExp('</b>', 'gi'), '</strong>');
  }

  if (keyword.indexOf(' ') > -1) {
    const keywords = keyword.split(' ');
    let htmlTitles = htmlTitle;
    keywords.map((item) => {
      htmlTitles = escapeRegex(item, htmlTitles);
      return htmlTitles;
    });
    return htmlTitles;
  }

  htmlTitle = escapeRegex(keyword, htmlTitle);
  return htmlTitle;
}

function escapeRegex(item: string, target: string): string {
  const ESCAPE_REGEX = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;

  let replacedText = '';

  const splitTags = target.split('</strong>');
  const changedValues = splitTags.map((splitValue, index) => {
    const splitTargetValue =
      splitTags.length !== index + 1 ? splitValue + '</strong>' : splitValue;
    if (splitTargetValue.includes('</strong>')) {
      return splitTargetValue;
    } else {
      if (item.match(ESCAPE_REGEX)) {
        const escapedItem = item.replace(ESCAPE_REGEX, (match) => `\\${match}`);
        return splitTargetValue.replace(
          new RegExp(escapedItem, 'i'),
          (match) => {
            return `<strong class="search_keyword">${match}</strong>`;
          }
        );
      } else {
        const regExpItem = item.replace(ESCAPE_REGEX, '');
        return splitTargetValue.replace(
          new RegExp(regExpItem, 'i'),
          (match) => {
            return `<strong class="search_keyword">${match}</strong>`;
          }
        );
      }
    }
  });

  replacedText = changedValues.join('');

  // if (item.match(ESCAPE_REGEX)) {
  //   replacedText = target.replace(
  //     item,
  //     `<strong class="a_text">${item}</strong>`
  //   );
  // } else {
  //   replacedText = target.replace(
  //     new RegExp(regExpItem, 'gi'),
  //     `<strong class="a_text">${regExpItem}</strong>`
  //   );
  // }

  return replacedText;
}

export function getTagsHtml(tags: string) {
  if (tags === null || tags === undefined) {
    return '';
  }

  const regEx = new RegExp(',', 'gi');
  const htmlTags = '<span>' + tags.replace(regEx, `,</span><span>`) + '</span>';

  return htmlTags;
}

export function getTextFromHtml(html: string) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent;
}

export function searchPopularList() {
  searchRankinsCache(0).then((response) => {
    const popularList: string[] = [];
    response?.map((rank) => {
      popularList.push(rank[0]);
    });
    setSearchPopular1MList(popularList);
  });
  searchRankinsCache(1).then((response) => {
    const popularList: string[] = [];
    response?.map((rank) => {
      popularList.push(rank[0]);
    });
    setSearchPopular6MList(popularList);
  });
  searchRankinsCache(2).then((response) => {
    const popularList: string[] = [];
    response?.map((rank) => {
      popularList.push(rank[0]);
    });
    setSearchPopular1YList(popularList);
  });
}
