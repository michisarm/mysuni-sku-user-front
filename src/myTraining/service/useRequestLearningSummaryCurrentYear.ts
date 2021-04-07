import moment from 'moment';
import { useEffect } from 'react';
import MyLearningSummaryService from '../present/logic/MyLearningSummaryService';

export function useRequestLearningSummaryCurrentYear() {
  const currentYear = moment().year();

  useEffect(() => {
    MyLearningSummaryService.instance.findMyLearningSummaryByYear(currentYear);
  }, []);
}