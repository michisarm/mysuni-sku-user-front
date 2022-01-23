import React from 'react';
import SiteMapModalContainer from 'layout/UserApp/QuickNav/ui/logic/SiteMapModalContainerV2';
import { Icon } from 'semantic-ui-react';
import Image from 'shared/components/Image';
import { isSuperManager } from 'shared/helper/isSuperManager';
import { SkProfileService } from '../../../../../profile/stores';
import { PolyglotText } from '../../../../../shared/ui/logic/PolyglotText';
import PrivacyPolicyModalContainer from './PrivacyPolicyModalContainer';
import { CompanyDropdown } from '../view/CompanyDropdown';
import { FamilySiteDropdown } from '../view/FamilySiteDropdown';
import './Footer.css';

function Footer() {
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
                    <PolyglotText defaultString="mySUNI" id="home-ftr-mysuni" />
                  </span>
                </a>
              </dd>
              <dd className="foot-nav-li">
                <a className="item" href="/suni-main/introduction/College">
                  <span>
                    <PolyglotText
                      defaultString="Category"
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
                <a className="item" href="/suni-main/introduction/PromotionTab">
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
                <a
                  className="item"
                  href={
                    SkProfileService.instance.skProfile.language === 'Korean'
                      ? '/suni-main/board/support/Notice'
                      : '/suni-main/board/support/FAQ'
                  }
                >
                  <span>
                    <PolyglotText
                      defaultString="Help Center"
                      id="home-ftr-Help"
                    />
                  </span>
                </a>
              </dt>
              {SkProfileService.instance.skProfile.language === 'Korean' && (
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
              )}
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
          {isSuperManager() && <CompanyDropdown />}
          <FamilySiteDropdown />
        </div>
      </div>
      <div className="copy-wrap">
        <div className="cont-inner">
          <div className="foot-logo">
            {/* 김민준 겨울 로고 변경 */}
            <Image src="https://image.mysuni.sk.com/suni-asset/public/images/winter/LMS/s-kuniversity-footerN.png" />
            {/* <h2 id="foot-logo">
              <Icon className="s-kuniversity" />
              <span className="blind">SK university</span>
            </h2> */}
          </div>
          <div className="foot-copyright">
            COPYRIGHT
            <Icon className="copyright" />
            <span className="blind">copyright sign</span>mySUNI. ALL RIGHTS
            RESERVED.
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
