
import React from 'react';
import { Label, Button, Step, List, Icon, Popup } from 'semantic-ui-react';
import classNames from 'classnames';
import { reactAutobind } from '@nara.platform/accent';
import { dateTimeHelper, CubeType } from 'shared';
import Action from '../../model/Action';
import Class from '../../model/Class';
import Operator from '../../model/Operator';
import { State, StateNameType, Level }  from '../../model';


interface RequiredProp {
  required?: boolean,
}

export const Required = ({ required }: RequiredProp) => {
  //
  if (!required) return null;
  return (
    <Label className="ribbon2">필수과정</Label>
  );
};

interface ButtonsProp {
  mainAction?: Action,
  subActions?: Action[],
  onCancel?: () => void
}

export const Buttons = ({ mainAction, subActions, onCancel }: ButtonsProp) => {
  //
  if (!mainAction && !subActions && !onCancel) return null;
  return (
    <div className="btn-area">
      { mainAction && <Button className="fix bg" onClick={mainAction.onAction}>{mainAction.type}</Button> }

      {
        subActions && subActions.length > 0
          && subActions.map(subAction => (
            <Button key={subAction.type} className="fix bg blue" onClick={subAction.onAction}>{subAction.type}</Button>
          ))
      }
      { onCancel && <Button className="fix line" onClick={onCancel}>취소하기</Button> }
    </div>
  );
};

interface StateProp {
  state?: State
}

export const StateView = ({ state }: StateProp) => {
  //
  if (!state) return null;
  return (
    <div className="state-txt">
      <div>{StateNameType[State[state]]}</div>
    </div>
  );
};

interface LevelProp {
  level?: Level
}

export const LevelView = ({ level }: LevelProp) => {
  //
  if (!level) return null;
  return (
    <div className="level-wrap">
      <span
        className={classNames({
          'level-txt': true,
          step1: level === Level.Basic,
          step2: level === Level.Intermediate,
          step3: level === Level.Advanced,
          step4: level === Level.Expert,
        })}
      >
        {level}
      </span>
      <Step.Group unstackable className="level">
        {
          Object.keys(Level).map((levelKey: string, index: number) => (
            <Step key={`level-${index}`} active={levelKey === level}>
              <Step.Content>
                <Step.Title><span className="blind">{levelKey}</span></Step.Title>
              </Step.Content>
            </Step>
          )) || null
        }
      </Step.Group>
    </div>
  );
};


interface ClassProp {
  clazz: Class
}

export const ClassView = ({ clazz }: ClassProp) => {
  if (!clazz) return null;
  const hourMinuteFormat = dateTimeHelper.timeToHourMinuteFormat(clazz.learningTime);
  return (
    <List className="class-info1">
      {
        clazz.learningTime && (
          <List.Item>
            <div className="ui">
              <div className="label">Time</div>
              <div className="value">{hourMinuteFormat}</div>
            </div>
          </List.Item>
        ) || null
      }
      {
        clazz.capacity && (
          <List.Item>
            <div className="ui">
              <div className="label">정원</div>
              <div className="value">{clazz.capacity}</div>
            </div>
          </List.Item>
        ) || null
      }
      {
        clazz.waitingCapacity && (
          <List.Item>
            <div className="ui">
              <div className="label">대기가능인원</div>
              <div className="value">{clazz.capacity}</div>
            </div>
          </List.Item>
        ) || null
      }
      <List.Item>
        <div className="ui">
          <div className="label">{clazz.cubeType === CubeType.Community ? '참여' : '이수'} 인원</div>
          <div className="value">{clazz.participantCount}</div>
        </div>
      </List.Item>
    </List>
  );
};


interface OperatorProp {
  operator: Operator
}

export const OperatorView = ({ operator }: OperatorProp) => {
  if (!operator) return null;
  const emails = operator.email ? operator.email.split(',') : [];
  return (
    <List className="class-info2">
      {
        operator.instructor && (
          <List.Item>
            <List.Header>강사</List.Header>
            <List.Description>{operator.instructor}</List.Description>
          </List.Item>
        ) || null
      }
      <List.Item>
        <List.Header>담당자</List.Header>
        <List.Description>
          {operator.name} {operator.company && <span className="middot">{operator.company}</span> }
          <br />
          {
            emails.map((email, index: number) => (
              <a key={`email-${index}`} href={`mailto:${email}`} className="underlink">
                {email}
              </a>
            ))
          }
        </List.Description>
      </List.Item>
    </List>
  );
};

interface FootButtonsProp {
  onBookmark?: () => void
  onRemove?: () => void
}

@reactAutobind
export class FootButtons extends React.Component<FootButtonsProp> {
  //
  URL_INFO: any = React.createRef();

  render() {
    const { onBookmark, onRemove } = this.props;
    return (
      <div className="foot-buttons">
        {
          onBookmark && (
            <Popup
              content="관심목록에 추가"
              trigger={
                <Button icon className="img-icon" onClick={onBookmark}>
                  <Icon className="bookmark2" />
                  <span className="blind">북마크</span>
                </Button>
              }
            />
          ) || null
        }
        {
          onRemove && (
            <Popup
              content="관심목록에서 삭제"
              trigger={
                <Button icon className="img-icon" onClick={onRemove}>
                  <Icon className="remove3" />
                  <span className="blind">제거</span>
                </Button>
              }
            />
          ) || null
        }
        <Popup
          content="URL 복사"
          trigger={
            <Button
              icon
              className="img-icon"
              onClick={() => {
                const textarea = document.createElement('textarea');
                textarea.value = window.location.href;
                document.body.appendChild(textarea);
                textarea.select();
                textarea.setSelectionRange(0, 9999);
                document.execCommand('copy');
                document.body.removeChild(textarea);
              }}
            >
              <Icon className="share2" />
              <span className="blind">공유</span>
            </Button>
          }
        />
      </div>
    );
  }
}

interface SurveyProp {
  onSurvey?: () => void
}

export const Survey = ({ onSurvey }: SurveyProp) => {
  //
  if (!onSurvey) return null;
  return (
    <Button className="surv" onClick={onSurvey}>
      <span>설문하기</span>
      <Icon className="ar-survay" />
    </Button>
  );
};

interface ReportProps {
  onDownloadReport?: () => void
}

export const Report = ({ onDownloadReport }: ReportProps) => {
  //
  if (!onDownloadReport) return null;
  return (
    <Button className="surv" onClick={onDownloadReport}>
      <span>Report Download</span>
      <Icon className="download3" />
    </Button>
  );
};

