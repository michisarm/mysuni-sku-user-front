import React, { ReactNode } from 'react';
import { reactAutobind, ReactComponent } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import {
  PaginationProps as SemanticPaginationProps,
  Pagination as SemanticPagination,
  Grid,
  SemanticWIDTHS,
} from 'semantic-ui-react';
import SharedService from '../../../../present/logic/SharedService';
import PaginationContext from '../../context/PaginationContext';
import { mobxHelper } from '@nara.platform/accent';

interface Props
  extends Omit<SemanticPaginationProps, 'totalPages' | 'onPageChange'> {
  siblingRange?: SemanticPaginationProps['siblingRange'];

  styled?: boolean;
}

interface Injected {
  sharedService: SharedService;
}

@inject(mobxHelper.injectFrom('shared.sharedService'))
@reactAutobind
@observer
class NavigatorContainer extends ReactComponent<Props, {}, Injected> {
  //
  static defaultProps = {
    siblingRange: 3,
  };

  static contextType = PaginationContext;

  context!: React.ContextType<typeof PaginationContext>;

  async onPageChange(
    e: React.MouseEvent<HTMLAnchorElement>,
    data: SemanticPaginationProps
  ) {
    //
    const { sharedService } = this.injected;
    const { name, onChange } = this.context;
    const activePage = data.activePage as number;

    await onChange(activePage);
    await sharedService.setPage(name, activePage);
  }

  async onPageClick(
    value: number
  ) {
    //
    const { sharedService } = this.injected;
    const { name, onChange } = this.context;
    const activePage = value;

    await onChange(activePage);
    await sharedService.setPage(name, activePage);
  }

  renderNumbers(num: number): ReactNode[] {
    //
    const { name } = this.context;
    const pageModel = this.injected.sharedService.getPageModel(name);

    const nodes: ReactNode[] = [];

    for(let i = 0; i < num; i++) {
      const style = pageModel.page === i+1 ? 'lms-num lms-on' : `lms-num`;

      nodes.push(
        <a className={style} onClick={() =>this.onPageClick(i + 1)}>{i + 1}</a>
      )
    }
    return nodes;
  }

  render() {
    //
    const { totalPages, sharedService, styled, ...rest } = this.props;
    const { name } = this.context;
    const pageModel = this.injected.sharedService.getPageModel(name);
    const childrenCount = React.Children.count(rest.children) as SemanticWIDTHS;

    if (!pageModel || pageModel.count < 1) {
      return null;
    }

    return (
      styled ?
        (
            pageModel.totalPages > 1 ?
              (
                <div className="lms-paging-holder">
                  <a className="lms-prev" onClick={() =>this.onPageClick(pageModel.page - 1)} />
                  {this.renderNumbers(pageModel.totalPages)}
                  <a className="lms-next" onClick={() =>this.onPageClick(pageModel.page + 1)} />
                </div>
              ) : null
          ) :
        (
          <Grid columns={childrenCount || 1} className="list-info">
            <Grid.Row>
              <Grid.Column>
                <div className="center">
                  <SemanticPagination
                    activePage={pageModel.page}
                    totalPages={pageModel.totalPages || 1}
                    {...rest}
                    onPageChange={this.onPageChange}
                  />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )
    );
  }
}

export default NavigatorContainer;
