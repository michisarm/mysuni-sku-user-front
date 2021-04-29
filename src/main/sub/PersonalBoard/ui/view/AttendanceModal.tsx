import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Area } from 'tracker/model';

const PUBLIC_URL = process.env.PUBLIC_URL;

interface Props {
  open: boolean;
  AttendCountItem: any;
  AttendEventItem: any;
  EncryptEmail: string;
  afterFlag: boolean;
  setOpen: (state: boolean) => void;
  handleInputChange: (name: string, value: any) => void;
  handleSave: () => void;
  attendClick: () => void;
}

const AttendanceModal: React.FC<Props> = ({
  open,
  AttendCountItem,
  AttendEventItem,
  EncryptEmail,
  afterFlag,
  setOpen,
  attendClick,
}) => {
  const [attendFlag, setAttendFlag] = useState<boolean>();

  useEffect(() => {
    if (AttendCountItem === undefined) {
      return;
    }
    //출석 체크한 날이 오늘 날짜보다 이전의 날짜 여야 클릭 가능한 버튼 표시
    const flag = AttendCountItem.find(
      (element: { attendDate: any }) =>
        element.attendDate === moment().format('YYYY-MM-DD')
    );
    setAttendFlag(flag);
  }, [AttendCountItem]);

  const className = useCallback(
    (index: number) => {
      if (AttendCountItem === undefined) {
        return '';
      }
      let className = '';

      if (index % 5 === 4) {
        className += 'gift';
      }

      if (index + 1 <= AttendCountItem.length) {
        if (className !== '') {
          className += ' ';
        }
        className += 'done';
      } else if (
        index + 1 === AttendCountItem.length + 1 &&
        attendFlag === undefined &&
        AttendEventItem.useYn
      ) {
        if (className !== '') {
          className += ' ';
        }
        className += 'today';
      } else {
        className += '';
      }
      return className;
    },
    [AttendCountItem, AttendEventItem, attendFlag]
  );

  const handleAttend = useCallback(
    (className: string) => {
      // console.log('AttendCountItem', AttendCountItem)
      if (className.indexOf('today') !== -1 && !afterFlag) {
        attendClick();
      }
    },
    [AttendCountItem]
  );

  const notiSentence = useCallback(
    attendFlag => {
      if (attendFlag === undefined) {
        return 'notibox';
      } else if (AttendCountItem.length === 20) {
        return 'notibox alldone';
      } else {
        return 'notibox done';
      }
    },
    [attendFlag, AttendCountItem]
  );

  const lotteryTicketModalOpen = useCallback(() => {
    const frm = document.createElement('form');
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'q';
    input.value = EncryptEmail;

    const env = document.createElement('input');
    env.type = 'hidden';
    env.name = 'env';
    env.value =
      window.location.host.toUpperCase() === 'MYSUNI.SK.COM'
        ? 'production'
        : 'development';

    frm.appendChild(input);
    frm.appendChild(env);
    document.body.appendChild(frm);

    frm.setAttribute('action', `https://www.mysuniluckydrawevent.com/auth`);
    frm.setAttribute('method', 'post');
    frm.setAttribute('target', 'luckydraw');

    window.open(
      'about:blank',
      'luckydraw'
    );

    frm.submit();
  }, [EncryptEmail, AttendCountItem]);

  return (
    <>
      <Modal open={open} className="base w640 attend">
        <Modal.Header>
          <div className="imgbox">
            <span>
              <img
                src={`${PUBLIC_URL}/images/all/event_txt1.svg`}
                alt="2021.04.05~04.30"
              />
            </span>
            <span>
              <img
                src={`${PUBLIC_URL}/images/all/event_txt2.svg`}
                alt="mySUNI 출석왕 도전!"
              />
            </span>
            <img
              src={`${PUBLIC_URL}/images/all/event_txt3.svg`}
              alt="하루에 딱 한 번, 출석도장 꾹하기"
            />
          </div>
        </Modal.Header>
        <Modal.Content className="admin_popup_add">
          <div data-area={Area.MAIN_POPBANNER} className="contentbox">
            <div className={notiSentence(attendFlag)}>
              <strong className="notitxt" />
              <dl>
                <dt>
                  <img
                    src={`${PUBLIC_URL}/images/all/event_label-reward.png`}
                    alt="Day10"
                  />
                </dt>
                <dd>
                  5, 10, 15, 20회 당<strong>복권 1장씩!</strong>
                </dd>
              </dl>
              <div className="stamp_sample">
                <em>
                  <img
                    src={`${PUBLIC_URL}/images/all/event_stampattend.svg`}
                    alt="출석"
                  />
                </em>
                <em>
                  <img
                    src={`${PUBLIC_URL}/images/all/event_stamplotto.svg`}
                    alt="복권"
                  />
                </em>
              </div>
              <Link
                to="/board/support/notice-detail/NTC-00004m"
                className="go_event"
              >
                이벤트 자세히 보러가기
              </Link>
              <span>*본 이벤트는 PC로만 참여 가능합니다.</span>
            </div>
            <div className="stampbox">
              <ul>
                {Array(20)
                  .fill('')
                  .map((v, idx) => {
                    return (
                      <li
                        className={className(idx)}
                        onClick={() => handleAttend(className(idx))}
                        key={idx}
                      >
                        {idx % 5 !== 4 ? (
                          <button type="button" className="date">
                            DAY<strong>{idx + 1}</strong>
                          </button>
                        ) : (
                          <button type="button" />
                        )}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="linkbox">
            <a className="go_study" onClick={() => setOpen(!open)}>
              학습하러 가기
            </a>
            {AttendCountItem && AttendCountItem.length >= 5 && (
              <a
                className="go_lotto show"
                onClick={() => lotteryTicketModalOpen()}
              >
                복권 긁기
              </a>
            )}
          </div>
        </Modal.Content>
        { afterFlag && (
          <div className="enddim">
            <div className="dim_inner">
              <span className="imgbox">
                <img src={`${PUBLIC_URL}/images/all/icon-end-wht.svg`} alt="박수치는남자이미지"/>
              </span>
              <p>
                <em>4월 30일자로 출석이벤트가 <br/>종료되었습니다.</em>
                <span>이벤트로 획득한 복권은<strong>5월 7일까지</strong><br />아래 <Image src={`${PUBLIC_URL}/images/all/btn-strach-small.svg`} alt="복권긁기버튼이미지"/> 버튼을 눌러 확인 하세요!</span>
              </p>
              <p>
                출석 횟수가 5회 미만인 경우, 
                <br />‘복권 긁기’ 버튼이 노출되지 않습니다.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default AttendanceModal;
