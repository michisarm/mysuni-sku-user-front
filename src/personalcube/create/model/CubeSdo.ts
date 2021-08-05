/* eslint-disable */
import { isEmpty } from 'lodash';
import { CubeCategory } from '../../../shared/model/CubeCategory';
import DifficultyLevel from '../../../lecture/detail/model/DifficultyLevel';
import { Description } from '../../personalcube/model/Description';
import { CubeMaterialSdo } from './CubeMaterialSdo';
import CubeType from '../../../lecture/detail/model/CubeType';
import { getMainCategory } from './CreateCubeDetail';
import { reactAlert } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';
import { getPolyglotText } from '../../../shared/ui/logic/PolyglotText';

export interface CubeSdo {
  name: string;
  type: CubeType;
  categories: CubeCategory[];
  tags: string[];
  learningTime: number;
  difficultyLevel: DifficultyLevel;
  description: Description;
  organizerId: string;
  otherOrganizerName?: string;
  operator: {
    keyString: string;
  };
  fileBoxId?: string;
  materialSdo: CubeMaterialSdo;
}

export const initialCubeSdo: CubeSdo = {
  name: '',
  type: 'None',
  categories: [],
  tags: [],
  learningTime: 0,
  difficultyLevel: 'Basic',
  description: {
    applicants: '',
    completionTerms: '',
    description: '',
    goal: '',
    guide: '',
  },
  organizerId: '',
  otherOrganizerName: '',
  fileBoxId: '',
  materialSdo: {
    mediaSdo: {
      mediaContents: {
        contentsProvider: {
          contentsProviderType: {
            id: '',
            name: '',
          },
          expiryDate: '',
          url: '',
        },
        internalMedias: [],
        linkMediaUrl: '',
      },
    },
    boardSdo: {},
    officeWebSdo: {},
  },
  operator: {
    keyString: patronInfo.getDenizenId() || '',
  },
};

export function getBlankRequiredCubeField(cubeSdo: CubeSdo) {
  const mainCategory = getMainCategory(cubeSdo.categories);

  if (!cubeSdo.name) return '강좌정보';
  if (!mainCategory) return '메인채널';
  if (cubeSdo.tags.length > 10) {
    return '태그는 10개까지 입력 가능합니다.';
  }
  if (cubeSdo.type === 'None') return '교육형태';
  if (!cubeSdo.description?.goal) return '교육목표';
  if (!cubeSdo.description?.applicants) return '교육대상';
  if (!cubeSdo.description?.description) return '교육내용';
  if (!cubeSdo.learningTime) return '교육시간';
  if (!cubeSdo.difficultyLevel) return '난이도';
  if (!cubeSdo.organizerId) return '교육기관/출처';

  return 'none';
}

export function getBlankRequiredCubeContentsField(cubeSdo: CubeSdo) {
  const mainCategory = getMainCategory(cubeSdo.categories);

  if (!cubeSdo.name)
    return getPolyglotText('강좌정보', 'Create-NMButtonRequired-강좌정보');
  if (!mainCategory)
    return getPolyglotText('메인채널', 'Create-NMButtonRequired-메인정보');
  if (cubeSdo.tags.length > 10) {
    return getPolyglotText(
      '태그는 10개까지 입력 가능합니다.',
      'Create-NMButtonRequired-태그'
    );
  }
  if (cubeSdo.type === 'None')
    return getPolyglotText('교육형태', 'Create-NMButtonRequired-교육형태');
  if (!cubeSdo.description?.goal)
    return getPolyglotText('교육목표', 'Create-NMButtonRequired-교육목표');
  if (!cubeSdo.description?.applicants)
    return getPolyglotText('교육대상', 'Create-NMButtonRequired-교육대상');
  if (!cubeSdo.description?.description)
    return getPolyglotText('교육내용', 'Create-NMButtonRequired-교육내용');
  if (!cubeSdo.learningTime)
    return getPolyglotText('교육시간', 'Create-NMButtonRequired-교육시간');
  if (!cubeSdo.difficultyLevel)
    return getPolyglotText('난이도', 'Create-NMButtonRequired-난이도');
  if (!cubeSdo.organizerId)
    return getPolyglotText(
      '교육기관/출처',
      'Create-NMButtonRequired-교육기관출처'
    );
  if (!cubeSdo.description?.goal)
    return getPolyglotText('교육목표', 'Create-NMButtonRequired-교육목표');
  if (!cubeSdo.description?.applicants)
    return getPolyglotText('교육대상', 'Create-NMButtonRequired-교육대상');
  if (!cubeSdo.description?.description)
    return getPolyglotText('교육내용', 'Create-NMButtonRequired-교육내용');
  if (!cubeSdo.learningTime)
    return getPolyglotText('교육시간', 'Create-NMButtonRequired-교육시간');
  if (!cubeSdo.difficultyLevel)
    return getPolyglotText('난이도', 'reate-NMButtonRequired-난이도');
  if (!cubeSdo.organizerId)
    return getPolyglotText(
      '교육기관/출처',
      'Create-NMButtonRequired-교육기관출처'
    );

  if (cubeSdo.type === 'Video' || cubeSdo.type === 'Audio') {
    const mediaContents = cubeSdo.materialSdo.mediaSdo.mediaContents;
    if (
      isEmpty(mediaContents?.internalMedias[0]) &&
      !mediaContents?.linkMediaUrl
    ) {
      return getPolyglotText('교육자료', 'Create-NMButtonRequired-교육자료VnA');
    }
  }

  if (cubeSdo.type === 'Documents') {
    if (!cubeSdo.materialSdo.officeWebSdo.fileBoxId) {
      return getPolyglotText('교육자료', 'Create-NMButtonRequired-교육자료Doc');
    }
  }

  if (cubeSdo.type === 'WebPage') {
    if (!cubeSdo.materialSdo.officeWebSdo.webPageUrl) {
      return getPolyglotText('교육자료', 'Create-NMButtonRequired-교육자료Web');
    }
  }

  return 'none';
}

export const alertRequiredField = (message: string) => {
  reactAlert({
    title: getPolyglotText(
      '필수 정보 입력 안내',
      'Create-NMButtonRequired-필수정보입력'
    ),
    message,
    warning: true,
  });
};
