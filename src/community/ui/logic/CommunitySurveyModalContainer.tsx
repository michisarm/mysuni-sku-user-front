
import React, { Component, useCallback, useEffect, useState } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { Accordion, Button, Icon, Modal, Pagination, Radio } from 'semantic-ui-react';
import { IdName } from 'shared/model';
import { CollegeModel, CollegeColors } from 'college/model';
import { CollegeService } from 'college/stores';
import { requestCommunitySurvey } from 'community/service/useCommunityMenu/requestCommunity';
import classNames from 'classnames';
import Calendar from '../view/CommunityAdmin/Calendar';
import { SearchBox } from 'community/model/SearchBox';
import { useSearchBox } from 'community/store/SearchBoxStore';
import moment from 'moment';
// import { ChannelModalContentWrapper } from '../view/DetailElementsView';


interface Props {
  collegeService?: CollegeService
  trigger: React.ReactNode
  defaultSelectedChannel: IdName | null
  // searchBox: SearchBox
  onConfirmChannel: (surveyId: string) => void
}

// interface State {
//   open: boolean
//   selectedCollege: IdName
//   selectedChannel: IdName
// }

// @inject(mobxHelper.injectFrom('college.collegeService'))
// @observer
// @reactAutobind
const CommunitySurveyModalContainer: React.FC<Props> = function CommunitySurveyModalContainer({
  collegeService,
  trigger,
  defaultSelectedChannel,
  // searchBox,
  onConfirmChannel,
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [surveyData, setSurveyData] = useState<any>();
  const searchBox = useSearchBox();

  useEffect(() => {
    if(open === true) {
      console.log('useEffect')
      findAllSurvey();
    }
  }, [open]);
  
  const findAllSurvey = (() => {
    setActivePage(1);
    requestCommunitySurvey().then((result) => {
      console.log('result', result)
      setSurveyData(result.data.results)
      totalPages(result.data.totalCount);
    })
  })

  const totalPages = (test: number) => {
    console.log("surveyData", surveyData)
      let totalpage = Math.ceil(test / 10);
      if (test % 10 < 0) {
        totalpage++;
      }
      console.log('totalpage', totalpage)
      setTotalPage(totalpage)
      // return totalpage;
  };

  const onOpen = useCallback(() => {
    setOpen(true)
  },[])

  const onClose = useCallback(() => {
    setOpen(false)
  },[])

  const onPageChange = useCallback((data:any) => {
    // getMembers(communityId);
    // setActivePage(data.activePage);
  }, []);
  
  const onCancel = useCallback((data:any) => {
    // this.setDefaultSelectedChannel();
    onClose()
  }, []);

  const onConfirm = useCallback((data:any) => {
    // this.setDefaultSelectedChannel();
    onConfirmChannel('surveyId')
    onClose()
  }, []);

  const handleRadioChange = useCallback((id: string) => {
    console.log('id', id)
  }, [])
    // onConfirm() {
  //   //
  //   const { colleges } = this.props.collegeService!;
  //   const { onConfirmChannel } = this.props;
  //   const { selectedCollege, selectedChannel } = this.state;

  //   const college = colleges.find((college) => college.collegeId === selectedCollege.id);

  //   onConfirmChannel(college!, selectedChannel);
  //   this.onClose();
  // }


    // onCancel() {
  //   //
  //   this.setDefaultSelectedChannel();
  //   this.onClose();
  // }
function renderSurveyRow(item: any) {
  if(item !== undefined) {

    const createTime = moment(item.time).format('YYYY.MM.DD');
    
    return(
      <tr>
        <td>
          <Radio
            className="base"
            name="radioGroup"
            // value="value01"
            // checked={this.state.value === "value01"}
            onChange={() => handleRadioChange(item.id)}
          />
        </td>
        <td>
          {item.titles.langStringMap[item.titles.defaultLanguage]}
        </td>
        <td>{item.formDesigner.names.langStringMap[item.formDesigner.names.defaultLanguage]}</td>
        <td>{createTime}</td>
      </tr>
    )
  }
}
console.log('surveyData',surveyData)
  return (
    <Modal className="base w1000" open={open} trigger={trigger} onOpen={onOpen} onClose={onClose}>
      <Modal.Header>
        <span>Survey 찾기</span>
        <button className="admin_popup_close" onClick={onClose}>
          <img src={`${process.env.PUBLIC_URL}/images/all/icon-reply-16-px.svg`} />
        </button>
      </Modal.Header>
      <Modal.Content className="admin_popup_add">
        <p className="menuAdd_title">Manager에서 등록한 Survey가 표시됩니다.</p>
        {/* 검색창 - sub */}
        <table className="ui admin_table_search sub">
          <colgroup>
            <col width="100px" />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th>등록일자</th>
              <td style={{textAlign: 'left'}}>
                {/* <div className="preview"> */}
                  <Calendar searchBox={searchBox!} />              
                {/* </div> */}
              </td>
            </tr>
            <tr>
              <th>검색어</th>
              <td style={{textAlign: 'left'}}>
                <div className={classNames("ui input admin_text_input add")}>
                  <input
                    type="text"
                    placeholder="설문조사 제목을 입력해주세요.​"
                    // value={this.state.write}
                    // onClick={() => this.setState({ focus: true })}
                    // onBlur={() => this.setState({ focus: false })}
                    // onChange={(e) => this.setState({ write: e.target.value })}
                  />
                  <button className="ui button admin_text_button">검색</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        {surveyData !== undefined && (
          <>
            <table className="ui admin_table sub survey_popup_table">
              <thead>
                <tr>
                  <th/>
                  <th>제목</th>
                  <th>등록자</th>
                  <th>등록일</th>
                </tr>
              </thead>
              <tbody>
                {surveyData.map((item:any, index: number) => {
                  return renderSurveyRow(item);
                })}
              </tbody>
            </table>
          </>
        )
        }
        {/* style={{marginTop: '30px'}} */}
        <div className="lms-paging-holder">
          <Pagination
            activePage={1}
            totalPages={totalPage}
            firstItem={null}
            lastItem={null}
            onPageChange={(e, data) => onPageChange(data)}
          />
        </div>
        {/* <Paging /> */}
      </Modal.Content>
      <Modal.Actions>
        <Button type="button" className="w190 pop d" onClick={onCancel}>Cancel</Button>
        <Button type="button" className="w190 pop p" onClick={onConfirm}>OK</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default CommunitySurveyModalContainer;
