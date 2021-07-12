import React, { useCallback, useEffect, useRef, useState } from 'react';
import QuizQuestions from 'quiz/model/QuizQuestions';
import { List, Radio, Checkbox, Icon } from 'semantic-ui-react';
import QuizItem from 'quiz/model/QuizItem';
import { UserAnswer } from 'quiz/model/QuizAnswer';
import { getPolyglotText, PolyglotText } from '../../../../shared/ui/logic/PolyglotText';

interface Props {
  question: QuizQuestions;
  onImageZoomPopup: (title: string, src: string) => void;
  userAnswer: UserAnswer;
  onChangeUserAnswer: (
    index: number,
    answerItem: boolean,
    text?: string
  ) => void;
}

const activeStyle = {
  color: '#6c788f',
  fontWeight: 700,
  display: 'inline-block',
};

// 서술형 타입
function EssayType({
  row,
  rowIndex,
  userAnswer,
  onChange,
}: {
  row: QuizItem;
  rowIndex: number;
  userAnswer: UserAnswer;
  onChange: (index: number, text: string) => void;
  // onImageZoomPopup: (title: string, src: string) => void;
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const inputCurrentValue = useRef<any>(null);
  useEffect(() => {
    inputCurrentValue.current = inputRef.current?.value.length;
  }, [inputRef.current?.value]);

  return (
    <div className="preview">
      <div className="ui form">
        <div className="ui right-top-count input descriptive">
          {/*error*/}
          <span className="count">
            <span className="now">{inputRef.current?.value.length}</span>/
            <span className="max">
              <PolyglotText defaultString="1,000" id="Collage-VideoQuiz-천자" />
            </span>
          </span>
          <textarea
            placeholder={getPolyglotText('1,000자 이내로 입력하세요.', 'Collage-VideoQuiz-Max1000')}
            ref={inputRef}
            maxLength={999}
            minLength={1}
            onChange={() => onChange(rowIndex, inputRef!.current!.value)}
          />
          <span className="validation">
            <PolyglotText defaultString="You can enter up to 1,000 characters." id="Collage-VideoQuiz-Subtitle100" />
          </span>
        </div>
      </div>
    </div>
  );
}

// 단답형 타입
function ShortAnswerType({
  row,
  rowIndex,
  userAnswer,
  onChange,
  onImageZoomPopup,
}: {
  row: QuizItem;
  rowIndex: number;
  userAnswer: UserAnswer;
  onChange: (index: number, text?: string) => void;
  onImageZoomPopup: (title: string, src: string) => void;
}) {
  const [input, setInput] = useState<string>('');
  const onChangeInput = useCallback(
    (e: any) => {
      const {
        target: { value },
      } = e;
      setInput(value);
      onChange(rowIndex, value);
    },
    [onChange, rowIndex]
  );

  return (
    <div className="ui right-top-count input short" style={{ width: '100%' }}>
      <input
        type="text"
        placeholder={getPolyglotText('답변을 입력해주세요.', 'Collage-VideoQuiz-답변입력')}
        value={input}
        minLength={1}
        maxLength={20}
        onChange={e => onChangeInput(e)}
      />
      <Icon className="clear link" />
      <span className="validation">
        <PolyglotText defaultString="You can enter up to 100 characters." id="Collage-VideoQuiz-Subtitle100" />
      </span>
    </div>
  );
}

// 다중체크 타입
function MultiChoiceType({
  row,
  rowIndex,
  userAnswer,
  onChange,
  onImageZoomPopup,
}: {
  row: QuizItem;
  rowIndex: number;
  userAnswer: UserAnswer;
  onChange: (index: number) => void;
  onImageZoomPopup: (title: string, src: string) => void;
}) {
  return (
    <div
      className="checkbox-wrap"
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Checkbox
        className="base"
        name="checkGroup"
        id={`checkGroup-${rowIndex}`}
        checked={
          userAnswer?.quizQuestionAnswerItems[rowIndex]?.answerItem === true
        }
        onChange={() => onChange(rowIndex)}
      />
      <label htmlFor={`checkGroup-${rowIndex}`} style={{ cursor: 'pointer' }}>
        <div
          dangerouslySetInnerHTML={{
            __html: `${row.text}`,
          }}
          style={
            userAnswer?.quizQuestionAnswerItems[rowIndex]?.answerItem === true
              ? { ...activeStyle }
              : { display: 'inline-block' }
          }
        />
      </label>
      {row.img !== '' && (
        <button
          onClick={() => onImageZoomPopup(row.text, row.img)}
          className="quiz-preview-img"
          style={{ marginLeft: 'auto' }}
        >
          <img src={`/${row.img}`} />
        </button>
      )}
    </div>
  );
}

// 단일체크 타입
function SingleChoiceType({
  row,
  rowIndex,
  userAnswer,
  onChange,
  onImageZoomPopup,
}: {
  row: QuizItem;
  rowIndex: number;
  userAnswer: UserAnswer;
  onChange: (index: number) => void;
  onImageZoomPopup: (title: string, src: string) => void;
}) {
  return (
    <List>
      {
        <List.Item>
          <div
            className="checkbox-wrap"
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Radio
              id={`radioGroupTest-${rowIndex}`}
              className="base"
              name="radioGroup"
              checked={
                userAnswer?.quizQuestionAnswerItems[rowIndex]?.answerItem ===
                true
              }
              onChange={() => onChange(rowIndex)}
            />
            <label
              htmlFor={`radioGroupTest-${rowIndex}`}
              style={{ cursor: 'pointer' }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: `${row.text}`,
                }}
                style={
                  userAnswer?.quizQuestionAnswerItems[rowIndex]?.answerItem ===
                  true
                    ? { ...activeStyle }
                    : {}
                }
              />
            </label>
            {row.img !== '' && (
              <button
                onClick={() => onImageZoomPopup(row.text, row.img)}
                className="quiz-preview-img"
                style={{ marginLeft: 'auto' }}
              >
                <img src={`/${row.img}`} />
              </button>
            )}
          </div>
        </List.Item>
      }
    </List>
  );
}

