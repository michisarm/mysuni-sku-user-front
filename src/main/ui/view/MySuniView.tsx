import { findSsoTypeCache } from 'lecture/detail/api/checkpointApi';
import React, { Component, useEffect, useState } from 'react';
import { findContentsProviderSamlCache } from 'shared/api/checkpointApi';
import { ContentsProviderSaml } from 'shared/model/ContentsProviderSaml';
import { Area } from 'tracker/model';
import { SkProfileService } from '../../../profile/stores';

interface Props {
  linkedInDirectConnection: string;
}

function KoView(props: Props) {
  return (
    <div data-area={Area.INTRODUCTION_MYSUNI}>
      <div className="common-intro case1">
        <div className="inner">
          <div className="strong">
            mySUNI는 구성원 개인의 자기 성장과 행복 추구를 위해
            <br />
            성장 역량을 강화하는 새로운 학습 플랫폼입니다.
          </div>
          <div className="normal">
            또한, 학습 조직 구축을 위한 출발점으로
            <br /> Deep Change와 행복을 위한 선순환 Cycle을 만들어갑니다.
          </div>
        </div>
      </div>
      <div className="ui full segment">
        <div className="intro-suni">
          <div className="cont-text-box mission">
            <div className="title">Mission</div>
            <div className="strong">
              Human Capital 축적·확보를 위한 그룹 차원의 통합 Infra
            </div>
            <div className="normal">
              Deep Change 필요 역량 조기 확보/육성의 공간
              <br />
              구성원 역량 Transformation을 위한 학습의 場
              <br />
              회사와 개인의 동시 성장을 통한 지속적/장기적 행복 창출 기반
            </div>
          </div>
          <div className="direction">
            <img
              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/direction.png"
              alt=""
            />
          </div>
          <div className="cont-text-box solution">
            <div className="title">Solution</div>
            <div className="strong">
              mySUNI의 학습은 구성원이 스스로 학습경로를
              <br />
              선택하여 디자인 할 수 있습니다.
            </div>
            <div className="normal">
              AI/DT 등 최근 환경변화를 반영한 수준 높은 교육 컨텐츠를
              <br />
              언제 어디서나 학습할 수 있습니다. 또한, 학습 후 자기 주도적인
              커리어를
              <br />
              만들어갈 수 있도록 구성원의 무한한 가능성을 지원합니다.
            </div>
          </div>
          <ul className="solution-route">
            <li>
              <div>
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/introduction-self-dircted-learning.png"
                  alt="Self-directed Learning"
                />
              </div>
              <h3>Self-directed Learning</h3>
              <div className="text">
                개인 관심/수준에 따라 학습자가
                <br />
                직접 디자인하는 학습 경로
              </div>
            </li>
            <li>
              <div>
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/introduction-adaptive-learning.png"
                  alt=""
                />
              </div>
              <h3>Adaptive Learning</h3>
              <div className="text">
                Machine Learning 기반 개인화된
                <br />
                Contents Curation
              </div>
            </li>
            <li>
              <div>
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/introduction-social-learning.png"
                  alt=""
                />
              </div>
              <h3>Social Learning</h3>
              <div className="text">
                직무별 전문가와 학습 컨텐츠를
                <br />
                연결한 커뮤니티
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="providers">
        <div className="inner">
          <h2>Content Providers</h2>
          <ul>
            <li>
              <a href="http://www.postech.ac.kr/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/postech.png"
                  alt="postech"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.snu.ac.kr/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/seoul-university.png"
                  alt="서울대학교"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.microsoft.com/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/microsoft.png"
                  alt="마이크로소프트"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.google.com/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/google.png"
                  alt="구글"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.ideou.com/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/ideo.png"
                  alt="IDEO U"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a
                href={`https://www.linkedin.com/checkpoint/enterprise/login/81530810?application=learning&redirect=https://www.linkedin.com/learning${props.linkedInDirectConnection}`}
                target="_blank"
              >
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/linked-in.png"
                  alt="링크드인"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://coursera.org/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/coursera.png"
                  alt="coursera"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://dbr.donga.com/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/dbr.png"
                  alt="dbr"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="http://www.hbrkorea.com/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/hbr.png"
                  alt="hbr"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.fastcampus.co.kr/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/fastcampus.png"
                  alt="패스트캠퍼스"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.sericeo.org/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/sericeo.png"
                  alt="sericeo"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="http://www.learningmate.co.kr" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/learning-mate.png"
                  alt="learning-mate"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.masocampus.com/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/maso.png"
                  alt="maso"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.multicampus.com" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/multicampus.png"
                  alt="멀티캠퍼스"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="http://www.samiledu.com/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/samil.png"
                  alt="samil"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.sebasi.co.kr/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/time15.png"
                  alt="time15"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://academy.elice.io/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/elice.png"
                  alt="elice"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="http://www.ohmyschool.org/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/ohmyschool.png"
                  alt="ohmyschool"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.imooc.co.kr/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/carrot.png"
                  alt="carrot"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://creativetv.co.kr/user/Main.do" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/hyundai.png"
                  alt="hyundai"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="http://www.hunet.co.kr" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/hunet.png"
                  alt="hunet"
                  className="ui image"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function EnView(props: Props) {
  return (
    <div data-area={Area.INTRODUCTION_MYSUNI}>
      <div className="common-intro case1">
        <div className="inner">
          <div className="strong">
            mySUNI is a new learning platform that bolsters individual
            members&apos;
            <br />
            capacity for growth in pursuit of happiness.
          </div>
          <div className="normal">
            In addition, mySUNI creates a virtuous cycle of deep change and
            happiness
            <br />
            as a starting point for establishing a learning organization.
          </div>
        </div>
      </div>
      <div className="ui full segment">
        <div className="intro-suni">
          <div className="cont-text-box mission">
            <div className="title">Mission</div>
            <div className="strong">
              Integrated infrastructure at the group level to accumulate and
              secure human capital
            </div>
            <div className="normal">
              Space for early acquisition/cultivation of necessary capacity for
              deep change
              <br />
              Learning area to transform members&apos; capacity
              <br />
              Foundation for continuous/long-term happiness creation through
              <br />
              simultaneous growth of the company and individuals
            </div>
          </div>
          <div className="direction">
            <img
              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/direction_eng.png"
              alt=""
            />
          </div>
          <div className="cont-text-box solution">
            <div className="title">Solution</div>
            <div className="strong">
              mySUNI learning allows members to choose and design their own
              <br />
              learning paths.
            </div>
            <div className="normal">
              Members can learn with high-quality educational content that
              reflects recent environmental
              <br />
              changes, such as AI/DT, anytime, anywhere. Furthermore, mySUNI
              supports the infinite
              <br />
              potential of members so that they can pursue a self-directed
              career after learning.
            </div>
          </div>
          <ul className="solution-route">
            <li>
              <div>
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/introduction-self-dircted-learning.png"
                  alt="Self-directed Learning"
                />
              </div>
              <h3>Self-directed Learning</h3>
              <div className="text">
                Learning path that a learner
                <br />
                designs in line with individual
                <br />
                interest/level
              </div>
            </li>
            <li>
              <div>
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/introduction-adaptive-learning.png"
                  alt=""
                />
              </div>
              <h3>Adaptive Learning</h3>
              <div className="text">
                Personalized content curation
                <br />
                based on machine learning
              </div>
            </li>
            <li>
              <div>
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/introduction-social-learning.png"
                  alt=""
                />
              </div>
              <h3>Social Learning</h3>
              <div className="text">
                Community that connects experts
                <br />
                by job and learning content
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="providers">
        <div className="inner">
          <h2>Content Providers</h2>
          <ul>
            <li>
              <a href="http://www.postech.ac.kr/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/postech.png"
                  alt="postech"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.snu.ac.kr/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/seoul-university.png"
                  alt="서울대학교"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.microsoft.com/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/microsoft.png"
                  alt="마이크로소프트"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.google.com/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/google.png"
                  alt="구글"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.ideou.com/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/ideo.png"
                  alt="IDEO U"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a
                href={`https://www.linkedin.com/checkpoint/enterprise/login/81530810?application=learning&redirect=https://www.linkedin.com/learning${props.linkedInDirectConnection}`}
                target="_blank"
              >
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/linked-in.png"
                  alt="링크드인"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://coursera.org/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/coursera.png"
                  alt="coursera"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://dbr.donga.com/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/dbr.png"
                  alt="dbr"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="http://www.hbrkorea.com/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/hbr.png"
                  alt="hbr"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.fastcampus.co.kr/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/fastcampus.png"
                  alt="패스트캠퍼스"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.sericeo.org/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/sericeo.png"
                  alt="sericeo"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="http://www.learningmate.co.kr" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/learning-mate.png"
                  alt="learning-mate"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.masocampus.com/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/maso.png"
                  alt="maso"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.multicampus.com" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/multicampus.png"
                  alt="멀티캠퍼스"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="http://www.samiledu.com/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/samil.png"
                  alt="samil"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.sebasi.co.kr/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/time15.png"
                  alt="time15"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://academy.elice.io/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/elice.png"
                  alt="elice"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="http://www.ohmyschool.org/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/ohmyschool.png"
                  alt="ohmyschool"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.imooc.co.kr/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/carrot.png"
                  alt="carrot"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://creativetv.co.kr/user/Main.do" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/hyundai.png"
                  alt="hyundai"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="http://www.hunet.co.kr" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/hunet.png"
                  alt="hunet"
                  className="ui image"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ZhView(props: Props) {
  return (
    <div data-area={Area.INTRODUCTION_MYSUNI}>
      <div className="common-intro case1">
        <div className="inner">
          <div className="strong">
            mySUNI是致力于成员个人的自我成长和幸福追求, <br />
            强化成员成长力量的新型学习平台。
          </div>
          <div className="normal">
            另外，以构建学习组织为出发点，
            <br />
            为了Deep Change和幸福打造良性循环Cycle。
          </div>
        </div>
      </div>
      <div className="ui full segment">
        <div className="intro-suni">
          <div className="cont-text-box mission">
            <div className="title">Mission</div>
            <div className="strong">
              为积累和确保Human Capital的group层面的综合Infra
            </div>
            <div className="normal">
              提前确保/培养Deep Change所需力量的空间
              <br />
              成员实力Transformation的学习平台
              <br />
              通过公司和个人的共同成长, 持续/长期创造幸福的基础
            </div>
          </div>
          <div className="direction">
            <img
              src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/direction_chn.png"
              alt=""
            />
          </div>
          <div className="cont-text-box solution">
            <div className="title">Solution</div>
            <div className="strong">
              成员可以自行选择学习路径并设计mySUNI的学习内容。{' '}
            </div>
            <div className="normal">
              随时随地都可以学习AI/DT等反映最近环境变化的高水准教育内容。另外,
              为使成员在学习后能
              <br />
              够自主打造事业历程, 我们支持成员的无限可能。
            </div>
          </div>
          <ul className="solution-route">
            <li>
              <div>
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/introduction-self-dircted-learning.png"
                  alt="Self-directed Learning"
                />
              </div>
              <h3>Self-directed Learning</h3>
              <div className="text">
                根据个人关注/水平, 学员可以亲自设
                <br />
                计学习路径
              </div>
            </li>
            <li>
              <div>
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/introduction-adaptive-learning.png"
                  alt=""
                />
              </div>
              <h3>Adaptive Learning</h3>
              <div className="text">
                基于Machine Learning的个人化
                <br />
                Contents Curation
              </div>
            </li>
            <li>
              <div>
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/introduction-social-learning.png"
                  alt=""
                />
              </div>
              <h3>Social Learning</h3>
              <div className="text">
                连接各职位专家和学习内容的
                <br />
                community
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="providers">
        <div className="inner">
          <h2>Content Providers</h2>
          <ul>
            <li>
              <a href="http://www.postech.ac.kr/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/postech.png"
                  alt="postech"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.snu.ac.kr/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/seoul-university.png"
                  alt="서울대학교"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.microsoft.com/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/microsoft.png"
                  alt="마이크로소프트"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.google.com/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/google.png"
                  alt="구글"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.ideou.com/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/ideo.png"
                  alt="IDEO U"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a
                href={`https://www.linkedin.com/checkpoint/enterprise/login/81530810?application=learning&redirect=https://www.linkedin.com/learning${props.linkedInDirectConnection}`}
                target="_blank"
              >
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/linked-in.png"
                  alt="링크드인"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://coursera.org/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/coursera.png"
                  alt="coursera"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://dbr.donga.com/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/dbr.png"
                  alt="dbr"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="http://www.hbrkorea.com/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/hbr.png"
                  alt="hbr"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.fastcampus.co.kr/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/fastcampus.png"
                  alt="패스트캠퍼스"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.sericeo.org/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/sericeo.png"
                  alt="sericeo"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="http://www.learningmate.co.kr" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/learning-mate.png"
                  alt="learning-mate"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.masocampus.com/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/maso.png"
                  alt="maso"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.multicampus.com" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/multicampus.png"
                  alt="멀티캠퍼스"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="http://www.samiledu.com/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/samil.png"
                  alt="samil"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.sebasi.co.kr/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/time15.png"
                  alt="time15"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://academy.elice.io/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/elice.png"
                  alt="elice"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="http://www.ohmyschool.org/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/ohmyschool.png"
                  alt="ohmyschool"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://www.imooc.co.kr/" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/carrot.png"
                  alt="carrot"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="https://creativetv.co.kr/user/Main.do" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/hyundai.png"
                  alt="hyundai"
                  className="ui image"
                />
              </a>
            </li>
            <li>
              <a href="http://www.hunet.co.kr" target="_blank">
                <img
                  src="https://image.mysuni.sk.com/suni-asset/public/introduction/images/hunet.png"
                  alt="hunet"
                  className="ui image"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function MySuniView() {
  //

  const [linkedInDirectConnection, setLinkedInDirectConnection] = useState('');

  useEffect(() => {
    linkedInSetting();
  }, []);

  const linkedInSetting = async () => {
    let contentsProviderSamls: ContentsProviderSaml[] | undefined;
    try {
      contentsProviderSamls = await findContentsProviderSamlCache();
    } catch (error) {
      setLinkedInDirectConnection('');
      return;
    }
    if (
      !Array.isArray(contentsProviderSamls) ||
      contentsProviderSamls.length === 0
    ) {
      setLinkedInDirectConnection('');
      return;
    }
    const contentsProviderSaml = contentsProviderSamls.find(
      (c) => c.contentsProviderId === 'PVD00010'
    );
    if (contentsProviderSaml === undefined) {
      setLinkedInDirectConnection('');
      return;
    }
    const loginUserSourceType = await findSsoTypeCache();
    if (loginUserSourceType === undefined) {
      setLinkedInDirectConnection('');
      return;
    }
    const directConnection =
      contentsProviderSaml.contentsProviderDirectConnections.find(
        (c) => c.loginUserSourceType === loginUserSourceType
      )?.directConnection;
    if (directConnection === undefined) {
      setLinkedInDirectConnection('');
      return;
    }
    setLinkedInDirectConnection('&' + directConnection);
  };

  if (SkProfileService.instance.skProfile.language === 'English') {
    return <EnView linkedInDirectConnection={linkedInDirectConnection} />;
  }
  if (SkProfileService.instance.skProfile.language === 'Chinese') {
    return <ZhView linkedInDirectConnection={linkedInDirectConnection} />;
  }
  return <KoView linkedInDirectConnection={linkedInDirectConnection} />;
}

export default MySuniView;
