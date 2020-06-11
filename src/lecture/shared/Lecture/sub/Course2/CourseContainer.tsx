import React, {Component} from 'react';
import {
    Button, Icon, List
} from "semantic-ui-react";
import classNames from 'classnames';
import CourseList from './CourseList';
import {withRouter} from "react-router-dom";
import {reactAutobind} from '@nara.platform/accent/src/snap/index';

@reactAutobind
class CourseContainer extends Component {

    state = {
        active: true
    }

    onToggle = () => (
        this.setState({active: !this.state.active })
    )

    render (){

        const { active } = this.state;

        return (
            <div className={active ? "course-box fn-parents open" : "course-box fn-parents" }>
                <div className="bar">
                    <div className="tit">
                        <span className="ellipsis">1. Digital Transformation의 본질 : 신인류의 등장 Digital Transformation의 본질 : 신인류의 등장</span>
                    </div>
                    <div className="num">
                        02개 강의 구성
                          <span className="completed">학습완료</span>
                    </div>
                    <div className="toggle-btn">
                        <Button icon className="img-icon fn-more-toggle" onClick={this.onToggle}>
                            <Icon className={classNames({'s24' : true, 'arrow-down' : !active, 'arrow-up' : active })}/>
                        </Button>
                    </div>
                </div>

                {/*여기서부터 Cube, Test, Survey, Report*/}
                <div className="detail">
                    <CourseList/>
                </div>

            </div>
        )
    }

export default withRouter(CourseContainer);
