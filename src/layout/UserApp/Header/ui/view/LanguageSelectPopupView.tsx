import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Popup, Image } from 'semantic-ui-react';
import SkProfileApi from 'profile/present/apiclient/SkProfileApi';
import { SkProfileService } from 'profile/stores';

export function LanguageSelectPopupView() {
  const [isOpen, setIsOpen] = useState(false);
  const skProfile = SkProfileService.instance.skProfile;
  const onOpenPopup = () => {
    setIsOpen(true);
  };

  const onClosePopup = () => {
    setIsOpen(false);
  };

  const onSelectLanguge = async (lang: string) => {
    const params = {
      nameValues: [
        {
          name: 'language',
          value: lang,
        },
      ],
    };

    await SkProfileApi.instance.modifySkProfile(params);
    onClosePopup();
    window.location.href = window.location.href;
  };

  return (
    <Popup
      className="pop_language_slt"
      trigger={
        <Button className="btn_lang">
          <Image
            src={`${process.env.PUBLIC_URL}/images/all/btn-gnb-lang.svg`}
            className="btn_lang"
            alt="다국어선택"
          />
        </Button>
      }
      open={isOpen}
      onOpen={onOpenPopup}
      onClose={onClosePopup}
      on="click"
      position="bottom right"
    >
      {/* <Popup.Header className="lang_header">
        <strong className="h_tit">Language</strong>
        <div className="close_wrapper">
          <Button className="close" Icon onClick={onClosePopup} />
        </div>
      </Popup.Header> */}
      <Popup.Content>
        <div className="lang_inner">
          <ul>
            <li>
              <button
                className={`${skProfile.language === 'Korean' ? 'on' : ''}`}
                style={{ padding: '12px 24px', fontSize: '14px' }}
                onClick={() => onSelectLanguge('Korean')}
              >
                한국어
              </button>
            </li>
            <li>
              <button
                className={`${skProfile.language === 'Chinese' ? 'on' : ''}`}
                style={{ padding: '12px 24px', fontSize: '14px' }}
                onClick={() => onSelectLanguge('Chinese')}
              >
                中文(简体)
              </button>
            </li>
            <li>
              <button
                className={`${skProfile.language === 'English' ? 'on' : ''}`}
                style={{ padding: '12px 24px', fontSize: '14px' }}
                onClick={() => onSelectLanguge('English')}
              >
                English
              </button>
            </li>
          </ul>
        </div>
      </Popup.Content>
    </Popup>
  );
}
