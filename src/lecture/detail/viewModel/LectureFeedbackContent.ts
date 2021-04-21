export default interface LectureFeedbackContent {
  id?: string;
  title?: string;
  content?: string;
  relatedUrlList?: RelatedUrlList[];
  depotId?: string;
  commentFeedbackId?: string;
  privateComment?: boolean;
}

type RelatedUrlList = {
  title: string;
  url: string;
}
