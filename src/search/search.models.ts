import { BadgeLevel } from 'certification/model/BadgeLevel';
import { DifficultyLevel } from 'lecture/model/DifficultyLevel';
import { LangSupport } from 'lecture/model/LangSupport';
import CardType from 'lecture/shared/model/CardType';
import { Category } from 'shared/model/Category';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';

export interface SearchParam {
  searchType: string;
}

export interface SearchUI {
  isLoading: boolean;
  transactionId: number;
}

// 필터
export interface FilterCondition {
  all_college_name_query: string[]; // 컬리지
  cube_type_query: string[]; // 학습유형
  difficulty_level_json_query: string[]; // 난이도
  learning_time_query: string[]; // 교육기간
  organizer_query: string[]; // 교육기관
  hasRequired: boolean; // 핵인싸
  notRequired: boolean; // 핵인싸
  stamp: boolean;
  badge: boolean;
  learning_start_date_str: Date | null; // 교육일정 startDate
  learning_end_date_str: Date | null; // 교육일정 endDate
  applying: boolean; // 수강신청 가능 학습
}
export interface Options {
  key: string;
  text: string;
  value: string;
  count?: number;
}

export const CheckboxOptions = {
  all_college_name_query: [
    { key: 0, text: 'Al', value: 'Al' },
    { key: 1, text: 'DT', value: 'DT' },
    { key: 2, text: '행복', value: '행복' },
    { key: 3, text: 'SV', value: 'SV' },
    { key: 4, text: '혁신디자인', value: '혁신디자인' },
    { key: 5, text: 'Global', value: 'Global' },
    { key: 6, text: 'Management', value: 'Management' },
    { key: 7, text: '반도체', value: '반도체' },
    { key: 8, text: '에너지솔루션', value: '에너지솔루션' },
    { key: 9, text: 'SK경영', value: 'SK경영' },
    { key: 10, text: 'SK아카데미', value: 'SK아카데미' },
    { key: 11, text: 'Life Style', value: 'LifeStyle' },
  ],

  difficulty_level_json_query: [
    {
      key: 0,
      text: getPolyglotText('Basic', '통검-필레팝-초급'),
      value: 'Basic',
    },
    {
      key: 1,
      text: getPolyglotText('Intermediate', '통검-필레팝-중급'),
      value: 'Intermediate',
    },
    {
      key: 2,
      text: getPolyglotText('Advanced', '통검-필레팝-고급'),
      value: 'Advanced',
    },
    {
      key: 3,
      text: getPolyglotText('Expert', '통검-필레팝-전문가'),
      value: 'Expert',
    },
  ],

  organizer_query: [
    { key: 0, text: 'mySUNI', value: 'mySUNI' },
    { key: 1, text: 'Coursera', value: 'Coursera' },
    { key: 2, text: 'Linkedin', value: 'Linkedin' },
    { key: 3, text: 'POSTEC', value: 'POSTEC' },
  ],

  learningTypes: [
    { key: 0, text: 'Course', value: 'Course' },
    { key: 1, text: 'Video', value: 'Video' },
    { key: 2, text: 'Audio', value: 'Audio' },
    { key: 3, text: 'e-Learning', value: 'ELearning' },
    { key: 4, text: 'Classroom', value: 'ClassRoomLecture' },
    { key: 5, text: 'Community', value: 'Community' },
    { key: 6, text: 'Web Page', value: 'WebPage' },
    { key: 7, text: 'Documents', value: 'Documents' },
  ],

  learning_time_query: [
    {
      key: 0,
      text: getPolyglotText('30분 미만', '통검-필레팝-30분'),
      value: 'type1',
    },
    {
      key: 1,
      text: getPolyglotText('30분 이상~1시간 미만', '통검-필레팝-1시간'),
      value: 'type2',
    },
    {
      key: 2,
      text: getPolyglotText('1시간 이상~4시간 미만', '통검-필레팝-4시간'),
      value: 'type3',
    },
    {
      key: 3,
      text: getPolyglotText('4시간 이상~12시간 미만', '통검-필레팝-12시간'),
      value: 'type4',
    },
    {
      key: 4,
      text: getPolyglotText('12시간 이상', '통검-필레팝-12이상'),
      value: 'type5',
    },
  ],

  requireds: [
    { key: 0, text: '선택안함', value: 'none' },
    { key: 1, text: '유', value: 'true' },
    { key: 2, text: '무', value: 'false' },
  ],

  certifications: [
    { key: 0, text: 'Stamp', value: 'stamp' },
    { key: 1, text: 'Badge', value: 'badge' },
  ],

  viewTypes: [
    {
      key: 0,
      name: 'viewType-radioGroup',
      label: '코스만보기',
      value: 'Course',
    },
    { key: 1, name: 'viewType-radioGroup', label: '전체보기', value: 'All' },
  ],

  approvalViewTypes: [
    { key: 0, name: 'approval-viewType-radioGroup', label: '전체', value: '' },
    {
      key: 1,
      name: 'approval-viewType-radioGroup',
      label: '승인대기',
      value: 'OpenApproval',
    },
    {
      key: 2,
      name: 'approval-viewType-radioGroup',
      label: '승인',
      value: 'Opened',
    },
    {
      key: 3,
      name: 'approval-viewType-radioGroup',
      label: '반려',
      value: 'Rejected',
    },
  ],
};

export interface SearchCardCategory extends Category {
  mainCategory: number;
}

export interface SearchCard {
  patron_key_string: string; //
  required_cinerooms: string; // 배열로 변경필요
  categories: string;
  access_rules: string; //
  id: string; //
  name: string; //
  difficulty_level: DifficultyLevel; //
  thumb_image_path: string; //
  learning_time: string; //
  stamp_count: string; //
  use_whitelist_policy: string; //
  additional_learning_time: string; //
  type: CardType;
  simple_description: string;
  passed_student_count: string; //
  student_count: string; //
  star_count: string; //
  used_in_badge: string; //
  learning_start_date: string; //
  learning_end_date: string; //
  applying_start_date: string; //
  applying_end_date: string; //
  cube_types: string; //
  cube_organizer_names: string; //
  paid: string;
  langSupport: LangSupport[];
  tags: string;
}

export interface SearchExpert {
  channel_name: string;
  department: string;
  id: string;
  name: string;
  photo_id: string;
  position: string;
  lectureField: string;
  career: string;
}
//  // 필터

// 결과 목록
export interface SearchLecture {
  id: string;
  name: string;
  simple_description: string;
  college: string;
  channel: string;
  tag: string;
}

export interface SearchBadge {
  id: string;
  title: string;
  description: PolyglotString;

  // badge를 그리는데 필요한 항목
  name: PolyglotString;
  level: BadgeLevel;
  iconUrl: string;
  categoryId: string;
  tag: string;
  langSupport: LangSupport[];
}

export interface SearchCommunity {
  communityId: string;
  name: string;
  description: string;
}

export interface SearchInstructor {
  id: string;
  name: string;
  position: string;
  organization: string;
  lectureField: string;
  career: string;
}

export interface SearchSuggestion {
  seed: string;
  suggestions: Array<Array<string[]>>;
}
//  // 결과 목록
