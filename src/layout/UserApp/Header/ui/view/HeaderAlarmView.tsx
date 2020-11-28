
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Icon } from 'semantic-ui-react';
import MentionModel from 'notie/model/MentionModel';
import moment from 'moment';


interface Props {
    myNotieMentions: MentionModel[],
    myNotieNoReadMentionCount: number,
    routeToAlarmBackLink: (backLink:string) => void,
    handleClickAlarm: () => void,
}

interface State {
    alarmShowClass: string;
}

@reactAutobind
class HeaderAlarmView extends Component<Props, State> {
  //
  alarmButtonRef: any = React.createRef();
  
  state = {
    alarmShowClass: '',
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  onTogglePop() {
    const { alarmShowClass } = this.state;
    const { handleClickAlarm } = this.props;

    this.setState({ alarmShowClass: alarmShowClass ? '' : 'lms-on' });

    handleClickAlarm();
  }

  handleClickOutside(e: MouseEvent) {
    if (
      this.alarmButtonRef &&
      !this.alarmButtonRef.current.contains(e.target)
    ) {
      setTimeout(() => this.setState({ alarmShowClass: '' }), 500);
    }
  }

  render() {
    //
    const { myNotieMentions, myNotieNoReadMentionCount, routeToAlarmBackLink } = this.props;
    const { alarmShowClass } = this.state;

    let existNoReadClass = '';
    if (myNotieNoReadMentionCount > 0) {
      existNoReadClass = 'lms-on'
    }

    return (
      <>
        <a 
          className={`lms-alarm ${existNoReadClass}`}
          onClick={this.onTogglePop}
          ref={this.alarmButtonRef}
        >
            <span>알람</span>
        </a>
        <div className={`lms-alarm-list ${alarmShowClass}`}>
            <div className="lms-alarm-header">
                <span className="lms-alarm-title">알람</span>
                <Button 
                  icon 
                  className="img-icon" 
                  onClick={this.onTogglePop}
                >
                    <Icon className="clear2 selected link"/>
                </Button>
            </div>
            <div className="lms-alarm-body">
                {myNotieMentions && myNotieMentions.map((result,index)=>{
                  let notReadClass = '';
                  if (!result.read) {
                    notReadClass = 'not-read';
                  }

                  return(
                    <a 
                      className={`lms-alarm-item ${notReadClass}`}
                      onClick={() => routeToAlarmBackLink(result.backLink)}
                    >
                      <span className="lms-alarm-copy">{result.message}</span>
                      <span className="lms-alarm-time">{moment(result.sentTime).format('YYYY-MM-DD HH:mm')}</span>
                    </a>
                  );
                })}
            </div>
        </div>
      </>
    );
  }
}

export default HeaderAlarmView;
