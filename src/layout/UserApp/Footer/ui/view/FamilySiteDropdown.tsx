import { findSsoTypeCache } from 'lecture/detail/api/checkpointApi';
import React, { useState, useEffect, useRef } from 'react';
import { Icon } from 'semantic-ui-react';
import { findContentsProviderSamlCache } from 'shared/api/checkpointApi';
import { ContentsProviderSaml } from 'shared/model/ContentsProviderSaml';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import '../logic/Footer.css';

export function FamilySiteDropdown() {
  const [opened, setOpend] = useState(false);
  const familyRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [familyRef, opened]);

  const familyToggle = () => {
    setOpend(!opened);
  };

  const handleClickOutside = (event: any) => {
    if (opened && !familyRef.current?.contains(event.target)) {
      setOpend(false);
    }
  };

  const [linkedInDirectConnection, setLinkedInDirectConnection] = useState('');

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
    <div className="foot-site" ref={familyRef}>
      <div className="f-site-box">
        <div className="f-site-btnbox" onClick={familyToggle}>
          <span>Family Site</span>

          {opened === true ? (
            <Icon name="chevron down" style={{ transform: 'rotate(180deg)' }} />
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
                <a href="https://on.mysuni.com/auth/login" target="_blank">
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
    </div>
  );
}
