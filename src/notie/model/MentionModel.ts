import {  decorate, observable } from 'mobx';

class MentionModel {
  //
  title: string = '';
  message: string = '';
  backLink: string = '';
  sentTime: number = 0;
  read: boolean = false;
}

decorate(MentionModel, {
  title: observable,
  message: observable,
  backLink: observable,
  sentTime: observable,
  read: observable,
});

export default MentionModel;
