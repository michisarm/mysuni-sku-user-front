import { findCommunity } from 'community/api/communityApi';
import { findCubeDetailCache } from '../../../api/cubeApi';
import { setLectureWebpage } from '../../../store/LectureWebpageStore';
import LectureWebpage from '../../../viewModel/LectureWebpage';

export async function getCohortFromCube(cubeId: string) {
  const cubeDetail = await findCubeDetailCache(cubeId);
  if (
    cubeDetail === undefined ||
    cubeDetail.cubeMaterial.cubeCommunity === null
  ) {
    return;
  }
  const {
    cubeMaterial: {
      cubeCommunity: { communityId },
    },
  } = cubeDetail;
  if (communityId === null) {
    setLectureWebpage({
      title: '/community',
      description: undefined,
      image: undefined,
      url: '/community',
      fileBoxId: '',
    });
  } else {
    const url = `/community/${cubeDetail.cubeMaterial.cubeCommunity.communityId}`;
    const community = await findCommunity(communityId);
    setLectureWebpage({
      title: community?.name || '',
      description: community?.description || '',
      image: undefined,
      url,
      fileBoxId: '',
    });
  }
}
