import React, {useCallback, useEffect} from 'react'
import { Button, Checkbox, Image, Modal,} from 'semantic-ui-react'
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
          <Modal open={open} className="w500 base">
            <Modal.Header>
              성장을 위한 준비!
            </Modal.Header>
            <Modal.Content>
            <table>
              <colgroup>
                <col width="100px" />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th>도전! 연간 학습 목표를 세워볼까요?</th>
                  <td style={{textAlign: 'left'}}>
                    <div className={classNames("ui input admin_text_input add")}>
                      <input
                        type="text"
                        placeholder="설문조사 제목을 입력해주세요.​"
                        value={learningObjectivesItem.AnnualLearningObjectives}
                        onChange={(e) => handleInputChange('AnnualLearningObjectives', e.target.value)}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>일주일 출석 목표는요?</th>
                  <td style={{textAlign: 'left'}}>
                    <div className={classNames("ui input admin_text_input add")}>
                      <input
                        type="text"
                        placeholder="설문조사 제목을 입력해주세요.​"
                        value={learningObjectivesItem.WeekAttendanceGoal}
                        onChange={(e) => handleInputChange('WeekAttendanceGoal', e.target.value)}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>하루 몇 시간 학습하실 건가요?</th>
                  <td style={{textAlign: 'left'}}>
                    <div className={classNames("ui input admin_text_input add")}>
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
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
