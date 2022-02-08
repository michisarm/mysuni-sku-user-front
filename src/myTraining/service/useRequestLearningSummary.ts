import moment from 'moment';
import { useEffect } from 'react';
import MyLearningSummaryService from '../present/logic/MyLearningSummaryService';

export function useRequestLearningSummary() {
  useEffect(() => {
    requestMyLearningSummary();
    // requestLectureTimeSummary();
  }, []);
}

export const requestMyLearningSummary = () => {
  const currentYear = moment().year();
  // const currentYear = 2019;
  MyLearningSummaryService.instance.findMyLearningSummaryByYear(currentYear);
};

// const requestLectureTimeSummary = () => {
//   const lectureTimeSummary = MyLearningSummaryService.instance.lectureTimeSummary;

//   if (lectureTimeSummary) {
//     return;
//   }

//   MyLearningSummaryService.instance.findLectureTimeSummary();
// }
