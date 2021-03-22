import React, {useCallback, useEffect, useState} from 'react'
import { Button, Checkbox, Form, Image, Modal, Select,} from 'semantic-ui-react'
import { useParams, useHistory, Link } from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';
import Avartar from '../../../style/media/img-profile-80-px.png'
import classNames from 'classnames';
import { useLearningObjectivesItem } from '../../store/PersonalBoardStore';
import SelectType from '../../model/SelectType';
import { useAttendCountItem } from '../../store/EventStore';
import moment from 'moment';

const PUBLIC_URL = process.env.PUBLIC_URL;



interface Props {
  open: boolean;
  AttendCountItem: any;
  AttendEventItem: any;
  setOpen: (state:boolean) => void,
  handleInputChange: (name: string, value: any) => void,
  handleSave: () => void,
  attendClick: () => void,
}

const AttendanceModal:React.FC<Props> = ({
  open,
  AttendCountItem,
  AttendEventItem,
  setOpen,
  handleInputChange,
  handleSave,
  attendClick
}) => {

  const history = useHistory();

  const className = useCallback((index: number) => {
    if (AttendCountItem === undefined) {
      return ''
    }
    let className = ''

    if ((index%5) === 4) {
      className += 'gift'
    }

    //출석 체크한 날이 오늘 날짜보다 이전의 날짜 여야 클릭 가능한 버튼 표시
    const attendFlag = AttendCountItem.find((element: { attendDate: any; }) => element.attendDate === moment().format('YYYY-MM-DD'))

    if (index+1 <= AttendCountItem.length) {
      if (className !== '') {
        className += ' '
      }
      className += 'done'
    } else if (index+1 === AttendCountItem.length+1 && attendFlag == undefined && AttendEventItem.useYn) {
      console.log('AttendEventItem.useYn', AttendEventItem.useYn)
      if (className !== '') {
        className += ' '
      }
      className += 'today'
    } else {
      className += ''
    }

    return className
  }, [AttendCountItem, AttendEventItem])

  const handleAttend = useCallback((className: string) => {
    // console.log('AttendCountItem', AttendCountItem)
    if (className.indexOf('today') !== -1) {
      attendClick()
    }
  }, [AttendCountItem])

  return (
    <>
      <Modal open={open} className="base w640 attend">
        <Modal.Header>
          <div className="imgbox">
            <span>
              <img src={`${PUBLIC_URL}/images/all/event_txt1.png`} alt="2021.04.01~04.30" />
            </span>
            <span>
              <img src={`${PUBLIC_URL}/images/all/event_txt2.png`} alt="mySUNI 출석왕 도전!"/>
            </span>
            <img src={`${PUBLIC_URL}/images/all/event_txt3.png`} alt="하루에 딱 한 번, 출석도장 꾹하기" />
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
                <dt>
                  <img src={`${PUBLIC_URL}/images/all/event_label-reward.png`} alt="Day10"/>
                </dt>
                <dd>5, 10, 15, 20회 당<strong>복권 1장씩!</strong></dd>
              </dl>
              <Link to="/community/main/open-communities" className="go_event">
                이벤트 자세히 보러가기
              </Link>
              <span>*본 이벤트는 PC로만 참여 가능합니다.</span>
            </div>
            <div className="stampbox">
              <ul>
                {/* 1. 오늘날짜 강조 할때 li에 today클래스 추가되면 텍스트 컬러 변경됩니다.  
                    2. 출석완료 했을 때 li에 done클래스 추가되면 출석완료이미지 노출됩니다. */}
                {
                  Array(20).fill('').map((v, idx) => {
                    return (
                      <li className={className(idx)} onClick={() => handleAttend(className(idx))}>
                      {
                        (idx%5) !== 4? 
                        <button type="button" className="date">
                            DAY<strong>{idx+1}</strong>
                        </button>
                        :
                        <button type="button"/>
                      }
                      </li>
                    )
                  })
                }
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