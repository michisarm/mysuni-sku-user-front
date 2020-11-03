import {action, computed, IObservableArray, observable, runInAction} from 'mobx';
import {autobind} from '@nara.platform/accent';
import BadgeCompModel from '../../ui/model/BadgeCompModel';
import {CoursePlanContentsModel, CoursePlanModel} from '../../../course/model';
import LectureApi from '../../../lecture/shared/present/apiclient/LectureApi';
import LectureViewModel from '../../../lecture/model/LectureViewModel';
import CourseLectureApi from '../../../lecture/shared/present/apiclient/CourseLectureApi';
import {CourseLectureModel} from '../../../lecture/model';
import CoursePlanApi from '../../../course/present/apiclient/CoursePlanApi';
import PersonalCubeApi from '../../../personalcube/personalcube/present/apiclient/PersonalCubeApi';
import {PersonalCubeModel} from '../../../personalcube/personalcube/model';
import StudentApi from '../../../lecture/shared/present/apiclient/StudentApi';
import StudentModel from '../../../lecture/model/StudentModel';
import StudentJoinRdoModel from '../../../lecture/model/StudentJoinRdoModel';
import BadgeApi from '../apiclient/BadgeApi';


@autobind
class BadgeDetailService {
  //
  static instance: BadgeDetailService;

  /** 뱃지를 구성하는 (Course & Cube) 정보 리스트 조회 ****************************************************************/

  private badgeApi: BadgeApi = BadgeApi.instance;


  // 뱃지를 구성하는 (Course & Cube) 정보 리스트
  @observable
  _badgeCompList: BadgeCompModel[] = [];

  // 뱃지 구성 리스트 개수
  @observable
  _badgeCompCount: number = 0;

  // 뱃지 정보 구성 리스트 초기화
  @action
  clearBadgeCompList() {
    //
    this._badgeCompCount = 0;
    return runInAction(() => this._badgeCompList = []);
  }

  // 뱃지 구성 학습(lecture) 리스트 가져오기
  @action
  async findBadgeCompList(badgeId: string) {
    //
    this.clearBadgeCompList();

    // BadgeCompModel이 코스일 경우 :
    // coursePlanId, lectureCardUsids[] 정보를 이용하여 해당 코스의 lecture 정보를 구한다.
    const compList: BadgeCompModel[] = await this.badgeApi.findBadgeComposition(badgeId);

    if (compList && compList.length > 0) {
      runInAction(() => {
        this._badgeCompList = this._badgeCompList.concat(compList);
        this._badgeCompCount = compList.length;
      });
    }

    return compList;
  }

  // 뱃지 구성 학습(lecture) 리스트 리턴
  @computed
  get BadgeCompList() {
    return (this._badgeCompList as IObservableArray).peek();
  }

  // 뱃지 구성 리스트 개수 리턴
  @computed
  get BadgeCompCount() {
    return this._badgeCompCount;
  }

  /** Course-Plan 정보 조회 (contentsId 조회) ********************************************************************************/

  private coursePlanApi: CoursePlanApi = CoursePlanApi.instance;

  // Course-Plan
  @observable
  _coursePlan: CoursePlanModel = new CoursePlanModel();

  // Course-Plan ContentsId 구하
  @observable
  _coursePlanContentsId: string = '';

  // Course-Plan 정보 초기화
  @action
  clearCoursePlan() {
    //
    this._coursePlanContentsId = '';
    return runInAction(() => this._coursePlan = new CoursePlanModel());
  }

  // Course-Plan 정보 구하기
  @action
  async findCoursePlan(coursePlanId: string) {
    //
    this.clearCoursePlan();

    const coursePlan: CoursePlanModel = await this.coursePlanApi.findCoursePlan(coursePlanId);

    if (coursePlan && coursePlan.contentsId.length > 0) {
      runInAction(() => {
        Object.assign(this._coursePlan, coursePlan);
        this._coursePlanContentsId = coursePlan.contentsId;
      });
    }

    return coursePlan;
  }

  // Course-Plan 정보 리턴
  @computed
  get CoursePlan() {
    return this._coursePlan;
  }

