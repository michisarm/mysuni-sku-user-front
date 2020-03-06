
import ModalService from './present/logic/ModalService';
import PageService from './present/logic/PageService';
import NewPageService from './present/logic/NewPageService';
import SharedService from './present/logic/SharedService';
import ActionLogService from './present/logic/ActionLogService';


export default {
  shared: {
    modalService: ModalService.instance,
    pageService: PageService.instance,
    newPageService: NewPageService.instance,
    sharedService: SharedService.instance,
    actionLogService: ActionLogService.instance,
  },
};

export {
  ModalService,
  PageService,
  NewPageService,
  SharedService,
  ActionLogService,
};
