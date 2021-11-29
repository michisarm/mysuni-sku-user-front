import { findCubeDetailCache } from '../../../api/cubeApi';
import { setLectureWebpage } from '../../../store/LectureWebpageStore';
import LectureParams from '../../../viewModel/LectureParams';
import LectureWebpage from '../../../viewModel/LectureWebpage';
import { generationEncryptKey } from '../../../api/profileApi';

export async function getWebpageFromCube(params: LectureParams) {
  const { cubeId, cardId } = params;
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

  let url = officeWeb.webPageUrl;

  if (officeWeb.urlType && officeWeb.urlType === 'embedded') {
    const encryptKey = await generationEncryptKey(cubeId, cardId);
    if (url.indexOf('?') > -1) {
      url = url + '&p=' + encryptKey;
    } else {
      url = url + '?p=' + encryptKey;
    }
  }

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
      height: officeWeb.height,
      fileBoxId: officeWeb.fileBoxId,
      urlType: officeWeb.urlType,
    };
    setLectureWebpage(webpage);
  } else {
    const { title, description, image } = officeWeb.webUrlInfo;
    const webpage: LectureWebpage = {
      title,
      description,
      image,
      url,
      height: officeWeb.height,
      fileBoxId: officeWeb.fileBoxId,
      urlType: officeWeb.urlType,
    };
    setLectureWebpage(webpage);
  }
}
