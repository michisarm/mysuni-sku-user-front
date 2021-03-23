import React, { useCallback, useEffect, useState } from 'react';
import { UserAnswer } from 'quiz/model/QuizAnswer';
import QuizQuestions from 'quiz/model/QuizQuestions';
import QuizHeaderView from '../view/quiz/QuizHeaderView';
import QuizQuestionView from '../view/quiz/QuizQuestionView';
import QuizImagePopup from '../view/popup/QuizImagePopup';
import { AnswerItem } from 'quiz/model/QuizAnswerItem';
import {Icon,Button} from "semantic-ui-react";
import { patronInfo } from '@nara.platform/dock';
import { findAllAnswer, findAnswer, findQuiz, registerAnswer } from 'quiz/api/QuizApi';
import QuizMessage from 'quiz/model/QuizMessage';
import CompleteIcon from '../../../style/media/img-quiz-complete.png';
import FailIcon from '../../../style/media/img-quiz-wrong.png';
import FinishIcon from '../../../style/media/img-quiz-finish.png';
import EmptyIcon from '../../../style/media/survey-empty-btn.png';
import RadioIcon from '../../../style/media/survay-radio-btn.png';

const VideoQuizContentContainer = ({
  questionData,
  resultAlertMessage,
  onCompletedQuiz
} : {
  questionData: QuizQuestions[] | undefined,
  resultAlertMessage: QuizMessage | undefined;
  onCompletedQuiz: () => void;
}) => {
  const currentUser = patronInfo.getPatron();
  const currentMemberId = patronInfo.getDenizenId()
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
      const padding = '***'
      const blindEmail = currentUser?.email?.split('@')[0].substr(0,3) + padding;
      const userAnswerField: any = questionData[currentIndex]?.quizQuestionItems?.map((_, index): AnswerItem[] => {
        const createAnswerField : AnswerItem[] = []
        const userAnswerRow = { number: index + 1, answerItem: false }
        createAnswerField.push(userAnswerRow)
        return createAnswerField
      })
      setUserAnswer({
        email:blindEmail,
        memberId:currentMemberId,
        quizQuestionId: questionData[currentIndex]?.id,
        quizQuestionAnswerItems: userAnswerField?.flat()
      });
    }
    console.log(questionData && questionData[currentIndex]?.id)
  }, [questionData, currentIndex, quizStatus])
  
  const onChangeNextQuestion = useCallback(() => {
    if(questionData) {
      const quizMaxIndex = questionData?.length - 1;
      if(currentIndex < quizMaxIndex) {
        setQuizStatus({status:false, type:''})
        setCurrentIndex(currentIndex + 1);
      } else if (currentIndex === quizMaxIndex) {
        setQuizStatus({status:true, type:'finish'})
      }
    }
  }, [questionData, currentIndex, quizStatus, userAnswer])
  
  const onSubmitUserAnswer = useCallback(async () => {
    if(questionData) {
      if(questionData[currentIndex].answer) {
        // 정답 체크의 경우
        const questionAnswers = questionData[currentIndex].quizQuestionItems?.filter(questionRow => questionRow.answerItem === true)
        const userAnswers = userAnswer?.quizQuestionAnswerItems.filter(userRow => userRow.answerItem === true);
        const checkedAnswer = questionAnswers?.filter(answer=> {
          if(userAnswers.find(f=>f.number===answer.number)){
            return answer;
          }}).length
        if(checkedAnswer === questionAnswers?.length) {
          // await registerAnswer(JSON.stringify({
          //   email:currentUser?.email,
          //   memberId:currentMemberId,
          //   quizQuestionId: questionData[currentIndex]?.id,
          //   quizQuestionAnswerItems: [userAnswers?.find(f => f.answerItem === true)]
          // }))
          setQuizStatus({status:true, type:'success'})
        } else {
          setQuizStatus({status:true, type:'fail'})
        }
      } else if (!questionData[currentIndex].answer) {
        // 답안 제출의 경우
        setQuizStatus({status:true, type:'success'})
      }
    }
    console.log(userAnswer)
  }, [questionData, currentIndex, quizStatus, userAnswer])

  const onChangeResultAnswer = useCallback(() => {
    setQuizStatus({status:true, type:'result'})
  }, [currentIndex, quizStatus])

  const onCloseQuizPanel = useCallback(() => {
    setQuizStatus({status:false, type:''})
  }, [currentIndex, quizStatus])

  const onChangeUserAnswer = useCallback((rowIndex: number, userAnswerItem: boolean | string) => {
    if(questionData && (questionData[currentIndex].type === 'ShortAnswer' || questionData[currentIndex].type === 'Essay')) {
      setUserAnswer({
        ...userAnswer,
        quizQuestionId: questionData[currentIndex]?.id,
        quizQuestionAnswerItems: [{number: rowIndex + 1, answerItem: userAnswerItem}]
      })
    }

    if(questionData && questionData[currentIndex].type === 'SingleChoice') {
      userAnswer?.quizQuestionAnswerItems.map((row, index) => {
        if(rowIndex === index) {
          row.answerItem = userAnswerItem;
        } else {
          row.answerItem = false
        }
        return row
      })
    }
    
    if(questionData && questionData[currentIndex].type === 'MultipleChoice') {
      userAnswer?.quizQuestionAnswerItems.forEach((row, index) => {
        if(rowIndex === index) {
          row.answerItem = userAnswerItem;
        }
        return row
      })
    }

  }, [questionData, currentIndex, quizStatus, userAnswer])

  const onImageZoomPopup = (titleValue:string, srcValue:string) => {
    setImagePopOpen(!imagePopOpen);
    setImageInfo({
      title: titleValue,
      src: srcValue
    })
  }

  useEffect(() => {
    const test = async() => {
      await findAnswer(userAnswer?.quizQuestionId, userAnswer?.memberId).then(res => res)
    }
    console.log(test())
  }, [userAnswer])

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
            <button onClick={onSubmitUserAnswer} className="ui button fix bg">제출하기</button>
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
            <img src={questionData[currentIndex].alertMessage.img ? `/${questionData[currentIndex].alertMessage.img}` : FailIcon} />
            <span className="wro">오답 입니다.</span>
            <span className="wro2">{questionData[currentIndex].alertMessage.message || '다시 확인하고 제출하세요.'}</span>
          </div>
          <div className="video-quiz-footer">
            <button onClick={onCloseQuizPanel} className="ui button fix bg">확인</button>
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
            <img src={questionData[currentIndex].img ? `/${questionData[currentIndex].img}` : CompleteIcon} />
            <span className="wro">답안 제출이 완료됐습니다.</span>
            <span className="wro2">{questionData[currentIndex].subText || '다른 참여자의 의견을 확인할 수 있습니다.'}</span>
          </div>
          <div className="video-quiz-footer">
            <button onClick={onChangeResultAnswer} className="ui button fix bg grey">결과보기</button>
            <button onClick={onChangeNextQuestion} className="ui button fix bg">확인</button>
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
            <img src={resultAlertMessage?.img ? `/${resultAlertMessage?.img}` : FinishIcon} />
            <span className="wro">{resultAlertMessage?.message || '퀴즈 참여가 완료됐습니다!'}</span>
            <span className="wro2">계속해서 영상을 이어보세요.</span>
          </div>
          <div className="video-quiz-footer">
            <button className="ui button fix bg">확인</button>
          </div>
        </div>
      )}

      {/* 결과보기 객관식 */}
      {quizStatus.status &&
        quizStatus.type === 'result' &&
        questionData && (questionData[currentIndex].type === 'SingleChoice' || questionData[currentIndex].type === 'MultipleChoice') && (
        <div className="quiz-content-wrap">
          <div className="video-quiz-content result-survey">
            <div className="quiz-header">
              <h2>{questionData[currentIndex].text}</h2>
              {
                questionData[currentIndex].img && (
                  <button onClick={() => onImageZoomPopup(questionData[currentIndex].text, questionData[currentIndex].img)} className="quiz-preview-img">
                    <img src={`/${questionData[currentIndex].img}`} />
                  </button>
                )
              }
              <p className="hint">{questionData[currentIndex].subText || '다른 분들의 의견을 살펴보세요!'}</p>
            </div>
            <div className="quiz-question">
              <ul className="result-list">
                {
                  questionData[currentIndex].quizQuestionItems?.map((row, index) => (
                    <li key={index} className={row.answerItem === true ? 'mine' : ''}>
                      <span className="course-survey-list-btnImg">
                        <img src={row.answerItem === true ? RadioIcon : EmptyIcon}/>
                      </span>
                      <p>{row.text}</p>
                      <div className="card-gauge-bar sty2 color-others">
                        <div className="rangeBox">
                          <div className="range">
                            <div style={{ width: "22%" }} className="percent"/>
                          </div>
                          <span>22<em>%</em></span>
                        </div> 
                      </div>
                      {
                        row.img && (
                          <button onClick={() => onImageZoomPopup(row.text, row.img)} className="quiz-preview-img">
                            <img src={`/${row.img}`} />
                          </button>
                        )
                      }
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className="video-quiz-footer">
              <button onClick={onChangeNextQuestion} className="ui button fix bg">확인</button>
            </div>
          </div>
        </div>
      )}
      {/* 서술형 */}
      {quizStatus.status &&
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
              <p>{questionData[currentIndex].subText || '다른 분들의 의견을 살펴보세요!'}</p>
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
            <button onClick={onChangeNextQuestion} className="ui button fix bg">확인</button>
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