import React, { Component, createRef } from 'react';
import {
  List,
  Icon, Button, Label, Table,
} from 'semantic-ui-react';
import CubeEnrollment from '../CubeRequired';

interface Props {

}

interface States {
  value? : any
}

class OverviewContents extends React.Component<Props, States> {
  handleChange(e:any, { value }:any) {
    // this.setState({value})
  }

  render() {
    return (
      <div className="contents overview">
        {/* 교육내용 (필수) */}
        <div className="class-guide-txt">
                    UI/UX의 세계로 들어가도 어디서부터 시작해야 할지 모르겠나요?<br />
                    이 과정을 통해 당신은 당신의 CV에 UX 디자이너를 추가하고 당신의 새로운 기술에 대한 보수를 받기 시작할 수 있을 것입니다.<br /><br />
                    안녕하세요. 내 이름은 홍길동이며, Adobe Certified 강사입니다. 어도비 XD를 효율적이고 포괄적으로 배울 수 있도록 도와주러 이 강좌를 개설하였습니다. XD는 업계
                    전문가들이 고품질의 기능성 모형을 생산하기 위해 사용하는 환상적인 디자인 도구입니다. 본 코스를 통해 실용적이고 효과적인 UX(User Experience) 및 UI(User
                    Interface) 설계를 제작할 수 있습니다.
        </div>
        {/* 파일다운로드 (선택) */}
        <div className="download-file">
          <div className="label-wrap">
            <Label className="onlytext size24">
              <Icon className="file2" /><span>Download the learning materials that come with this class.</span>
            </Label>
          </div>
          <div className="btn-wrap">
            <Button icon className="left icon-big-line2"><Icon className="download2" /><span>Download File</span></Button>
          </div>
        </div>

        {/* Sub Category
            .open추가 시 : hide 버튼 show / more 버튼 hide / list 높이 auto
         */}
        <div className="ov-paragraph sub-category fn-parents">
          <h3 className="title-style">
            <Label className="onlytext bold size24">
              <Icon className="category" /><span>Sub Category</span>
            </Label>
          </h3>
          <List bulleted>
            <List.Item>
              <div className="title">AI</div>
              <div className="detail">
                                AI Biz Essential / AI Tech Biginner / Language AI / AI Tech Advanced / Speech AI
              </div>
            </List.Item>
            <List.Item>
              <div className="title">Leadership</div>
              <div className="detail">
                                Leadership / Leading Myself / Leading Business / Leadership Pipeline / Leadership Clinic
                                Leadership / Leading Myself / Leading Business / Leadership Pipeline
              </div>
            </List.Item>
            <List.Item>
              <div className="title">DT</div>
              <div className="detail">
                                Leadership / Leading Myself / Leading Business / Leadership Pipeline / Leadership Clinic
                                Leadership / Leading Myself / Leading Business / Leadership Pipeline
              </div>
            </List.Item>
          </List>
          <Button icon className="right btn-blue btn-more fn-more-toggle">more <Icon className="more2" /></Button>
          <Button icon className="right btn-blue btn-hide fn-more-toggle">hide <Icon className="hide2" /></Button>
        </div>

        {/* 기간 */}
        <div className="ov-paragraph period-area">
          <List>
            <List.Item>
              <div className="title">
                <h3 className="title-style">
                  <Label className="onlytext bold size24">
                    <Icon className="period" /><span>Registration period</span>
                  </Label>
                </h3>
              </div>
              <div className="detail">2020.01.01 ~ 2020.02.01</div>
            </List.Item>
            <List.Item>
              <div className="title">
                <h3 className="title-style">
                  <Label className="onlytext bold size24">
                    <Icon className="cancellation" /><span>Cancellation period</span>
                  </Label>
                </h3>
              </div>
              <div className="detail">
                                2020.01.15 ~ 2020.01.25
                <div className="info">Cancellation penalty : 20% of the lecture fee and no application
                                    for training for three months
                </div>
              </div>
            </List.Item>
          </List>
        </div>

        <div className="ov-paragraph">
          <List>
            <List.Item>
              <div className="title">
                <h3 className="title-style">
                  <Label className="onlytext bold size24">
                    <Icon className="goal" /><span>Goal</span>
                  </Label>
                </h3>
              </div>
              <div className="detail">UX 디자이너가 되기위한 발걸음</div>
            </List.Item>
            <List.Item>
              <div className="title">
                <h3 className="title-style">
                  <Label className="onlytext bold size24">
                    <Icon className="target" /><span>Target</span>
                  </Label>
                </h3>
              </div>
              <div className="detail">SK University 모든 회원</div>
            </List.Item>
            <List.Item>
              <div className="title">
                <h3 className="title-style">
                  <Label className="onlytext bold size24">
                    <Icon className="host" /><span>Host</span>
                  </Label>
                </h3>
              </div>
              <div className="detail">SK커뮤니케이션즈</div>
            </List.Item>
          </List>
        </div>

        {/* 강좌소개영역2 */}
        <div className="ov-paragraph info-box2">
          <List bulleted>
            <List.Item>
              <div className="title">Place</div>
              <div className="detail">SK Telecom 본사 11층 대회의실</div>
            </List.Item>
            <List.Item>
              <div className="title">Requirements</div>
              <div className="detail">총 강의 3시간 중 전제적인 분위기가 다운되지 않으면 됨</div>
            </List.Item>
            <List.Item>
              <div className="title">Other Guides</div>
              <div className="detail">주말 학습장소는 주차공간이 협소하니 대중교통을 이용해 주시기 바랍니다. 주말 학습장소는 주차공간이 협소하니 대중교통을
                                이용해 주시기 바랍니다. 주말 학습장소는 주차공간이 협소하니 대중교통을 이용해 주시기 바랍니다. 주말 학습장소는 주차공간이 협소하니 대중교통을 이용해 주시기
                                바랍니다.
              </div>
            </List.Item>
          </List>
        </div>

        {/* 태그 */}
        <div className="ov-paragraph tag-wrap">
          <List>
            <List.Item>
              <div className="title">
                <h3 className="title-style">
                  <Label className="onlytext bold size24">
                    <Icon className="tag2" /><span>Tag</span>
                  </Label>
                </h3>
              </div>
              <div className="detail">
                <Button className="tag">AI</Button>
                <Button className="tag">Database</Button>
                <Button className="tag">Design</Button>
                <Button className="tag">Project Managing</Button>
                <Button className="tag">Project Managing</Button>
                <Button className="tag">AI</Button>
                <Button className="tag">AI</Button>
                <Button className="tag">AI</Button>
                <Button className="tag">Database</Button>
                <Button className="tag">Design</Button>
                <Button className="tag">Project Managing</Button>
                <Button className="tag">Project Managing</Button>
                <Button className="tag">AI</Button>
                <Button className="tag">AI</Button>
              </div>
            </List.Item>
          </List>
        </div>
      </div>
    );
  }
}


export default OverviewContents;
