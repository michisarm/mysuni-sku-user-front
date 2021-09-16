import { PaginationProps as SemanticPaginationProps } from 'semantic-ui-react';
import PageModel from './PageModel';

export default interface PaginationProps
  extends Omit<SemanticPaginationProps, 'activePage'> {
  activePage: number;
  pageModel: PageModel;
}
