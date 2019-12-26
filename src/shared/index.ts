

/** Service */
import ModalService from './present/logic/ModalService';
import  PageService from './present/logic/PageService';

export const sharedStores = {
  shared: {
    modalService: ModalService.instance,
    pageService: PageService.instance,
  },
};

export {
  ModalService,
  PageService,
};

/** Helper */
export { default as storybookHelper } from './helper/storybookHelper';
export { default as withSplitting } from './helper/withSplitting';
export { default as mobxHelper } from './helper/mobxHelper';
export { default as dateTimeHelper } from './helper/dateTimeHelper';
export { default as actionHandler } from './present/logic/actionHandler';

/** Component */
export { default as UserApp } from './layout/UserApp';
export { default as ContentLayout } from './layout/ContentLayout';
export { default as ContentHeader } from './layout/ContentHeader';
export { default as ContentMenu } from './layout/ContentMenu';
export { default as LectureContentHeader } from './layout/LectureContentHeader';
export { default as LectureSubInfo } from './layout/LectureSubInfo';
export { default as Lecture } from './components/Lecture';
export { default as OverviewField } from './components/OverviewField';
export { default as NoSuchContentPanel } from './components/NoSuchContentPanel';
export { default as InputWrapper } from './components/InputWrapper';
