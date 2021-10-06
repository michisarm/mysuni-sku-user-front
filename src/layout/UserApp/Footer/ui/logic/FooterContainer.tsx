import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Icon, Button, Select } from 'semantic-ui-react';
import {
  PolyglotText,
  getPolyglotText,
} from '../../../../../shared/ui/logic/PolyglotText';
import PrivacyPolicyModalContainer from '../logic/PrivacyPolicyModalContainer';
import SiteMapModalContainer from 'layout/UserApp/QuickNav/ui/logic/SiteMapModalContainerV2';

const gotoUrl = (url: string) => {
  window.open(url);
};

@reactAutobind
class FooterContainer extends Component {
  //

  render() {
    //
    const selectOptionsSite = [
      { key: 0, value: '', text: 'Family Site' },
      {
        key: 1,
        value: 'https://www.icheonforum.com/',
        text: getPolyglotText('이천포럼', 'home-family-이천포럼'),
      },
      {
        key: 2,
        value: 'https://on.mysuni.com',
        text: getPolyglotText('mySUNI ON', 'home-family-mySUNION'),
      },
      {
        key: 3,
        value: 'http://connect.mysuni.com',
        text: getPolyglotText('mySUNI Connect', 'home-family-Connect'),
      },
      {
        key: 4,
        value: 'https://www.linkedin.com/learning/',
        text: getPolyglotText('Linkedin Learning', 'home-family-Linkedin'),
      },
      {
        key: 5,
        value: 'https://www.coursera.org/',
        text: getPolyglotText('Coursera', 'home-family-Coursera'),
      },
    ];
    return (
      <section className="footer footer2">
        <div className="cont-inner">
          <div className="footer-inner foot-nav-wrap">
            <div className="foot-nav">
              <dl className="foot-nav-item">
                <dt className="foot-nav-li tit">
                  <a className="item" href="/suni-main/introduction/MySuni">
                    <span>
                      <PolyglotText
                        defaultString="About US"
                        id="home-ftr-AboutUS"
                      />
                    </span>
                  </a>
                </dt>
                <dd className="foot-nav-li">
                  <a className="item" href="/suni-main/introduction/MySuni">
                    <span>
                      <PolyglotText
                        defaultString="mySUNI"
                        id="home-ftr-mysuni"
                      />
                    </span>
                  </a>
                </dd>
                <dd className="foot-nav-li">
                  <a className="item" href="/suni-main/introduction/College">
                    <span>
                      <PolyglotText
                        defaultString="College"
                        id="home-ftr-college"
                      />
                    </span>
                  </a>
                </dd>
                <dd className="foot-nav-li">
                  <a
                    className="item"
                    href="/suni-main/introduction/Certification"
                  >
                    <span>
                      <PolyglotText
                        defaultString="인증제도"
                        id="home-ftr-인증제도"
                      />
                    </span>
                  </a>
                </dd>
                <dd className="foot-nav-li">
                  <a
                    className="item"
                    href="/suni-main/introduction/PromotionTab"
                  >
                    <span>
                      <PolyglotText
                        defaultString="홍보자료"
                        id="home-ftr-홍보자료"
                      />
                    </span>
                  </a>
                </dd>
              </dl>
              <dl className="foot-nav-item">
                <dt className="foot-nav-li tit">
                  <a className="item" href="/suni-main/board/support/Notice">
                    <span>
                      <PolyglotText
                        defaultString="Help Center"
                        id="home-ftr-Help"
                      />
                    </span>
                  </a>
                </dt>
                <dd className="foot-nav-li">
                  <a className="item" href="/suni-main/board/support/Notice">
                    <span>
                      <PolyglotText
                        defaultString="Notice"
                        id="home-ftr-Notice"
                      />
                    </span>
                  </a>
                </dd>
                <dd className="foot-nav-li">
                  <a className="item" href="/suni-main/board/support/FAQ">
                    <span>
                      <PolyglotText defaultString="FAQ" id="home-ftr-FAQ" />
                    </span>
                  </a>
                </dd>
                <dd className="foot-nav-li">
                  <a className="item" href="/suni-main/board/support/Q&A">
                    <span>
                      <PolyglotText
                        defaultString="1:1 문의"
                        id="home-ftr-일대일문의"
                      />
                    </span>
                  </a>
                </dd>
              </dl>
              <SiteMapModalContainer
                trigger={
                  <dl className="foot-nav-item arrow">
                    <dt className="foot-nav-li tit">
                      <a>
                        <span>
                          <PolyglotText
                            defaultString="Sitemap"
                            id="home-ftr-sitemap"
                          />
                        </span>
                        <span className="item-icon">
                          <Icon className="angle right" />
                        </span>
                      </a>
                    </dt>
                  </dl>
                }
              />
              <PrivacyPolicyModalContainer
                trigger={
                  <dl className="foot-nav-item arrow">
                    <dt className="foot-nav-li tit">
                      <a className="on">
                        <span>
                          <PolyglotText
                            defaultString="개인정보처리방침"
                            id="home-ftr-개인정보"
                          />
                        </span>
                        <span className="item-icon">
                          <Icon className="angle right" />
                        </span>
                      </a>
                    </dt>
                  </dl>
                }
              />
            </div>
            <div className="foot-site">
              <Select
                placeholder="Family Site"
                className="f-site"
                options={selectOptionsSite}
                onChange={(event: any, data: any) =>
                  data.value && gotoUrl(data.value)
                }
              />
            </div>
          </div>
        </div>
        <div className="copy-wrap">
          <div className="cont-inner">
            <div className="foot-logo">
              <h2 id="foot-logo">
                <Icon className="s-kuniversity" />
                <span className="blind">SK university</span>
              </h2>
            </div>
            <div className="foot-copyright">
              COPYRIGHT
              <Icon className="copyright" />
              <span className="blind">copyright sign</span>
              mySUNI. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default FooterContainer;
