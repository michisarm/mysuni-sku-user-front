import React, { useCallback, useEffect, useState } from 'react';
import QuizQuestions from 'quiz/model/QuizQuestions';
import { List, Radio, Checkbox, Icon } from "semantic-ui-react";
import QuizItem from 'quiz/model/QuizItem';
import { UserAnswer } from 'quiz/model/QuizAnswer';

interface Props {
  question: QuizQuestions | undefined;
  onImageZoomPopup: (title: string, src: string) => void;
  userAnswer: UserAnswer;
  onChangeUserAnswer:(index: number, answerItem: boolean) => void;
  testType: string
}

// 서술형 타입
function EssayType () {
  return (
    <div className="preview">
      <div className="ui form">
        <div className="ui right-top-count input descriptive">
          {/*error*/}
          <span className="count">
            <span className="now">0</span>/
            <span className="max">1,000</span>
          </span>
          <textarea placeholder="1,000자 이내로 입력하세요."/>
          <span className="validation">You can enter up to 1,000 characters.</span>
        </div>
      </div>
    </div>
  )
}

// 단답형 타입
function ShortAnswerType({
  row,
  userAnswer,
  onChange,
}:{
  row:QuizItem;
  userAnswer: UserAnswer;
  onChange: (index: number) => void;
}) {

  return (
    <div className="ui right-top-count input short" style={{width: '100%'}}>
      <input 
        type="text" 
        placeholder="답변을 입력해주세요. (최대 입력 글자 수 확인 필요)"
        value=""
        onChange={(e) => console.log(e)}
      />
      <Icon className="clear link" onClick={() => console.log('d')} />
      <span className="validation">You can enter up to 100 characters.</span>
    </div>
  )
}

// 다중체크 타입
function MultiChoiceType({
  row,
  rowIndex,
  userAnswer,
  onChange,
}:{
  row:QuizItem;
  rowIndex:number;
  userAnswer: UserAnswer;
  onChange: (index: number) => void;
}) {

  return (
    <div className="checkbox-wrap">
      <Checkbox
        className="base"
        label="스티브 잡스의 PT와 같은 핵심만 간결한 기획서"
        name="radioGroup"
        value="newest"
        defaultChecked
      />
      <button className="quiz-preview-img">
        <img src="" />
      </button>
    </div>
  )
}

// 단일체크 타입
function SingleChoiceType({
  row,
  rowIndex,
  userAnswer,
  onChange,
}:{
  row:QuizItem;
  rowIndex:number;
  userAnswer: UserAnswer;
  onChange: (index: number) => void;
}) {

  return (
    <List>
      {
        <List.Item>
          <Radio
            className="base"
            label={row.text}
            name="radioGroup"
            value=""
            checked={userAnswer?.quizQuestionAnswerItems[rowIndex]?.answerItem === true}
            onChange={() => onChange(rowIndex)}
            defaultChecked
          />
        </List.Item>
      }
    </List>
  )
}


const QuizQuestionView:React.FC<Props> = ({
  question,
  onImageZoomPopup,
  userAnswer,
  onChangeUserAnswer,
  testType
}) => {
  const [check, setCheck] = useState<boolean>(false);

  useEffect(() => {

  }, [userAnswer])

  const onChange = useCallback((rowIndex:number) => {
    setCheck(!check)
    console.log("onChange", check)
    onChangeUserAnswer(rowIndex, check)
  }, [check])
  
  const type = "SingleChoice"

  return (
    <div className="quiz-question">
      {
        question && question.quizQuestionItems?.map((row, index) => {
          // if(question.type === 'SingleChoice') {
          if(testType === "SingleChoice") {
            return (
              <SingleChoiceType
                key={index}
                row={row}
                rowIndex={index}
                userAnswer={userAnswer}
                onChange={onChange}
              />
            )
          //  else if (question.type === "MultiChoice") {
          } else if (testType === "MultiChoice") {
            return (
              <MultiChoiceType
                key={index}
                row={row}
                rowIndex={index}
                userAnswer={userAnswer}
                onChange={onChange}
              />
            )
          // } else if (question.type === "ShortAnswer") {
          } else if (testType === "ShortAnswer") {
            return (
              <ShortAnswerType
                key={index}
                row={row}
                userAnswer={userAnswer}
                onChange={onChange}
              />
            )
          // } else if (question.type === "Essay") {
          } else if (testType === "Essay") {
            return (
              <EssayType />
            )
          }
        })
      }
    </div>
  )
}

export default QuizQuestionView;

  // { value: 'SingleChoice', text: '단일 객관식' },
  // { value: 'MultiChoice', text: '다중 객관식' },
  // { value: 'ShortAnswer', text: '단답형' },
  // { value: 'Essay', text: '서술형' },
