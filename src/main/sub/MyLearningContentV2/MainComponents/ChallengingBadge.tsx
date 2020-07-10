import React, {Component} from 'react';
import { reactAutobind } from '@nara.platform/accent';
import {Button, Icon, Image} from 'semantic-ui-react';
import { NoSuchContentPanel } from 'shared';

import {ContentWrapper, BadgeWrapper} from '../MyLearningContentElementsView';

interface Props {
  profileMemberName: string
}

@reactAutobind
class ChallengingBadge extends Component<Props> {
  //
  PAGE_SIZE = 4; // 도전 뱃지는 4개

  BADGE_LENGTH = 4;

  onViewDetail() {
    alert('상세 화면으로 이동');
  }


  //
  render() {
    //
    const { profileMemberName } = this.props;

    return (
      <ContentWrapper className="badge-scrolling">
        <div className="section-head">
          <strong><span className="ellipsis">{profileMemberName}</span>님의 도전중인 Badge</strong>
          <div className="right">
            <Button icon className="right btn-blue">
              View All
              <Icon className="morelink"/>
            </Button>
          </div>
        </div>

        {this.BADGE_LENGTH > 0 ?
          <div className="scrolling">
            <ul className="belt">

              <li>
                {/*className으로 badge style 표시: basic, intermediate, advanced - level / s280, s220 - size*/}
                <BadgeWrapper className="basic s280" onClick={this.onViewDetail}>
                  <span className="college">
                    <Image src="/images/all/icon-chanel-64-px.svg" alt=""/>
                  </span>
                  <span className="part">Basic</span>
                  <span className="title">Customer Empathy</span>
                </BadgeWrapper>
              </li>

              <li>
                <BadgeWrapper className="intermediate s280" onClick={this.onViewDetail}>
                  <span className="college">
                    <Image src="/images/all/icon-chanel-64-px.svg" alt=""/>
                  </span>
                  <span className="part">Intermediate</span>
                  <span className="title">Customer Empathy</span>
                </BadgeWrapper>
              </li>

              <li>
                <BadgeWrapper className="advanced s280" onClick={this.onViewDetail}>
                  <span className="college">
                    <Image src="/images/all/icon-chanel-64-px.svg" alt=""/>
                  </span>
                  <span className="part">Advanced</span>
                  <span className="title">Customer Empathy</span>
                </BadgeWrapper>
              </li>

              <li>
                <BadgeWrapper className="basic s280 combine" onClick={this.onViewDetail}>
                  <span className="college">
                    <Image src="/images/all/icon-chanel-64-px.svg" alt=""/>
                  </span>
                  <span className="part">Basic 융합</span>
                  <span className="title">Customer Empathy</span>
                </BadgeWrapper>
              </li>

            </ul>
          </div>
          :
          <NoSuchContentPanel message={(
            <>
              <div className="text">도전중인 Badge가 없습니다.<br/>등록된 Badge 리스트에서 원하는 Badge에 도전해보세요.</div>
              <Button
                icon
                as="a"
                className="right btn-blue2"
              >
                <span className="border">Badge List 바로가기</span>
                <Icon className="morelink"/>
              </Button>
            </>
          )}
          />
        }
      </ContentWrapper>
    );
  }
}

export default ChallengingBadge;
