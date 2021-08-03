import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Popup, Image } from 'semantic-ui-react';

export function LanguageSelectPopupView() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenPopup = () => {
    setIsOpen(true);
  };
  const onClosePopup = () => {
    setIsOpen(false);
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
            {/* 내가 선택한 언어 class on추가 */}
            <li>
              <Link className="on" to="/">
                한국어
              </Link>
            </li>
            <li>
              <Link to="/">中文(简体)</Link>
            </li>
            <li>
              <Link to="/">English</Link>
            </li>
          </ul>
        </div>
      </Popup.Content>
    </Popup>
  );
}
