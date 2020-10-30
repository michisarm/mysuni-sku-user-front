import React from 'react';
import WaveSurfer from 'wavesurfer.js';
import Parser from 'srt-parser-2';

const proxyUrl: string = 'http://proxy-panopto.api.mysuni.sk.com';
const userkey: string = 'gateway';
const userpwd: string = 'pass_1234';
const progressChkTime: number = 10;
const rew_fwd_time: number = 10;
const mySuniServerDomain: string = 'http://ma.mysuni.sk.com:8080';
let audioSrc: string = '';
let wavesurfer: WaveSurfer;
let progressCheck: boolean = true;
let parser: Parser;
let durationTime: number = 0;
let beforeCurrentTime: number = 0;

const testMp4 = require('./example/test.mp4');
const testSrc = require('./example/test.srt');

interface IProps {
  cubeId: string;
  deliveryId: string;
  userId: string;
  useCaption: boolean;
  captionInfos: Object;
  hasNext: boolean;
  nextInfos: Object;
}

interface IState {
  isLoaded: boolean;
  playTime: string;
  totalTime: string;
  caption: string;
}

const divStyle = {
  width: '100%',
  border: 'solid',
};

class Confirm extends React.PureComponent<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props);
    this.state = state;
  }

  public componentDidMount() {
    this.playerInit();
  }

  /**
   * playerInit
   * wavesurfer player 를 생성한다
   */
  public playerInit() {
    const panoptoApiUrl =
      proxyUrl +
      '/pt/schedule_view?id=' +
      this.props.deliveryId +
      '&userkey=' +
      userkey +
      '&userpwd=' +
      userpwd;

    let _this = this;

    fetch(panoptoApiUrl)
      .then(res => res.json())
      .then(
        result => {
          //audioSrc = result.sessions[0].mp3Url; -list
          audioSrc = result.session[0].mp3Url;

          _this.setState({
            isLoaded: true,
            playTime: '00:00',
            totalTime: '00:00',
          });

          wavesurfer = WaveSurfer.create({
            barWidth: 3,
            cursorWidth: 1,
            container: '#waveform',
            backend: 'WebAudio',
            height: 80,
            progressColor: '#2D5BFF',
            responsive: true,
            waveColor: '#EFEFEF',
            cursorColor: 'transparent',
            //xhr: {
            //    withCredentials: true,
            //    requestHeaders: [
            //        {key:'origin', value:'https://s-cloudfront.cdn.ap.panopto.com'}
            //    ]
            //}
          });

          //wavesurfer.load(audioSrc);
          wavesurfer.load(testMp4);
          wavesurfer.on('ready', function() {
            let time = (wavesurfer.getDuration() / 60).toFixed(2);
            _this.setState({ totalTime: time.toString().replace('.', ':') });
            _this.setSeekingTime();
          });

          wavesurfer.on('audioprocess', function() {
            const mySuniApiUrl = mySuniServerDomain + '/durations/audio';
            let seekTime: number = Number(
              wavesurfer.getCurrentTime().toFixed()
            );

            if (beforeCurrentTime !== seekTime) {
              beforeCurrentTime = seekTime;
              durationTime++;
            }

            _this.setPlayTime();

            if (seekTime > 0 && seekTime % progressChkTime === 0) {
              if (progressCheck) {
                var _data = {
                  cubeId: _this.props.cubeId,
                  deliveryId: _this.props.deliveryId,
                  userId: _this.props.userId,
                  seekTime: seekTime,
                  durationTime: durationTime,
                };

                fetch(mySuniApiUrl, {
                  method: 'post',
                  mode: 'cors',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(_data),
                })
                  .then(res => res.json())
                  .then(
                    result => {
                      console.log(result);
                    },
                    error => {
                      console.log(error);
                    }
                  );

                progressCheck = false;
              }
            } else {
              progressCheck = true;
            }
          });
        },
        error => {
          this.setState({
            isLoaded: true,
          });
        }
      );
  }

  /**
   * setSeekingTime
   * 서버에서 진행율을 가져온다
   * sample server 상에서는 seeking_time 이라는 key 로 가져오지만, 운영 환경상 다른 값으로 한다면 수정 필요
   */
  public setSeekingTime() {
    const mySuniApiUrl = mySuniServerDomain + '/getPanoptoSeeking';
    let _data = {
      deliveryId: this.props.deliveryId,
      userId: this.props.userId,
    };
    const _this = this;

    fetch(mySuniApiUrl, {
      method: 'post',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(_data),
    })
      .then(res => res.json())
      .then(
        result => {
          wavesurfer.skipForward(result.seeking_time);
          durationTime = result.seeking_time;
          beforeCurrentTime = result.seeking_time;
          _this.setPlayTime();
        },
        error => {
          console.log(error);
        }
      );
  }

  /**
   * setPlayTime
   * 재생시간을 화면상에 노출한다
   */
  public setPlayTime() {
    let currentTime: number = Number(wavesurfer.getCurrentTime().toFixed());

    let playMin = 0;
    let playSec = 0;

    let playTimeStr = '';
    let playTimeMin = '';
    let playTimeSec = '';

    playMin = Math.round((currentTime % 3600) / 60);
    playSec = currentTime % 60;

    playTimeMin = playMin.toString();
    playTimeSec = playSec.toString();

    if (playTimeMin.length === 1) playTimeMin = '0' + playTimeMin;
    if (playTimeSec.length === 1) playTimeSec = '0' + playTimeSec;

    playTimeStr = playTimeMin + ':' + playTimeSec;

    this.setState({ playTime: playTimeStr });
  }

  public render() {
    const { useCaption, captionInfos } = this.props;
    let { playTime, totalTime } = this.state;

    return (
      <div>
        <audio controls src={audioSrc}>
          Your browser does not support the <code>audio</code> element.
        </audio>
        {/* 
                
                 */}
        <br />
        <div>
          <div id="waveform" style={divStyle}></div>
          <div>
            {playTime} | {totalTime}
          </div>
          <button onClick={wavesurferPlayRew}>REW</button>
          <button onClick={wavesurferPlayBtn}>play/stop</button>
          <button onClick={wavesurferPlayFwd}>FWD</button>
          <button onClick={wavesurferToggleMute}>Toggle Mute</button>
          Rate :
          <select onChange={wavesurferPlayRate.bind(this)} defaultValue="1">
            <option value="0.5">0.5</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          <div>
            <SkuAudioPlayerCaptionSelector
              useCaption={useCaption}
              captionInfos={captionInfos}
            ></SkuAudioPlayerCaptionSelector>
          </div>
        </div>
      </div>
    );
  }
}

