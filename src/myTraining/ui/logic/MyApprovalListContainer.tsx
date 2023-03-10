import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import XLSX from 'xlsx';
import moment from 'moment';
import { ProposalState } from 'shared/model';
import { PageService } from 'shared/stores';
import { SeeMoreButton } from 'lecture/shared';
import ApprovalCubeService from '../../present/logic/ApprovalCubeService';
import routePaths from '../../routePaths';
import SelectType from '../model/SelectOptions';
import ApprovalListPanelTopLineView from '../view/ApprovalListPanelTopLineView';
import ApprovalListView from '../view/ApprovalListView';
import { ApprovalCubeModel } from '../../model';
import { ApprovalCubeXlsxModel } from '../../model/ApprovalCubeXlsxModel';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props extends RouteComponentProps<{ tab: string; pageNo: string }> {
  pageService?: PageService;
  approvalCubeService?: ApprovalCubeService;
  defaultValue?: string;
  targetProps?: string;
}

interface Stats {
  lectureOptions: any[];
}

@inject(
  mobxHelper.injectFrom(
    'shared.pageService',
    'approvalCube.approvalCubeService'
  )
)
@observer
@reactAutobind
class MyApprovalListContainer extends React.Component<Props> {
  //
  PAGE_KEY = 'Submitted';
  PAGE_SIZE = 20;

  state = {
    lectureOptions: [],
  };

  componentDidMount() {
    //
    const { pageService, approvalCubeService } = this.props;
    const { searchState } = approvalCubeService!;
    const currentPageNo = this.props.match.params.pageNo;
    const initialLimit = this.getPageNo() * this.PAGE_SIZE;
    pageService!.initPageMap(this.PAGE_KEY, 0, initialLimit);
    if (currentPageNo === '1') {
      approvalCubeService!.clear();
      pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      this.findApprovalCubes(searchState);
    } else {
      approvalCubeService!.clear();
      this.findApprovalCubes(searchState, this.getPageNo() - 1);
    }
    this.findLectureApprovalSelect();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    //
    const { pageService, approvalCubeService } = this.props;
    const { searchState } = approvalCubeService!;
    const prevTab = prevProps.match.params.tab;
    const currentTab = this.props.match.params.tab;
    const currentPageNo = this.props.match.params.pageNo;

    if (
      prevTab === currentTab &&
      prevProps.match.params.pageNo !== currentPageNo
    ) {
      const page = pageService!.pageMap.get(this.PAGE_KEY);
      const offset =
        page!.limit > this.PAGE_SIZE && page!.nextOffset === 0
          ? page!.nextOffset + this.PAGE_SIZE
          : page!.nextOffset;
      if (currentPageNo === '1') {
        approvalCubeService!.clear();
        pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      } else {
        pageService!.initPageMap(this.PAGE_KEY, offset, this.PAGE_SIZE);
      }
      this.findApprovalCubes(searchState, this.getPageNo() - 1);
    }
  }

  componentWillUnmount(): void {
    //
    const { approvalCubeService } = this.props;
    approvalCubeService!.clearApprovalCube();
  }

  getPageNo() {
    //
    const { match } = this.props;
    return parseInt(match.params.pageNo, 10);
  }

  async findApprovalCubes(
    proposalState: ProposalState | undefined,
    pageNo?: number
  ) {
    //
    const { pageService, approvalCubeService } = this.props;
    const { approvalCube, searchOrderBy, searchEndDate } = approvalCubeService!;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    const offsetList = await approvalCubeService!.findApprovalCubesForSearch(
      page!.nextOffset,
      page!.limit,
      searchOrderBy,
      proposalState,
      approvalCube.cubeId,
      searchEndDate
    );
    pageService!.setTotalCountAndPageNo(
      this.PAGE_KEY,
      offsetList.totalCount,
      pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1
    );
  }

  findLectureApprovalSelect() {
    //
    const { approvalCubeService } = this.props;
    approvalCubeService!.findLectureApprovalSelect().then((lectures) => {
      const lectureOptions = [];
      lectureOptions.push({
        key: '',
        text: getPolyglotText('????????????', '????????????-????????????-slbs'),
        value: '',
      });

      const options = lectures.map((lecture) => ({
        key: lecture.id,
        text: lecture.name,
        value: lecture.id,
      }));

      this.setState({ lectureOptions: lectureOptions.concat(options) });
    });
  }

