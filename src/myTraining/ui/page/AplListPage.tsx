import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import {
  Breadcrumb,
  Button,
  Container,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  Pagination,
  Segment,
} from 'semantic-ui-react';
import moment, { Moment } from 'moment';
import DatePicker from 'react-datepicker';
import { AplService } from '../../index';
//import AplListView from '../view/AplListView';
import { AplType } from '../../model/AplType';
import { SharedService } from '../../../shared/stores';
import { SkProfileService } from '../../../profile/stores';
import SelectType from '../../model/SelectType';

interface Props extends RouteComponentProps<{ tab: string; pageNo: string }> {
  aplService?: AplService;
  sharedService?: SharedService;
  skProfileService?: SkProfileService;
  /*contentsProviderService?: ContentsProviderService*/
  handleAplListOk?: (commonTreeCode: string, commonTreeId: number) => void;
  handleAplListClear?: () => void;
}

interface States {
  pageIndex: number;
}

@inject('myTraining.aplService', 'shared.sharedService', 'profile.skProfileService')
@observer
@reactAutobind
class AplListPage extends React.Component<Props, States> {
  //
  constructor(props: Props) {
    super(props);
    this.state = { pageIndex: 0 };
  }

  componentDidMount() {
    const { skProfileService } = this.props;
    if (skProfileService) {
      skProfileService.findSkProfile();
    }
    this.init();
  }

  componentWillUnmount() {
    const { aplService } = this.props;
    if (aplService) {
      aplService.clearApl();
    }
  }

  init() {
    const { aplService } = this.props;
    let currentPage = 0;
    if (aplService) currentPage = aplService.aplQuery.currentPage;
    /*
    this.onChangeaplQueryProps(
      `aplType`,
      aplType||aplService.aplQuery.arrangeType||aplService.menuMain.arrangeType||ArrangeType.Rqd
    );
    */
    this.onSetSearchWeek(1);
    // this.onChangeAplQueryProps(`arrangeType`, paramArrangeType);
    // this.onSetSearchYear(1);
  }

  // 수정 후 재조회
  reRetrieve() {
    const { aplService } = this.props;
    let currentPage = 0;
    if (aplService) currentPage = aplService.aplQuery.currentPage;
    if (aplService) {
      this.findAllApls(currentPage);
    }
  }

  /*
  findAllAplsExcel() {
    const { aplService } = this.props;
    aplService!.findAllAplsForExcel()
      .then((arranges: ArrangeListViewModel[]) => {
        const arrangeXlsxList: MenuArrangeXlsxModel[] = [];
        arranges.map((arrange, index) => {
          arrangeXlsxList.push(ArrangeListViewModel.asXLSX(arrange, index));
        });
        const arrangeExcel = XLSX.utils.json_to_sheet(arrangeXlsxList);
        const temp = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(temp, arrangeExcel, 'Arranges');

        // const date = moment().format('YYYY-MM-DD hh:mm:ss');
        XLSX.writeFile(temp, `arranges.xlsx`);
      });
  }
  */

  //  조회
  findAllApls(page?: number) {
    const { sharedService, aplService } = this.props;
    const { aplQuery } = this.props.aplService || ({} as AplService);
    if (sharedService && aplService) {
      let offset = 0;
      if (page) {
        sharedService.setPage('apl', page);
        offset = (page - 1) * aplService.aplQuery.limit;
        aplService.changeAplQueryProps('currentPage', page);
      } else {
        sharedService.setPageMap('apl', 0, aplService.aplQuery.limit);
      }

      aplService.changeAplQueryProps('offset', offset);
      aplService.findAllAplsByQuery().then(() => {
        if (page) this.setState({ pageIndex: (page - 1) * 20 });
      });
    }
  }

  routeToCreateApl() {
    //
    const { aplQuery } = this.props.aplService || ({} as AplService);
    /*
    let paramArrangeType = '';
    if (aplQuery.aplType) {
      paramArrangeType = aplQuery.aplType.toLowerCase();
      //paramArrangeType= aplQuery.arrangeType;
      //paramArrangeType= ArrangeType.Rqd;
    }
    */
    /*
    this.props.history.push(
      `/cineroom/${this.props.match.params.cineroomId}/${displayManagementUrl}/display/create-arrange/${paramArrangeType}`
    );
    */
  }

  handleClickAplRow(aplId: string) {
    //
    const { aplService } = this.props;
    const { aplQuery } = this.props.aplService || ({} as AplService);

    if (aplService) {
      aplService.findApl(aplId).then(menuMain => {
        const aplState = aplService.apl.state;
        let paramAplState = '';
        if (aplService.apl.state) {
          paramAplState = aplService.apl.state.toLowerCase();
        }
        /*
        if (aplState === null) {
          this.props.history.push(
            `/cineroom/${
              this.props.match.params.cineroomId
            }/${displayManagementUrl}/display/create-arrange/${aplId.toString()}/${paramAplState}`
          );
        } else {
          let paramAplState = '';
          if (aplService.apl.state) {
            paramAplState = aplService.apl.state.toLowerCase();
          }
          let paramArrangeType = '';
          if (aplService.apl.arrangeType) {
            paramArrangeType = menuMain.arrangeType.toLowerCase();
          }
          this.props.history.push(
            `/cineroom/${
              this.props.match.params.cineroomId
              //}/${displayManagementUrl}/display/arrange-detail/${aplId.toString()}/${menuMain.state}/${menuMain.arrangeType}`
            }/${displayManagementUrl}/display/arrange-detail/${aplId.toString()}/${paramAplState}/${paramArrangeType}`
          );
        }
        */
      });
    }
  }

