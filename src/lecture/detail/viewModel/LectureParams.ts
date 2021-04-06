import CubeType from '../../model/CubeType';
import { LectureViewType } from './LectureViewType';

export default interface LectureParams {
  cardId: string;
  cubeId?: string;
  viewType: LectureViewType;
  cubeType?: CubeType;
  chapterId?: string;
  discussionId?: string;
}

export function compareLectureParams(a: LectureParams, b: LectureParams) {
  return a.cubeId == b.cubeId && a.cardId == b.cardId;
}

export function toPath(params: LectureParams): string {
  const { viewType } = params;
  switch (viewType) {
    case 'view':
      return toViewPath(params);
    case 'chapter':
      return toChapterPath(params);
    case 'test':
      return toTestPath(params);
    case 'report':
      return toReportPath(params);
    case 'survey':
      return toSurveyPath(params);
    case 'discussion':
      return toDiscussionPath(params);
  }
  return '';
}

export function toViewPath(params: LectureParams): string {
  const { cubeId, cardId, cubeType } = params;
  if (cubeId !== undefined) {
    return `/lecture/card/${cardId}/cube/${cubeId}/view/${cubeType}`;
  }
  return `/lecture/card/${cardId}/view`;
}
export function toChapterPath(params: LectureParams): string {
  const { chapterId, cardId } = params;
  return `/lecture/card/${cardId}/chapter/${chapterId}`;
}
export function toTestPath(params: LectureParams): string {
  const { cubeId, cardId, cubeType } = params;
  if (cubeId !== undefined) {
    return `/lecture/card/${cardId}/cube/${cubeId}/test/${cubeType}`;
  }
  return `/lecture/card/${cardId}/test`;
}
export function toReportPath(params: LectureParams): string {
  const { cubeId, cardId, cubeType } = params;
  if (cubeId !== undefined) {
    return `/lecture/card/${cardId}/cube/${cubeId}/report/${cubeType}`;
  }
  return `/lecture/card/${cardId}/report`;
}
export function toSurveyPath(params: LectureParams): string {
  const { cubeId, cardId, cubeType } = params;
  if (cubeId !== undefined) {
    return `/lecture/card/${cardId}/cube/${cubeId}/survey/${cubeType}`;
  }
  return `/lecture/card/${cardId}/survey`;
}
export function toDiscussionPath(params: LectureParams): string {
  const { cardId, discussionId } = params;
  return `/lecture/card/${cardId}/discussion/${discussionId}`;
}
