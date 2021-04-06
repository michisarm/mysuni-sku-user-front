import { findCubeDetailCache } from '../../../api/cubeApi';
import { setLectureWebpage } from '../../../store/LectureWebpageStore';
import LectureParams from '../../../viewModel/LectureParams';
import LectureWebpage from '../../../viewModel/LectureWebpage';

export async function getWebpageFromCube(params: LectureParams) {
  const { cubeId } = params;
  if (cubeId === undefined) {
    return;
  }
  const cubeDetail = await findCubeDetailCache(cubeId);
  if (cubeDetail === undefined || cubeDetail.cubeMaterial.officeWeb === null) {
    return;
  }
  const {
    cubeMaterial: { officeWeb },
  } = cubeDetail;
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
