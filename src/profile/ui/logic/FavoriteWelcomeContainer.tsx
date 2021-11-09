import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import SkProfileService from '../../present/logic/SkProfileService';
import FavoriteStartButtonView from '../view/FavoriteStartButtonView';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService;
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

  render() {
    //
    const { skProfileService } = this.props;
    const { name } = skProfileService!.skProfile;

    return (
      <div className="setting-introduction">
        <div className="top">
          <div className="inner interest">
            <div className="img-wrap" />
            <div className="text-wrap">
              <h2>
                <PolyglotText
                  defaultString="안녕하세요"
                  id="profile-interest-안녕하세요"
                />
                {` ${parsePolyglotString(name)}`},
              </h2>
              <p
                style={{ maxWidth: '580px' }}
                dangerouslySetInnerHTML={{
                  __html: getPolyglotText(
                    `무슨 교육을 수강해야 할지, 내게 필요한 강의는 무엇인지
                    난감하시죠.
                    <br />
                    본인의 관심사와 향후 하고 싶은 직무 분야를 선택해주시면, 그에
                    맞는 <br />
                    콘텐츠들을 추천드리겠습니다.
                    <br />
                    <strong>2분</strong> 정도만 시간을 내어 선택해주시면, 여러분에게
                    필요한 교육들을 <br />
                    준비하고 제공해드리겠습니다.`,
                    'profile-interest-상단문구'
                  ),
                }}
              />

              <FavoriteStartButtonView />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FavoriteWelcomeContainer);
