import { findLectureCard } from 'lecture/detail/api/lectureApi';
import {
  findCubeIntro,
  findPersonalCube,
} from 'lecture/detail/api/mPersonalCubeApi';
import CubeIntro from 'lecture/detail/model/CubeIntro';
import LectureCard from 'lecture/detail/model/LectureCard';
import PersonalCube from 'lecture/detail/model/PersonalCube';
import LectureDescription from 'lecture/detail/viewModel/LectureOverview/LectureDescription';
import LectureSummary from 'lecture/detail/viewModel/LectureOverview/LectureSummary';
import { timeToHourMinuteFormat } from 'shared/helper/dateTimeHelper';
import {
  setLectureDescription,
  setLectureSummary,
} from '../../../store/LectureOverviewStore';

function getLectureSummary(
  personalCube: PersonalCube,
  cubeIntro: CubeIntro,
  lectureCard: LectureCard
): LectureSummary {
  const category = personalCube.category;
  const difficultyLevel = cubeIntro.difficultyLevel;
  const learningTime = timeToHourMinuteFormat(cubeIntro.learningTime);
  const operation = cubeIntro.operation;
  const iconBox = personalCube.iconBox;
  return {
    name: personalCube.name,
    category: {
      college: category.college.name,
      channel: category.channel.name,
    },
    difficultyLevel,
    learningTime,
    operation,
    passedCount: lectureCard.passedStudentCount,
    iconBox,
  };
}

function getLectureDescription(cubeIntro: CubeIntro): LectureDescription {
  const {
    applicants,
    description,
    goal,
    completionTerms,
    guide,
  } = cubeIntro.description;
  return { applicants, description, goal, completionTerms, guide };
}

function findCube(personalCubeId: string) {
  return findPersonalCube(personalCubeId);
}

function findIntro(cubeIntroId: string) {
  return findCubeIntro(cubeIntroId);
}

export async function getCubeLectureOverview(
  personalCubeId: string,
  lectureCardId: string
) {
  const personalCube = await findCube(personalCubeId);
  const cubeIntro = await findIntro(personalCube.cubeIntro.id);
  const lectureCard = await findLectureCard(lectureCardId);
  const lectureSummary = getLectureSummary(
    personalCube,
    cubeIntro,
    lectureCard
  );
  setLectureSummary(lectureSummary);
  const lectureDescription = getLectureDescription(cubeIntro);
  setLectureDescription(lectureDescription);
}
