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
  setLectureCubeSummary,
  setLectureDescription,
  setLectureInstructor,
  setLecturePrecourse,
  setLectureSubcategory,
  setLectureTags,
} from '../../../store/LectureOverviewStore';
import LectureCubeSummary from '../../../viewModel/LectureOverview/LectureCubeSummary';
import LectureInstructor from '../../../viewModel/LectureOverview/LectureInstructor';
import { getEmptyLecturePrecourse } from '../../../viewModel/LectureOverview/LecturePrecourse';
import LectureSubcategory from '../../../viewModel/LectureOverview/LectureSubcategory';
import LectureTags from '../../../viewModel/LectureOverview/LectureTags';

function getLectureSummary(
  personalCube: PersonalCube,
  cubeIntro: CubeIntro,
  lectureCard: LectureCard
): LectureCubeSummary {
  const category = personalCube.category;
  const difficultyLevel = cubeIntro.difficultyLevel;
  const learningTime = timeToHourMinuteFormat(cubeIntro.learningTime);
  const operator = cubeIntro.operation.operator;
  const [instructor] = cubeIntro.instructor;
  return {
    name: personalCube.name,
    category: {
      college: category.college,
      channel: category.channel,
    },
    difficultyLevel,
    learningTime,
    operator,
    passedCount: lectureCard.passedStudentCount,
    instructor,
  };
}

function getLectureDescription(cubeIntro: CubeIntro): LectureDescription {
  const { description } = cubeIntro.description;
  return { description };
}

function getLectureSubcategory(personalCube: PersonalCube): LectureSubcategory {
  const { subCategories } = personalCube;
  return {
    categories: subCategories.map(({ channel, college }) => ({
      channel,
      college,
    })),
  };
}

function getLectureTags(personalCube: PersonalCube): LectureTags {
  const { tags } = personalCube;
  return {
    tags,
  };
}

function getLectureInstructor(cubeIntro: CubeIntro): LectureInstructor {
  const { instructor } = cubeIntro;
  return {
    instructors: instructor,
  };
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
  setLectureCubeSummary(lectureSummary);
  const lectureDescription = getLectureDescription(cubeIntro);
  setLectureDescription(lectureDescription);
  const lectureSubcategory = getLectureSubcategory(personalCube);
  setLectureSubcategory(lectureSubcategory);
  const lectureTags = getLectureTags(personalCube);
  setLectureTags(lectureTags);
  const lectureInstructor = getLectureInstructor(cubeIntro);
  setLectureInstructor(lectureInstructor);
  setLecturePrecourse(getEmptyLecturePrecourse());
}
