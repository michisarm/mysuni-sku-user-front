export type ContentType = 'cube' | 'coures';

export default interface LectureRouterParams {
  contentType: ContentType;
  contentId: string;
  lectureId: string;
  pathname: string;
}