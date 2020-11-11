import { useLectureWatchLog } from 'lecture/detail/service/useLectureMedia/useLectureWatchLog';
import { getLectureWatchLogs } from 'lecture/detail/store/LectureWatchLogsStore';
import { getLectureWatchLogSumViewCount } from 'lecture/detail/store/LectureWatchLogSumViewCountStore';
import React from 'react';
import { useLectureMedia } from '../../service/useLectureMedia/useLectureMedia';
import LectureVideoView from '../view/LectureVideoView/LectureVideoView';
import { useLectureRouterParams } from 'lecture/detail/service/useLectureRouterParams';
import WatchLog from 'lecture/detail/model/Watchlog';
import { getLectureConfirmProgress } from 'lecture/detail/store/LectureConfirmProgressStore';

function LectureVideoContainer() {
  useLectureMedia();

  // ###
  // # 동영상 진도율 등록
  // ###
  // POST http://ma.mysuni.sk.com/api/watch-log-collector/watchLog
  // Content-Type: application/json
  // setWatchLog

  // {
  // "patronKeyString": "r2y8@ne1-m2",
  // "lectureUsid": "LECTURE-CARD-27v",
  // "start": 700,
  // "end": 780
  // }

  // ###
  // # 동영상 진도율 리스트 조회
  // ###
  // GET http://ma.mysuni.sk.com/api/watch-log-collector/watchLog?patronKeyString=r2y8%40ne1-m2&lectureUsid=LECTURE-CARD-27v
  // getCubeWatchLogItem

  // ###
  // # 동영상 시청 총 합계 초 조회
  // ###
  // GET http://ma.mysuni.sk.com/api/watch-log-collector/watchLog/sumViewSeconds?patronKeyString=r2y8%40ne1-m2&lectureUsid=LECTURE-CARD-27v
  // getWatchLogSumViewCount

  // ###
  // # close 버튼 또는 학습완료 시 상태 업데이트 조회
  // ###
  // POST http://ma.mysuni.sk.com/api/lecture/students/flow/confirm/progressByCardId
  // Content-Type: application/json
  // audienceId: r2y8-r@ne1-m2-c2
  // Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRpdGlvbmFsSW5mb3JtYXRpb24iOnsiY29tcGFueUNvZGUiOiJTS0NDIiwiZW1wbG95ZWVJZCI6IjA1NTI2In0sImxvZ2luSWQiOiJTS0NDLjA1NTI2QHNrLmNvbSIsInVzZXJfbmFtZSI6IlNLQ0MuMDU1MjZAc2suY29tIiwiZGlzcGxheU5hbWUiOiLrsJXshLEqKiIsInNjb3BlIjpbImNsaWVudCJdLCJ3b3Jrc3BhY2VzIjp7InN0YXRpb25Xb3Jrc3BhY2VzIjpudWxsLCJzcXVhcmVXb3Jrc3BhY2VzIjpudWxsLCJwYXZpbGlvbldvcmtzcGFjZXMiOm51bGwsImNpbmVyb29tV29ya3NwYWNlcyI6W3siaWQiOiJuZTEtbTItYzIiLCJuYW1lIjoiU0sgVW5pdmVyc2l0eSIsInRlbmFudElkIjoicjJ5OC1yQG5lMS1tMi1jMiIsInJvbGVzIjpbIlVzZXIiLCJDb2xsZWdlTWFuYWdlciIsIlN1cGVyTWFuYWdlciJdfSx7ImlkIjoibmUxLW0yLWM1NiIsIm5hbWUiOiLsnbTrhbjrsqDsnbTshZgg6rO17Ya1IiwidGVuYW50SWQiOiJyMnk4LXJAbmUxLW0yLWM1NiIsInJvbGVzIjpbIlVzZXIiLCJDb21wYW55TWFuYWdlciJdfSx7ImlkIjoibmUxLW0yLWMxNyIsIm5hbWUiOiJTSyjso7wpQyZDIiwidGVuYW50SWQiOiJyMnk4LXJAbmUxLW0yLWMxNyIsInJvbGVzIjpbIlVzZXIiLCJDb21wYW55TWFuYWdlciJdfSx7ImlkIjoibmUxLW0yLWMzIiwibmFtZSI6IlNL7J2064W467Kg7J207IWYIiwidGVuYW50SWQiOiJyMnk4LXJAbmUxLW0yLWMzIiwicm9sZXMiOlsiVXNlciIsIkNvbXBhbnlNYW5hZ2VyIl19XSwic3R1ZGlvV29ya3NwYWNlIjpudWxsfSwiZXhwIjoxNjAzODYxNDI5LCJhdXRob3JpdGllcyI6WyJVc2VyIl0sImp0aSI6ImM4ZTY3NmRlLThjZjctNDEwZS1iMDg2LTA0OWNhNWRlNTE3MyIsImNsaWVudF9pZCI6Im5hcmEifQ.3DR2rUfK6Onrz3VOt_moh5dl_la0cVuLhpS58A536eM

  // {
  //     "denizenKey": {
  //         "keyString": "r2y8-r@ne1-m2-c2",
  //         "patronType": "Audience"
  //     },
  //     "rollBookId": "1cd03b20-0c16-4310-b417-42117f2c4227",
  //     "name": "박성**",
  //     "email": "SKCC.05526@sk.com",
  //     "company": "SK주식회사 C&C",
  //     "department": "MIS서비스팀",
  //     "proposalState": "Approved",
  //     "programLectureUsid": "",
  //     "courseLectureUsid": "",
  //     "enClosed": false,
  //     "classroomId": "",
  //     "approvalProcess": false,
  //     "leaderEmails": [],
  //     "url": ""
  // }
  // confirmProgress

  //watchLog sample 코드 시작
  // const [
  //   watchLogValue,
  //   getCubeWatchLogItem,
  //   setWatchLog,
  //   getWatchLogSumViewCount,
  //   confirmProgress,
  // ] = useLectureWatchLog();

  // const params = useLectureRouterParams();

  // if (params) {
  //   const watchlog: WatchLog = {
  //     id: '123',
  //     patronKeyString: 'test',
  //     start: 5,
  //     end: 35,
  //     lectureUsid: params?.lectureId,
  //     createdTime: 123123,
  //   };

  //   getCubeWatchLogItem(params);
  //   getWatchLogSumViewCount(params);
  //   setWatchLog(params, watchlog);
  //   confirmProgress(params);
  //   console.log('watchLogValue : ', watchLogValue);
  //   console.log('getLectureWatchLogs : ', getLectureWatchLogs);
  //   console.log(
  //     'getLectureWatchLogSumViewCount : ',
  //     getLectureWatchLogSumViewCount
  //   );
  //   console.log('getLectureConfirmProgress : ', getLectureConfirmProgress);
  // }
  // //watchLog sample 코드 끝


  const params = useLectureRouterParams();
  console.log('params',params);

  return <LectureVideoView params={params}/>;
}

export default LectureVideoContainer;
