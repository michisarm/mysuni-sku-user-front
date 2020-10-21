import { axiosApi } from '@nara.platform/accent';
import ExamPaperForm from 'lecture/model/ExamPaperForm';
import Examination from '../model/Examination';

const BASE_URL = '/lp/adm/exam';

interface FindExaminationData {
  result: Examination;
}

interface FindExamPaperFormData {
  result: ExamPaperForm;
}

// http://localhost:3000/lp/adm/exam/examinations/CUBE-2k8/findExamination

export function findExamination(
  serviceId: string
): Promise<FindExaminationData> {
  const url = `${BASE_URL}/examinations/${serviceId}/findExamination`;
  return axiosApi
    .get<FindExaminationData>(url)
    .then(response => response && response.data);
}

// http://localhost:3000/lp/adm/exam/exampaper/20-101/findExamPaperForm

export function findExamPaperForm(
  paperId: string
): Promise<FindExamPaperFormData> {
  const url = `${BASE_URL}/exampaper/${paperId}/findExamPaperForm`;
  return axiosApi
    .get<FindExamPaperFormData>(url)
    .then(response => response && response.data);
}
