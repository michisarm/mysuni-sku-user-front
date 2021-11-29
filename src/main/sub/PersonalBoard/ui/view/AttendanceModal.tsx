/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-irregular-whitespace*/
import React, { useCallback } from 'react';
import { Modal, Image, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Area } from 'tracker/model';
import { useAttendEventItem, useCountAttendance } from '../../store/EventStore';
import { isAfterFlag } from '../../utility/getAfterFlag';
import { encryptEmail } from '../../api/personalBoardApi';

const PUBLIC_URL = process.env.PUBLIC_URL;

interface Props {
  open: boolean;
  setOpen: (state: boolean) => void;
  attendClick: () => void;
}

const AttendanceModal: React.FC<Props> = ({ open, setOpen, attendClick }) => {
  const attendEventItem = useAttendEventItem();
  const countAttendance = useCountAttendance();

  const className = useCallback(
    (index: number) => {
      if (countAttendance === undefined || attendEventItem === undefined) {
        return '';
      }

      let className = '';

      if (index < countAttendance.attendCount) {
        if (className !== '') {
          className += ' ';
        }
        className += 'done';
      } else if (
        index === countAttendance.attendCount &&
        countAttendance.todayAttendance === false &&
        attendEventItem.useYn
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
    [countAttendance, attendEventItem]
  );

  const getImgSrc = useCallback(
    (idx: number) => {
      if (countAttendance === undefined || attendEventItem === undefined) {
        return;
      }

      if (countAttendance.attendCount > idx) {
        if (idx % 5 === 4) {
          return `${PUBLIC_URL}/images/all/stamp_sum_present_after.png`;
        } else {
          return `${PUBLIC_URL}/images/all/stamp_sum_after.png`;
        }
      }

      if (
        countAttendance.attendCount === idx &&
        countAttendance.todayAttendance === false &&
        attendEventItem.useYn
      ) {
        if (idx % 5 === 4) {
          return `${PUBLIC_URL}/images/all/stamp_sum_present_clickme.png`;
        } else {
          return `${PUBLIC_URL}/images/all/stamp_sum_${idx + 1}_clickme.png`;
        }
      }

      if (idx % 5 === 4) {
        return `${PUBLIC_URL}/images/all/stamp_sum_present_before.png`;
      } else {
        return `${PUBLIC_URL}/images/all/stamp_sum_${idx + 1}_before.png`;
      }
    },
    [countAttendance]
  );

  const imgClass = useCallback(
    (idx: number) => {
      switch (className(idx)) {
        case 'done':
          return 'i_check';
        case 'today':
          return 'i_today';
        default:
          return 'i_date';
      }
    },
    [className]
  );

  const handleAttend = useCallback(
    (className: string) => {
      if (
        attendEventItem &&
        !isAfterFlag(attendEventItem.endTime) &&
        className.indexOf('today') !== -1
      ) {
        attendClick();
      }
    },
    [attendClick, attendEventItem]
  );

  const notiSentence = useCallback(() => {
    if (countAttendance?.todayAttendance === false) {
      return '';
    } else if (countAttendance?.attendCount === 25) {
      return 'alldone';
    } else {
      return 'today';
    }
  }, [countAttendance]);

  const lotteryTicketModalOpen = useCallback(async () => {
    if (attendEventItem === undefined) {
      return;
    }
    const getEnctyptEmail = await encryptEmail(attendEventItem.id);

    if (getEnctyptEmail !== undefined) {
      const frm = document.createElement('form');
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'q';
      input.value = getEnctyptEmail;

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

      window.open('about:blank', 'luckydraw');

      frm.submit();
    }
  }, [encryptEmail, attendEventItem]);

  return (
    <>
      <Modal
        open={open}
        className="base w640 attend2"
        style={{ position: 'absolute' }}
      >
        <Modal.Content className="popup_event">
          <div className="event_wrap" data-area={Area.MAIN_POPBANNER}>
            <div className="left">
              <div className="event_title">
                <Image
                  src={`${PUBLIC_URL}/images/all/img-s-title.png`}
                  alt="다시 돌아온 마이써니 출석 이벤트"
                />
                <Link to="/board/support/notice-detail/NTC-000056">
                  <Image
                    src={`${PUBLIC_URL}/images/all/btn-link-event.png`}
                    alt="이벤트 자세히 보러가기"
                  />
                </Link>
              </div>
              <div className="imgbox">
                <Image
                  src={`${PUBLIC_URL}/images/all/info-con-btn.png`}
                  alt="출석체크를 하면 도장이 이렇게 바뀌어요!"
                />
              </div>
            </div>

            <div className="right">
              <div className={`event_status ${notiSentence()}`}>
                {/* 오늘 출석 완료시 : event_status 에 today 클래스 추가 부탁드립니다
                            25일 전체 출석완료 시 : event_status 에 alldone 클래스 추가 부탁드립니다 */}
                <Image
                  src={`${PUBLIC_URL}/images/all/visual-01.png`}
                  className="chk_before"
                  alt="오늘도 출젝하세요. 아직 출첵 전이네요~"
                />
                <Image
                  src={`${PUBLIC_URL}/images/all/visual-02.png`}
                  className="chk_after"
                  alt="오늘 출석 체크 완료! 내일도 만나요~"
                />
                <Image
                  src={`${PUBLIC_URL}/images/all/visual-03.png`}
                  className="chk_alldone"
                  alt="출석왕 도전 완료! 앞으로도 열공해요!"
                />
              </div>
              <div className="stampbox">
                <ol>
                  {Array(25)
                    .fill('')
                    .map((v, idx) => (
                      <li key={idx} className={className(idx)}>
                        <Button
                          type="button"
                          onClick={() => handleAttend(className(idx))}
                        >
                          <Image
                            src={getImgSrc(idx)}
                            alt={`DAY${idx + 1}`}
                            className={imgClass(idx)}
                          />
                        </Button>
                      </li>
                    ))}
                </ol>
              </div>

              <div className="event_txt">
                <p>
                  <Icon /> 출석 <strong> 5회당 1장의 행운권</strong> 을
                  지급하며, <strong>일 1회만 참여</strong> 가능합니다. (PC 또는
                  Mobile)
                </p>
                <p>
                  <Icon /> 꽝이어도 실망하지 마세요.{' '}
                  <strong>꽝 3개가 모이면 행운권 1장</strong> 지급!
                </p>
                <p>
                  <Icon /> 행운권 확인 사이트를 통해 당첨을 확인합니다.{' '}
                </p>
              </div>
            </div>
          </div>
          <div className="linkbox">
            <Button
              className="go_study"
              onClick={() => setOpen(!open)}
              style={{ lineHeight: '19.6px' }}
            >
              학습하러 가기
            </Button>
            <Button
              className={`go_lotto ${
                countAttendance && countAttendance.attendCount >= 5 && 'show'
              }`}
              onClick={lotteryTicketModalOpen}
              style={{ color: '#004ea4', backgroundColor: 'white' }}
            >
              <Icon /> 행운권 확인
            </Button>
            {/* go_lotto에서 show 클래스 여부에 따라 버튼 노출/비노출 */}
          </div>
          <div
            className={`enddim2 ${
              isAfterFlag(attendEventItem?.endTime) && 'show'
            }`}
          >
            {/* enddim2 에 show 클래스 추가시 종료 안내글 노출됩니다*/}
            <div className="dim_inner">
              <span className="endimg">
                <Image
                  src={`${PUBLIC_URL}/images/all/icon-s-end.png`}
                  alt="종료"
                />
              </span>
              <p>
                <em>
                  7월 31일자로 출석이벤트가
                  <br />
                  ​종료되었습니다.​
                </em>
                <span>
                  이벤트로 획득한 복권은<strong>8월 8일까지 </strong>
                  <br />
                  아래{' '}
                  <Image
                    src={`${PUBLIC_URL}/images/all/icon-btn-small-lotto.png`}
                    alt="행운권 확인"
                  />{' '}
                  버튼을 눌러 확인 하세요!
                </span>
              </p>
              <p>
                출석 횟수가 5회 미만인 경우,
                <br />
                ‘행운권 확인’ 버튼이 노출되지 않습니다.
              </p>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default AttendanceModal;
