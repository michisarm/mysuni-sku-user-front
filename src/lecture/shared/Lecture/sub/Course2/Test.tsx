import React, {Component} from 'react';
import {Icon} from "semantic-ui-react";

import classNames from 'classnames';
import TrsOptions from "../../model/TrsOptions";
import CubeStateName from "../../model/CubeStateName";

interface Props {
  onTest? : boolean,
  testStatus? : string,
  isCube? : boolean
}

class Test extends Component<Props> {

    handleClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        alert('시험을 보시오!');
    }

    render(){
        const { onTest, testStatus, isCube } = this.props;

        if (!onTest) return null;

        return(
            <div className={classNames({'bar' : isCube, 'typeB' : isCube })}>
                <div className={classNames({'category' : isCube , 'tit' : !isCube, 'trs' : !isCube })}>
                    <Icon className="icon-test24"/>
                    <span>Test</span>
                </div>
                <div className="right">

                    {
                        // 미이수 or 이수
                        (testStatus === TrsOptions.Test.Missed || testStatus === TrsOptions.Test.Passed) && (
                            <span className="btn-play completed">
                                <span className="text no-link">{testStatus}</span>
                                <Icon className="play-completed24"/>
                            </span>
                        )
                    }
                    {
                        // 결과대기
                        (testStatus === TrsOptions.Test.TestPassed) && (
                            <span className="btn-play black">
                                <span className="text no-link">{testStatus}</span>
                                <Icon className="play-black24-dim"/>
                            </span>
                        )
                    }
                    {
                        // Test or 재응시
                        (testStatus === TrsOptions.Test.Test || testStatus === '재응시') && (
                            <a href="#" className="btn-play black" onClick={this.handleClick}>
                                <span className="text">{testStatus}</span>
                                <Icon className="play-black24"/>
                            </a>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Test;


