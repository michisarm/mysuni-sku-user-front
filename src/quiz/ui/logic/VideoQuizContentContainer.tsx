import React, { useCallback, useEffect, useState } from 'react';
import { UserAnswer } from 'quiz/model/QuizAnswer';
import QuizQuestions from 'quiz/model/QuizQuestions';
import QuizHeaderView from '../view/quiz/QuizHeaderView';
import QuizQuestionView from '../view/quiz/QuizQuestionView';
import QuizImagePopup from '../view/popup/QuizImagePopup';
import { AnswerItem } from 'quiz/model/QuizAnswerItem';
import {Icon,Button} from "semantic-ui-react";

const VideoQuizContentContainer = ({
  questionData,
  onCompletedQuiz
} : {
  questionData: QuizQuestions[] | undefined
  onCompletedQuiz: () => void;
}) => {
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [quizStatus, setQuizStatus] = useState<{status: boolean, type: string}>({
    status: false,
    type:'',
  });
  const [imagePopOpen, setImagePopOpen] = useState<boolean>(false);
  const [imageInfo, setImageInfo] = useState({
    title:'',
    src:'',
  }) 
  const [userAnswer, setUserAnswer] = useState<UserAnswer>({
    email:'',
    memberId: '',
    quizQuestionAnswerItems:[],
    quizQuestionId: ''
  })

  useEffect(() => {
    if(questionData) {
      const userAnswerField: any = questionData[currentIndex]?.quizQuestionItems?.map((_, index): AnswerItem[] => {
        const createAnswerField : AnswerItem[] = []
        const userAnswerRow = { number: index + 1, answerItem: false }
        createAnswerField.push(userAnswerRow)
        return createAnswerField
      })
      setUserAnswer({
        ...userAnswer,
        quizQuestionId: questionData[currentIndex]?.id,
        quizQuestionAnswerItems: userAnswerField?.flat()
      });
    }
  }, [questionData, currentIndex, quizStatus])
  
  const onChangeNextQuestion = useCallback((type?: string) => {
    if(questionData) {
      console.log(type)
      const quizMaxIndex = questionData?.length - 1;
      if(questionData[currentIndex].answer && currentIndex < quizMaxIndex) {
        // 답안 체크
        const questionAnswers = questionData[currentIndex].quizQuestionItems?.filter(questionRow => questionRow.answerItem === true)
        const userAnswers = userAnswer?.quizQuestionAnswerItems.filter(userRow => userRow.answerItem === true)
        questionAnswers?.forEach((questionRow, questionIndex) => {
          userAnswers?.forEach((userRow, userIndex) => {
            if(questionIndex === userIndex && questionRow?.answerItem === userRow.answerItem) {
              setCurrentIndex(currentIndex + 1);
              setQuizStatus({
                status:true,
                type:'success',
              })
            } else {
              setQuizStatus({
                status:true,
                type:'fail',
              })
            }
          })
        })
      } else if (type && type === 'next' && currentIndex < quizMaxIndex) {
        setCurrentIndex(currentIndex + 1);
        setQuizStatus({
          status:false,
          type:'',
        })
      } else if (type && type === 'next' && currentIndex === quizMaxIndex) {
        setQuizStatus({
          status:true,
          type:'finish',
        })
      } else if (!questionData[currentIndex].answer && currentIndex < quizMaxIndex) {
        //
        setQuizStatus({
          ...quizStatus,
          status: true,
          type: 'success'
        })
      } else if (questionData[currentIndex].answer && currentIndex === quizMaxIndex) {
        // 답안 체크
        console.log('this 2')
      } else if (!questionData[currentIndex].answer && currentIndex === quizMaxIndex) {
        //
        setQuizStatus({
          ...quizStatus,
          status: true,
          type: 'success'
        })
      }
    }
  }, [questionData, currentIndex, quizStatus, userAnswer])
  const onChangeUserAnswer = useCallback((rowIndex: number, userAnswerItem: boolean, text?: string) => {
    if(questionData && questionData[currentIndex].type === 'SingleChoice') {
      userAnswer?.quizQuestionAnswerItems.map((row, index) => {
        if(rowIndex === index) {
          row.answerItem = userAnswerItem;
        } else {
          row.answerItem = false
        }
        return row
      })
      console.log(userAnswer)
    }
    
    if(questionData && questionData[currentIndex].type === 'MultipleChoice') {
      userAnswer?.quizQuestionAnswerItems.forEach((row, index) => {
        if(rowIndex === index) {
          row.answerItem = userAnswerItem;
        }
        return row
      })
      // setUserAnswer({
      //   ...userAnswer,
      // })
      console.log(userAnswer)
    }

  }, [questionData, userAnswer])

  console.log(userAnswer)
  const onImageZoomPopup = (titleValue:string, srcValue:string) => {
    setImagePopOpen(!imagePopOpen);
    setImageInfo({
      title: titleValue,
      src: srcValue
    })
  }

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
          <div className="video-quiz-footer">
            <button onClick={() => onChangeNextQuestion()} className="ui button fix bg">제출하기</button>
          </div>
        </div>
      )}

      {/* 제출 후 영역 */}
      {quizStatus.status && quizStatus.type === 'fail' && (
        <div className="video-quiz-wrap sty2">
          <div className="video-quiz-header">
            <h1>Video QUIZ</h1>
          </div>
          <div className="quiz-content-wrap quiz-center-box">
            <img src="" />
            <span className="wro">오답 입니다.</span>
            <span className="wro2">다시 확인하고 제출하세요.</span>
          </div>
          <div className="video-quiz-footer">
            <button onClick={() => setQuizStatus({status: false, type: ''})} className="ui button fix bg">확인</button>
          </div>
        </div>
      )}
      {quizStatus.status && quizStatus.type === 'success' && (
        <div className="video-quiz-wrap sty2">
          <div className="video-quiz-header">
            <h1>Video QUIZ</h1>
          </div>
          <div className="quiz-content-wrap quiz-center-box">
            <img src=""/>
            <span className="wro">답안 제출이 완료됐습니다.</span>
            <span className="wro2">다른 참여자의 의견을 확인할 수 있습니다.</span>
          </div>
          <div className="video-quiz-footer">
            <button onClick={() => setQuizStatus({...quizStatus, type:"result"})} className="ui button fix bg grey">결과보기</button>
            <button onClick={() => onChangeNextQuestion('next')} className="ui button fix bg">확인</button>
          </div>
        </div>
      )}
      {quizStatus.status && quizStatus.type === 'finish' && (
        <div className="video-quiz-wrap sty2">
          <div className="video-quiz-header">
            <h1>Video QUIZ</h1>
          </div>
          <div className="quiz-content-wrap quiz-center-box">
            <img src="" />
            <span className="wro">퀴즈 참여가 완료됐습니다.</span>
            <span className="wro2">계속해서 영상을 이어보세요.</span>
          </div>
          <div className="video-quiz-footer">
            <button onClick={onCompletedQuiz} className="ui button fix bg">확인</button>
          </div>
        </div>
      )}

      {/* 결과보기 영역 */}
      {
        quizStatus.status &&
        quizStatus.type === 'result' &&
        questionData && (questionData[currentIndex].type === 'SingleChoice' || questionData[currentIndex].type === 'MultipleChoice') && (
        <div className="quiz-content-wrap">
          <div className="video-quiz-content result-survey">
            <div className="quiz-header">
              <h2>잘 만든 기획서에 대한 당신의 선택은?</h2>
              <button className="quiz-preview-img">
                <img src="" />
              </button>
              <p className="hint">다른 분들의 의견을 살펴보세요.</p>
            </div>
            <div className="quiz-question">
              {/* 타인이 선택한 항목 : color-others*/}
              {/* 내가 선택한 항목 : color-mine */}
              {/* <li className="mine"> */}
              <ul className="result-list">
                <li>
                  <span className="course-survey-list-btnImg">
                    <img src=""/>
                  </span>
                  <p>스티브 잡스의 PT와 같은 핵심만 간결한 기획서 긴문장 말줄임 예시입니다.예시구요.예시랍니다</p>
                  <div className="card-gauge-bar sty2 color-others">
                    <div className="rangeBox">
                      <div className="range">
                        <div style={{ width: "22%" }} className="percent"/>
                      </div>
                      <span>22<em>%</em></span>
                    </div> 
                  </div>
                  <button className="quiz-preview-img">
                    <img src="" />
                  </button>
                </li>
              </ul>
            </div>
            <div className="video-quiz-footer">
              <button onClick={() => onChangeNextQuestion('next')} className="ui button fix bg">확인</button>
            </div>
          </div>
        </div>
      )}
      {
        quizStatus.status &&
        quizStatus.type === 'result' &&
        questionData && (questionData[currentIndex].type === 'ShortAnswer' || questionData[currentIndex].type === 'Essay') && (
        <div className="quiz-content-wrap">
          <div className="video-quiz-content">
            <div className="quiz-header">
              <h2>
                잘 만든 기획서는 기획서에 대한 당신의 선택은?
              </h2>
              <button className="quiz-preview-img">
                <img src="" />
              </button>
              <p>다른 분들의 의견을 살펴보세요.</p>
            </div>
            <div className="quiz-descriptive">
              <div className="descriptive-box">
                <span>ab****</span>
                <p>
                  스티브 잡스의 PT와 같은 핵심만 간결한 기획서이지만 명확한 의도 전달을 위한 적절한 예시가 반드시 필요하다고<br/>
                  생각합니다.
                </p>
              </div>
              <div className="more-comments">
                <Button icon className="left moreview">
                  <Icon className="moreview"/>list more
                </Button>
              </div>
            </div>
          </div>
          <div className="video-quiz-footer">
            <button onClick={() => onChangeNextQuestion('next')} className="ui button fix bg">확인</button>
          </div>
        </div>
      )}
      <QuizImagePopup 
        open={imagePopOpen}
        setOpen={setImagePopOpen}
        imageInfo={imageInfo}
      />
    </>
  )
}

export default VideoQuizContentContainer;