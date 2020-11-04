/* eslint-disable */
import React from 'react';
// import Plyr from 'plyr';
// import Hls from 'hls.js';
import './plyr/plyr.css';

const proxyUrl: string = 'http://proxy-panopto.api.mysuni.sk.com';
const userkey: string = 'gateway';
const userpwd: string = 'pass_1234';
const progressChkTime: number = 10;
const mySuniServerDomain: string = 'http://ma.mysuni.sk.com';
let videoSrc: string = '';
let m3u8Src: string = '';
let videoType: string = '';
// let player: Plyr;
// let hls: Hls;
let videoTag: HTMLMediaElement;
let durationTime: number = 0;
let beforeCurrentTime: number = 0;

const divStyle = {
  width: '100%',
};

let nextInfoDivStyle = {
  display: 'none',
};

interface IProps {
  cubeId: string /** 큐브 ID */;
  deliveryId: string /** delivery ID (동영상 ID / Panopto) */;
  userId: string /** 사용자 ID */;
  useCaption: boolean /** 자막 사용 여부 */;
  captionInfos: Object /** 자막 정보 */;
  hasNext: boolean /** 다음 동영상 여부 */;
  nextInfos: Object | any /** 다음 동영상 정보 */;
}

class SkuVideoPlayer extends React.PureComponent<IProps> {
  private skuVideoPlayer: React.RefObject<HTMLVideoElement>;

  constructor(props: IProps) {
    super(props);
    this.state = {
      isLoaded: false,
      isProgressSend: false,
    };
    this.skuVideoPlayer = React.createRef();
  }

