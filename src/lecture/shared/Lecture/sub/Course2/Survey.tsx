import React, {Component} from 'react';
import {Icon} from 'semantic-ui-react';

import TrsOptions from '../../model/TrsOptions';
import classNames from 'classnames';
import CubeStateName from '../../model/CubeStateName';

interface Props {
  onSurvey? : boolean,
  surveyStatus? : string,
  isCube? : boolean
}

class Survey extends Component<Props> {

    handleClick = () => {
        alert('설문을 진행하시오!');
    }

    render(){
        const { onSurvey, surveyStatus, isCube } = this.props;

        if (!onSurvey) return null;

        return(
            <div className={classNames({'bar' : isCube, 'typeB' : isCube })}>
                <div className={classNames({'category' : isCube , 'tit' : !isCube, 'trs' : !isCube })}>
                    <Icon className="icon-survey24"/>
                    <span>Survey</span>
                </div>
                <div className="right">
                    { surveyStatus === TrsOptions.Survey.Completed && (
                        <span className="btn-play completed">
                            <span className="text no-link">{surveyStatus}</span>
                            <Icon className="play-completed24"/>
                        </span>
                    )}
                    { surveyStatus === TrsOptions.Survey.Waiting && (
                        <a href="#" className="btn-play black" onClick={this.handleClick}>
                            <span className="text">{surveyStatus}</span>
                            <Icon className="play-black24" />
                        </a>
                    )}
                </div>
            </div>
        )
    }
}

export default Survey;
