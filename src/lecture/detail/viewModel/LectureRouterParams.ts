import LectureParams from './LectureParams';

export type ContentType = 'cube' | 'coures' | 'community';

export default interface LectureRouterParams {
  contentType: ContentType;
  contentId: string;
  lectureId: string;
  pathname: string;
  lectureParams: LectureParams;
}
