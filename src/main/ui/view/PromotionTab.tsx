import React, { Component } from 'react';

class PromotionTab extends Component {

  state = {
    link: 'https://sku.ap.panopto.com/Panopto/Pages/Embed.aspx?id=11fe97d5-0a86-4393-b7bd-ac6200807d1b&offerviewer=false&showTitle=false&showbrand=false&interactivity=false',
    idx: 0,
  };

  PUBLIC_URL = process.env.PUBLIC_URL;

  videoChange(idx:any) {
    if(idx === 0) {
      this.setState({
        link: 'https://sku.ap.panopto.com/Panopto/Pages/Embed.aspx?id=11fe97d5-0a86-4393-b7bd-ac6200807d1b&offerviewer=false&showTitle=false&showbrand=false&interactivity=false',
        idx: 0
      });
    }
    else if(idx === 1) {
      this.setState({
        link: 'https://sku.ap.panopto.com/Panopto/Pages/Embed.aspx?id=2dca9df5-cd42-4d1a-b72f-ac620087a898&offerviewer=false&showTitle=false&showbrand=false&interactivity=false',
        idx: 1
      });
    }
    else if(idx === 2) {
      this.setState({
        link: 'https://sku.ap.panopto.com/Panopto/Pages/Embed.aspx?id=a113e7b7-1184-4a04-842b-ac62008c7597&offerviewer=false&showTitle=false&showbrand=false&interactivity=false',
        idx: 2
      });
    }
    else if(idx === 3) {
      this.setState({
        link: 'https://sku.ap.panopto.com/Panopto/Pages/Embed.aspx?id=193f2a9b-f28d-4ba7-ad47-ac3700a2ce8e&offerviewer=false&showTitle=false&showbrand=false&interactivity=false',
        idx: 3
      });
    }
  }

  render() {
    const { link, idx } = this.state;
    
    const activeStyle = {
      fontSize: '12px',
      fontWeight: 'bold',
      lineHeight: '1.83',
      letterSpacing: '-0.4px',
      textDecoration: 'underline',
    } as React.CSSProperties;

    return (
      <>
        <div className="ui attached active" data-tab="third">
          <div className="common-intro case3">
            <div className="mainVideoInner">
              <div className="promotion-strong">구성원들의 mySUNI 이해 및 활용방법에 도움되는 홍보 자료입니다.</div>
              {/* <img className="playIcon" src={`${this.PUBLIC_URL}/images/all/play-icon.png`} alt="play-icon" /> */}
              <iframe className="fp-engine promotionVideo" src={`${link}`} title="player01" width="720px" height="400px" allowFullScreen />
            </div>
            <div className="subVideo-inner">
              <div className="subVideo" onClick={()=> this.videoChange(0)}><img className="subVideoThumbImg" src={`${this.PUBLIC_URL}/images/all/promotion-palyer.png`} alt="promotion-palyer" />
                <p className="subVideo-text">
                  {idx === 0 ? <a style={activeStyle}>SKinnoMan x mySUNI ‘써니를 묻다’ 1편 LMS/구성원 Comm.</a> : <a style={{fontWeight:'normal', textDecorationLine:'none'}}>SKinnoMan x mySUNI ‘써니를 묻다’ 1편 LMS/구성원 Comm.</a>}
                </p>
                <img className="playIcon" src={`${this.PUBLIC_URL}/images/all/play-icon.png`} alt="play-icon"/>
              </div>
              <div className="subVideo" onClick={()=> this.videoChange(1)}><img className="subVideoThumbImg" src={`${this.PUBLIC_URL}/images/all/promotion-palyer-02.png`} alt="promotion-palyer-02" />
                <p className="subVideo-text">
                  {idx === 1 ? <a style={activeStyle}>SKinnoMan x mySUNI ‘써니를 묻다’ 2편 College/Helpdesk</a> : <a>SKinnoMan x mySUNI ‘써니를 묻다’ 2편 College/Helpdesk</a>}
                </p>
                <img className="playIcon second" src={`${this.PUBLIC_URL}/images/all/play-icon.png`} alt="play-icon"/>
              </div>
              <div className="subVideo" onClick={()=> this.videoChange(2)}><img className="subVideoThumbImg" src={`${this.PUBLIC_URL}/images/all/promotion-palyer-03.png`} alt="promotion-palyer-03" />
                <p className="subVideo-text">
                  {idx === 2 ? <a style={activeStyle}>SKinnoMan x mySUNI ‘써니를 묻다’ 3편 C-team 인터뷰</a> : <a>SKinnoMan x mySUNI ‘써니를 묻다’ 3편 C-team 인터뷰</a>}
                </p>
                <img className="playIcon third" src={`${this.PUBLIC_URL}/images/all/play-icon.png`} alt="play-icon"/>
              </div>
              <div className="subVideo" onClick={()=> this.videoChange(3)}><img className="subVideoThumbImg" src={`${this.PUBLIC_URL}/images/all/promotion-palyer-04.png`} alt="promotion-palyer-04" />
                <p className="subVideo-text">
                  {idx === 3 ? <a style={activeStyle}>Untact시대 SK구성원들의<br/>학습방식</a> : <a>Untact시대 SK구성원들의<br/>학습방식</a>}
                </p>
                <img className="playIcon" src={`${this.PUBLIC_URL}/images/all/play-icon.png`} alt="play-icon"/>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PromotionTab;
