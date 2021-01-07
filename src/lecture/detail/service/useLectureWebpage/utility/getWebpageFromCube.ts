import {
  findOfficeWeb,
  cacheableFindPersonalCube,
} from '../../../api/mPersonalCubeApi';
import { setLectureWebpage } from '../../../store/LectureWebpageStore';
import LectureRouterParams from '../../../viewModel/LectureRouterParams';
import LectureWebpage from '../../../viewModel/LectureWebpage';

export async function getWebpageFromCube(params: LectureRouterParams) {
  const { contentId } = params;
  const cube = await cacheableFindPersonalCube(contentId);
  const officeWeb = await findOfficeWeb(cube.contents.contents.id);
  const url = officeWeb.webPageUrl;
  if (
    officeWeb.webUrlInfo === null ||
    (officeWeb.webUrlInfo as unknown) === '' ||
    (officeWeb.webUrlInfo as unknown) === undefined
  ) {
    const webpage: LectureWebpage = {
      title: url,
      description: undefined,
      image: undefined,
      url,
      fileBoxId: officeWeb.fileBoxId,
    };
    setLectureWebpage(webpage);
  } else {
    const { title, description, image } = officeWeb.webUrlInfo;
    const webpage: LectureWebpage = {
      title,
      description,
      image,
      url,
      fileBoxId: officeWeb.fileBoxId,
    };
    setLectureWebpage(webpage);
  }
}
