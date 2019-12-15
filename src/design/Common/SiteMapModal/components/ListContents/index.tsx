import React, { Component, createRef } from 'react';
import {
  Form,
  Radio,
  Image, Icon, Button, Label,
} from 'semantic-ui-react';
import CubeEnrollment from '../CubeRequired';

interface Props {

}

interface States {
  value? : any
}

class ListContents extends React.Component {

  handleChange(e:any, { value }:any) {
    // this.setState({value})
  }

  render() {
    return (
      <div className="contents course-list">

        {/* 카드시작 열릴 때 open 클래스 추가 (버튼변경시 사용) */}
        <div className="course-card fn-parents open">
          {/* 첫번째 카드 */}
          <div className="card-box first">
            {/* 썸네일 */}
            <div className="thumbnail">
              {/* 썸네일 이미지 위치 */}
            </div>
            <div className="title-area">
              <Label color="blue">Leadership</Label>
              <div className="header">HR - Agile HR Fundamentals 회사의 비전달성을 위한 HR전략 방향</div>
              <div className="deatil">
                <div className="item">
                  <Label className="onlytext">
                    <Icon className="video2" /><span>Video</span>
                  </Label>
                  <span className="channel">Leading Myself</span>
                </div>
                <div className="item">
                  <Label className="onlytext">
                    <Icon className="date" /><span>Creation date : 2019. 12. 31</span>
                    {/*  기간이 필요없을때는 사용안함
                                        <span class="ml17">Study start date, end date : 2019. 12. 31 20:30  ~  2020. 02. 20 09:00</span>
                                         */}
                  </Label>
                </div>
              </div>
            </div>
            <div className="btn-area">
              <Button className="fix line">Go to this activity</Button>
            </div>
            {/* 카드열림버튼 */}
            <Button icon className="img-icon fn-more-toggle card-open">
              <Icon className="arrow-down" />
            </Button>
            {/* 카드닫힘버튼 */}
            <Button icon className="img-icon fn-more-toggle card-close">
              <Icon className="arrow-up" />
            </Button>
          </div>

          {/* 열리면 나오는 sub 카드 */}
          <div className="card-box included">
            {/* 썸네일 */}
            <div className="thumbnail">
              {/* 썸네일 이미지 위치 */}
            </div>
            <div className="title-area">
              <Label color="teal">Mgmt</Label>
              <div className="header">HR - Agile HR Fundamentals 회사의 비전달성을 위한 HR전략 방향</div>
              <div className="deatil">
                <div className="item">
                  <Label className="onlytext">
                    <Icon className="video2" /><span>Video</span>
                  </Label>
                  <span className="channel">Leading Myself</span>
                </div>
                <div className="item">
                  <Label className="onlytext">
                    <Icon className="date" /><span>Creation date : 2019. 12. 31</span>
                    <span className="ml17">Study start date, end date : 2019. 12. 31 20:30  ~  2020. 02. 20 09:00</span>
                  </Label>
                </div>
              </div>
            </div>
            <div className="btn-area">
              <Button className="fix line">Go to this activity</Button>
            </div>
          </div>

          {/* 열리면 나오는 sub 카드 */}
          <div className="card-box included">
            {/* 썸네일 */}
            <div className="thumbnail">
              {/* 썸네일 이미지 위치 */}
            </div>
            <div className="title-area">
              <Label color="yellow">행복</Label>
              <div className="header">HR - Agile HR Fundamentals 회사의 비전달성을 위한 HR전략 방향</div>
              <div className="deatil">
                <div className="item">
                  <Label className="onlytext">
                    <Icon className="video2" /><span>Video</span>
                  </Label>
                  <span className="channel">Leading Myself</span>
                </div>
                <div className="item">
                  <Label className="onlytext">
                    <Icon className="date" /><span>Creation date : 2019. 12. 31</span>
                    <span className="ml17">Study start date, end date : 2019. 12. 31 20:30  ~  2020. 02. 20 09:00</span>
                  </Label>
                </div>
              </div>
            </div>
            <div className="btn-area">
              <Button className="fix line">Go to this activity</Button>
            </div>
          </div>
          {/* 열리면 나오는 sub 카드 */}
          <div className="card-box included">
            {/* 썸네일 */}
            <div className="thumbnail">
              {/* 썸네일 이미지 위치 */}
            </div>
            <div className="title-area">
              <Label color="blue">Leadership</Label>
              <div className="header">HR - Agile HR Fundamentals 회사의 비전달성을 위한 HR전략 방향</div>
              <div className="deatil">
                <div className="item">
                  <Label className="onlytext">
                    <Icon className="video2" /><span>Video</span>
                  </Label>
                  <span className="channel">Leading Myself</span>
                </div>
                <div className="item">
                  <Label className="onlytext">
                    <Icon className="date" /><span>Creation date : 2019. 12. 31</span>
                    <span className="ml17">Study start date, end date : 2019. 12. 31 20:30  ~  2020. 02. 20 09:00</span>
                  </Label>
                </div>
              </div>
            </div>
            <div className="btn-area">
              <Button className="fix line">Go to this activity</Button>
            </div>
          </div>
        </div>

        {/* 카드시작 열릴 때 open 클래스 추가 (버튼변경시 사용) */}
        <div className="course-card fn-parents">
          {/* 첫번째 카드 */}
          <div className="card-box first">
            {/* 썸네일 */}
            <div className="thumbnail">
              {/* 썸네일 이미지 위치 */}
            </div>
            <div className="title-area">
              <Label color="blue">Leadership</Label>
              <div className="header">HR - Agile HR Fundamentals 회사의 비전달성을 위한 HR전략 방향</div>
              <div className="deatil">
                <div className="item">
                  <Label className="onlytext">
                    <Icon className="video2" /><span>Video</span>
                  </Label>
                  <span className="channel">Leading Myself</span>
                </div>
                <div className="item">
                  <Label className="onlytext">
                    <Icon className="date" /><span>Creation date : 2019. 12. 31</span>
                    <span className="ml17">Study start date, end date : 2019. 12. 31 20:30  ~  2020. 02. 20 09:00</span>
                  </Label>
                </div>
              </div>
            </div>
            <div className="btn-area">
              <Button className="fix line">Go to this activity</Button>
            </div>
            {/* 카드열림버튼 */}
            <Button icon className="img-icon fn-more-toggle card-open">
              <Icon className="arrow-down" />
            </Button>
            {/* 카드닫힘버튼 */}
            <Button icon className="img-icon fn-more-toggle card-close">
              <Icon className="arrow-up" />
            </Button>
          </div>

          {/* 열리면 나오는 sub 카드 */}
          <div className="card-box included">
            {/* 썸네일 */}
            <div className="thumbnail">
              {/* 썸네일 이미지 위치 */}
            </div>
            <div className="title-area">
              <Label color="teal">Mgmt</Label>
              <div className="header">HR - Agile HR Fundamentals 회사의 비전달성을 위한 HR전략 방향</div>
              <div className="deatil">
                <div className="item">
                  <Label className="onlytext">
                    <Icon className="video2" /><span>Video</span>
                  </Label>
                  <span className="channel">Leading Myself</span>
                </div>
                <div className="item">
                  <Label className="onlytext">
                    <Icon className="date" /><span>Creation date : 2019. 12. 31</span>
                    <span className="ml17">Study start date, end date : 2019. 12. 31 20:30  ~  2020. 02. 20 09:00</span>
                  </Label>
                </div>
              </div>
            </div>
            <div className="btn-area">
              <Button className="fix line">Go to this activity</Button>
            </div>
          </div>

          {/* 열리면 나오는 sub 카드 */}
          <div className="card-box included">
            {/* 썸네일 */}
            <div className="thumbnail">
              {/* 썸네일 이미지 위치 */}
            </div>
            <div className="title-area">
              <Label color="yellow">행복</Label>
              <div className="header">HR - Agile HR Fundamentals 회사의 비전달성을 위한 HR전략 방향</div>
              <div className="deatil">
                <div className="item">
                  <Label className="onlytext">
                    <Icon className="video2" /><span>Video</span>
                  </Label>
                  <span className="channel">Leading Myself</span>
                </div>
                <div className="item">
                  <Label className="onlytext">
                    <Icon className="date" /><span>Creation date : 2019. 12. 31</span>
                    <span className="ml17">Study start date, end date : 2019. 12. 31 20:30  ~  2020. 02. 20 09:00</span>
                  </Label>
                </div>
              </div>
            </div>
            <div className="btn-area">
              <Button className="fix line">Go to this activity</Button>
            </div>
          </div>
          {/* 열리면 나오는 sub 카드 */}
          <div className="card-box included">
            {/* 썸네일 */}
            <div className="thumbnail">
              {/* 썸네일 이미지 위치 */}
            </div>
            <div className="title-area">
              <Label color="green">Global</Label>
              <div className="header">HR - Agile HR Fundamentals 회사의 비전달성을 위한 HR전략 방향</div>
              <div className="deatil">
                <div className="item">
                  <Label className="onlytext">
                    <Icon className="video2" /><span>Video</span>
                  </Label>
                  <span className="channel">Leading Myself</span>
                </div>
                <div className="item">
                  <Label className="onlytext">
                    <Icon className="date" /><span>Creation date : 2019. 12. 31</span>
                    <span className="ml17">Study start date, end date : 2019. 12. 31 20:30  ~  2020. 02. 20 09:00</span>
                  </Label>
                </div>
              </div>
            </div>
            <div className="btn-area">
              <Button className="fix line">Go to this activity</Button>
            </div>
          </div>
        </div>


        <div className="course-card fn-parents">
          {/* 첫번째 카드 */}
          <div className="card-box first">
            {/* 썸네일 */}
            <div className="thumbnail">
              {/* 썸네일 이미지 위치 */}
            </div>
            <div className="title-area">
              <Label color="purple">DT</Label>
              <div className="header">HR - Agile HR Fundamentals 회사의 비전달성을 위한 HR전략 방향</div>
              <div className="deatil">
                <div className="item">
                  <Label className="onlytext bold">
                    <Icon className="video2" /><span>Video</span>
                  </Label>
                  <span className="channel">Leading Myself</span>
                </div>
                <div className="item">
                  <Label className="onlytext">
                    <Icon className="date" /><span>Creation date : 2019. 12. 31</span>
                    <span className="ml17">Study start date, end date : 2019. 12. 31 20:30  ~  2020. 02. 20 09:00</span>
                  </Label>
                </div>
              </div>
            </div>
            <div className="btn-area">
              <Button className="fix line">Go to this activity</Button>
            </div>
          </div>
        </div>
      </div>

    );
  }
}


export default ListContents;
