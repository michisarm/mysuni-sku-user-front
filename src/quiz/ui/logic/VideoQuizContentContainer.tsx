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
import { reactAlert } from '@nara.platform/accent';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';

const VideoQuizContentContainer = ({
  questionData,
  resultAlertMessage,
  onCompletedQuiz,
  setCheckQuizState,
}: {
  questionData: QuizQuestions[];
  resultAlertMessage: QuizMessage;
  onCompletedQuiz: () => void;
  setCheckQuizState: (state: any) => void;
}) => {
  const currentUser = patronInfo.getPatron();
  const currentMemberId = patronInfo.getDenizenId();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
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
      ]?.quizQuestionItems?.map((row, index): AnswerItem[] => {
        const createAnswerField: AnswerItem[] = [];
        if (
          questionData[currentIndex].type === 'ShortAnswer' ||
          questionData[currentIndex].type === 'Essay'
        ) {
          const userAnswerRow = { number: index + 1, answerItem: '' };
          createAnswerField.push(userAnswerRow);
          return createAnswerField;
        } else {
          const userAnswerRow = { number: index + 1, answerItem: false };
          createAnswerField.push(userAnswerRow);
          return createAnswerField;
        }
      });

      setUserAnswer({
        email: currentUser?.email,
        memberId: currentMemberId,
        quizQuestionId: questionData[currentIndex]?.id,
        quizQuestionAnswerItems: userAnswerField?.flat(),
      });
      setCheckQuizState(quizStatus.type === 'result' ? true : false);
    }
  }, [currentIndex, quizStatus, questionData]);

  const onChangeNextQuestion = useCallback(() => {
    if (questionData) {
      const quizMaxIndex = questionData?.length - 1;
      if (currentIndex < quizMaxIndex) {
        setQuizStatus({ status: false, type: '' });
        setCurrentIndex(currentIndex + 1);
      } else if (currentIndex === quizMaxIndex) {
        setCurrentIndex(currentIndex);
        setQuizStatus({ status: true, type: 'finish' });
      }
    }
  }, [questionData, currentIndex, quizStatus, userAnswer]);

  const onSubmitUserAnswer = useCallback(async () => {
    if (questionData) {
      if (questionData[currentIndex].answer) {
        // 정답체크의 경우
        const questionAnswers = questionData[
          currentIndex
        ].quizQuestionItems?.filter(
          (questionRow) => questionRow.answerItem === true
        );
        const userAnswers = userAnswer?.quizQuestionAnswerItems.filter(
          (userRow) => userRow.answerItem === true
        );
        const checkedAnswer = questionAnswers?.filter((answer) => {
          if (userAnswers.find((f) => f.number === answer.number)) {
            return answer;
          }
        });

        // 정답체크 => 정답체크 유효성 확인
        if (
          checkedAnswer?.length === userAnswers?.length &&
          userAnswers?.length === questionAnswers?.length
        ) {
          const params = {
            email: currentUser?.email,
            quizQuestionAnswerItems: userAnswer?.quizQuestionAnswerItems
              .filter((row) => row.answerItem === true)
              .map((row) => row.number),
            quizQuestionId: questionData[currentIndex]?.id,
          };
          await registerAnswer(params);
          setQuizStatus({ status: true, type: 'success' });
        } else {
          setQuizStatus({ status: true, type: 'fail' });
        }
      } else if (
        // 단일 객관식, 다중 객관식 답안제출의 경우
        !questionData[currentIndex].answer &&
        (questionData[currentIndex].type === 'SingleChoice' ||
          questionData[currentIndex].type === 'MultipleChoice')
      ) {
        // 답변 Null Check
        const noAnswerCheck = userAnswer?.quizQuestionAnswerItems.filter(
          (answer) => answer.answerItem === true
        ).length;

        const params = {
          email: currentUser?.email,
          quizQuestionAnswerItems: userAnswer?.quizQuestionAnswerItems
            .filter((row) => row.answerItem === true)
            .map((row) => row.number),
          quizQuestionId: questionData[currentIndex]?.id,
        };

        if (noAnswerCheck === 0) {
          reactAlert({
            title: getPolyglotText('안내', 'Collage-VideoQuiz-안내1'),
            message: getPolyglotText(
              '답변을 확인해주세요.',
              'Collage-VideoQuiz-Subtitle안내1'
            ),
          });
          return;
        }

        setQuizStatus({ status: true, type: 'success' });

        await registerAnswer(params);

        // 단답형, 서술형 답안 제출의 경우
      } else if (!questionData[currentIndex].answer) {
        const noAnswerCheck =
          userAnswer?.quizQuestionAnswerItems[0].answerItem === '';

        const params = {
          email: currentUser?.email,
          quizQuestionAnswerItems: [
            JSON.stringify(userAnswer.quizQuestionAnswerItems[0].answerItem),
          ],
          quizQuestionId: questionData[currentIndex]?.id,
        };

        if (noAnswerCheck) {
          reactAlert({
            title: getPolyglotText('안내', 'Collage-VideoQuiz-안내2'),
            message: getPolyglotText(
              '답변을 확인해주세요.',
              'Collage-VideoQuiz-Subtitle안내2'
            ),
          });
          return;
        }
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
        const emptySummary = { 1: 0, 2: 0, 3: 0, 4: 0 };
        const summary = await findAnswerSummary(questionData[currentIndex]?.id);
        const combineSummary = Object.assign(
          emptySummary,
          summary.quizQuestionAnswerItemMap.numberCountMap
        );
        setSummaryCount(Object.values(combineSummary));
      }
      const limit = 10;
      const result: any = await findAllAnswer(
        questionData[currentIndex]?.id,
        limit,
        offset // state = 0
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
            { number: rowIndex + 1, answerItem: userAnswerItem },
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
      const nextOffset =
        limit + offset > resultData?.totalCount
          ? resultData?.totalCount
          : limit + offset;
      if (nextOffset === resultData?.totalCount) {
        return;
      }
      const nextResult: any = await findAllAnswer(
        questionData[currentIndex]?.id,
        limit,
        nextOffset
      );
      const next = resultData?.results.concat(nextResult?.results);
      setResultData({
        ...resultData,
        results: next,
      });
      setOffset(nextOffset);
    }
  }, [offset, questionData, resultData]);

  const onCompleteCurrentQuiz = () => {
    setQuizStatus({ status: false, type: '' });
    setCurrentIndex(0);
    onCompletedQuiz();
  };

  const successComment = () => {
    if (
      !questionData[currentIndex].resultView &&
      questionData[currentIndex].answer &&
      (questionData[currentIndex].type === 'SingleChoice' ||
        questionData[currentIndex].type === 'MultipleChoice')
    ) {
      return getPolyglotText('정답 입니다.', 'Collage-VideoQuiz-정답1');
    } else if (
      questionData[currentIndex].resultView &&
      (questionData[currentIndex].type === 'SingleChoice' ||
        questionData[currentIndex].type === 'MultipleChoice')
    ) {
      return getPolyglotText(
        '응답이 완료 되었습니다.',
        'Collage-VideoQuiz-응답완료1'
      );
    } else {
      return getPolyglotText(
        '응답이 완료 되었습니다.',
        'Collage-VideoQuiz-응답완료2'
      );
    }
  };

  return (
    <>
      {/* 퀴즈영역 */}
      {!quizStatus.status && quizStatus.type === '' && (
        <div className="quiz-content-wrap">
          <div className="video-quiz-content">
            <QuizHeaderView
              title={questionData[currentIndex]?.text}
              titleImage={questionData[currentIndex]?.img}
              question={questionData}
              currentIndex={currentIndex}
              onImageZoomPopup={onImageZoomPopup}
            />
            <QuizQuestionView
              question={questionData[currentIndex]}
              onImageZoomPopup={onImageZoomPopup}
              onChangeUserAnswer={onChangeUserAnswer}
              userAnswer={userAnswer}
            />
          </div>
          <div className="video-quiz-footer" style={{ position: 'absolute' }}>
            <button onClick={onSubmitUserAnswer} className="ui button fix bg">
              <PolyglotText
                defaultString="제출하기"
                id="Collage-VideoQuiz-제출하기"
              />
            </button>
          </div>
        </div>
      )}

      {/* 오답 패널 */}
      {quizStatus.status && quizStatus.type === 'fail' && questionData && (
        <div className="video-quiz-wrap sty2">
          <div className="video-quiz-header">
            <h1>
              <PolyglotText
                defaultString="Video QUIZ"
                id="Collage-VideoQuiz-Title2"
              />
            </h1>
          </div>
          <div className="quiz-content-wrap quiz-center-box">
            <div className="imgbox">
              <img
                style={{ maxWidth: '100%' }}
                src={
                  questionData[currentIndex].alertMessage.failImg
                    ? `/${questionData[currentIndex].alertMessage.failImg}`
                    : FailIcon
                }
              />
            </div>
            <span className="wro">
              <PolyglotText
                defaultString="오답 입니다."
                id="Collage-VideoQuiz-오답"
              />
            </span>
            <div
              className="wro2"
              style={{ width: '100%' }}
              dangerouslySetInnerHTML={{
                __html:
                  questionData[currentIndex].alertMessage.failMessage !== ''
                    ? `${questionData[currentIndex].alertMessage.failMessage}`
                    : getPolyglotText(
                        '다시 확인하고 제출하세요.',
                        'Collage-VideoQuiz-확인후제출'
                      ),
              }}
            />
          </div>
          <div className="video-quiz-footer">
            <button onClick={onCloseQuizPanel} className="ui button fix bg">
              <PolyglotText defaultString="확인" id="Collage-VideoQuiz-확인1" />
            </button>
          </div>
        </div>
      )}

      {/* 정답 패널 */}
      {quizStatus.status &&
        quizStatus.type === 'success' &&
        questionData &&
        //  !questionData[currentIndex].resultView &&
        questionData[currentIndex].answer &&
        questionData[currentIndex].alertMessage.passMessage !== '' && (
          <div className="video-quiz-wrap sty2">
            <div className="video-quiz-header">
              <h1>
                <PolyglotText
                  defaultString="Video QUIZ"
                  id="Collage-VideoQuiz-Title3"
                />
              </h1>
            </div>
            <div className="quiz-content-wrap quiz-center-box">
              <div className="imgbox">
                <img
                  style={{ maxWidth: '100%' }}
                  src={
                    questionData[currentIndex].alertMessage.passImg
                      ? `/${questionData[currentIndex].alertMessage.passImg}`
                      : CompleteIcon
                  }
                />
              </div>
              <span className="wro">
                <PolyglotText
                  defaultString="정답 입니다."
                  id="Collage-VideoQuiz-정답2"
                />
              </span>
              <div
                className="wro2"
                style={{ width: '100%' }}
                dangerouslySetInnerHTML={{
                  __html:
                    questionData[currentIndex].alertMessage.passMessage !== ''
                      ? `${questionData[currentIndex].alertMessage.passMessage}`
                      : getPolyglotText(
                          '딩동댕! 정답입니다. ',
                          'Collage-VideoQuiz-딩동댕'
                        ),
                }}
              />
            </div>
            <div className="video-quiz-footer">
              <button
                onClick={onChangeNextQuestion}
                className="ui button fix bg"
              >
                <PolyglotText
                  defaultString="확인"
                  id="Collage-VideoQuiz-확인2"
                />
              </button>
            </div>
          </div>
        )}

      {/* 답안제출 완료 */}
      {quizStatus.status &&
        quizStatus.type === 'success' &&
        questionData &&
        (!questionData[currentIndex].answer ||
          questionData[currentIndex].alertMessage.passMessage === '') && (
          <div className="video-quiz-wrap sty2">
            <div className="video-quiz-header">
              <h1>
                <PolyglotText
                  defaultString="Video QUIZ"
                  id="Collage-VideoQuiz-Title4"
                />
              </h1>
            </div>
            <div className="quiz-content-wrap quiz-center-box">
              <div className="imgbox">
                <img
                  style={{ maxWidth: '100%' }}
                  src={
                    questionData[currentIndex].alertMessage.passImg
                      ? `/${questionData[currentIndex].alertMessage.passImg}`
                      : CompleteIcon
                  }
                />
              </div>
              <span className="wro">{successComment()}</span>
            </div>
            <div className="video-quiz-footer">
              {questionData[currentIndex].resultView && (
                <button
                  onClick={onChangeResultAnswer}
                  className="ui button fix bg grey"
                >
                  <PolyglotText
                    defaultString="결과보기"
                    id="Collage-VideoQuiz-결과보기"
                  />
                </button>
              )}
              <button
                onClick={onChangeNextQuestion}
                className="ui button fix bg"
              >
                <PolyglotText
                  defaultString="확인"
                  id="Collage-VideoQuiz-확인3"
                />
              </button>
            </div>
          </div>
        )}

      {/* 퀴즈참여 완료 */}
      {quizStatus.status &&
        quizStatus.type === 'finish' &&
        questionData &&
        onCompleteCurrentQuiz()}

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
                    <img
                      style={{ maxWidth: '100%' }}
                      src={`/${questionData[currentIndex].img}`}
                    />
                  </button>
                )}
                <div
                  style={{ fontSize: '.875rem', color: '#699793' }}
                  dangerouslySetInnerHTML={{
                    __html:
                      `${questionData[currentIndex].subText}` ||
                      getPolyglotText(
                        '다른 분들의 의견을 살펴보세요!',
                        'Collage-VideoQuiz-다른의견1'
                      ),
                  }}
                />
              </div>
              <div className="quiz-question">
                <ul className="result-list">
                  {questionData[currentIndex].quizQuestionItems?.map(
                    (row, index) => {
                      const myAnswer = resultData?.results
                        .filter(
                          (list) => list.memberId === userAnswer?.memberId
                        )
                        .map((item) => item.quizQuestionAnswerItems)
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
                              style={{ maxWidth: '100%' }}
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
                                      resultData &&
                                      quizStatus.type === 'result' &&
                                      summaryCount &&
                                      summaryCount[index] &&
                                      questionData[currentIndex]?.type ===
                                        'SingleChoice'
                                        ? Math.round(
                                            (summaryCount[index] /
                                              resultData.totalCount) *
                                              100
                                          )
                                        : summaryCount &&
                                          summaryCount[index] &&
                                          questionData[currentIndex]?.type ===
                                            'MultipleChoice' &&
                                          multipleTotal
                                        ? Math.round(
                                            (summaryCount[index] /
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
                                {resultData &&
                                quizStatus.type === 'result' &&
                                summaryCount &&
                                summaryCount[index] &&
                                questionData[currentIndex]?.type ===
                                  'SingleChoice'
                                  ? Math.round(
                                      (summaryCount[index] /
                                        resultData.totalCount) *
                                        100
                                    )
                                  : summaryCount &&
                                    summaryCount[index] &&
                                    questionData[currentIndex]?.type ===
                                      'MultipleChoice' &&
                                    multipleTotal
                                  ? Math.round(
                                      (summaryCount[index] / multipleTotal) *
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
                              <img
                                style={{ maxWidth: '100%' }}
                                src={`/${row.img}`}
                              />
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
                  <PolyglotText
                    defaultString="확인"
                    id="Collage-VideoQuiz-확인4"
                  />
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
                    <img
                      style={{ maxWidth: '100%' }}
                      src={`/${questionData[currentIndex].img}`}
                    />
                  </button>
                )}
                <div
                  style={{ fontSize: '.875rem', color: '#699793' }}
                  dangerouslySetInnerHTML={{
                    __html:
                      `${questionData[currentIndex].subText}` ||
                      getPolyglotText(
                        '다른 분들의 의견을 살펴보세요!',
                        'Collage-VideoQuiz-다른의견2'
                      ),
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
                {resultData &&
                  resultData.totalCount > resultData.results.length && (
                    <div className="more-comments">
                      <Button
                        onClick={onLoadMore}
                        icon
                        className="left moreview"
                      >
                        <Icon className="moreview" />
                        <PolyglotText
                          defaultString="list more"
                          id="Collage-VideoQuiz-listmore"
                        />
                      </Button>
                    </div>
                  )}
              </div>
            </div>
            <div className="video-quiz-footer" style={{ position: 'absolute' }}>
              <button
                onClick={onChangeNextQuestion}
                className="ui button fix bg"
              >
                <PolyglotText
                  defaultString="확인"
                  id="Collage-VideoQuiz-확인5"
                />
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
