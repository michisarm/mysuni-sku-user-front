import { axiosApi as axios } from '@nara.platform/accent';
import QuizTableList from '../model/QuizTableList';

const BASE_URL = '/api/quiz/quiz';
const ANSWER_URL = '/api/quiz/quizQuestionAnswer';

// 퀴즈 등록
export function registerQuiz(quizTableList: QuizTableList): Promise<string> {
  return axios
    .post<string>(`${BASE_URL}`, quizTableList)
    .then(response => response?.data);
}

// 퀴즈 삭제
export function deleteQuiz(quizId: string): Promise<any> {
  // /api/quiz/quiz/0ed79011-0eea-41bf-8c3c-b58bf4867607
  return axios.delete(`${BASE_URL}/${quizId}`);
}

// 퀴즈 수정
export function modifyQuiz(
  quizId: string,
  changeValue: QuizTableList
): Promise<any> {
  // /api/quiz/quiz/1892fa45-9a1d-40c4-8c25-f3ebbb756cce
  return axios
    .put<any>(`${BASE_URL}/${quizId}`, changeValue)
    .then(response => response?.data);
}
// 전체 퀴즈조회
export function findAllQuiz(quizId: string): Promise<any> {
  // /api/quiz/quiz?quizIds=0ed79011-0eea-41bf-8c3c-b58bf4867607,01fbf7ed-7bdf-4dda-a42d-2e62029335c2,1892fa45-9a1d-40c4-8c25-f3ebbb756cce
  // 리턴타입 변경하기
  return axios
    .get<any>(`${BASE_URL}?quizIds=${quizId}`)
    .then(response => response?.data);
}

// 단건 퀴즈조회
export function findQuiz(quizId: string): Promise<QuizTableList> {
  // /api/quiz/quiz/1892fa45-9a1d-40c4-8c25-f3ebbb756cce
  // 리턴타입 변경하기
  return axios
    .get<any>(`${BASE_URL}/${quizId}`)
    .then(response => response?.data);
}

// [//////////]

// 정답 등록
export function registerAnswer(answerInfo: any): Promise<string> {
  // api/quiz/quizQuestionAnswer
  return axios
    .post<string>(`${ANSWER_URL}`, answerInfo)
    .then(response => response?.data);
}

// 정답 수정
export function modifyAnswer(
  quizId: string,
  changeAnswerInfo: any
): Promise<any> {
  // /api/quiz/quizQuestionAnswer/94f10d09-4744-47ff-bf2b-ca29ef8c5e93

  return axios
    .put<any>(`${ANSWER_URL}/${quizId}`, changeAnswerInfo)
    .then(response => response?.data);
}

// 전체 정답 조회
export function findAllAnswer(
  quizId: string,
  limit: number,
  offset: number
): Promise<string> {
  // /api/quiz/quizQuestionAnswer?limit=5&offset=0&quizQuestionId=string

  return axios
    .get<any>(
      `${ANSWER_URL}?limit=${limit}&offset=${offset}&quizQuestionId=${quizId}`
    )
    .then(response => response?.data);
}

// 단건 정답 조회
export function findAnswer(quizId: string): Promise<any> {
  // /quizQuestionAnswer/{quizQuestionId}/{memberId}

  return axios
    .get<any>(`${ANSWER_URL}/${quizId}`)
    .then(response => response?.data);
}

// 단건 정답 결과조회
export function findAnswerSummary(questionId: string): Promise<any> {
  return axios
    .get<any>(`${ANSWER_URL}/summary/${questionId}`)
    .then(res => res.data);
}
