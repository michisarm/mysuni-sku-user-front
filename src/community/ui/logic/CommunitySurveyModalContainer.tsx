
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
  const searchBox = useSearchBox();

  useEffect(() => {
    console.log('useEffect')
  }, []);
  // state = {
  //   open: false,
  //   selectedCollege: new IdName(),
  //   selectedChannel: new IdName(),
  // };


  // componentDidMount(): void {
  //   //
  //   this.findAllSurvey();
  //   this.setDefaultSelectedChannel();
  // }

  // componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
  //   //
  //   const { defaultSelectedChannel: prevDefaultSelectedChannel } = prevProps;
  //   const { defaultSelectedChannel } = this.props;

  //   if (prevDefaultSelectedChannel !== defaultSelectedChannel) {
  //     this.setDefaultSelectedChannel();
  //   }
  // }

  // findAllSurvey() {
  //   // requestCommunitySurvey()
  //   //
  //   // this.props.collegeService!.findAllColleges();
  // }

  // setDefaultSelectedChannel() {
  //   //
  //   const { defaultSelectedChannel } = this.props;

  //   this.setState({ selectedChannel: defaultSelectedChannel || new IdName() });
  // }

  // onOpen() {
  //   //
  //   this.setState({ open: true });
  // }

  // onClose() {
  //   //
  //   this.setState({ open: false });
  // }

  // onCancel() {
  //   //
  //   this.setDefaultSelectedChannel();
  //   this.onClose();
  // }

  // onConfirm() {
  //   //
  //   const { colleges } = this.props.collegeService!;
  //   const { onConfirmChannel } = this.props;
  //   const { selectedCollege, selectedChannel } = this.state;

  //   const college = colleges.find((college) => college.collegeId === selectedCollege.id);

  //   onConfirmChannel(college!, selectedChannel);
  //   this.onClose();
  // }

  // onClickCollege(currentSelectedCollege: CollegeModel) {
  //   //
  //   const { selectedCollege } = this.state;

  //   if (selectedCollege.id === currentSelectedCollege.collegeId) {
  //     this.setState({ selectedCollege: new IdName() });
  //   }
  //   else {
  //     this.setState({ selectedCollege: currentSelectedCollege.toIdName() });
  //   }
  // }

  // onClickChannel(currentSelectedChannel: IdName) {
  //   //
  //   this.setState({ selectedChannel: currentSelectedChannel });
  // }

    //
    // const { collegeService, trigger } = this.props;
    // const { open, selectedCollege, selectedChannel } = this.state;
    // const colleges: CollegeModel[] = collegeService!.colleges;
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
            <tr>
              <td>
                <Radio
                  className="base"
                  name="radioGroup"
                  value="value01"
                  // checked={this.state.value === "value01"}
                  // onChange={this.handleChange}
                />
              </td>
              <td>
                반도체 산업의 시작과 역사에 대해 개인 의견을 남겨주세요.
              </td>
              <td>김써니</td>
              <td>2020.12.15</td>
            </tr>
          </tbody>
        </table>
        <Pagination style={{marginTop: '30px'}}
          activePage={activePage}
          totalPages={totalPage}
          firstItem={null}
          lastItem={null}
          onPageChange={(e, data) => onPageChange(data)}
        />
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