  // Course-Plan 컨텐츠 Id 리턴
  @computed
  get CoursePlanContentsId() {
    return this._coursePlanContentsId;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Course-Plan Contents
  @observable
  _coursePlanContents: CoursePlanContentsModel = new CoursePlanContentsModel();

  // Course-Plan 정보 초기화
  @action
  clearCoursePlanContents() {
    //
    return runInAction(() => this._coursePlanContents = new CoursePlanContentsModel());
  }

  // Course-Plan 컨텐츠 정보 조회
  @action
  async findCoursePlanContentsV2(coursePlanContentsId: string) {
    //
    //
    this.clearCoursePlanContents();

    const coursePlanContents: CoursePlanContentsModel = await this.coursePlanApi.findCoursePlanContentsV2(coursePlanContentsId);

    if (coursePlanContents) {
      runInAction(() => {
        Object.assign(this._coursePlanContents, coursePlanContents);
      });
    }

    return coursePlanContents;
  }

  // Course-Plan 컨텐츠 정보 리턴
  @computed
  get CoursePlanContents() {
    return this._coursePlanContents;
  }

  /** 코스를 구성하는 학습(lecture) 정보 조회 *************************************************************************/

  private courseLectureApi: CourseLectureApi = CourseLectureApi.instance;

  // 코스를 구성하는 큐브 정보 리스트
  @observable
  _courseLecture: CourseLectureModel = new CourseLectureModel();

  // 뱃지 구성 리스트 개수
  @observable
  _courseLectureCount: number = 0;

  // 뱃지 정보 구성 리스트 초기화
  @action
  clearCourseLectureList() {
    //
    this._courseLectureCount = 0;
    return runInAction(() => this._courseLecture = new CourseLectureModel());
  }

  // 뱃지 구성 학습(lecture) 리스트 가져오기
  @action
  async findCourseLectureList(courseLectureId: string) {
    //
    this.clearCourseLectureList();

    const courseLecture: CourseLectureModel = await this.courseLectureApi.findCourseLecture(courseLectureId);

    if (courseLecture && courseLecture.lectureCardUsids.length > 0) {
      runInAction(() => {
        Object.assign(this._courseLecture, courseLecture);
        this._courseLectureCount = this._courseLecture.lectureCardUsids.length;
      });
    }

    return courseLecture;
  }

  // 뱃지 구성 학습(lecture) 리스트 리턴
  @computed
  get CourseLecture() {
    return this._courseLecture;
  }

  // 뱃지 구성 리스트 개수 리턴
  @computed
  get CourseLectureCount() {
    return this._courseLectureCount;
  }

  /** 코스를 구성하는 학습(lecture) 리스트 정보 조회 ******************************************************************/

  private lectureApi: LectureApi = LectureApi.instance;

  // 코스 구성 학습(lecture) 리스트
  @observable
  _lectureViewList: LectureViewModel[] = [];

  // 코스 구성 학습(lecture) 개수
  @observable
  _lectureViewCount: number = 0;

  // 코스 구성 학습(lecture) 리스트 초기화
  @action
  clearLectureViews() {
    //
    this._lectureViewCount = 0;
    return runInAction(() => this._lectureViewList = []);
  }

  // 코스 구성 렉쳐카드 ID 구하기 (courseLectureUsids 사용하지 않음)
  @action
  async findLectureViewsV2(coursePlanId: string, lectureCardUsids: string[], courseLectureUsids?: string[]) {
    //
    this.clearLectureViews();

    const lectureViews: LectureViewModel[] = await this.lectureApi.findLectureViewsV2(coursePlanId, lectureCardUsids, courseLectureUsids);

    if (lectureViews && lectureViews.length > 0) {
      runInAction(() => {
        this._lectureViewList = this._lectureViewList.concat(lectureViews);
        this._lectureViewCount = lectureViews.length;
      });
    }

    return lectureViews;
  }

  // 코스 구성 학습(lecture) 리스트 리턴
  @computed
  get LectureViewList() {
    return (this._lectureViewList as IObservableArray).peek();
  }

  // 코스 구성 학습(lecture) 개수 리턴
  @computed
  get LectureViewCount() {
    return this._lectureViewCount;
  }

  /** Personal Cube (큐브) 정보 조회 **********************************************************************************/

  private personalCubeApi: PersonalCubeApi = PersonalCubeApi.instance;

  // 학습 정보
  @observable
  _personalCube: PersonalCubeModel = new PersonalCubeModel();

  // 학습 정보 초기화
  @action
  clearPersonalCube() {
    //
    return runInAction(() => this._personalCube = new PersonalCubeModel());
  }

  // 학습 정보 가져오기
  @action
  async findPersonalCube(personalCubeId: string) {
    //
    this.clearPersonalCube();

    const personalCube: PersonalCubeModel = await this.personalCubeApi.findPersonalCube(personalCubeId);

    if (personalCube) {
      runInAction(() => {
        Object.assign(this._personalCube, personalCube);
      });
    }

    return personalCube;
  }

  // 학습 정보  리턴
  @computed
  get PersonalCube() {
    return this._personalCube;
  }

  /** 사용자 카드(Card) 학습 (상세) 정보 조회 *******************************************************************************************/

  private studentApi: StudentApi = StudentApi.instance;

  // 사용자 카드(Card) 학습 정보
  @observable
  _studentJoin: StudentJoinRdoModel[] = [];

  // 사용자 카드(Card) 학습 정보
  @observable
  _studentJoinCount: number = 0;

  // 사용자 카드(Card) 학습 정보 초기화
  @action
  clearStudentJoin() {
    //
    this._studentJoinCount = 0;
    return runInAction(() => this._studentJoin = []);
  }

  // 사용자 카드(Card) 학습 정보 가져오기
  @action
  async findIsJsonStudent(lectureCardId: string) {
    //
    this.clearStudentJoin();

    const studentJoin: StudentJoinRdoModel[] = await this.studentApi.findIsJsonStudent(lectureCardId);

    if (studentJoin && studentJoin.length > 0) {
      runInAction(() => {
        this._studentJoin = this._studentJoin.concat(studentJoin);
        this._studentJoinCount = studentJoin.length;
      });
    }

    return studentJoin;
  }

  // 사용자 카드(Card) 학습 정보  리턴
  @computed
  get StudentJoin() {
    return this._studentJoin;
  }

  // 사용자 카드(Card) 학습 정보 수 리턴
  @computed
  get StudentJoinCount() {
    return this._studentJoinCount;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // 사용자 카드(Card) 학습 상세 정보
  @observable
  _student: StudentModel = new StudentModel();

  // 사용자 카드(Card) 학습 상세 정보 초기화
  @action
  clearStudent() {
    //
    return runInAction(() => this._student = new StudentModel());
  }

  // 사용자 카드(Card) 학습 상세 정보 가져오기
  @action
  async findStudent(studentId: string) {
    //
    this.clearStudent();

    const student: StudentModel = await this.studentApi.findStudent(studentId);

    if (student) {
      runInAction(() => {
        Object.assign(this._student, student);
      });
    }

    return student;
  }

  // 사용자 카드(Card) 학습 상세 정보  리턴
  @computed
  get Student() {
    return this._student;
  }

  /********************************************************************************************************************/
}

BadgeDetailService.instance = new BadgeDetailService();

export default BadgeDetailService;
