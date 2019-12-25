
import React from 'react';
import { Label, Button, Step, List, Icon } from 'semantic-ui-react';
import { dateTimeHelper } from 'shared';
import Action from '../../model/Action';
import Class from '../../model/Class';
import Operator from '../../model/Operator';
import { State, Level }  from '../../model';


interface RequiredProp {
  required?: boolean,
}

export const Required = ({ required }: RequiredProp) => {
  //
  if (!required) return null;
  return (
    <Label className="ribbon2">Required</Label>
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
        subActions && subActions.length
        && subActions.map(subAction => (
          <Button className="fix bg blue" onClick={subAction.onAction} key={subAction.type}>{subAction.type}</Button>
        )) || null
      }
      { onCancel && <Button className="fix line" onClick={onCancel}>Cancel</Button> }
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
      <div>{state}</div>
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
      <span className="level-txt">{level}</span>
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
  const { hour, minute } = dateTimeHelper.timeToHourMinute(clazz.learningTime);
  return (
    <List className="class-info1">
      <List.Item>
        <div className="ui">
          <div className="label">Time</div>
          <div className="value">{hour ? `${hour}h ` : ''}{minute}m</div>
        </div>
      </List.Item>
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
          <div className="label">참여 인원</div>
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
  onBookmark: () => void
  onShare: () => void
  onRemove?: () => void
}

export const FootButtons = ({ onBookmark, onShare, onRemove }: FootButtonsProp) => {
  //
  if (!onBookmark && !onShare && onRemove) return null;
  return (
    <div className="foot-buttons">
      <Button icon className="img-icon" onClick={onBookmark}>
        <Icon className="bookmark2" />
        <span className="blind">북마크</span>
      </Button>
      {
        onRemove && (
          <Button icon className="img-icon" onClick={onRemove}>
            <Icon className="remove3" />
            <span className="blind">제거</span>
          </Button>
        ) || null
      }
      <Button icon className="img-icon" onClick={onShare}>
        <Icon className="share2" />
        <span className="blind">공유</span>
      </Button>
    </div>
  );
};

interface SurveyProp {
  onSurvey?: () => void
}

export const Survey = ({ onSurvey }: SurveyProp) => {
  //
  if (!onSurvey) return null;
  return (
    <Button className="surv" onClick={onSurvey}>
      <span>Join Survey</span>
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
      <span>Join Survey</span>
      <Icon className="download3" />
    </Button>
  );
};