  onSetCubeIntroPropsByJSON(name: string, value: string) {
    //
    const { pageService, approvalCubeService } = this.props;
    const { searchState, approvalCube } = approvalCubeService!;

    approvalCube.cubeId = value;

    const currentPageNo = this.props.match.params.pageNo;
    const initialLimit = this.getPageNo() * this.PAGE_SIZE;
    pageService!.initPageMap(this.PAGE_KEY, 0, initialLimit);

    if (currentPageNo === '1') {
      approvalCubeService!.clear();
      pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      this.findApprovalCubes(searchState, this.getPageNo());
    } else {
      approvalCubeService!.clear();
      this.findApprovalCubes(searchState, this.getPageNo() - 1);
    }
  }

  onClickSeeMore() {
    //
    const { history } = this.props;
    history.replace(routePaths.currentPage(this.getPageNo() + 1));
  }

  onSearchProposalStateChange(proposalState: ProposalState) {
    const { history, pageService, approvalCubeService, match } = this.props;
    const currentPageNo = match.params.pageNo || 1;

    approvalCubeService!.clear();
    pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
    approvalCubeService!.changeSearchState(proposalState);
    if (currentPageNo !== '1') {
      history.replace(routePaths.currentPage(1));
    } else {
      this.findApprovalCubes(proposalState, this.getPageNo() - 1);
    }
  }

  onChangeOrderBy(orderBy: string, desc: boolean = false) {
    const { approvalCubeService, pageService } = this.props;
    const { searchState } = approvalCubeService!;
    approvalCubeService!.changeSearchOrderBy(orderBy);

    pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
    approvalCubeService!.clear();
    this.findApprovalCubes(searchState);
  }

  onSearchDateChange(searchDate: number) {
    const { approvalCubeService, pageService } = this.props;
    const { searchState } = approvalCubeService!;
    approvalCubeService!.changeSearchEndDate(searchDate);

    pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
    approvalCubeService!.clear();
    this.findApprovalCubes(searchState);
  }

  async onClickApprovalCubeRow(studentId: string) {
    //
    const { history } = this.props;
    history.replace(routePaths.approvalCubesDetail(studentId));
  }

  onExcelDownload() {
    //
    const { approvalCubeService } = this.props;
    const { searchState, approvalCube, searchOrderBy } = approvalCubeService!;

    approvalCubeService!
      .findApprovalCubesForExcel(searchOrderBy, searchState, approvalCube)
      .then(() => {
        const { approvalCubesExcelWrite } = approvalCubeService!;
        const wbList: ApprovalCubeXlsxModel[] = [];
        approvalCubesExcelWrite.map((approvalCube, index: number) => {
          wbList.push(ApprovalCubeModel.asXLSX(approvalCube, index));
        });
        const studentExcel = XLSX.utils.json_to_sheet(wbList);
        const wb = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(wb, studentExcel, 'ApprovalCubes');

        const datetime = moment(new Date().getTime()).format(
          'YYYY.MM.DD_hh_mm_ss'
        );
        XLSX.writeFile(
          wb,
          `${ApprovalCubeModel.getProposalStateName(
            searchState
          )}_${datetime}.xlsx`
        );
      });
  }

  render() {
    //
    const { approvalCubeOffsetList, searchState, searchOrderBy } =
      this.props.approvalCubeService!;
    const { totalCount, results: approvalCubes } = approvalCubeOffsetList;
    const { defaultValue, targetProps } = this.props;
    const { lectureOptions } = this.state;

    return (
      <div className="confirm-list-wrap">
        <ApprovalListPanelTopLineView
          totalCount={totalCount}
          searchSelectOptions={SelectType.userApprovalStatus}
          searchState={searchState}
          defaultValue={defaultValue}
          targetProps={targetProps}
          onSetCubeIntroPropsByJSON={this.onSetCubeIntroPropsByJSON}
          lectures={lectureOptions}
          onExcelDownloadClick={this.onExcelDownload}
          onSearchProposalStateChange={this.onSearchProposalStateChange}
          onSearchDateChange={this.onSearchDateChange}
        />

        <ApprovalListView
          approvalCubeService={this.props.approvalCubeService!}
          totalCount={totalCount}
          handleClickCubeRow={this.onClickApprovalCubeRow}
          onChangeOrderBy={this.onChangeOrderBy}
          orderBy={searchOrderBy}
          searchState={searchState}
        />

        {totalCount > approvalCubes.length && (
          <SeeMoreButton onClick={() => this.onClickSeeMore()} />
        )}
      </div>
    );
  }
}

export default withRouter(MyApprovalListContainer);
