import React, {useCallback, useEffect} from 'react'
import { Button, Checkbox, Form, Image, Modal, Select,} from 'semantic-ui-react'
import { useParams, useHistory, Link } from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';
import Avartar from '../../../style/media/img-profile-80-px.png'
import classNames from 'classnames';
import { useLearningObjectivesItem } from '../../store/PersonalBoardStore';
import SelectType from '../../model/SelectType';

const PUBLIC_URL = process.env.PUBLIC_URL;

interface Props {
  open: boolean;
  setOpen: (state:boolean) => void,
  handleInputChange: (name: string, value: any) => void,
  handleSave: () => void,
}

const AttendanceModal:React.FC<Props> = ({
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
      <Modal open={open} className="base w640 attend">
        <Modal.Header>
          <div className="imgbox">
            <span><Image src={`${PUBLIC_URL}/images/all/event_txt1.png`} alt="2021.04.01~04.30"/></span>
            <span><Image src={`${PUBLIC_URL}/images/all/event_txt2.png`} alt="mySUNI 출석왕 도전!"/></span>
            <Image src={`${PUBLIC_URL}/images/all/event_txt3.png`} alt="하루에 딱 한 번, 출석도장 꾹하기"/>
          </div>
        </Modal.Header>
        <Modal.Content className="admin_popup_add">
          <div className="contentbox">
            {/* 
                오늘 출석 완료시 notibox 에 done클래스 추가 시 텍스트 변경됩니다.
                모든 출석 완료시 notibox 에 alldone클래스 추가 시 텍스트및 색상 변경됩니다.
            */}
            <div className="notibox">
                <strong className="notitxt"/>
                <dl>
                  <dt><Image src={`${PUBLIC_URL}/images/all/event_day10.png`} alt="Day10"/></dt>
                  <dd><strong>편의점 쿠폰</strong> 증정</dd>
                  <dt><Image src={`${PUBLIC_URL}/images/all/event_day20.png`} alt="Day20"/></dt>
                  <dd><strong>스타벅스 쿠폰</strong> 증정</dd>
                </dl>
                <span>*본 이벤트는 PC로만 참여 가능합니다</span>
            </div>
            <div className="stampbox">
              <ul>
                {/* 1. 오늘날짜 강조 할때 li에 today클래스 추가되면 텍스트 컬러 변경됩니다.  
                    2. 출석완료 했을 때 li에 done클래스 추가되면 출석완료이미지 노출됩니다. */}
                <li className="done">
                  <button type="button" className="date">
                      DAY<strong>01</strong>
                  </button>                          
                </li>
                <li className="done">
                  <button type="button" className="date">
                      DAY<strong>02</strong>
                  </button>                          
                </li>
                <li className="today">
                  <button type="button" className="date">
                      DAY<strong>03</strong>
                  </button>
                </li>
                <li>
                  <button type="button" className="date">
                      DAY<strong>04</strong>
                  </button>
                </li>
                <li>
                  <button type="button" className="date">
                      DAY<strong>05</strong>
                  </button>
                </li>
                <li>
                  <button type="button" className="date">
                      DAY<strong>06</strong>
                  </button>                            
                </li>
                <li>
                  <button type="button" className="date">
                      DAY<strong>07</strong>
                  </button>
                </li>
                <li>
                  <button type="button" className="date">
                      DAY<strong>08</strong>
                  </button>
                </li>
                <li>
                  <button type="button" className="date">
                      DAY<strong>09</strong>
                  </button>
                </li>
                <li className="gift">
                    <button type="button"/>
                </li>
                <li>
                  <button type="button" className="date">
                      DAY<strong>11</strong>
                  </button>                            
                </li>
                <li>
                  <button type="button" className="date">
                      DAY<strong>12</strong>
                  </button>
                </li>
                <li>
                  <button type="button" className="date">
                      DAY<strong>13</strong>
                  </button>
                </li>
                <li>
                  <button type="button" className="date">
                      DAY<strong>14</strong>
                  </button>
                </li>
                <li>
                  <button type="button" className="date">
                      DAY<strong>15</strong>
                  </button>
                </li>
                <li>
                  <button type="button" className="date">
                      DAY<strong>16</strong>
                  </button>                            
                </li>
                <li>
                  <button type="button" className="date">
                      DAY<strong>17</strong>
                  </button>
                </li>
                <li>
                  <button type="button" className="date">
                      DAY<strong>18</strong>
                  </button>
                </li>
                <li>
                  <button type="button" className="date">
                      DAY<strong>19</strong>
                  </button>
                </li>
                <li className="gift">
                  <button type="button"/>
                </li>
              </ul>
            </div>
          </div>
          <div className="linkbox">                    
              <button className="go_study" onClick={() => setOpen(!open)}>학습하러 가기</button>
          </div>
        </Modal.Content>
        {/* <Modal.Actions className="actions actions2">
          <button className="ui button pop2 d" onClick={() => setOpen(!open)}>닫기</button>
          <button className="ui button pop2 p" onClick={() => handleSave()}>확인</button>
        </Modal.Actions> */}
      </Modal>
      )
    </>
  )
}

export default AttendanceModal;