const QuizQuestionView: React.FC<Props> = ({
  question,
  onImageZoomPopup,
  userAnswer,
  onChangeUserAnswer,
}) => {
  const [check, setCheck] = useState<boolean>(false);
  useEffect(() => {}, [userAnswer]);

  const onChange = useCallback(
    (rowIndex: number, text?: any) => {
      if (
        question?.type === 'SingleChoice' ||
        question?.type === 'MultipleChoice'
      ) {
        setCheck(!check);
        onChangeUserAnswer(rowIndex, check);
      }
      if (question?.type === 'ShortAnswer' || question?.type === 'Essay') {
        onChangeUserAnswer(rowIndex, text);
      }
    },
    [check, onChangeUserAnswer, question.type]
  );

  return (
    <div className="quiz-question">
      {question &&
        question.quizQuestionItems?.map((row, index) => {
          if (question.type === 'SingleChoice') {
            return (
              <SingleChoiceType
                key={index}
                row={row}
                rowIndex={index}
                userAnswer={userAnswer}
                onImageZoomPopup={onImageZoomPopup}
                onChange={onChange}
              />
            );
          } else if (question.type === 'MultipleChoice') {
            return (
              <MultiChoiceType
                key={index}
                row={row}
                rowIndex={index}
                userAnswer={userAnswer}
                onImageZoomPopup={onImageZoomPopup}
                onChange={onChange}
              />
            );
          } else if (question.type === 'ShortAnswer') {
            return (
              <ShortAnswerType
                key={index}
                row={row}
                rowIndex={index}
                userAnswer={userAnswer}
                onImageZoomPopup={onImageZoomPopup}
                onChange={onChange}
              />
            );
          } else if (question.type === 'Essay') {
            return (
              <EssayType
                row={row}
                rowIndex={index}
                userAnswer={userAnswer}
                onChange={onChange}
              />
            );
          }
        })}
    </div>
  );
};

export default QuizQuestionView;
