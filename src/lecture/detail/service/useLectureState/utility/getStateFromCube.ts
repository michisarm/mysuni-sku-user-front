/* eslint-disable consistent-return */

import React from 'react';
import { findIsJsonStudentByCube, findStudent } from '../../../api/lectureApi';
import { findPersonalCube } from '../../../api/mPersonalCubeApi';
import Student from '../../../model/Student';
import StudentJoin from '../../../model/StudentJoin';
import LectureRouterParams from '../../../viewModel/LectureRouterParams';
import LectureState from '../../../viewModel/LectureState';
import { State } from '../../../viewModel/LectureStructure';

/** Actions */
function submit(student: Student) {}

function reject() {}

function openUrl() {}

function changeRound() {}

function playMedia() {}

function download() {}

function start() {}

function join() {}

export async function getStateFromCube(
  params: LectureRouterParams
): Promise<LectureState | void> {
  const { contentId, lectureId } = params;
  const {
    contents: { type },
  } = await findPersonalCube(contentId);
  const studentJoins = await findIsJsonStudentByCube(lectureId);
  if (studentJoins.length > 0) {
    const studentJoin: StudentJoin | null = studentJoins.reduce<StudentJoin | null>(
      (r, c) => {
        if (r === null) {
          return c;
        }
        if (c.updateTime > r.updateTime) {
          return c;
        }
        return r;
      },
      null
    );
    if (studentJoin !== null) {
      const { learningState, proposalState } = studentJoin;
      let state: State = 'None';
      if (proposalState === 'Approved') {
        switch (learningState) {
          case 'Progress':
          case 'TestPassed':
          case 'TestWaiting':
          case 'HomeworkWaiting':
            state = 'Progress';
            break;
          case 'Passed':
            state = 'Completed';
            break;

          default:
            break;
        }
      }

      switch (type) {
        case 'ELearning':
        case 'ClassRoomLecture':
          switch (proposalState) {
            case 'Approved':
              break;
            case 'Canceled':
              break;
            case 'Rejected':
              break;

            default:
              break;
          }
          break;

        default:
          break;
      }

      return { state, learningState, proposalState, type };
    }
  }
}
