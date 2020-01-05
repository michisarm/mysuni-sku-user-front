import React, { Component, createRef } from 'react';
import {
  Segment,
  Sticky,
  Menu, Image,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class IntroductionContainer extends Component {
  contextRef: any = createRef();

  render() {
    return (
      <div ref={this.contextRef}>
        <Sticky context={this.contextRef} className="tab-menu2 offset0">
          <div className="cont-inner">
            <Menu className="sku2">
              <Menu.Item
                name="suniIntroduction"
                active
                as={Link}
                to=""
              >
                mySUNI 소개
              </Menu.Item>
              {/*<Menu.Item*/}
              {/*  name="collegeIntroduction"*/}
              {/*  active={activeItem === 'collegeIntroduction'}*/}
              {/*  onClick={this.handleItemClick}*/}
              {/*  as={Link}*/}
              {/*  to=""*/}
              {/*>*/}
              {/*                College 소개*/}
              {/*</Menu.Item>*/}
              {/*<Menu.Item*/}
              {/*  name="certificationIntroduction"*/}
              {/*  active={activeItem === 'certificationIntroduction'}*/}
              {/*  onClick={this.handleItemClick}*/}
              {/*  as={Link}*/}
              {/*  to=""*/}
              {/*>*/}
              {/*                인증제도 소개*/}
              {/*</Menu.Item>*/}
            </Menu>
          </div>
        </Sticky>

        <div className="ui attached tab active" data-tab="first">
          <div className="common-intro case1">
            <div className="inner">
              <div className="strong">
                              mySUNI는 구성원 개인의 자기 성장과 행복 추구를 위해 <br />성장 역량을 강화하는 새로운 학습 플랫폼입니다.
              </div>
              <div className="normal">
                              또한, 학습 조직 구축을 위한 출발점으로<br /> Deep Change와 행복을 위한 선순환 Cycle을 만들어갑니다.
              </div>
            </div>
          </div>

          <Segment className="full">
            <div className="intro-suni">
              <div className="cont-text-box mission">
                <div className="title">Mission</div>
                <div className="strong">Human Capital 축적·확보를 위한 그룹 차원의 통합 Infra</div>
                <div className="normal">Deep Change 필요 역량 조기 확보/육성의 공간 <br />구성원 역량 Transformation을
                                  위한 학습의 場 <br />회사와 개인의
                                  동시 성장을 통한 지속적/장기적 행복 창출 기반
                </div>
              </div>
              <div className="direction">
                <Image src={`${process.env.PUBLIC_URL}/images/all/direction.png`} alt="" />
              </div>
              <div className="cont-text-box solution">
                <div className="title">Solution</div>
                <div className="strong">mySUNI의 학습은 구성원이 스스로 학습경로를 <br />선택하여 디자인 할 수 있습니다.</div>
                <div className="normal">AI/DT 등 최근 환경변화를 반영한 수준 높은 교육 컨텐츠를 <br />언제 어디서나 학습할 수 있습니다.
                                  또한, 학습 후 자기 주도적인
                                  커리어를 <br />만들어갈 수 있도록 구성원의 무한한 가능성을 지원합니다.
                </div>
              </div>
              <ul className="solution-route">
                <li>
                  <div>
                    <Image src="/images/all/introduction-self-dircted-learning.png" alt="Self-directed Learning" />
                  </div>
                  <h3>Self-directed Learning</h3>
                  <div className="text">개인 관심/수준에 따라 학습자가 <br />직접 디자인하는 학습 경로</div>
                </li>
                <li>
                  <div>
                    <Image src="/images/all/introduction-adaptive-learning.png" alt="" />
                  </div>
                  <h3>Adaptive Learning</h3>
                  <div className="text">Machine Learning 기반 개인화된 <br />Contents Curation</div>
                </li>
                <li>
                  <div>
                    <Image src="/images/all/introduction-social-learning.png" alt="" />
                  </div>
                  <h3>Social Learning</h3>
                  <div className="text">직무별 전문가와 학습 컨텐츠를 <br />연결한 커뮤니티</div>
                </li>
              </ul>
            </div>
          </Segment>

          <div className="providers">
            <div className="inner">
              <h2>Content Providers</h2>
              <ul>
                <li>
                  <a href="https://www.ideou.com/" target="_blank">
                    <Image src="/images/all/ideo.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/learning/" target="_blank">
                    <Image src="/images/all/linked-in.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://coursera.org/" target="_blank">
                    <Image src="/images/all/coursera.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://dbr.donga.com/" target="_blank">
                    <Image src="/images/all/dbr.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="http://www.hbrkorea.com/" target="_blank">
                    <Image src="/images/all/hbr.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://www.fastcampus.co.kr/" target="_blank">
                    <Image src="/images/all/fastcampus.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://www.sericeo.org/" target="_blank">
                    <Image src="/images/all/sericeo.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="http://www.learningmate.co.kr" target="_blank">
                    <Image src="/images/all/learning-mate.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://www.masocampus.com/" target="_blank">
                    <Image src="/images/all/maso.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://www.multicampus.com" target="_blank">
                    <Image src="/images/all/multicampus.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="http://www.samiledu.com/" target="_blank">
                    <Image src="/images/all/samil.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://www.sebasi.co.kr/" target="_blank">
                    <Image src="/images/all/time15.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://academy.elice.io/" target="_blank">
                    <Image src="/images/all/elice.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="http://www.ohmyschool.org/" target="_blank">
                    <Image src="/images/all/ohmyschool.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="http://intelik.com/" target="_blank">
                    <Image src="/images/all/intelik.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://www.imooc.co.kr/" target="_blank">
                    <Image src="/images/all/carrot.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="http://hrd.creativetv.co.kr/" target="_blank">
                    <Image src="/images/all/hyundai.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="http://www.hunet.co.kr" target="_blank">
                    <Image src="/images/all/hunet.png" alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default IntroductionContainer;
