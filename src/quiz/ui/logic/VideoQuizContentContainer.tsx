import React, { useCallback, useEffect, useState } from 'react';
import { UserAnswer } from 'quiz/model/QuizAnswer';
import QuizQuestions from 'quiz/model/QuizQuestions';
import QuizFooterView from '../view/quiz/QuizFooterView';
import QuizHeaderView from '../view/quiz/QuizHeaderView';
import QuizQuestionView from '../view/quiz/QuizQuestionView';
import QuizImagePopup from '../view/popup/QuizImagePopup';
import { AnswerItem } from 'quiz/model/QuizAnswerItem';

const VideoQuizContentContainer = ({
  questionData
} : {
  questionData: QuizQuestions[] | undefined
}) => {
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [quizStatus, setQuizStatus] = useState<string>('');
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
        createAnswerField.push(userAnswerRow);
        return createAnswerField
      })
      console.log(userAnswerField)
      setUserAnswer({
        ...userAnswer,
        quizQuestionId: questionData[currentIndex]?.id,
        quizQuestionAnswerItems: userAnswerField?.flat()
      });
    }
    
  }, [questionData])

  console.log(questionData&&questionData[currentIndex])

  const onChangeNextQuestion = useCallback(() => {
    if(questionData) {
      const quizMaxIndex = questionData?.length - 1;
      if (currentIndex < quizMaxIndex) {
      setCurrentIndex(currentIndex + 1)
      }
    }
  }, [questionData, currentIndex])

  const onChangeUserAnswer = useCallback((rowIndex: number, answerItem: boolean) => {
    console.log(userAnswer.quizQuestionAnswerItems[rowIndex])
    setUserAnswer({
      ...userAnswer,

    })
  }, [questionData, userAnswer])

  const onChangeQuestionPanel = useCallback((quizStatus: string) => {
    
  }, [quizStatus])

  const onImageZoomPopup = (titleValue:string, srcValue:string) => {
    setImagePopOpen(!imagePopOpen);
    setImageInfo({
      title: titleValue,
      src: srcValue
    })
  }

  return (
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
        testType="Essay"
        // { value: 'SingleChoice', text: '단일 객관식' },
        // { value: 'MultiChoice', text: '다중 객관식' },
        // { value: 'ShortAnswer', text: '단답형' },
        // { value: 'Essay', text: '서술형' },
      />
      <QuizFooterView
        onChangeNextQuestion={onChangeNextQuestion}
        quizStatus={quizStatus}
      />
      <QuizImagePopup 
        open={imagePopOpen}
        setOpen={setImagePopOpen}
        imageInfo={imageInfo}
      />
    </div>
  )
}

export default VideoQuizContentContainer;