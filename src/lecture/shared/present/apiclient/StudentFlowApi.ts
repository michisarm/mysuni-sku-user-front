
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
      .then(response => response && response.data || null);
  }

  // GET http://ma.mysuni.sk.com/api/lecture/students/flow/studentInfoView?serviceId=P-LECTURE-23&lectureCardIds=LECTURE-CARD-1yq, LECTURE-CARD-1yr, LECTURE-CARD-1ys&courseLectureIds=C-LECTURE-2w, C-LECTURE-2u
  getLectureStudentView(serviceId: string, lectureCardIds: string[], courseLectureIds: string[]) {
    return axiosApi.get<any>(this.baseUrl + `/studentInfoView?serviceId=${serviceId}&lectureCardIds=${lectureCardIds}&courseLectureIds=${courseLectureIds}`)
      .then(response => response && response.data || null);
  }
}

StudentFlowApi.instance = new StudentFlowApi();

export default StudentFlowApi;
