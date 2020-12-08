
import { axiosApi } from '@nara.platform/accent';
// import axiosApi from 'axios';


const spinner = {
  //
  requestInterceptor: 0,
  responseInterceptor: 0,

  open: () => {},
  close: () => {},
  closeAll: () => {},
  // without: axiosApi.create(),


  init() {
    //
    if (this.requestInterceptor || this.responseInterceptor) {
      return;
    }

    this.requestInterceptor = axiosApi.interceptors.request.use(
      (config: any) => {
        if (config.spinner !== false) {
          this.open();
        }
        return config;
      },
      (error: any) => {
        this.closeAll();
        return Promise.reject(error);
      },
    );

    this.responseInterceptor = axiosApi.interceptors.response.use(
      response => {
        this.close();
        return response;
      },
      (error: any) => {
        this.closeAll();
        return Promise.reject(error);
      },
    );
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
