
import { axiosApi } from '@nara.platform/accent';
import StudentCdoModel from '../../../model/StudentCdoModel';


class StudentFlowApi {
  //
  static instance: StudentFlowApi;

  baseUrl = '/api/lecture/students/flow';


  confirmUsageStatisticsByCardId(studentCdo: StudentCdoModel) {
    //
    return axiosApi.post<boolean>(this.baseUrl + `/confirm/usagestatistics`, studentCdo)
      .then(response => response && response.data);
  }
}

StudentFlowApi.instance = new StudentFlowApi();

export default StudentFlowApi;
