import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Icon } from 'semantic-ui-react';
import MentionModel from 'notie/model/MentionModel';
import moment from 'moment';
import { Area } from 'tracker/model';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  myNotieMentions: MentionModel[];
  myNotieNoReadMentionCount: number;
  routeToAlarmBackLink: (backLink: string) => void;
  handleClickAlarm: () => void;
}

interface State {
  alarmShowClass: string;
}

@reactAutobind
class HeaderAlarmView extends Component<Props, State> {
  //
  alarmButtonRef: any = React.createRef();
  alarmRef: any = React.createRef();

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
    if (this.alarmRef && !this.alarmRef.current.contains(e.target)) {
      this.setState({ alarmShowClass: '' });
    }
  }

  render() {
    //
    const { myNotieMentions, myNotieNoReadMentionCount, routeToAlarmBackLink } =
      this.props;
    const { alarmShowClass } = this.state;

    let existNoReadClass = '';

    if (myNotieNoReadMentionCount > 0) {
      existNoReadClass = 'lms-on';
    }

    return (
      <div ref={this.alarmRef}>
        <a
          className={`lms-alarm ${existNoReadClass}`}
          onClick={this.onTogglePop}
          ref={this.alarmButtonRef}
        >
          <span>
            <PolyglotText defaultString="알림" id="home-header-알림1" />
          </span>
        </a>
        <div
          className={`lms-alarm-list ${alarmShowClass}`}
          ref={this.alarmButtonRef}
        >
          {/* <div className="lms-alarm-header">
              <span className="lms-alarm-title">
                <PolyglotText defaultString="알림" id="home-header-알림2" />
              </span>
              <Button icon className="img-icon" onClick={this.onTogglePop}>
                <Icon className="clear2 selected link" />
              </Button>
            </div> */}
          <div className="lms-alarm-body" data-area={Area.HEADER_ALARM}>
            {myNotieMentions &&
              myNotieMentions.map((result, index) => {
                let notReadClass = '';
                if (!result.read) {
                  notReadClass = 'not-read';
                }

                if (!result.title.includes('[')) {
                  result.title = '';
                }

                return (
                  <a
                    className={`lms-alarm-item ${notReadClass}`}
                    onClick={() => {
                      routeToAlarmBackLink(result.backLink);
                      this.setState({
                        alarmShowClass: alarmShowClass ? '' : 'lms-on',
                      });
                    }}
                  >
                    <b
                      className="lms-alarm-copy"
                      style={{ display: 'inline', marginRight: '5px' }}
                    >
                      {result.title}
                    </b>
                    <span
                      className="lms-alarm-copy"
                      style={{ display: 'inline' }}
                    >
                      {result.message}
                    </span>
                    <span
                      className="lms-alarm-time"
                      style={{ display: 'block', marginTop: '.5em' }}
                    >
                      {moment(result.sentTime).format('YYYY-MM-DD HH:mm')}
                    </span>
                  </a>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderAlarmView;
