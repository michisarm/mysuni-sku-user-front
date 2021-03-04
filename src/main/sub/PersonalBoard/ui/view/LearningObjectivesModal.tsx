import React, {useCallback, useEffect} from 'react'
import { Button, Checkbox, Form, Image, Modal,} from 'semantic-ui-react'
import { useParams, useHistory } from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';
import Avartar from '../../../style/media/img-profile-80-px.png'
import classNames from 'classnames';
import { useLearningObjectivesItem } from '../../store/PersonalBoardStore';

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


  useEffect(() => {
  },[])

  // const handleSave = useCallback(() => {
  //   console.log('save')
  // },[])
  
  return (
    // open={open}
    <>
      { learningObjectivesItem && (
        <Modal open={open} className="base w600">
          <Modal.Header>
            성장을 위한 준비!
            <span className="sub f12">학습 목표를 설정해보세요.</span>
          </Modal.Header>
          <Modal.Content className="admin_popup_reject">
          <div className="personal-main-box">
            <span className="personal-des">도전! 연간 학습 목표를 세워볼까요?</span>
            <Form>
              <Form.Field className="form-field1">
                <input
                  type="type"
                  className="chal-inp"
                  placeholder="설문조사 제목을 입력해주세요.​"
                  value={learningObjectivesItem.WeekAttendanceGoal}
                  onChange={(e) => handleInputChange('WeekAttendanceGoal', e.target.value)}
                />
                <span>h</span>
              </Form.Field>
            </Form>
          </div>

          <div className="personal-main-box">
            <span className="personal-des">일주일 출석 목표는요?</span>
            <Form>
              <Form.Field className="form-field2">
                <div className="preview" style={{overflow: 'visible'}}>
                  <input
                    type="text"
                    placeholder="설문조사 제목을 입력해주세요.​"
                    value={learningObjectivesItem.WeekAttendanceGoal}
                    onChange={(e) => handleInputChange('WeekAttendanceGoal', e.target.value)}
                  />
                  <span>번</span>
                </div>
              </Form.Field>
            </Form>
          </div>
          
          <div className="personal-main-box">
            <span className="personal-des">하루 몇 시간 학습하실 건가요?</span>
            <Form>
              <Form.Field className="form-field3">
                <div className="preview" style={{overflow: 'visible'}}>
                    {/* <Select className='dropdown selection personal-popup-select'
                            options={selectOptions02}/>
                    <span>h</span>
                    <Select className='dropdown selection personal-popup-select'
                            options={selectOptions03}/> */}
                  <input
                    type="text"
                    placeholder="설문조사 제목을 입력해주세요.​"
                    value={learningObjectivesItem.DailyLearningTimeHour}
                    onChange={(e) => handleInputChange('DailyLearningTimeHour', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="설문조사 제목을 입력해주세요.​"
                    value={learningObjectivesItem.DailyLearningTimeMinute}
                    onChange={(e) => handleInputChange('DailyLearningTimeMinute', e.target.value)}
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