interface CProps {
  useCaption: boolean;
  captionInfos: Object | any;
}

class SkuAudioPlayerCaptionSelector extends React.PureComponent<
  CProps,
  IState
> {
  constructor(props: CProps, state: IState) {
    super(props);
    this.state = state;
  }

  public changeCaptionLang(obj: any) {
    var lang = obj.target.value;
    let captionData, url;

    if (this.props.captionInfos.hasOwnProperty('infos'))
      captionData = this.props.captionInfos['infos'];
    for (var i = 0; i < captionData.length; i++) {
      if (captionData[i]['lang'] === lang) url = captionData[i]['url'];
    }

    this.parsingCaption(url);
  }

  public parsingCaption(url: any) {
    var _this = this;
    //TODO 자막을 가져올 api 혹은 url 을 세팅한다
    fetch(url)
      .then(r => r.text())
      .then(text => {
        parser = new Parser();
        const data = parser.fromSrt(text);

        if (wavesurfer != null) {
          for (var i = 0; i < data.length; i++) {
            let start = _this.convertCurrentTime(data[i].startTime);
            let end = _this.convertCurrentTime(data[i].endTime);

            if (
              start <= wavesurfer.getCurrentTime() &&
              wavesurfer.getCurrentTime() <= end
            ) {
              _this.setState({ caption: data[i].text });
            }
          }
        }
      });
  }

  public convertCurrentTime(t: any) {
    t = t.split(',')[0].split(':');
    var hour = t[0];
    var min = t[1];
    var sec = t[2];
    let duration: number = 0;
    duration =
      duration + parseInt(sec) + parseInt(min) * 60 + parseInt(hour) * 3600;
    return duration;
  }

  render() {
    const { useCaption, captionInfos } = this.props;
    let { caption } = this.state;

    if (useCaption) {
      return (
        <div>
          <div>
            <select onChange={this.changeCaptionLang.bind(this)}>
              <SkuAudioPlayerCaption
                useCaption={useCaption}
                captionInfos={captionInfos}
              ></SkuAudioPlayerCaption>
            </select>
          </div>
          <div>{caption}</div>
        </div>
      );
    } else {
      return '';
    }
  }
}

class SkuAudioPlayerCaption extends React.PureComponent<CProps> {
  constructor(props: CProps) {
    super(props);
  }

  render() {
    const { useCaption, captionInfos } = this.props;
    let captionData;

    if (useCaption) {
      if (captionInfos.hasOwnProperty('infos'))
        captionData = captionInfos['infos'];
      if (captionData !== null) {
        return captionData.map((caption: any, index: any) => {
          return (
            <option key={index} value={caption.lang}>
              {caption.lang}
            </option>
          );
        });
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
}

function wavesurferPlayBtn() {
  wavesurfer.playPause();
}

function wavesurferPlayRew() {
  wavesurfer.skipBackward(rew_fwd_time);
}

function wavesurferPlayFwd() {
  wavesurfer.skipForward(rew_fwd_time);
}

function wavesurferToggleMute() {
  wavesurfer.toggleMute();
}

function wavesurferPlayRate(obj: any) {
  wavesurfer.setPlaybackRate(obj.target.value);
}

export default Confirm;
