
import { axiosApi } from '@nara.platform/accent';
import StudentCdoModel from '../../../model/StudentCdoModel';


class StudentFlowApi {
  //
  static instance: StudentFlowApi;

  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_STUDENT_FLOW_API === undefined || process.env.REACT_APP_STUDENT_FLOW_API === '' ?
    '/api/lecture/students/flow' : process.env.REACT_APP_STUDENT_FLOW_API;


  confirmUsageStatisticsByCardId(studentCdo: StudentCdoModel) {
    //
    return axiosApi.post<boolean>(this.baseUrl + `/confirm/usagestatistics`, studentCdo)
      .then(response => response && response.data);
  }
}

StudentFlowApi.instance = new StudentFlowApi();

export default StudentFlowApi;
