import { getLectureSurveyState } from '../../../store/LectureSurveyStore';

function openLectureSurveyState() {
  const lectureSurveyState = getLectureSurveyState();
}

function saveLectureSurveyState() {
  const lectureSurveyState = getLectureSurveyState();
  console.log('lectureSurveyState', lectureSurveyState);
  if (lectureSurveyState === undefined) {
    return;
  }
  if (lectureSurveyState.id === undefined) {
  }
}

function submitLectureSurveyState() {
  const lectureSurveyState = getLectureSurveyState();
  console.log('lectureSurveyState', lectureSurveyState);
}
