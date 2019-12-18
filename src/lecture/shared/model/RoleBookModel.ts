
import { decorate, observable } from 'mobx';


class RoleBookModel {
  //
  round: number = 0;
  name: string = '';
}

decorate(RoleBookModel, {
  round: observable,
  name: observable,
});

export default RoleBookModel;
