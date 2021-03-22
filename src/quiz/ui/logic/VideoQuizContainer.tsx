import React, { useCallback, useEffect, useState } from 'react';
import { useLectureMedia } from 'lecture/detail/service/useLectureMedia/useLectureMedia';
import { findQuiz } from 'quiz/api/QuizApi';
import QuizTableList from 'quiz/model/QuizTableList';
import VideoQuizContentContainer from './VideoQuizContentContainer';

interface Props {
  onCompletedQuiz: () => void;
}

const VideoQuizContainer:React.FC<Props> = ({
  onCompletedQuiz
}) => {
  const [_, lectureMedia] = useLectureMedia();
  const [quizData, setQuizData] = useState<QuizTableList>();

  useEffect(() => {
    const quizIds = lectureMedia?.mediaContents.internalMedias[0].quizIds[0]
    if(
      quizIds !== undefined && 
      quizIds !== null && 
      quizIds.length > 0 &&
      quizData === undefined
    ) {
      const getQuizTable = async() => {
        await findQuiz(quizIds).then(res => setQuizData(res))
      }
      getQuizTable();
    }
  }, [lectureMedia, quizData])

  return (
    <div className="video-quiz-wrap"> 
      <div className="video-quiz-header">
        <h1>Video QUIZ</h1>
        <p>답안을 제출해야 강의 이어보기가 가능합니다.</p>
      </div>
      <VideoQuizContentContainer
        questionData={quizData?.quizQuestions}
        onCompletedQuiz={onCompletedQuiz}
      />
    </div>
  )
}

export default VideoQuizContainer;