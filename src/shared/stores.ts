import ModalService from './present/logic/ModalService';
import PageService from './present/logic/PageService';
import NewPageService from './present/logic/NewPageService';
import SharedService from './present/logic/SharedService';
import BannerService from './present/logic/BannerService';
import FilterBoxService from './present/logic/FilterBoxService';
import { FileService } from './present/logic/FileService';

export default {
  shared: {
    modalService: ModalService.instance,
    pageService: PageService.instance,
    newPageService: NewPageService.instance,
    sharedService: SharedService.instance,
    bannerService: BannerService.instance,
    filterBoxService: FilterBoxService.instance,
    fileService: FileService.instance,
  },
};

export {
  ModalService,
  PageService,
  NewPageService,
  SharedService,
  BannerService,
};
