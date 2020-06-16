
class ContextModel {
  email: string = '';
  path: string = window.location.href;
  menu: string = '';
  poc: string = 'web';

  constructor(context?: ContextModel) {
    if(context) {
      Object.assign(this, {...context});
    }
  }
}

export default ContextModel;