  onChangeAplQueryProps(name: string, value: string | Moment | number) {
    const { aplService } = this.props;
    if (aplService) aplService.changeAplQueryProps(name, value);
  }

  setArrangeCountForFind(name: string, value: string) {
    //
    const { aplService } = this.props;
    if (aplService) {
      aplService.changeAplQueryProps(name, value);
      this.setState({ pageIndex: 0 });
    }

    this.findAllApls();
  }

  onSetSearchDate(day?: number) {
    //
    // const { this.onChangeAplQueryProps } = this.props;
    const endDate = moment().endOf('day');
    let startDate = moment().startOf('day');
    if (day) startDate = startDate.subtract(day, 'd');
  }

  onSetSearchWeek(week?: number) {
    //
    //const { this.onChangeAplQueryProps } = this.props;
    const endDate = moment().endOf('day');
    let startDate = moment().startOf('day');
    const period = 7;
    let day = 0;
    if (week !== undefined) {
      if (week === 1) {
        day = period - 1;
      } else if (week > 1) {
        day = period * (week - 1) + 6;
      } else {
        day = period * week;
      }
    }

    if (day) startDate = startDate.subtract(day, 'd');
    //this.onChangeAplQueryProps('period.endDateMoment', endDate);
    //this.onChangeAplQueryProps('period.startDateMoment', startDate);
  }

  onSetSearchMon(mon?: number) {
    //
    //const { this.onChangeAplQueryProps } = this.props;
    const endDate = moment().endOf('day');
    let startDate = moment().startOf('day');
    startDate = startDate.subtract(-1, 'day');
    if (mon) startDate = startDate.subtract(mon, 'M');

    //this.onChangeAplQueryProps('period.endDateMoment', endDate);
    //this.onChangeAplQueryProps('period.startDateMoment', startDate);
  }

  onSetSearchYear(year?: number) {
    //
    //const { this.onChangeAplQueryProps } = this.props;
    const endDate = moment().endOf('day');
    let startDate = moment().startOf('day');
    startDate = startDate.subtract(-1, 'day');
    if (year) startDate = startDate.subtract(year, 'y');

    //this.onChangeAplQueryProps('period.endDateMoment', endDate);
    //this.onChangeAplQueryProps('period.startDateMoment', startDate);
  }

  /*
  findCompany(companyCode: string) {
    this.props.companyService.findCompany(companyCode);
  }

  handleCompanySelect(companyId?: string) {
    if (companyId) {
      this.findCompany(companyId);    }
  }
  */

  modifyApl(isUse: boolean, aplId: number) {
    //
    const { aplService } = this.props;
    if (aplService) {
      aplService.modifyApl(isUse, aplId).then(() => this.reRetrieve());
    }
  }

  render() {
    const { aplService } = this.props;
    const { apls, aplQuery, aplCount, aplSectionsSelectType } =
      this.props.aplService || ({} as AplService);
    const result = apls.results;
    const totalCount = apls.totalCount;
    const { pageMap } = this.props.sharedService || ({} as SharedService);
    const { pageIndex } = this.state;

    return (
      /*<div className="flex">*/
      <>
        <Container fluid>
          <div>
            <Breadcrumb icon="right angle" sections={aplSectionsSelectType} />
            <Header as="h2">개인학습</Header>
          </div>
          <Segment>
            <Form className="search-box">
              <Grid>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Form.Group inline>
                      <label>편성 Set명</label>
                      <Form.Field
                        control={Input}
                        width={10}
                        placeholder="검색어를 입력해주세요."
                        value={(aplQuery && aplQuery.searchWord) || ''}
                        disabled={false}
                        onChange={(e: any) =>
                          this.onChangeAplQueryProps(
                            'searchWord',
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>
                  </Grid.Column>
                  <Grid.Column width={16}>
                    <div className="center">
                      <Button primary onClick={() => this.findAllApls(1)}>
                        검색
                      </Button>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Segment>

          {/* <AplListView
            result={result}
            //findAllAplsExcel={this.findAllAplsExcel}
            routeToCreateApl={this.routeToCreateApl}
            handleClickAplRow={this.handleClickAplRow}
            pageIndex={pageIndex}
            aplCount={aplCount}
            totalCount={totalCount}
            setAplCountForFind={this.setArrangeCountForFind}
            modifyMenuMain={this.modifyApl}
            aplService={aplService}
            aplQuery={aplQuery}
          /> */}
          {totalCount === 0 ? null : (
            <>
              <div className="center">
                <Pagination
                  activePage={pageMap.get('apl') ? pageMap.get('apl').page : 1}
                  totalPages={
                    pageMap.get('apl') ? pageMap.get('apl').totalPages : 1
                  }
                  onPageChange={(e, data) =>
                    this.findAllApls(data.activePage as number)
                  }
                />
              </div>
            </>
          )}
        </Container>
        {/*</div>*/}
      </>
    );
  }
}

export default withRouter(AplListPage);