  /**
   * Panopto 의 Video 정보를 불러온다
   */
  public getPanoptoVideoInfos() {
    const panoptoApiUrl =
      proxyUrl +
      '/pt/schedule_view?id=' +
      this.props.deliveryId +
      '&userkey=' +
      userkey +
      '&userpwd=' +
      userpwd;

    fetch(panoptoApiUrl)
      .then(res => res.json())
      .then(
        result => {
          //get panopto api infos
          videoSrc = result.session[0].mp4Url;
          m3u8Src = result.session[0].iosVideoUrl;
          videoType = 'video/mp4';

          //set m3u8 links
          if (m3u8Src !== '') {
            //videoSrc = m3u8Src;
            //videoType = "application/x-mpegURL";
          }

          this.getMysuniInfos();

          this.setState({
            isLoaded: true,
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
   * 동영상 player initialize
   */
  public getMysuniInfos() {
    this.playerInit();
    this.setSeekingTime();
    this.sendProgressTime();
  }

  /**
   * setSeekingTime
   * 서버에서 진행율을 가져온다
   * sample server 상에서는 seeking_time 이라는 key 로 가져오지만, 운영 환경상 다른 값으로 한다면 수정 필요
   */
  public setSeekingTime() {
    const mySuniApiUrl = mySuniServerDomain + '/getPanoptoSeeking';
    let _data = {
      cubeId: this.props.cubeId,
      deliveryId: this.props.deliveryId,
      userId: this.props.userId,
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
          // player.on('canplay', event => {
          //   if (player.currentTime === 0 && result.seeking_time > 0) {
          //     player.currentTime = result.seeking_time;
          //     durationTime = result.seeking_time;
          //     beforeCurrentTime = result.seeking_time;
          //   }
          // });
        },
        error => {
          console.log(error);
        }
      );
  }

  /**
   * sendProgressTime
   * 진행율(시간)을 업데이트 한다
   */
  public sendProgressTime() {
    let _this = this;

    //timeupdate event
    // player.on('timeupdate', function(event) {
    //   let instance = event.detail.plyr;
    //   let seekTime: number = Number(instance.currentTime.toFixed());
    //   const mySuniApiUrl = mySuniServerDomain + '/durations/video';

    //   if (seekTime > 0 && seekTime % 1 === 0) {
    //     if (beforeCurrentTime !== seekTime) {
    //       beforeCurrentTime = seekTime;
    //       durationTime++;
    //     }
    //   }

    //   if (seekTime > 0 && seekTime % progressChkTime === 0) {
    //     //TODO send progress
    //     var _data = {
    //       cubeId: _this.props.cubeId,
    //       deliveryId: _this.props.deliveryId,
    //       userId: _this.props.userId,
    //       seekTime: seekTime,
    //       durationTime: durationTime,
    //     };

    //     fetch(mySuniApiUrl, {
    //       method: 'post',
    //       mode: 'cors',
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(_data),
    //     })
    //       .then(res => res.json())
    //       .then(
    //         result => {
    //           //console.log(result)
    //         },
    //         error => {
    //           //console.log(error)
    //         }
    //       );
    //   }
    // });
  }

  /**
   * playerInit
   * 플레이어를 생성 및 m3u8 파일에 대하여 hls 설정을 한다
   */
  public playerInit() {
    const _this = this;
    this.skuVideoPlayer.current?.load();
    // player = new Plyr('#skuvideoplayer');

    let accessTokenValue;
    if (window.location.href.indexOf('#') > 0) {
      var url = window.location.href;
      accessTokenValue = url
        .split('#')[1]
        .split('&')[0]
        .split('=')[1];
    }

    // player.on('ready', function(event) {
    //   var hslSource = null;
    //   var sources = document.querySelectorAll('source'),
    //     i;

    //   for (i = 0; i < sources.length; ++i) {
    //     if (sources[i].src.indexOf('.m3u8') > -1) {
    //       hslSource = sources[i].src;
    //     }
    //   }

    //   if (hslSource !== null && Hls.isSupported()) {
    //     var hlsConfig = {
    //       debug: true,
    //       xhrSetup: function(xhr: any, videoSrc: any) {
    //         xhr.withCredentials = true; // do send cookie
    //         xhr.setRequestHeader(
    //           'Access-Control-Allow-Headers',
    //           'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    //         );
    //         xhr.setRequestHeader(
    //           'Access-Control-Allow-Methods',
    //           'PUT, POST, PATCH, DELETE, GET'
    //         );
    //         xhr.setRequestHeader(
    //           'Access-Control-Allow-Origin',
    //           mySuniServerDomain
    //         );
    //         //xhr.setRequestHeader("Authorization", "Basic NWM3NDE1MjQtOGEyNy00NjU4LWE0YjQtYWMzZTAwNzc2NTFhOmNSa0RXY3cvb2xHZ080ek5yd0JTMyswb0ZPZktLazU5d3JMbWpGQlpveG89");
    //       },
    //     };

    //     hls = new Hls(hlsConfig);
    //     videoTag = document.getElementById(
    //       'skuvideoplayer'
    //     ) as HTMLMediaElement;

    //     hls.loadSource(hslSource);
    //     hls.attachMedia(videoTag);
    //     hls.on(Hls.Events.MANIFEST_PARSED, function() {
    //       console.log('MANIFEST_PARSED');
    //     });
    //   }
    // });

    /**
     * 동영상 재생 종료
     */
    // player.on('ended', function(event) {
    //   if (_this.props.hasNext) {
    //     //TODO show next program infos
    //   }
    // });
  }

  public componentDidMount() {
    this.getPanoptoVideoInfos();
  }

  public render() {
    const { useCaption, captionInfos } = this.props;

    return (
      <div style={divStyle}>
        <video
          ref={this.skuVideoPlayer}
          id="skuvideoplayer"
          playsInline
          controls
        >
          <source src={videoSrc} type={videoType} />
          <SkuVideoPlayerCaption
            useCaption={useCaption}
            captionInfos={captionInfos}
          ></SkuVideoPlayerCaption>
        </video>
        <div style={nextInfoDivStyle}>
          {/* 다음 동영상 정보 */}
          다음 동영상
        </div>
      </div>
    );
  }
}

interface CProps {
  useCaption: boolean;
  captionInfos: Object | any;
}

class SkuVideoPlayerCaption extends React.PureComponent<CProps> {
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
            <track
              kind="captions"
              key={index}
              srcLang={caption.lang}
              src={caption.url}
              label={caption.lang}
              defaultChecked={caption.isDefault}
            />
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

export default SkuVideoPlayer;
