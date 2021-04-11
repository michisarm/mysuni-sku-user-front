export type FilterCondition = {
  collegeIds: string[];                 // 컬리지
  difficultyLevels: string[];           // 난이도
  learningTimes: string[];              // 교육기간
  organizers: string[];                 // 교육기관
  required: string;                     // 권장과정
  certifications: string[];             // 뱃지 & 스탬프 유무
  startDate: Date | null;               // 교육일정 startDate
  endDate: Date | null;                 // 교육일정 endDate
  applying: string;                     // 수강신청 가능 학습
}

export const initialCondition = {
  collegeIds: [],
  difficultyLevels: [],
  learningTimes: [],
  organizers: [],
  required: '',
  certifications: [],
  startDate: null,
  endDate: null,
  applying: ''
}