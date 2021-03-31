import QuizQuestions from 'quiz/model/QuizQuestions';
import QuizTableList from 'quiz/model/QuizTableList';
import React from 'react';

interface Props {
  title: string;
  titleImage: string;
  question: QuizQuestions[];
  currentIndex: number;
  onImageZoomPopup: (title: string, src: string) => void;
}

const QuizHeaderView: React.FC<Props> = ({
  title,
  titleImage,
  question,
  currentIndex,
  onImageZoomPopup,
}) => {
  return (
    <div className="quiz-header">
      <div className={`quiz-paging step0${currentIndex + 1}`}>
        {question?.map((_, index) => (
          <span key={index} />
        ))}
      </div>
      <h2
        dangerouslySetInnerHTML={{
          __html: `${title}`,
        }}
      />
      {titleImage !== '' && (
        <button
          onClick={() => onImageZoomPopup(title!, titleImage!)}
          className="quiz-preview-img"
        >
          <img src={`/${titleImage}`} />
        </button>
      )}
    </div>
  );
};

export default QuizHeaderView;
