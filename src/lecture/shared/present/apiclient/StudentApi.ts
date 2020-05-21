import { axiosApi } from '@nara.platform/accent';
import { LearningState } from 'shared/model';
import StudentCdoModel from '../../../model/StudentCdoModel';
import StudentCountRdoModel from '../../../model/StudentCountRdoModel';
import StudentJoinRdoModel from '../../../model/StudentJoinRdoModel';
import StudentModel from '../../../model/StudentModel';


class StudentApi {
  //
  static instance: StudentApi;

  baseUrl = '/api/lecture/students';


  registerStudent(studentCdo: StudentCdoModel) {
    console.log('registerStudent proposalState ::' + studentCdo.proposalState);
    console.log('registerStudent name ::' + studentCdo.name);
    console.log('registerStudent email ::' + studentCdo.email);
    //
    return axiosApi.post<string>(this.baseUrl + '/flow', studentCdo)
      .then(response => response && response.data);
  }

  joinCommunity(studentCdo: StudentCdoModel) {
    //
    return axiosApi.post<string>(this.baseUrl + `/flow/joinCommunity`, studentCdo)
      .then(response => response && response.data);
  }

  findStudent(studentId: string) {
    return axiosApi.get<StudentModel>(this.baseUrl + `/${studentId}`)
      .then(response => response && response.data || null);
  }

  findStudentByRollBookId(rollBookId: string) {
    return axiosApi.get<StudentModel>(this.baseUrl + `/byRollBookId`, { params: { rollBookId }})
      .then(response => response && response.data || null);
  }

  findStudentCount(rollBookId: string) {
    return axiosApi.get<StudentCountRdoModel>(this.baseUrl + `/flow/count/byRollBookId`, { params: { rollBookId }})
      .then(response => response && response.data);
  }

  findIsJsonStudentByCube(lectureCardId: string) {
    return axiosApi.get<StudentJoinRdoModel[]>(this.baseUrl + `/flow/isJsonByCube`, { params: { lectureCardId }})
      .then(response => response && response.data || []);
  }

  findIsJsonStudent(lectureCardId: string) {
    return axiosApi.get<StudentJoinRdoModel[]>(this.baseUrl + `/flow/isJson`, { params: { lectureCardId }})
      .then(response => response && response.data || []);
  }

  studentMarkComplete(rollBookId: string) {
    return axiosApi.put<void>(this.baseUrl + `/flow/markComplete`, { rollBookId });
  }

  removeStudent(rollBookId: string) {
    return axiosApi.delete(this.baseUrl + `/flow/byRollBookId`, { params: { rollBookId }});
  }

  modifyLearningState(studentId: string, learningState: LearningState) {
    return axiosApi.put(this.baseUrl + `/flow/learningState`, { studentIds: [studentId], learningState });
  }

  modifyStudent(studentId: string, fileBoxId: string) {
    return axiosApi.put(this.baseUrl + `/flow/courseworkProcess/${studentId}/${fileBoxId}`);
  }

  modifyStudentForExam(studentId: string, examId: string) {
    return axiosApi.put(this.baseUrl + `/flow/examProcess/${studentId}/${examId}`);
  }

  modifyStudentForCoursework(studentId: string, fileBoxId: string) {
    return axiosApi.put(this.baseUrl + `/flow/courseworkProcess/${studentId}/${fileBoxId}`);
  }
}

StudentApi.instance = new StudentApi();

export default StudentApi;
