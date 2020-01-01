
import { axiosApi } from '@nara.platform/accent';
import StudentCdoModel from '../../model/StudentCdoModel';
import StudentCountRdoModel from '../../model/StudentCountRdoModel';
import StudentJoinRdoModel from '../../model/StudentJoinRdoModel';


class StudentApi {
  //
  static instance: StudentApi;

  baseUrl = '/api/lecture/students';


  registerStudent(studentCdo: StudentCdoModel) {
    //
    return axiosApi.post<string>(this.baseUrl + '/flow', studentCdo)
      .then(response => response && response.data);
  }

  joinCommunity(studentCdo: StudentCdoModel) {
    //
    return axiosApi.post<string>(this.baseUrl + `/flow/joinCommunity`, studentCdo)
      .then(response => response && response.data);
  }

  findStudentCount(rollBookId: string) {
    return axiosApi.get<StudentCountRdoModel>(this.baseUrl + `/flow/count/byRollBookId`, { params: { rollBookId }})
      .then(response => response && response.data);
  }

  findIsJsonStudent(lectureCardId: string) {
    return axiosApi.get<StudentJoinRdoModel[]>(this.baseUrl + `/flow/isJson`, { params: { lectureCardId }})
      .then(response => response && response.data);
  }

  studentMarkComplete(rollBookId: string) {
    return axiosApi.put<void>(this.baseUrl + `/flow/markComplete`, { rollBookId });
  }

  removeStudent(rollBookId: string) {
    return axiosApi.delete(this.baseUrl + `/flow/markComplete`, { params: { rollBookId } });
  }
}

StudentApi.instance = new StudentApi();

export default StudentApi;
