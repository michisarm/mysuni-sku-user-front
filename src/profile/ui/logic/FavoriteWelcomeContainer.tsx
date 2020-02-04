
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Button, Image } from 'semantic-ui-react';
import routePaths from '../../routePaths';
import SkProfileService from '../../present/logic/SkProfileService';


interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService,
}

@inject(mobxHelper.injectFrom('profile.skProfileService'))
@observer
@reactAutobind
class FavoriteWelcomeContainer extends Component<Props> {
  //
  componentDidMount(): void {
    //
    const { skProfileService } = this.props;

    skProfileService!.findSkProfile();
  }

  onStart() {
    this.props.history.push(routePaths.favoriteCollege());
  }

  render() {
    //
    const { skProfileService } = this.props;
    const { member } = skProfileService!.skProfile;

    return (
      <div className="login-content">
        <div className="left-area">
          <div className="inner">
            <h1>Welcome!</h1>
            <p>Constant learning not only <br />makes you knowledgeable, <br />but also a better person</p>
            <div className="illust">
              <Image
                src={`${process.env.PUBLIC_URL}/images/all/invalid-name.png`}
                alt="머그컵을 들고 서있는 남자1명, 책상에 앉아있는 여자1명이 손인사를 하고있다."
              />
            </div>
          </div>
        </div>
        <div className="right-area">
          <div className="inner interest">
            <div className="text-wrap">
              <h2>안녕하세요. {member.name}님</h2>{/* session id 로  이름 검색*/}
              <p>
                무슨 교육을 수강해야 할지, 내게 필요한 강의는 무엇인지 난감하시죠.<br />
                본인의 관심사와 향후 하고 싶은 직무 분야를 선택해주시면, 그에 맞는 <br />콘텐츠들을 추천드리겠습니다.<br />
                <strong>2분</strong> 정도만 시간을 내어 선택해주시면, 여러분에게 필요한 교육들을 <br />준비하고 제공해드리겠습니다.
              </p>
            </div>
            <Button className="fix bg" onClick={this.onStart}>Start</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FavoriteWelcomeContainer);
