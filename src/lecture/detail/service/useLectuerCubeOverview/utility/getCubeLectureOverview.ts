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
  setLectureFile,
  setLectureInstructor,
  setLecturePrecourse,
  setLectureSubcategory,
  setLectureTags,
} from '../../../store/LectureOverviewStore';
import { getFiles } from '../../../utility/depotFilesHelper';
import LectureCubeSummary from '../../../viewModel/LectureOverview/LectureCubeSummary';
import LectureFile from '../../../viewModel/LectureOverview/LectureFile';
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
  };
}

function getLectureDescription(cubeIntro: CubeIntro): LectureDescription {
  const {
    description,
    applicants,
    completionTerms,
    goal,
    guide,
  } = cubeIntro.description;
  const organizer = cubeIntro.operation.organizer.name;
  return { description, applicants, completionTerms, goal, guide, organizer };
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

function getLectureFile(fileBoxId: string): Promise<LectureFile> {
  const fileBoxIds = [fileBoxId];
  return getFiles(fileBoxIds).then(files => ({ files }));
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
  if (personalCube.contents.fileBoxId !== '') {
    const lectureFile = await getLectureFile(personalCube.contents.fileBoxId);
    setLectureFile(lectureFile);
  }
}
