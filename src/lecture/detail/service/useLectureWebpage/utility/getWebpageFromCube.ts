import { findOfficeWeb, findPersonalCube } from '../../../api/mPersonalCubeApi';
import { setLectureWebpage } from '../../../store/LectureWebpageStore';
import LectureRouterParams from '../../../viewModel/LectureRouterParams';
import LectureWebpage from '../../../viewModel/LectureWebpage';

export async function getWebpageFromCube(params: LectureRouterParams) {
  const { contentId } = params;
  const cube = await findPersonalCube(contentId);
  const officeWeb = await findOfficeWeb(cube.contents.contents.id);
  const { title, description, image } = officeWeb.webUrlInfo;
  const url = officeWeb.webPageUrl;
  const webpage: LectureWebpage = {
    title,
    description,
    image,
    url,
  };
  setLectureWebpage(webpage);
}
