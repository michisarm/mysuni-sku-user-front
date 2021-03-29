import React, {useCallback, useEffect, useState} from 'react'
import { Modal } from 'semantic-ui-react'
import { useHistory, Link } from 'react-router-dom';

import moment from 'moment';

const PUBLIC_URL = process.env.PUBLIC_URL;

interface Props {
  open: boolean;
  AttendCountItem: any;
  AttendEventItem: any;
  EncryptEmail: string;
  setOpen: (state:boolean) => void,
  handleInputChange: (name: string, value: any) => void,
  handleSave: () => void,
  attendClick: () => void,
}

const AttendanceModal:React.FC<Props> = ({
  open,
  AttendCountItem,
  AttendEventItem,
  EncryptEmail,
  setOpen,
  attendClick
}) => {

  const history = useHistory();
  const [attendFlag, setAttendFlag] = useState<boolean>()

  useEffect(() => {
    if(AttendCountItem === undefined) {
      return
    }
    //출석 체크한 날이 오늘 날짜보다 이전의 날짜 여야 클릭 가능한 버튼 표시
    const flag = AttendCountItem.find((element: { attendDate: any; }) => element.attendDate === moment().format('YYYY-MM-DD'))
    setAttendFlag(flag)
  }, [AttendCountItem])

  const className = useCallback((index: number) => {
    if (AttendCountItem === undefined) {
      return ''
    }
    let className = ''

    if ((index%5) === 4) {
      className += 'gift'
    }

    if (index+1 <= AttendCountItem.length) {
      if (className !== '') {
        className += ' '
      }
      className += 'done'
    } else if (index+1 === AttendCountItem.length+1 && attendFlag === undefined && AttendEventItem.useYn) {
      if (className !== '') {
        className += ' '
      }
      className += 'today'
    } else {
      className += ''
    }
    return className
  }, [AttendCountItem, AttendEventItem, attendFlag])

  const handleAttend = useCallback((className: string) => {
    // console.log('AttendCountItem', AttendCountItem)
    if (className.indexOf('today') !== -1) {
      attendClick()
    }
  }, [AttendCountItem])

  const notiSentence = useCallback((attendFlag) => {
    if (attendFlag === undefined) {
      return 'notibox'
    } else if(AttendCountItem.length === 20) {
      return 'notibox alldone'
    } else {
      return 'notibox done'
    }
  }, [attendFlag, AttendCountItem])

  const lotteryTicketModalOpen = useCallback(() => {
    console.log('암호화 메일', EncryptEmail)
    console.log('출석 count', AttendCountItem.length)
    const frm = document.createElement('form')
    frm.setAttribute('id','1234')
    frm.setAttribute('action','http://www.naver.com')
    frm.setAttribute('method','post')
    frm.setAttribute('target','1234')
    document.body.appendChild(frm)

    window.open(
      'about:blank',
      '1234',
      'width=300, height=300'
    )

    frm.submit()

  }, [EncryptEmail, AttendCountItem])

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
            <div className={notiSentence(attendFlag)}>
              <strong className="notitxt"/>
              <dl>
                <dt>
                  <img src={`${PUBLIC_URL}/images/all/event_label-reward.png`} alt="Day10"/>
                </dt>
                <dd>5, 10, 15, 20회 당<strong>복권 1장씩!</strong></dd>
              </dl>
              <Link to="/board/support/notice-detail/NTC-00004z" className="go_event">
                이벤트 자세히 보러가기
              </Link>
              <span>*본 이벤트는 PC로만 참여 가능합니다.</span>
            </div>
            <div className="stampbox">
              <ul>
                {
                  Array(20).fill('').map((v, idx) => {
                    return (
                      <li className={className(idx)} onClick={() => handleAttend(className(idx))} key={idx}>
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
            <a className="go_study" onClick={() => setOpen(!open)}>학습하러 가기</a>
            {
              AttendCountItem && AttendCountItem.length >= 5 && (
                <a className="go_lotto show" onClick={() => lotteryTicketModalOpen()}>복권 긁기</a>
              )
            }
          </div>
        </Modal.Content>
      </Modal>
      )
    </>
  )
}

export default AttendanceModal;