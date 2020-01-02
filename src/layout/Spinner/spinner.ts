
import axiosApi from 'axios';


const spinner = {
  //
  requestInterceptor: null,
  responseInterceptor: null,

  open: () => console.warn('SpinnerContainer가 존재하지 않습니다.'),
  close: () => console.warn('SpinnerContainer가 존재하지 않습니다.'),
  closeAll: () => console.warn('SpinnerContainer가 존재하지 않습니다.'),
  without: axiosApi.create(),

  init() {
    //
    // if (this.requestInterceptor !== null && this.responseInterceptor !== null) {
    //   return;
    // }
    //
    // this.requestInterceptor = axios.interceptors.request.use(
    //   (config: any) => {
    //     if (config.spinner !== false) {
    //       this.open();
    //     }
    //     return config;
    //   },
    //   (error: any) => {
    //     this.close();
    //     // 오류 공통처리
    //     return Promise.reject(error);
    //   },
    // );
    //
    // this.responseInterceptor = axios.interceptors.response.use(
    //   response => {
    //     this.closeOne();
    //     return response;
    //   },
    //   error => {
    //     this.close();
    //     // 오류 공통처리
    //     return Promise.reject(error);
    //   },
    // );
  },

  // off() {
  //   if(this.requestInterceptor === null && this.responseInterceptor === null) return;

  //   axios.interceptors.request.eject(this.requestInterceptor);
  //   axios.interceptors.response.eject(this.responseInterceptor);
  //   this.requestInterceptor = null;
  //   this.responseInterceptor = null;
  // }
};

export default spinner;
