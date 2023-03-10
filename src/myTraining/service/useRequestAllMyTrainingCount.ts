import { useEffect } from 'react';
import MyTrainingService from '../present/logic/MyTrainingService';
import { LectureService } from '../../lecture';
import AplService from '../present/logic/AplService';

export function useRequestAllMyTrainingCount() {
  useEffect(() => {
    // MyTrainingService.instance.findAllTabCount();
    // InMyLectureService.instance.findAllTabCount();
    // LectureService.instance.countRequiredLectures();
    // AplService.instance.findAllTabCount(CountType.patronKeyString);

    return () => {
      MyTrainingService.instance.clearAllTabCount();
      LectureService.instance.clearAllTabCount();
      AplService.instance.clearAplCount();
    };
  }, []);
}
