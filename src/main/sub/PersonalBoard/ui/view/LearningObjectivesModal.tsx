import React, {useCallback, useEffect} from 'react'
import { Button, Checkbox, Form, Image, Modal, Select,} from 'semantic-ui-react'
import { useParams, useHistory } from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';
import Avartar from '../../../style/media/img-profile-80-px.png'
import classNames from 'classnames';
import { useLearningObjectivesItem } from '../../store/PersonalBoardStore';
import SelectType from '../../model/SelectType';

interface Props {
  open: boolean;
  setOpen: (state:boolean) => void,
  handleInputChange: (name: string, value: any) => void,
  handleSave: () => void,
}

const LearningObjectivesModal:React.FC<Props> = ({
  open,
  setOpen,
  handleInputChange,
  handleSave
}) => {
  const history = useHistory();
  const currentUser = patronInfo.getDenizenId();

  const learningObjectivesItem = useLearningObjectivesItem()

  return (
    <>
      { learningObjectivesItem && (
        <Modal open={open} className="base w600">
          <Modal.Header>
            성장을 위한 준비!{""}
            <span className="sub f12">학습 목표를 설정해보세요.</span>
          </Modal.Header>
          <Modal.Content className="admin_popup_reject">
          <div className="personal-main-box">
            <span className="personal-des">올해 학습 목표를 세워볼까요?</span>
            <Form>
              <Form.Field className="form-field1">
                <input
                  type="text"
                  className="chal-inp"
                  value={learningObjectivesItem.AnnualLearningObjectives}
                  onChange={(e: any) => {
                    handleInputChange('AnnualLearningObjectives', e.target.value)
                  }}
                />
                <span>h</span>
              </Form.Field>
            </Form>
          </div>

          <div className="personal-main-box">
            <span className="personal-des">일주일에 며칠 학습하실 건가요?</span>
            <Form>
              <Form.Field className="form-field2">
                <div className="preview" style={{overflow: 'visible'}}>
                  <Select className="dropdown selection personal-popup-select"
                    options={SelectType.weekAttendanceGoalOptions}
                    value={learningObjectivesItem.WeekAttendanceGoal}
                    onChange={(e: any, data: any) => {
                      handleInputChange('WeekAttendanceGoal', data.value)}
                    }
                  />
                  <span>일</span>
                </div>
              </Form.Field>
            </Form>
          </div>
          
          <div className="personal-main-box">
            <span className="personal-des">하루 몇 시간 학습하실 건가요?</span>
            <Form>
              <Form.Field className="form-field3">
                <div className="preview" style={{overflow: 'visible'}}>
                    <Select
                      className="dropdown selection personal-popup-select"
                      options={SelectType.dailyLearningTimeHourOptions}
                      value={learningObjectivesItem.DailyLearningTimeHour}
                      onChange={(e: any, data: any) => handleInputChange('DailyLearningTimeHour', data.value)}
                    />
                    <span>h</span>
                    <Select
                      className="dropdown selection personal-popup-select"
                      options={SelectType.dailyLearningTimeMinuteOption}
                      value={learningObjectivesItem.DailyLearningTimeMinute}
                      onChange={(e: any, data: any) => handleInputChange('DailyLearningTimeMinute', data.value)}
                    />
                  <span>m</span>
                </div>
              </Form.Field>
            </Form>
          </div>
          </Modal.Content>
          <Modal.Actions className="actions actions2">
            <button className="ui button pop2 d" onClick={() => setOpen(!open)}>닫기</button>
            <button className="ui button pop2 p" onClick={() => handleSave()}>확인</button>
          </Modal.Actions>
        </Modal>
        )
      }
    </>
  )
}

export default LearningObjectivesModal;