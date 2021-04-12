import moment from 'moment';
import { useEffect } from 'react';
import MyLearningSummaryService from '../present/logic/MyLearningSummaryService';

export function useRequestLearningSummaryCurrentYear() {
  const myLearningSummary = MyLearningSummaryService.instance.myLearningSummary;
  const currentYear = moment().year();

  useEffect(() => {
    if (myLearningSummary) {
      return;
    }

    MyLearningSummaryService.instance.findMyLearningSummaryByYear(currentYear);
  }, []);
}