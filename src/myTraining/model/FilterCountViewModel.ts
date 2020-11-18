import { decorate, observable } from "mobx";

//
class FilterCountViewModel {

  collegeId: string = '';
  collegeName: string = '';
  totalCount: number = 0;
  college: number = 0;
  course: number = 0;
  video: number = 0;
  audio: number = 0;
  elearning: number = 0;
  classroomLecture: number = 0;
  community: number = 0;
  webPage: number = 0;
  documents: number = 0;

  public constructor(filterCountView?: FilterCountViewModel) {
    if (filterCountView) {
      this.collegeId = filterCountView.collegeId ? filterCountView.collegeId : '';
      this.collegeName = filterCountView.collegeName ? filterCountView.collegeName : '';
      this.college = filterCountView.college ? filterCountView.college : 0;
      this.course = filterCountView.course ? filterCountView.course : 0;
      this.video = filterCountView.video ? filterCountView.video : 0;
      this.audio = filterCountView.audio ? filterCountView.audio : 0;
      this.elearning = filterCountView.elearning ? filterCountView.elearning : 0;
      this.classroomLecture = filterCountView.classroomLecture ? filterCountView.classroomLecture : 0;
      this.community = filterCountView.community ? filterCountView.community : 0;
      this.webPage = filterCountView.webPage ? filterCountView.webPage : 0;
      this.documents = filterCountView.documents ? filterCountView.documents : 0;
    }
  }

  /** 나중에 고치기!  */
  public getCountFromLearningType = (learningType: string) => {
    switch (learningType) {
      case 'Course':
        return this.course;
      case 'Video':
        return this.video;
      case 'Audio':
        return this.audio;
      case 'e-Learning':
        return this.elearning;
      case 'Classroom':
        return this.classroomLecture;
      case 'Community':
        return this.community;
      case 'Web Page':
        return this.webPage;
      case 'Documents':
        return this.documents;
      default:
        return 0;
    }
  }


  public static getTotalFilterCountView = (filterCountViews: FilterCountViewModel[]): FilterCountViewModel => {
    const totalFilterCountView: FilterCountViewModel = new FilterCountViewModel();

    filterCountViews.forEach(filterCountView => {
      totalFilterCountView.college += filterCountView.college;
      totalFilterCountView.course += filterCountView.course;
      totalFilterCountView.video += filterCountView.video;
      totalFilterCountView.audio += filterCountView.audio;
      totalFilterCountView.elearning += filterCountView.elearning;
      totalFilterCountView.classroomLecture += filterCountView.classroomLecture;
      totalFilterCountView.community += filterCountView.community;
      totalFilterCountView.webPage += filterCountView.webPage;
      totalFilterCountView.documents += filterCountView.documents;
    })

    totalFilterCountView.totalCount =
      totalFilterCountView.course + totalFilterCountView.video + totalFilterCountView.audio +
      totalFilterCountView.elearning + totalFilterCountView.classroomLecture + totalFilterCountView.community +
      totalFilterCountView.webPage + totalFilterCountView.documents;

    return totalFilterCountView;
  }
}

export default FilterCountViewModel;

decorate(FilterCountViewModel, {
  collegeId: observable,
  collegeName: observable,
  college: observable,
  course: observable,
  video: observable,
  audio: observable,
  elearning: observable,
  classroomLecture: observable,
  community: observable,
  webPage: observable,
  documents: observable
});