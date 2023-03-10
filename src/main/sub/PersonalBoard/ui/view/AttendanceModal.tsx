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
                  alt="?????? ????????? ???????????? ?????? ?????????"
                />
                <Link to="/board/support/notice-detail/NTC-000056">
                  <Image
                    src={`${PUBLIC_URL}/images/all/btn-link-event.png`}
                    alt="????????? ????????? ????????????"
                  />
                </Link>
              </div>
              <div className="imgbox">
                <Image
                  src={`${PUBLIC_URL}/images/all/info-con-btn.png`}
                  alt="??????????????? ?????? ????????? ????????? ????????????!"
                />
              </div>
            </div>

            <div className="right">
              <div className={`event_status ${notiSentence()}`}>
                {/* ?????? ?????? ????????? : event_status ??? today ????????? ?????? ??????????????????
                            25??? ?????? ???????????? ??? : event_status ??? alldone ????????? ?????? ?????????????????? */}
                <Image
                  src={`${PUBLIC_URL}/images/all/visual-01.png`}
                  className="chk_before"
                  alt="????????? ???????????????. ?????? ?????? ????????????~"
                />
                <Image
                  src={`${PUBLIC_URL}/images/all/visual-02.png`}
                  className="chk_after"
                  alt="?????? ?????? ?????? ??????! ????????? ?????????~"
                />
                <Image
                  src={`${PUBLIC_URL}/images/all/visual-03.png`}
                  className="chk_alldone"
                  alt="????????? ?????? ??????! ???????????? ????????????!"
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
                  <Icon /> ?????? <strong> 5?????? 1?????? ?????????</strong> ???
                  ????????????, <strong>??? 1?????? ??????</strong> ???????????????. (PC ??????
                  Mobile)
                </p>
                <p>
                  <Icon /> ???????????? ???????????? ?????????.{' '}
                  <strong>??? 3?????? ????????? ????????? 1???</strong> ??????!
                </p>
                <p>
                  <Icon /> ????????? ?????? ???????????? ?????? ????????? ???????????????.{' '}
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
              ???????????? ??????
            </Button>
            <Button
              className={`go_lotto ${
                countAttendance && countAttendance.attendCount >= 5 && 'show'
              }`}
              onClick={lotteryTicketModalOpen}
              style={{ color: '#004ea4', backgroundColor: 'white' }}
            >
              <Icon /> ????????? ??????
            </Button>
            {/* go_lotto?????? show ????????? ????????? ?????? ?????? ??????/????????? */}
          </div>
          <div
            className={`enddim2 ${
              isAfterFlag(attendEventItem?.endTime) && 'show'
            }`}
          >
            {/* enddim2 ??? show ????????? ????????? ?????? ????????? ???????????????*/}
            <div className="dim_inner">
              <span className="endimg">
                <Image
                  src={`${PUBLIC_URL}/images/all/icon-s-end.png`}
                  alt="??????"
                />
              </span>
              <p>
                <em>
                  7??? 31????????? ??????????????????
                  <br />
                  ????????????????????????.???
                </em>
                <span>
                  ???????????? ????????? ?????????<strong>8??? 8????????? </strong>
                  <br />
                  ??????{' '}
                  <Image
                    src={`${PUBLIC_URL}/images/all/icon-btn-small-lotto.png`}
                    alt="????????? ??????"
                  />{' '}
                  ????????? ?????? ?????? ?????????!
                </span>
              </p>
              <p>
                ?????? ????????? 5??? ????????? ??????,
                <br />
                ???????????? ????????? ????????? ???????????? ????????????.
              </p>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default AttendanceModal;
