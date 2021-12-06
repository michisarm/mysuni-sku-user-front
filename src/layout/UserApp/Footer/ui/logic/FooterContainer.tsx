import SiteMapModalContainer from 'layout/UserApp/QuickNav/ui/logic/SiteMapModalContainerV2';
import { findSsoTypeCache } from 'lecture/detail/api/checkpointApi';
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { findContentsProviderSamlCache } from 'shared/api/checkpointApi';
import Image from 'shared/components/Image';
import { ContentsProviderSaml } from 'shared/model/ContentsProviderSaml';
import { SkProfileService } from '../../../../../profile/stores';
import { PolyglotText } from '../../../../../shared/ui/logic/PolyglotText';
import PrivacyPolicyModalContainer from '../logic/PrivacyPolicyModalContainer';
import './FooterContainer.css';

function FooterContainer() {
  const [opened, setOpend] = useState(false);
  const [linkedInDirectConnection, setLinkedInDirectConnection] = useState('');
  const familyRef = useRef<HTMLInputElement>(null);

  function familyToggle() {
    setOpend(!opened);
  }

  const handleClickOutside = (event: any) => {
    if (opened && !familyRef.current?.contains(event.target)) {
      setOpend(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [familyRef, opened]);

  useEffect(() => {
    linkedInSetting();
  }, []);

  const linkedInSetting = async () => {
    let contentsProviderSamls: ContentsProviderSaml[] | undefined;
    try {
      contentsProviderSamls = await findContentsProviderSamlCache();
    } catch (error) {
      setLinkedInDirectConnection('');
      return;
    }
    if (
      !Array.isArray(contentsProviderSamls) ||
      contentsProviderSamls.length === 0
    ) {
      setLinkedInDirectConnection('');
      return;
    }
    const contentsProviderSaml = contentsProviderSamls.find(
      (c) => c.contentsProviderId === 'PVD00010'
    );
    if (contentsProviderSaml === undefined) {
      setLinkedInDirectConnection('');
      return;
    }
    const loginUserSourceType = await findSsoTypeCache();
    if (loginUserSourceType === undefined) {
      setLinkedInDirectConnection('');
      return;
    }
    const directConnection =
      contentsProviderSaml.contentsProviderDirectConnections.find(
        (c) => c.loginUserSourceType === loginUserSourceType
      )?.directConnection;
    if (directConnection === undefined) {
      setLinkedInDirectConnection('');
      return;
    }
    setLinkedInDirectConnection('&' + directConnection);
  };

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
          <div className="foot-site" ref={familyRef}>
            <div className="f-site-box">
              <div className="f-site-btnbox" onClick={familyToggle}>
                <span>Family Site</span>

                {opened === true ? (
                  <Icon
                    name="chevron down"
                    style={{ transform: 'rotate(180deg)' }}
                  />
                ) : (
                  <Icon name="chevron down" />
                )}
              </div>
              {opened && (
                <div
                  className="f-site-menu"
                  style={{ display: 'block' }}
                  onClick={familyToggle}
                >
                  <ul>
                    <li className="link-options">
                      <a
                        href="https://www.icheonforum.com/view/fo/main/after"
                        target="_blank"
                      >
                        <PolyglotText
                          defaultString="이천포럼"
                          id="home-family-이천포럼"
                        />
                      </a>
                    </li>
                    <li className="link-options">
                      <a
                        href="https://on.mysuni.com/auth/login"
                        target="_blank"
                      >
                        <PolyglotText
                          defaultString="mySUNI ON"
                          id="home-family-mySUNION"
                        />
                      </a>
                    </li>
                    <li className="link-options">
                      <a
                        href="http://connect.mysuni.com/Mobile/index.asp"
                        target="_blank"
                      >
                        <PolyglotText
                          defaultString="mySUNI Connect"
                          id="home-family-Connect"
                        />
                      </a>
                    </li>
                    <li className="link-options">
                      <a
                        href={`https://www.linkedin.com/checkpoint/enterprise/login/81530810?application=learning&redirect=https://www.linkedin.com/learning${linkedInDirectConnection}`}
                        target="_blank"
                      >
                        <PolyglotText
                          defaultString="LinkedIn Learning"
                          id="home-family-Linkedin"
                        />
                      </a>
                    </li>
                    <li className="link-options">
                      <a href="https://www.coursera.org" target="_blank">
                        <PolyglotText
                          defaultString="Coursera"
                          id="home-family-Coursera"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            {/* <Select
                placeholder="Family Site"
                className="f-site"
                options={selectOptionsSite}
                onChange={(event: any, data: any) => gotoUrl(data.value)}
              /> */}
          </div>
        </div>
      </div>
      <div className="copy-wrap">
        <div className="cont-inner">
          <div className="foot-logo">
            {/* 김민준 겨울 로고 변경 */}
            <Image src="https://image.mysuni.sk.com/suni-asset/public/static/images/winter/LMS/s-kuniversity-footerN.png" />
            {/* <h2 id="foot-logo">
              <Icon className="s-kuniversity" />
              <span className="blind">SK university</span>
            </h2> */}
          </div>
          <div className="foot-copyright">
            Copyright
            <Icon className="copyright" />
            <span className="blind">copyright sign</span>mySUNI. All Rights
            Reserved.
          </div>
        </div>
      </div>
    </section>
  );
}

export default FooterContainer;
