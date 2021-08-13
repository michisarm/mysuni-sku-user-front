import { PolyglotString } from 'shared/viewmodel/PolyglotString';

export default interface LectureFeedbackContent {
  id?: string;
  title?: PolyglotString;
  content?: PolyglotString;
  relatedUrlList?: RelatedUrlList[];
  depotId?: string;
  commentFeedbackId?: string;
  privateComment?: boolean;
}

type RelatedUrlList = {
  title: string;
  url: string;
};

export function relatedUrlVisiable(
  lectureFeedbackContent?: LectureFeedbackContent
) {
  if (
    lectureFeedbackContent === undefined ||
    lectureFeedbackContent.relatedUrlList === undefined
  ) {
    return false;
  }
  return !lectureFeedbackContent.relatedUrlList.some(
    (url) => url.title === '' || url.url === ''
  );
}
