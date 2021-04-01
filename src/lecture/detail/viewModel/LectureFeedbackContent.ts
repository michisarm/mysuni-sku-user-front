export default interface LectureFeedbackContent {
  title?: string;
  content?: string;
  id?: string;
  depotId?: string;
  time?: string;
  relatedUrlList?: RelatedUrlList[];

  //전체의견 갯수조회
  count?: number
}

type RelatedUrlList = {
  title: string;
  url: string;
}
