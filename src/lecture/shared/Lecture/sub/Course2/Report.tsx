import React, {Component} from 'react';
import {Icon} from 'semantic-ui-react';

import CubeStateName from '../../model/CubeStateName';
import TrsOptions from '../../model/TrsOptions';


interface Props {
  onReport? : boolean,
  reportStatus? : string
}

class Report extends Component<Props> {

    handleClick = () => {
        alert('과제를 제출하시오!');
    }

    render(){

        const { onReport, reportStatus } = this.props;

        if ( !onReport ) return null;

        return(
            <div className="bar typeB">
                <div className="category">
                    <Icon className="icon-report24" />
                    <span>Report</span>
                </div>
                <div className="right">

                    {
                        reportStatus === TrsOptions.Report.Report && (
                            <a href="#" className="btn-play black" onClick={this.handleClick}>
                                <span className="text">{reportStatus}</span>
                                <Icon className="play-black24" />
                            </a>
                        )
                    }
                    {
                        reportStatus === TrsOptions.Report.Waiting && (
                            <span className="btn-play black">
                                <span className="text no-link">{reportStatus}</span>
                                <Icon className="play-black24-dim"/>
                            </span>
                        )
                    }
                    {
                        (reportStatus === TrsOptions.Report.Missed || reportStatus === TrsOptions.Report.Submitted) && (
                            <span className="btn-play completed">
                                <span className="text no-link">{reportStatus}</span>
                                <Icon className="play-completed24"/>
                            </span>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Report;
