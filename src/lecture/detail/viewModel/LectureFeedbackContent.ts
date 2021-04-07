export default interface LectureFeedbackContent {
  title?: string;
  content?: string;
  id?: string;
  depotId?: string;
  time?: string;
  relatedUrlList?: RelatedUrlList[];
}

type RelatedUrlList = {
  title: string;
  url: string;
}
