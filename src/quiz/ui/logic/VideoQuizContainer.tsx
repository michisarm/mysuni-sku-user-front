import React, { useEffect, useState } from 'react';
import { findAllQuiz } from 'quiz/api/QuizApi';
import QuizTableList from 'quiz/model/QuizTableList';
import VideoQuizContentContainer from './VideoQuizContentContainer';
import { useLectureMedia } from '../../../lecture/detail/store/LectureMediaStore';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';
import { zIndex } from 'html2canvas/dist/types/css/property-descriptors/z-index';

interface Props {
  quizPop: boolean;
  isSticked: boolean;
  onCompletedQuiz: () => void;
  quizCurrentIndex: number;
}

const VideoQuizContainer: React.FC<Props> = ({
  onCompletedQuiz,
  quizPop,
  quizCurrentIndex,
  isSticked,
}) => {
  const lectureMedia = useLectureMedia();
  const [quizData, setQuizData] = useState<QuizTableList>();
  const [checkQuizState, setCheckQuizState] = useState<boolean>(false);

  useEffect(() => {
    if (lectureMedia?.mediaContents.internalMedias[0].quizIds) {
      const quizIds = lectureMedia?.mediaContents.internalMedias[0].quizIds;
      const quizId = quizIds?.join(',');
      const getQuizTable = async () => {
        await findAllQuiz(quizId).then((res) => {
          if (res) {
            const findQuizTable = res
              .sort(
                (a: QuizTableList, b: QuizTableList) => a.showTime - b.showTime
              )
              .find(
                (quiz: QuizTableList, index: number) =>
                  index === quizCurrentIndex
              );
            setQuizData(findQuizTable);
          }
        });
      };
      getQuizTable();
    }
  }, [lectureMedia, quizCurrentIndex, quizPop]);

  return (
    <div
      className="video-quiz-wrap"
      style={
        quizPop && !isSticked
          ? { display: 'block', zIndex: 10 }
          : { display: 'none', zIndex: 10 }
      }
    >
      <div className="video-quiz-header">
        <h1>
          <PolyglotText
            defaultString="Video QUIZ"
            id="Collage-VideoQuiz-Title1"
          />
        </h1>
        {!checkQuizState && (
          <p>
            <PolyglotText
              defaultString="답안을 제출해야 강의 이어보기가 가능합니다."
              id="Collage-VideoQuiz-SubTitle이어보기"
            />
          </p>
        )}
      </div>

      {quizData && quizData.quizQuestions && quizData.resultAlertMessage && (
        <VideoQuizContentContainer
          questionData={quizData.quizQuestions.sort(
            (prevQuiz, nextQuiz) => prevQuiz.number - nextQuiz.number
          )}
          resultAlertMessage={quizData.resultAlertMessage}
          onCompletedQuiz={onCompletedQuiz}
          setCheckQuizState={setCheckQuizState}
        />
      )}
    </div>
  );
};

export default React.memo(VideoQuizContainer);
