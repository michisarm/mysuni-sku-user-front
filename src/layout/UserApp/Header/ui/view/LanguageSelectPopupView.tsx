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
          name: 'Language',
          value: lang,
        },
      ],
    };

    await SkProfileApi.instance.modifySkProfile(params);
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
      <Popup.Header className="lang_header">
        <strong className="h_tit">Language</strong>
        <div className="close_wrapper">
          <Button className="close" Icon onClick={onClosePopup} />
        </div>
      </Popup.Header>
      <Popup.Content>
        <div className="lang_inner">
          <ul>
            <li>
              <Link
                className={`${skProfile.language === 'Korean' ? 'on' : ''}`}
                to="/"
                onClick={() => onSelectLanguge('Korean')}
              >
                한국어
              </Link>
            </li>
            <li>
              <Link
                className={`${skProfile.language === 'China' ? 'on' : ''}`}
                to="/"
                onClick={() => onSelectLanguge('China')}
              >
                中文(简体)
              </Link>
            </li>
            <li>
              <Link
                className={`${skProfile.language === 'English' ? 'on' : ''}`}
                to="/"
                onClick={() => onSelectLanguge('English')}
              >
                English
              </Link>
            </li>
          </ul>
        </div>
      </Popup.Content>
    </Popup>
  );
}
