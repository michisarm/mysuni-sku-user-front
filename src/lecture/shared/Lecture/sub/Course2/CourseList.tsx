import React, {Component} from 'react';
import {
    Icon, List
} from 'semantic-ui-react';
import CubeBox from './CubeBox';
import Test from './Test';
import Survey from './Survey';
import CubeStateName from '../../model/CubeStateName';

interface Props {
  title? : string,
  learningType? : string,
  learningTime? : string,
  learningState? : CubeStateName,
  per? : Number,
  onTest? : string,
  testStatus? : string,
  onSurvey? : string,
  surveyStatus? : string,
  onReport? : string,
  reportStatus? : string,
  isCube? : boolean
}


class CourseList extends Component<Props> {
    render() {

        return (
            <List as='ul' className="step1">
                <List.Item as='li'>
                    <div className="tit">
                        <span className="ellipsis">1.1 Digital Transformation의 본질 : 신인류의 등장 Digital Transformation의 본질 : 신인류의 등장</span>
                    </div>
                    <div className="right">
                        <span>Video</span>
                        <span>2h 50m</span>
                        <a href="#" className="btn-play completed">
                            <span className="text">학습완료</span>
                            <Icon className="play-completed24"/>
                        </a>
                    </div>
                </List.Item>
                <List.Item as='li'>
                    <div className="tit">
                        <span className="ellipsis">1.2 Digital Transformation의 본질 : 신인류의 등장 Digital Transformation의 본질 : 신인류의 등장</span>
                    </div>
                    <div className="right">
                        <span>Video</span>
                        <span>11m</span>
                        <a href="#" className="btn-play orange">
                            <span className="text">학습중(50%)</span>
                            <span className="pie-wrapper progress-50">
                                <span className="pie">
                                    <span className="left-side"></span>
                                    <span className="right-side"></span>
                                </span>
                                <div className="shadow"></div>
                            </span>
                        </a>
                    </div>
                </List.Item>
                <List.Item as='li'>
                    <CubeBox
                        title={'1.1 Digital Transformation의 본질 : 신인류의 등장 Digital Transformation의 본질 : 신인류의 등장'}
                        learningType={'Video'}
                        learningTime={'2h 50m'}
                        learningState={CubeStateName.Enrolled}
                    />
                </List.Item>
                <List.Item as='li'>
                    <CubeBox
                        title={'1.2 신인류, Digital Platform에 살고 팬덤으로 소비한다'}
                        learningType={'Video'}
                        learningTime={'11m'}
                        learningState={CubeStateName.InProgress}
                    />
                </List.Item>
                <List.Item as='li'>
                    <CubeBox
                        title={'1.3 Digital Transformation이 만든 소비자 권력시대'}
                        learningType={'Video'}
                        learningTime={'11m'}
                        learningState={CubeStateName.Completed}
                        per={5}
                    />
                </List.Item>
                <List.Item as='li' className='step2'>
                    <Test
                        testStatus={'Test'}
                        onTest={true}
                        isCube={false}
                    />
                </List.Item>
                <List.Item as='li' className='step2'>
                    <Survey
                        surveyStatus={'설문하기'}
                        onSurvey={true}
                        isCube={false}
                    />
                </List.Item>
            </List>
        )
    }
}

export default CourseList;
