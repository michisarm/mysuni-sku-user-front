import { findCommunity } from 'community/api/communityApi';
import { findOfficeWeb, findPersonalCube, findCubeIntro } from '../../../api/mPersonalCubeApi';
import { setLectureWebpage } from '../../../store/LectureWebpageStore';
import LectureRouterParams from '../../../viewModel/LectureRouterParams';
import LectureWebpage from '../../../viewModel/LectureWebpage';

export async function getCohortFromCube(params: LectureRouterParams) {
  const { contentId } = params;
  const cube = await findPersonalCube(contentId);
  const cubeIntro = await findCubeIntro(cube.cubeIntro.id);
  const officeWeb = await findOfficeWeb(cube.contents.contents.id);
  const PUBLIC_URL = process.env.PUBLIC_URL;
  let url = '';
  if(cubeIntro){
    url = `/community/`+cubeIntro.communityId;
  }
  if (
    cubeIntro === null ||
    cubeIntro?.communityId === '' ||
    cubeIntro?.communityId === undefined
  ) {
    const webpage: LectureWebpage = {
      title: url,
      description: undefined,
      image: undefined,
      url,
      fileBoxId: '',
    };
    setLectureWebpage(webpage);
  } else {
    const community = await findCommunity(cubeIntro.communityId);
    //const { title, description, image } = officeWeb.webUrlInfo;
    const webpage: LectureWebpage = {
      title: community?.name || '',
      description: community?.description || '',
      image: undefined,
      url,
      fileBoxId: '',
    };
    setLectureWebpage(webpage);
  }
}
