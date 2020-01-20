import React from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';

import { Form, Popup, Button, Icon } from 'semantic-ui-react';
import { ContentLayout } from 'shared';
import { ChannelModel, CollegeService } from 'college';
import { CollegeLectureCountService } from 'lecture';
import TitleView from '../view/TitleView';
import SkProfileService from '../../present/logic/SkProfileService';
import { StudySummary } from '../../model/StudySummary';
import CollegeLectureCountRdo from '../../../lecture/shared/model/CollegeLectureCountRdo';
import IdNameCount from '../../../shared/model/IdNameCount';

interface Props extends RouteComponentProps{
  collegeService : CollegeService
  skProfileService : SkProfileService
  collegeLectureCountService : CollegeLectureCountService
}

interface States{
  selectedCollege: CollegeLectureCountRdo
  favorites : ChannelModel [],
}

const style = {
  opacity: '0.83',
  boxShadow: '0 2px 6px 0 #888888',
  border: '0',
  color: '#fff',
  fontSize: '0.75rem',
  lineHeight: '1rem',
  letterSpacing: '-0.01125rem',
  left: '1.25rem',
};

@inject(mobxHelper.injectFrom(
  'college.collegeService',
  'profile.skProfileService',
  'lecture.collegeLectureCountService'
))
@observer
@reactAutobind
class FavoriteCollegeContainer extends React.Component<Props, States> {

  constructor(props:Props) {
    super(props);
    this.state = {
      selectedCollege: new CollegeLectureCountRdo(),
      favorites: [],
    };
  }

  componentDidMount(): void {
    this.init();
  }

  init() {
    //
    const { collegeService, skProfileService, collegeLectureCountService } = this.props;
    const { studySummaryFavoriteChannels } = skProfileService;

    collegeLectureCountService!.findCollegeLectureCounts();
    skProfileService!.findSkProfile();
    skProfileService!.findStudySummary();
    collegeService!.findAllChannel();

    const channels = studySummaryFavoriteChannels.map(channel =>
      new ChannelModel({ id: channel.id, channelId: channel.id, name: channel.name, checked: true })
    );

    this.setState({ favorites: [...channels]});
  }


  onSelectCollege( college : CollegeLectureCountRdo ) {
    //
    // const { collegeService } = this.props;
    //
    // collegeService!.findCollege(collegeId);

    this.setState({ selectedCollege: college });
  }

  onSelectChannel(channel : IdNameCount | ChannelModel) {
    //
    let { favorites }: States = this.state;

    if (favorites.map(favoriteChannel => favoriteChannel.id).includes(channel.id)) {
      favorites = favorites.filter(favoriteChannel => favoriteChannel.id !== channel.id);
    }
    else {
      favorites.push(new ChannelModel(channel));
    }
    this.setState({ favorites });

  }

  onReset() {
    this.setState({ favorites: []});
  }

  onNextClick() {
    //
    const { collegeService, skProfileService } = this.props;
    const { favorites } = this.state;

    if (favorites.length < 3 ) {
      reactAlert({
        title: '알림',
        message: '관심 분야는 3개이상 선택해 주세요.',
      });
    }
    else {
      collegeService.favoriteChannels = [...favorites];
      skProfileService.setStudySummaryProp('favoriteChannels', collegeService.favoriteChannelIdNames);
      skProfileService.modifyStudySummary(StudySummary.asNameValues(skProfileService.studySummary));

      this.props.history.push('/profile/interest/job');
    }
  }

  render() {
    const { college, channelMap } = this.props.collegeService;
    const { collegeLectureCounts, totalChannelCount } = this.props.collegeLectureCountService;
    const { selectedCollege, favorites } = this.state;

    console.log(college);
    return (
      <ContentLayout breadcrumb={[
        { text: '관심사 설정', path: '/depth1-path' },
        { text: '관심분야' },
      ]}
        className="bg-white"
      >
        <div className="interest-content step1">
          <TitleView step={1} />
          <Form>
            <h3 className="title-filter">관심분야 선택</h3>
            <div className="filter-wrap">
              <div className="column">
                <div className="f-tit">College</div>
                <div className="f-list">
                  <div className="scrolling">
                    <div className="college">
                      {collegeLectureCounts && collegeLectureCounts.length && collegeLectureCounts.map((college, index) => (
                        <div className="ui rect-icon radio checkbox" key={index}>
                          <input type="radio"
                            id={`radio_${index}`}
                            name="college"
                            className="hidden"
                            tabIndex={index}
                            value={college.collegeId}
                            onChange={() => this.onSelectCollege(college) }
                          />
                          <label htmlFor={`radio_${index}`}>{college.name}({college.channelCounts.length})</label>
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
                          selectedCollege && selectedCollege.channelCounts.length && selectedCollege.channelCounts.map((channel, index) => {
                            const ch = channelMap.get(channel.id) || new ChannelModel();
                            return (
                              <li key={index}>
                                <div className="ui base checkbox popup-wrap">
                                  <input
                                    type="checkbox"
                                    id={`checkbox_${index}`}
                                    className="hidden"
                                    tabIndex={index}
                                    checked ={favorites.map(favoriteChannel => favoriteChannel.id).includes(channel.id)}
                                    onChange={() => this.onSelectChannel(channel)}
                                  />
                                  <Popup
                                    className="custom-black"
                                    content={ch.description}
                                    inverted
                                    style={style}
                                    trigger={
                                      <label className="pop" data-offset="23" htmlFor={`checkbox_${index}`}>
                                        {channel.name} <span>({channel.count})</span>
                                      </label>
                                    }
                                  />
                                </div>
                              </li>
                            );
                          }) || ''
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="f-tit">Selected <span className="counter"><span className="now">{favorites.length}</span> / {totalChannelCount}</span>
                </div>
                <div className="f-list">
                  <div className="scrolling">
                    <div className="selected">
                      {
                        favorites && favorites.map((channel, index) => (
                          <Button className="del type2" key={index} onClick={() => this.onSelectChannel(channel)}>{channel.name}</Button>
                        )) || ''
                      }
                    </div>
                  </div>
                </div>
              </div>
              <Button className="clear" onClick={this.onReset}><Icon className="reset" /><span className="blind">reset</span></Button>
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
