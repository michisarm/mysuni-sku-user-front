import React, { Component } from 'react';
import CubeCardDue from '../../../CourseLearningCard/components/CubeCardDue';
import CubeCard from '../../../CourseLearningCard/components/CubeCard';
import DefaultClosedCourseCard from '../../../CourseLearningCard/components/DefaultClosedCourseCard';
import CourseCardBlueIncluded from '../../../CourseLearningCard/components/CourseCardBlueIncluded';
import CourseCardTealIncluded from '../../../CourseLearningCard/components/CourseCardTealIncluded';
import CourseCardYellowIncluded from '../../../CourseLearningCard/components/CourseCardYellowIncluded';
import CourseCardGreenIncluded from '../../../CourseLearningCard/components/CourseCardGreenIncluded';

interface Props{

}

interface States{
  value? : any
}

class ListContents extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }

  handleChange(e:any, { value }:any) {
    // this.setState({ value });
  }

  render() {
    return (
      <div className="contents course-list">

        <h2 className="tt">코스카드 default 닫힘상태</h2>
        <div className="course-card fn-parents open">
          {/* 첫번째 카드 */}
          <DefaultClosedCourseCard />

          {/* 열리면 나오는 sub 카드 */}
          <CourseCardTealIncluded />

          {/* 열리면 나오는 sub 카드 */}
          <CourseCardYellowIncluded />

          {/* 열리면 나오는 sub 카드 */}
          <CourseCardGreenIncluded />

        </div>

        <h2 className="tt">코스카드 펼침</h2>
        <div className="course-card fn-parents open">
          {/* 첫번째 카드 */}
          <DefaultClosedCourseCard />

          {/* 열리면 나오는 sub 카드 */}
          <CourseCardBlueIncluded />
        </div>

        <h2 className="tt">코스카드 펼침 코스카드 N개 이상</h2>
        <div className="course-card fn-parents open">
          {/* 첫번째 카드 */}
          <DefaultClosedCourseCard />

          {/* 열리면 나오는 sub 카드 */}
          <CourseCardTealIncluded />

          {/* 열리면 나오는 sub 카드 */}
          <CourseCardYellowIncluded />

          {/* 열리면 나오는 sub 카드 */}
          <CourseCardBlueIncluded />
        </div>

        <h2 className="tt">큐브카드</h2>
        <div className="course-card">
          {/* 첫번째 카드 */}
          <CubeCardDue />
        </div>

        <h2 className="tt">큐브카드 학습 시작일 종료일 미제공</h2>
        <div className="course-card">
          <CubeCard />
        </div>
      </div>
    );
  }
}


export default ListContents;
