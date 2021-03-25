import React, { useCallback, useEffect, useState } from 'react';
import { UserAnswer } from 'quiz/model/QuizAnswer';
import QuizQuestions from 'quiz/model/QuizQuestions';
import QuizHeaderView from '../view/quiz/QuizHeaderView';
import QuizQuestionView from '../view/quiz/QuizQuestionView';
import QuizImagePopup from '../view/popup/QuizImagePopup';
import { AnswerItem } from 'quiz/model/QuizAnswerItem';
import { Icon, Button } from 'semantic-ui-react';
import { patronInfo } from '@nara.platform/dock';
import {
  findAllAnswer,
  findAnswer,
  findAnswerSummary,
  findQuiz,
  registerAnswer,
} from 'quiz/api/QuizApi';
import QuizMessage from 'quiz/model/QuizMessage';
import CompleteIcon from '../../../style/media/img-quiz-complete.png';
import FailIcon from '../../../style/media/img-quiz-wrong.png';
import FinishIcon from '../../../style/media/img-quiz-finish.png';
import EmptyIcon from '../../../style/media/survey-empty-btn.png';
import RadioIcon from '../../../style/media/survay-radio-btn.png';
import { QuizResult } from 'quiz/model/QuizResult';

const VideoQuizContentContainer = ({
  questionData,
  resultAlertMessage,
  onCompletedQuiz,
}: {
  questionData: QuizQuestions[] | undefined;
  resultAlertMessage: QuizMessage | undefined;
  onCompletedQuiz?: () => void;
}) => {
  const currentUser = patronInfo.getPatron();
  const currentMemberId = patronInfo.getDenizenId();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [resultData, setResultData] = useState<QuizResult>();
  const [summaryCount, setSummaryCount] = useState<number[]>();
  const [quizStatus, setQuizStatus] = useState<{
    status: boolean;
    type: string;
  }>({
    status: false,
    type: '',
  });
  const [imagePopOpen, setImagePopOpen] = useState<boolean>(false);
  const [imageInfo, setImageInfo] = useState({
    title: '',
    src: '',
  });
  const [userAnswer, setUserAnswer] = useState<UserAnswer>({
    email: '',
    memberId: '',
    quizQuestionAnswerItems: [],
    quizQuestionId: '',
  });

  useEffect(() => {
    if (questionData) {
      const userAnswerField: any = questionData[
        currentIndex
      ]?.quizQuestionItems?.map((_, index): AnswerItem[] => {
        const createAnswerField: AnswerItem[] = [];
        const userAnswerRow = { number: index + 1, answerItem: false };
        createAnswerField.push(userAnswerRow);
        return createAnswerField;
      });

      setUserAnswer({
        email: currentUser?.email,
        memberId: currentMemberId,
        quizQuestionId: questionData[currentIndex]?.id,
        quizQuestionAnswerItems: userAnswerField?.flat(),
      });
    }
  }, [questionData, currentIndex, quizStatus]);

  const onChangeNextQuestion = useCallback(() => {
    if (questionData) {
      const quizMaxIndex = questionData?.length - 1;
      if (currentIndex < quizMaxIndex) {
        setQuizStatus({ status: false, type: '' });
        setCurrentIndex(currentIndex + 1);
      } else if (currentIndex === quizMaxIndex) {
        setQuizStatus({ status: true, type: 'finish' });
      }
    }
  }, [questionData, currentIndex, quizStatus, userAnswer]);

  const onSubmitUserAnswer = useCallback(async () => {
    if (questionData) {
      if (questionData[currentIndex].answer) {
        // 정답 체크의 경우
        const questionAnswers = questionData[
          currentIndex
        ].quizQuestionItems?.filter(
          questionRow => questionRow.answerItem === true
        );
        const userAnswers = userAnswer?.quizQuestionAnswerItems.filter(
          userRow => userRow.answerItem === true
        );
        const checkedAnswer = questionAnswers?.filter(answer => {
          if (userAnswers.find(f => f.number === answer.number)) {
            return answer;
          }
        });
        if (
          checkedAnswer?.length === userAnswers?.length &&
          userAnswers?.length === questionAnswers?.length
        ) {
          setQuizStatus({ status: true, type: 'success' });
          const params = {
            email: currentUser?.email,
            quizQuestionAnswerItems: userAnswer?.quizQuestionAnswerItems
              .filter(row => row.answerItem === true)
              .map(row => row.number),
            quizQuestionId: questionData[currentIndex]?.id,
          };

          await registerAnswer(params);
        } else {
          setQuizStatus({ status: true, type: 'fail' });
        }
      } else if (
        // 단일 객관식, 다중 객관식 답안제출의 경우
        !questionData[currentIndex].answer &&
        (questionData[currentIndex].type === 'SingleChoice' ||
          questionData[currentIndex].type === 'MultipleChoice')
      ) {
        setQuizStatus({ status: true, type: 'success' });

        const params = {
          email: currentUser?.email,
          quizQuestionAnswerItems: userAnswer?.quizQuestionAnswerItems
            .filter(row => row.answerItem === true)
            .map(row => row.number),
          quizQuestionId: questionData[currentIndex]?.id,
        };

        await registerAnswer(params);
      } else if (!questionData[currentIndex].answer) {
        // 단답형, 서술형 답안 제출의 경우
        const params = {
          email: currentUser?.email,
          quizQuestionAnswerItems: [
            JSON.stringify(userAnswer.quizQuestionAnswerItems[0].answerItem),
          ],
          quizQuestionId: questionData[currentIndex]?.id,
        };
        setQuizStatus({ status: true, type: 'success' });
        await registerAnswer(params);
      }
    }
  }, [questionData, currentIndex, quizStatus, userAnswer, summaryCount]);

  const onChangeResultAnswer = useCallback(async () => {
    setQuizStatus({ status: true, type: 'result' });
    if (questionData) {
      if (
        questionData[currentIndex].type === 'SingleChoice' ||
        questionData[currentIndex].type === 'MultipleChoice'
      ) {
        const summary = await findAnswerSummary(questionData[currentIndex]?.id);
        setSummaryCount(
          Object.values(summary.quizQuestionAnswerItemMap.numberCountMap)
        );
      }
      const limit = 10;
      const result: any = await findAllAnswer(
        questionData[currentIndex]?.id,
        limit,
        0
      );
      setResultData(result);
    }
  }, [currentIndex, quizStatus, resultData, currentIndex, summaryCount]);

  const onCloseQuizPanel = useCallback(() => {
    setQuizStatus({ status: false, type: '' });
  }, [currentIndex, quizStatus]);

  const onChangeUserAnswer = useCallback(
    (rowIndex: number, userAnswerItem: boolean | string) => {
      if (
        questionData &&
        (questionData[currentIndex].type === 'ShortAnswer' ||
          questionData[currentIndex].type === 'Essay')
      ) {
        setUserAnswer({
          ...userAnswer,
          quizQuestionId: questionData[currentIndex]?.id,
          quizQuestionAnswerItems: [
            { number: rowIndex + 1, answerItem: userAnswerItem || '' },
          ],
        });
      }

      if (questionData && questionData[currentIndex].type === 'SingleChoice') {
        userAnswer?.quizQuestionAnswerItems.map((row, index) => {
          if (rowIndex === index) {
            row.answerItem = row.answerItem ? false : true;
          } else {
            row.answerItem = false;
          }
          return row;
        });
      }

      if (
        questionData &&
        questionData[currentIndex].type === 'MultipleChoice'
      ) {
        userAnswer?.quizQuestionAnswerItems.forEach((row, index) => {
          if (rowIndex === index) {
            row.answerItem = row.answerItem ? false : true;
          }
          return row;
        });
      }
    },
    [questionData, currentIndex, quizStatus, userAnswer]
  );

  const onImageZoomPopup = (titleValue: string, srcValue: string) => {
    setImagePopOpen(!imagePopOpen);
    setImageInfo({
      title: titleValue,
      src: srcValue,
    });
  };

  const onLoadMore = useCallback(async () => {
    if (questionData && resultData) {
      const limit = 10;
      const nextResult: any = await findAllAnswer(
        questionData[currentIndex]?.id,
        limit,
        resultData?.results?.length
      );
      const next = resultData?.results.concat(nextResult.results);
      setResultData({
        ...resultData,
        results: next,
      });
    }
  }, [resultData]);

  return (
    <>
      {/* 퀴즈영역 */}
      {!quizStatus.status && quizStatus.type === '' && (
        <div className="quiz-content-wrap">
          <div className="video-quiz-content">
            <QuizHeaderView
              title={questionData && questionData[currentIndex]?.text}
              titleImage={questionData && questionData[currentIndex]?.img}
              question={questionData && questionData}
              currentIndex={currentIndex}
              onImageZoomPopup={onImageZoomPopup}
            />
            <QuizQuestionView
              question={questionData && questionData[currentIndex]}
              onImageZoomPopup={onImageZoomPopup}
              onChangeUserAnswer={onChangeUserAnswer}
              userAnswer={userAnswer}
            />
          </div>
          <div className="video-quiz-footer" style={{ position: 'absolute' }}>
            <button onClick={onSubmitUserAnswer} className="ui button fix bg">
              제출하기
            </button>
          </div>
        </div>
      )}
      {/* 오답 패널 */}
      {quizStatus.status && quizStatus.type === 'fail' && questionData && (
        <div className="video-quiz-wrap sty2">
          <div className="video-quiz-header">
            <h1>Video QUIZ</h1>
          </div>
          <div className="quiz-content-wrap quiz-center-box">
            <img
              src={
                questionData[currentIndex].alertMessage.img
                  ? `/${questionData[currentIndex].alertMessage.img}`
                  : FailIcon
              }
            />
            <span className="wro">오답 입니다.</span>
            <div
              className="wro2"
              dangerouslySetInnerHTML={{
                __html:
                  `${questionData[currentIndex].alertMessage.message}` ||
                  '다시 확인하고 제출하세요.',
              }}
            />
          </div>
          <div className="video-quiz-footer">
            <button onClick={onCloseQuizPanel} className="ui button fix bg">
              확인
            </button>
          </div>
        </div>
      )}
      {/* 답안제출 완료 */}
      {quizStatus.status && quizStatus.type === 'success' && questionData && (
        <div className="video-quiz-wrap sty2">
          <div className="video-quiz-header">
            <h1>Video QUIZ</h1>
          </div>
          <div className="quiz-content-wrap quiz-center-box">
            <img src={CompleteIcon} />
            <span className="wro">답안 제출이 완료됐습니다.</span>
            {!questionData[currentIndex].answer && (
              <span className="wro2">
                다른 참여자의 의견을 확인할 수 있습니다.
              </span>
            )}
          </div>
          <div className="video-quiz-footer">
            {!questionData[currentIndex].answer && (
              <button
                onClick={onChangeResultAnswer}
                className="ui button fix bg grey"
              >
                결과보기
              </button>
            )}
            <button onClick={onChangeNextQuestion} className="ui button fix bg">
              확인
            </button>
          </div>
        </div>
      )}
      {/* 퀴즈참여 완료 */}
      {quizStatus.status && quizStatus.type === 'finish' && questionData && (
        <div className="video-quiz-wrap sty2">
          <div className="video-quiz-header">
            <h1>Video QUIZ</h1>
          </div>
          <div className="quiz-content-wrap quiz-center-box">
            <img
              src={
                resultAlertMessage?.img
                  ? `/${resultAlertMessage?.img}`
                  : FinishIcon
              }
            />
            <div
              className="wro"
              dangerouslySetInnerHTML={{
                __html:
                  `${resultAlertMessage?.message}` ||
                  '퀴즈 참여가 완료됐습니다!',
              }}
            />
            <span className="wro2">계속해서 영상을 이어보세요.</span>
          </div>
          <div className="video-quiz-footer">
            <button onClick={onCompletedQuiz} className="ui button fix bg">
              확인
            </button>
          </div>
        </div>
      )}

      {/* 결과보기 객관식 */}
      {quizStatus.status &&
        quizStatus.type === 'result' &&
        questionData &&
        (questionData[currentIndex].type === 'SingleChoice' ||
          questionData[currentIndex].type === 'MultipleChoice') && (
          <div className="quiz-content-wrap">
            <div className="video-quiz-content result-survey">
              <div className="quiz-header">
                <h2
                  dangerouslySetInnerHTML={{
                    __html: `${questionData[currentIndex].text}`,
                  }}
                />
                {questionData[currentIndex].img !== '' && (
                  <button
                    onClick={() =>
                      onImageZoomPopup(
                        questionData[currentIndex].text,
                        questionData[currentIndex].img
                      )
                    }
                    className="quiz-preview-img"
                  >
                    <img src={`/${questionData[currentIndex].img}`} />
                  </button>
                )}
                <div
                  style={{ fontSize: '.875rem', color: '#699793' }}
                  dangerouslySetInnerHTML={{
                    __html:
                      `${questionData[currentIndex].subText}` ||
                      '다른 분들의 의견을 살펴보세요!',
                  }}
                />
              </div>
              <div className="quiz-question">
                <ul className="result-list">
                  {questionData[currentIndex].quizQuestionItems?.map(
                    (row, index) => {
                      const myAnswer = resultData?.results
                        .filter(list => list.memberId === userAnswer?.memberId)
                        .map(item => item.quizQuestionAnswerItems)
                        .flat();
                      const multipleTotal = summaryCount?.reduce(
                        (prev, crr) => prev + crr
                      );
                      return (
                        <li
                          key={index}
                          className={
                            myAnswer?.includes((index + 1).toString()) === true
                              ? 'mine'
                              : ''
                          }
                        >
                          <span className="course-survey-list-btnImg">
                            <img
                              src={
                                myAnswer?.includes((index + 1).toString()) ===
                                true
                                  ? RadioIcon
                                  : EmptyIcon
                              }
                            />
                          </span>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: `${row.text}`,
                            }}
                            style={{
                              display: 'inline-block',
                              cursor: 'default',
                            }}
                          />
                          <div className="card-gauge-bar sty2 color-others">
                            <div className="rangeBox">
                              <div className="range">
                                <div
                                  style={{
                                    width: `${
                                      summaryCount &&
                                      resultData &&
                                      quizStatus.type === 'result' &&
                                      summaryCount![index] &&
                                      questionData[currentIndex]?.type ===
                                        'SingleChoice'
                                        ? Math.floor(
                                            (summaryCount![index] /
                                              resultData!.totalCount) *
                                              100
                                          )
                                        : questionData[currentIndex]?.type ===
                                            'MultipleChoice' && multipleTotal
                                        ? Math.floor(
                                            (summaryCount![index] /
                                              multipleTotal) *
                                              100
                                          )
                                        : 0
                                    }%`,
                                  }}
                                  className="percent"
                                />
                              </div>
                              <span style={{ marginLeft: '1rem' }}>
                                {summaryCount &&
                                resultData &&
                                quizStatus.type === 'result' &&
                                summaryCount![index] &&
                                questionData[currentIndex]?.type ===
                                  'SingleChoice'
                                  ? Math.floor(
                                      (summaryCount![index] /
                                        resultData!.totalCount) *
                                        100
                                    )
                                  : questionData[currentIndex]?.type ===
                                      'MultipleChoice' && multipleTotal
                                  ? Math.floor(
                                      (summaryCount![index] / multipleTotal) *
                                        100
                                    )
                                  : 0}
                                <em>%</em>
                              </span>
                            </div>
                          </div>
                          {row.img && (
                            <button
                              onClick={() =>
                                onImageZoomPopup(row.text, row.img)
                              }
                              className="quiz-preview-img"
                            >
                              <img src={`/${row.img}`} />
                            </button>
                          )}
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
              <div
                className="video-quiz-footer"
                style={{ position: 'absolute' }}
              >
                <button
                  onClick={onChangeNextQuestion}
                  className="ui button fix bg"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        )}
      {/* 결과보기 서술형 */}
      {quizStatus.status &&
        quizStatus.type === 'result' &&
        questionData &&
        (questionData[currentIndex].type === 'ShortAnswer' ||
          questionData[currentIndex].type === 'Essay') && (
          <div className="quiz-content-wrap">
            <div className="video-quiz-content">
              <div className="quiz-header">
                <h2
                  dangerouslySetInnerHTML={{
                    __html: `${questionData[currentIndex].text}`,
                  }}
                />
                {questionData[currentIndex].img !== '' && (
                  <button
                    onClick={() =>
                      onImageZoomPopup(
                        questionData[currentIndex].text,
                        questionData[currentIndex].img
                      )
                    }
                    className="quiz-preview-img"
                  >
                    <img src={`/${questionData[currentIndex].img}`} />
                  </button>
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      `${questionData[currentIndex].subText}` ||
                      '다른 분들의 의견을 살펴보세요!',
                  }}
                />
              </div>
              <div className="quiz-descriptive">
                {resultData && resultData.results.length > 0
                  ? resultData?.results.map((userList: any, index: number) => (
                      <div className="descriptive-box" key={index}>
                        <span>
                          {userList.email
                            ?.split('@')[0]
                            .substr(
                              0,
                              userList.email?.split('@')[0].length - 3
                            ) + '***'}
                        </span>
                        <p>{JSON.parse(userList.quizQuestionAnswerItems[0])}</p>
                      </div>
                    ))
                  : null}
                <div className="more-comments">
                  <Button onClick={onLoadMore} icon className="left moreview">
                    <Icon className="moreview" />
                    list more
                  </Button>
                </div>
              </div>
            </div>
            <div className="video-quiz-footer" style={{ position: 'absolute' }}>
              <button
                onClick={onChangeNextQuestion}
                className="ui button fix bg"
              >
                확인
              </button>
            </div>
          </div>
        )}
      <QuizImagePopup
        open={imagePopOpen}
        setOpen={setImagePopOpen}
        imageInfo={imageInfo}
      />
    </>
  );
};

export default VideoQuizContentContainer;
