import React from 'react';
import {Icon, Button} from 'semantic-ui-react';

import {Lecture2} from 'lecture/shared';

const BadgeLectureContainer2: React.FC = () => {
  //
  return (
    <>

      {/*Course 콘텐츠 총 09개 강의 구성 => Badge 상세에는 필요 없음*/}
      <Lecture2.Group
        type={Lecture2.GroupType.Course}
      >

        {/*course-box, fn-parents, open*/}
        {/*<Lecture2.CourseSection*/}
        {/*lecture={(*/}
        {/*// cube-box or bar step1 결정*/}
        {/*<Lecture2.Course/>*/}
        {/*)}*/}
        {/*>*/}
        {/*123*/}
        {/*</Lecture2.CourseSection>*/}


        {/*Cube*/}
        <div className="course-box fn-parents">
          <div className="cube-box">
            <div className="bar typeA">
              <div className="tit">
                <span className="ellipsis">0. CUBE</span>
              </div>
              <div className="right">
                <span>Video</span>
                <span>10m</span>

                {/*setLearningStateForMedia 호출*/}
                <a href="#" className="btn-play black">
                  <span className="text">학습하기</span>
                  <Icon className="play-black24"/>
                </a>
              </div>
            </div>
          </div>
        </div>


        {/*Course*/}
        <div className="course-box fn-parents open">
          <div className="bar">
            <div className="tit">
              <span className="ellipsis">1. COURSE-1</span>
            </div>
            <div className="num">03개 강의 구성</div>
            <div className="toggle-btn">
              <Button icon className="img-icon fn-more-toggle">
                <Icon className="arrow-down s24"/>
                <span className="blind">open</span>
              </Button>
            </div>
          </div>

          <div className="detail">
            <ul className="step1">
              <li>
                <div className="tit">
                  <span className="ellipsis">1.1 COURSE-1 &gt; CUBE-1</span>
                </div>
                <div className="right">
                  <span>Document</span>
                  <span>30m</span>
                  <a href="#" className="btn-play black">
                    <span className="text">학습하기</span>
                    <Icon className="play-black24"/>
                  </a>
                </div>
              </li>

              <li>
                <div className="tit">
                  <span className="ellipsis">1.2 COURSE-1 &gt; CUBE-2</span>
                </div>
                <div className="right">
                  <span>Video</span>
                  <span>30m</span>
                  <a href="#" className="btn-play black">
                    <span className="text">학습하기</span>
                    <Icon className="play-black24"/>
                  </a>
                </div>
              </li>

              {/*Test, Report, Survey - step2*/}
              <li className="step2 trs">
                <div className="category">
                  <Icon className="icon-test24" />
                  <span>Test</span>
                </div>
                <div className="tit">
                  <a className="ellipsis" href="#">1.2 CUBE-2 Test</a>
                </div>
                <div className="right">
                  <a href="#" className="btn-play black">
                    <span className="text">평가응시</span>
                    <Icon className="icon play-black24"/>
                  </a>
                </div>
              </li>
              <li className="step2 trs">
                <div className="category">
                  <Icon className="icon-report24" />
                  <span>Report</span>
                </div>
                <div className="tit">
                  <a className="ellipsis" href="#">1.2 CUBE-2 Report</a>
                </div>
                <div className="right">
                  <a href="#" className="btn-play black">
                    <span className="text">과제제출</span>
                    <Icon className="icon play-black24"/>
                  </a>
                </div>
              </li>
              <li className="step2 trs">
                <div className="category">
                  <Icon className="icon-survey24" />
                  <span>Survey</span>
                </div>
                <div className="tit">
                  <a className="ellipsis" href="#">1.2 CUBE-2 Survey</a>
                </div>
                <div className="right">
                  <a href="#" className="btn-play black">
                    <span className="text">설문하기</span>
                    <Icon className="icon play-black24"/>
                  </a>
                </div>
              </li>
              {/********************/}

              <li>
                <div className="tit">
                  <span className="ellipsis">1.3 COURSE-1 &gt; CUBE-3</span>
                </div>
                <div className="right">
                  <span>Video</span>
                  <span>1h 30m</span>
                  <a href="#" className="btn-play black">
                    <span className="text">학습하기</span>
                    <Icon className="play-black24"/>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="course-box fn-parents">
          <div className="bar">
            <div className="tit">
              <span className="ellipsis">2. COURSE-2</span>
            </div>
            <div className="num">01개 강의 구성</div>
            <div className="toggle-btn">
              <Button icon className="img-icon fn-more-toggle">
                <Icon className="arrow-down s24"/>
                <span className="blind">open</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="course-box fn-parents">
          <div className="bar">
            <div className="tit">
              <span className="ellipsis">3. COURSE-3</span>
            </div>
            <div className="num">01개 강의 구성</div>
            <div className="toggle-btn">
              <Button icon className="img-icon fn-more-toggle">
                <Icon className="arrow-down s24"/>
                <span className="blind">open</span>
              </Button>
            </div>
          </div>
        </div>

      </Lecture2.Group>
    </>
  );
};

export default BadgeLectureContainer2;
