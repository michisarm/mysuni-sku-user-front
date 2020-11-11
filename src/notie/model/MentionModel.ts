import {  decorate, observable } from 'mobx';

class MentionModel {
  //
  title: string = '';
  message: string = '';
  backLink: string = '';
  sentTime: number = 0;
}

decorate(MentionModel, {
  title: observable,
  message: observable,
  backLink: observable,
  sentTime: observable,
});

export default MentionModel;
