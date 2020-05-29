
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import XLSX from 'xlsx';
import { observable } from 'mobx';

import { Button, Icon } from 'semantic-ui-react';
import { ActionLogService } from 'shared/stores';
import { ListPanelTopLine } from 'shared';
import { ChannelModel } from 'college/model';
import { ChannelFilterModal } from 'lecture';
import MyTrainingService from '../../present/logic/MyTrainingService';
import MyTrainingModel from '../../model/MyTrainingModel';
import { OffsetElementList } from '../../../shared/model';


interface Props {
  actionLogService?: ActionLogService,
  count: number,
  channels?: ChannelModel[],
  onFilter?: (channels: ChannelModel[]) => void,
  currentTab: string,
}

@inject(mobxHelper.injectFrom('shared.actionLogService'))
@reactAutobind
@observer
class LineHeaderContainer extends Component<Props> {

  @observable
  myTraining: MyTrainingModel = new MyTrainingModel();

  @observable
  myTrainings: OffsetElementList<MyTrainingModel> = new OffsetElementList<MyTrainingModel>();

  onClickActionLog(text: string) {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: text });
  }

  async onDownLoadLearningCompletionExcel() {

    const response = await MyTrainingService.instance.fetchAndAddAllMyTrainingsWithState('Completed', 100, 0, []);

    const emptyData: any = '';
    const data: any = [];
    // data.push({ 테스트용테스트용테스트용테스트용: emptyData });
    this.myTrainings = new OffsetElementList<MyTrainingModel>({
      results: response.results.map((myTraining: MyTrainingModel) => new MyTrainingModel(myTraining)),
      totalCount: response.totalCount,
      empty: response.empty,
    });

    this.myTrainings.results.forEach(value => data.push({
      카테고리: value.category.college.name,
      타이틀: value.name,
      '학습시간(분)': value.learningTime }));

    const cubeExcel = XLSX.utils.json_to_sheet(data);
    const temp = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(temp, cubeExcel, 'LEARNING_TIME');

    const date = moment().format('YYYY-MM-DD hh:mm:ss');
    XLSX.writeFile(temp, `learningTime.${date}.xlsx`);
  }

  render() {
    //
    const { count, channels, onFilter, currentTab } = this.props;

    return (
      <ListPanelTopLine count={count}>
        {
          onFilter && (
            <ChannelFilterModal
              trigger={(
                <Button icon className="left post" onClick={() => this.onClickActionLog('Filter')}>
                  <Icon className="filter2" />Filter
                </Button>
              )}
              channels={channels}
              onFilter={onFilter}
            />
          )
        }

        {
          (currentTab === 'Completed' || currentTab === 'CompletedList')  && (
            <div className="right">
              <span className="excel-wrap-guide">&#8251; my company 학습시간은 제외</span>
              <span className="excel-wrap">
                <Button icon className="left post excel-down" onClick={() => this.onDownLoadLearningCompletionExcel()}>
                  <Icon className="excel-down" />
                  엑셀 다운로드
                </Button>
              </span>
            </div>

          )
        }

      </ListPanelTopLine>
    );
  }
}

export default LineHeaderContainer;
