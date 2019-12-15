import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Form, Popup, Button, Icon } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { reactAutobind, reactConfirm } from '@nara.platform/accent';
import CollegeService from '../../../college/present/logic/CollegeService';
import TitleView from '../view/TitleView';
import { StudySummaryCdoModel } from '../../model/StudySummaryCdoModel';
import SkProfileService from '../../present/logic/SkProfileService';
import { ContentLayout } from '../../../shared';

interface Props extends RouteComponentProps{
  collegeService : CollegeService
  skProfileService : SkProfileService
}

interface States{
  isSelectedColleage : boolean
}

const style = {
  background: 'rgba(50, 53, 59, 0.9)',
  boxShadow: '0 2px 6px 0 #888888',
  border: 0,
  color: '#fff',
  fontSize: '0.75rem',
  lineHeight: '1rem',
  letterSpacing: '-0.01125rem',
  left: '1.25rem',
};

@inject('collegeService', 'skProfileService')
@observer
@reactAutobind
class FavoriteCollegeContainer extends React.Component<Props, States> {

  constructor(props:Props) {
    super(props);
    this.state = {
      isSelectedColleage: false,
    };
  }

  componentDidMount(): void {
    const { collegeService, skProfileService } = this.props;

    if (collegeService && skProfileService) {
      collegeService.findAllColleges();
      skProfileService.findStudySummary('hong@sk.com'); //login session id
    }
  }

  selectCollege( collegeId : string) {
    const { collegeService } = this.props;
    if (collegeService) {
      collegeService.findCollege(collegeId)
        .then(() => collegeService.setSelectChannels())
        .then(() => this.setState({
          isSelectedColleage: true,
        }));
    }
  }

  selectChannel(channelId : string, name : string, checked : boolean) {
    const { collegeService } = this.props;
    if (collegeService) {
      collegeService.selectChannel(channelId, name, checked);
    }
  }

  deselectChannel(channelId : string) {
    const { collegeService } = this.props;
    if (collegeService) {
      collegeService.deselectChannel(channelId);
    }
  }

  onSKIntroClick() {
    /* SK University 소개 */
  }

  onNextClick() {
    const { collegeService, skProfileService } = this.props;
    if (collegeService.favoriteChannels.length < 3 ) {
      reactConfirm({
        title: '알림',
        message: '관심 분야는 3개이상 선택해 주세요.</br> 취소를 선택하시면 맞춤 교육을 위해 추후 설정이 가능합니다.',
        onClose: () => this.props.history.push('/profile/favorite/job'),
      });
    } else {
      if (collegeService && skProfileService) {
        const favoriteChannels: StudySummaryCdoModel = new StudySummaryCdoModel();
        favoriteChannels.favoriteChannels = collegeService.getFavoriteChannels();
        skProfileService.registerStudySummary(favoriteChannels);  //step3에서 submmit할때 서버 반영할지 점검
      }
      this.props.history.push('/profile/favorite/job');
    }
  }

  render() {
    const { colleges, college, selectChannels, favoriteChannels } = this.props.collegeService;
    const { isSelectedColleage } = this.state;
    return (
      <ContentLayout breadcrumb={[
        { text: 'd1', path: '/depth1-path' },
        { text: 'd2' },
      ]}
        className="bg-white"
      >
        <div className="interest-content step1">
          <TitleView step={1} onSKIntroClick={this.onSKIntroClick} />
          <Form>
            <h3 className="title-filter">관심분야 선택</h3>
            <div className="filter-wrap">
              <div className="column">
                <div className="f-tit">College</div>
                <div className="f-list">
                  <div className="scrolling">
                    <div className="college">
                      {colleges && colleges.length && colleges.map((data, index) => (
                        <div className="ui rect-icon radio checkbox" key={index}>
                          <input type="radio"
                            id={`radio_${index}`}
                            name="college"
                            className="hidden"
                            checked= { data.collegeId === college.collegeId}
                            tabIndex={index}
                            value={data.collegeId}
                            onChange={() => this.selectCollege(data.collegeId) }
                          />
                          <label htmlFor={`radio_${index}`}>{data.name}</label>
                        </div>
                      )) || ''
                    }
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="f-tit">Channel</div>
                <div className="f-list">
                  <div className="scrolling">
                    <div className="channel">
                      <ul>
                        {
                        isSelectedColleage && selectChannels && selectChannels.map((channel, index) => (
                          <li key={index}>
                            <div className="ui base checkbox popup-wrap">
                              <input type="checkbox"
                                id={`checkbox_${index}`}
                                className="hidden"
                                tabIndex={index}
                                checked ={channel.checked}
                                onChange={() => this.selectChannel(channel.channelId, channel.name, !channel.checked)}
                              />
                              <Popup className="custom-black"
                                content={channel.name /*channel.description*/}
                                inverted
                                style={style}
                                trigger={
                                  <label className="pop" data-offset="23" htmlFor={`checkbox_${index}`}>
                                    {channel.name} <span>{/*channel contents 수*/}</span>
                                  </label>
                                     }
                              />
                            </div>
                          </li>
                        )) || ''
                      }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="f-tit">Selected <span className="counter"><span className="now">{favoriteChannels.length}</span> / 80</span>
                </div>
                <div className="f-list">
                  <div className="scrolling">
                    <div className="selected">
                      {
                        favoriteChannels && favoriteChannels.map((channel, index) => (
                          channel.checked ?
                            <Button className="del type2" key={index} onClick={() => this.deselectChannel(channel.channelId)}>{channel.name}</Button> : ''
                        )) || ''
                    }
                    </div>
                  </div>
                </div>
              </div>
              <Button className="clear"><Icon value="reset" /><span className="blind">reset</span></Button>
            </div>
            <div className="select-error">
              <Icon value="error16" /><span className="blind">error</span>
              <span>
                            관심 분야를 3개 이상 선택해주세요.
              </span>
            </div>
            <div className="button-area">
              <Button className="fix bg" onClick={this.onNextClick}>Next</Button>
            </div>
          </Form>
        </div>
      </ContentLayout>
    );
  }
}

export default FavoriteCollegeContainer;
