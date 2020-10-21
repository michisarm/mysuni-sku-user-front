import { axiosApi } from '@nara.platform/accent';
import AnswerSheet from '../model/AnswerSheet';
import CubeIntro from '../model/CubeIntro';
import PersonalCube from '../model/PersonalCube';

const BASE_URL = '/api/assistant/v1';

interface FindAnswerSheetData {
  result: AnswerSheet | null;
}

export function findAnswerSheet(
  examId: string,
  examineeId: string
): Promise<FindAnswerSheetData> {
  const url = `${BASE_URL}/answersheets?examId=${examId}&examineeId=${examineeId}`;
  return axiosApi
    .get<FindAnswerSheetData>(url)
    .then(response => response && response.data);
}
