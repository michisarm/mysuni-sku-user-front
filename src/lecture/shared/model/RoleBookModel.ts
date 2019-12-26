
import { decorate, observable } from 'mobx';


class RoleBookModel {
  //
  round: number = 0;
  name: string = '';
  lectureCardId: string = '';
}

decorate(RoleBookModel, {
  round: observable,
  name: observable,
  lectureCardId: observable,
});

export default RoleBookModel;
