import { CountAttendance } from '../model/CountAttendance';
import AttendEvent from '../viewModel/AttendEvent';
import { createStore } from './Store';

const [
  setAttendEventItem,
  onAttendEventItem,
  getAttendEventItem,
  useAttendEventItem,
] = createStore<AttendEvent>({
  id: '',
  name: '',
  useYn: false,
  startTime: 0, // 이벤트 시작 날짜
  endTime: 0,
  popupStartTime: 0, // 팝업 시작 날짜
  popupEndTime: 0,
});

const [
  setAttendCountItem,
  onAttendCountItem,
  getAttendCountItem,
  useAttendCountItem,
] = createStore<any>([]);

const [
  setEncryptEmail,
  onEncryptEmail,
  getEncryptEmail,
  useEncryptEmail,
] = createStore<string>();

const [
  setCountAttendance,
  onCountAttendance,
  getCountAttendance,
  useCountAttendance,
] = createStore<CountAttendance>();

export {
  setAttendEventItem,
  onAttendEventItem,
  getAttendEventItem,
  useAttendEventItem,
  setAttendCountItem,
  onAttendCountItem,
  getAttendCountItem,
  useAttendCountItem,
  setEncryptEmail,
  onEncryptEmail,
  getEncryptEmail,
  useEncryptEmail,
  setCountAttendance,
  onCountAttendance,
  getCountAttendance,
  useCountAttendance,
};
