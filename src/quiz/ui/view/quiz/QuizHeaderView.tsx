import QuizQuestions from 'quiz/model/QuizQuestions';
import QuizTableList from 'quiz/model/QuizTableList';
import React from 'react';

interface Props {
  title: string | undefined;
  titleImage: string | undefined
  question: QuizQuestions[] | undefined;
  currentIndex: number;
  onImageZoomPopup: (title: string, src: string) => void;
}

const QuizHeaderView:React.FC<Props> = ({
  title,
  titleImage,
  question,
  currentIndex,
  onImageZoomPopup
}) => {

  return (
    <div className="quiz-header">
      <div className={`quiz-paging step0${currentIndex + 1}`}>
        {question?.map((_, index) => (
          <span key={index} />
        ))}
      </div>
      <h2>
        {title}
      </h2>
      <button onClick={() => onImageZoomPopup(title!, titleImage!)} className="quiz-preview-img">
        <img src={`/${titleImage}`} />
      </button>
      <p>다른 분들의 의견을 살펴보세요.</p>
      <p className="hint">( 초성힌트  : ㅅㅌㅂ )</p>
    </div>
  )
}

export default QuizHeaderView;