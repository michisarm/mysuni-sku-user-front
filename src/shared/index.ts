

/** Service */
import ModalService from './present/logic/ModalService';
import PageService from './present/logic/PageService';
import NewPageService from './present/logic/NewPageService';
import SharedService from './present/logic/SharedService';


export const sharedStores = {
  shared: {
    modalService: ModalService.instance,
    pageService: PageService.instance,
    newPageService: NewPageService.instance,
    sharedService: SharedService.instance,
  },
};

export {
  ModalService,
  PageService,
  NewPageService,
  SharedService,
};


/** Model */
export { default as DramaEntityObservableModel } from './model/DramaEntityObservableModel';
export { default as IdName } from './model/IdName';
export { default as IdNameCount } from './model/IdNameCount';
export { default as IdNameList } from './model/IdNameList';
export { NameValueList } from './model/NameValueList';
export { default as OffsetElementList } from './model/OffsetElementList';
export { PatronKey } from './model/PatronKey';
export { LangStrings } from './model/LangStrings';
export { OrderedOffset } from './model/OrderedOffset';

export { CategoryModel } from './model/CategoryModel';
export { SearchFilter } from './model/SearchFilter';
export { CreatorModel } from './model/CreatorModel';
export { QueryModel } from './model/QueryModel';
export { IconBox } from './model/IconBox';
export { IconType } from './model/IconType';
export { CubeType } from './model/CubeType';
export { CubeState } from './model/CubeState';
export { CourseOpenModel } from './model/CourseOpenModel';
export { CourseState } from './model/CourseState';
export { default as ProposalState } from './model/ProposalState';
export { default as ProposalStateName } from './model/ProposalStateName';
export { default as LearningState } from './model/LearningState';
export { default as LearningStateName } from './model/LearningStateName';

export { DatePeriod } from './model/DatePeriod';
export { TimePeriod } from './model/TimePeriod';
export { default as PageModel } from './model/PageModel';
export { default as NewPageModel } from './model/NewPageModel';


/** Helper */
export { default as storybookHelper } from './helper/storybookHelper';
export { default as DynamicImport } from './helper/DynamicImport';
export { default as withSplitting } from './helper/withSplitting';
export { default as dateTimeHelper } from './helper/dateTimeHelper';
export { default as actionHandler } from './present/logic/actionHandler';

/** Component */
export { default as UserApp } from '../layout/UserApp';
export { default as AppLayout } from '../layout/UserApp/ui/logic/AppLayoutContainer';
export { default as ContentLayout } from '../layout/ContentLayout';
export { default as ContentHeader } from '../layout/ContentHeader';
export { default as ContentMenu } from '../layout/ContentMenu';
export { default as NoSuchContentPanel } from './components/NoSuchContentPanel';
export { default as InputWrapper } from './components/InputWrapper';
export { default as Tab, TabItemModel } from './components/Tab';
export { default as ListPanelTopLine } from './components/ListPanelTopLine';

// Deprecated
export { default as AlertWin } from './ui/logic/AlertWin';
export { default as ConfirmWin } from './ui/logic/ConfirmWin';
